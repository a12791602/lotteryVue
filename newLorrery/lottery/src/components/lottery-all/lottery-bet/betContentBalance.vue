<template>
  <div class="betContentBalance">
    <div class="bet_info">
      <!--v-show="zhu"-->
      <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div class="calc" v-show="zhu || basketLen">
          <div>
            <p class="current_ball">当前选号 {{con}}</p>
            <p><span v-show="multiple">单注最高可中 {{currentPlayer.displayBonus | keepTwoNum}} 元</span></p>
          </div>
          <div class="beishu">
            <span class="select_number" @click="goLotteryBasket()">选号 {{basketLen}}</span>
            <!--模式&nbsp;-->
            <select v-model="selectMoney">
              <option :value="type.value" v-for="(type, index) in moneyType" :key="index">{{type.name}}</option>
            </select>
            <!--倍数&nbsp;-->
            <div>
              <span @click="multiple < 9999 ? multiple++ : 9999">+</span><input v-model.number="multiple" type="number" placeholder="请输入要投注的金额" min="1" max="9999"><span @click="multiple > 1 ?  multiple-- : 1">-</span>
            </div>
            <div style="color: #fff;width: 160px">
              <!--返点&nbsp;-->
              <input type="range" :min="minRebate" :max="maxRebate" v-model="currentRebate" :step="rebateStep"><strong style="display: inline-block;width: 94px">{{currentRebateVal}}</strong>
            </div>
          </div>
        </div>
      </transition>
      <div class="btn_wrap">
        <div>
          <button class="clear_btn" @click="iscreat">清空</button>
          <span v-show="zhu">共计{{zhu}}注 </span><span v-show="multiple"> 共{{totalMoney}}元</span>
        </div>
        <div>
          <button class="certain_btn" @click="fastBet">马上投注</button>
          <button class="certain_btn" @click="addNum">添加号码</button>
        </div>
      </div>
    </div>
    <div class="bet_model" v-if="isShow">
      <div class="model_container">
        <h5>投注确认</h5>
        <ul>
          <li>
            <span>{{$route.query.name}}：</span>
            <span>{{seasonId}}</span>
          </li>
          <li>
            <span>投注金额：</span>
            <span>{{ totalMoney }}</span>
          </li>
          <li>
            <span>投注内容：</span>
            <span>{{ con }}</span>
          </li>
        </ul>
        <div class="model_footer">
          <span @click="cancel">取消</span>
          <span @click="betGo">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixins from '@/utils/mixins'
import { postBet } from './../../../api'

export default {
  name: 'betContentBalance',
  mixins: [mixins],
  data () {
    return {
      multiple: 1,
      maxRebate: 1980,
      minRebate: 1900,
      rebateStep: 2,
      currentRebate: 1980,
      isShow: false,
      selectMoney: 1,
      moneyType: ['元', '角', '分', '厘'].map((v, i) => ({name: v, value: Math.pow(10, i)}))
    }
  },
  created () {},
  props: ['basketLen'],
  computed: {
    ...mapState(['zhu', 'con', 'currentPlayer', 'seasonId', 'playBonusId', 'fullTitle']),
    currentRebateVal () {
      let index = (this.maxRebate - this.currentRebate) / 20
      this.$store.commit('SAVEREBATE', this.currentRebate)
      return this.currentRebate + '~' + index + '%'
    },
    totalMoney () {
      return this.zhu * this.multiple / this.selectMoney
    }
  },
  methods: {
    goLotteryBasket () {h
      this.$parent.changeshowbasket()
    },
    cancel () {
      this.isShow = false
    },
    fastBet () {
      if (this.zhu && this.multiple) {
        this.isShow = true
      } else {
        alert(1)
      }
    },
    addNum () {
      if (this.zhu) {
        let mode = this.moneyType.find(v => v.value === +this.selectMoney).name
        let tempObj = {name: this.playBonusId, fullTitle: this.fullTitle, con: this.con, zhu: this.zhu, multiple: this.multiple, mode, money: this.totalMoney, rebate: this.currentRebate, methods: '删除'}
        this.$parent.savelotterybasket(tempObj)
        this.$parent.reset()
      } else {
        alert(1)
      }
    },
    betGo () {
      let formData = new FormData()
      formData.append('order[0].content', this.con)
      formData.append('order[0].betCount', this.zhu)
      formData.append('order[0].price', this.multiple)
      formData.append('order[0].unit', 1)
      formData.append('order[0].playId', this.playBonusId)
      formData.append('count', this.zhu)
      formData.append('traceOrders[0].price', this.multiple)
      formData.append('traceOrders[0].seasonId', this.seasonId)
      formData.append('bounsType', 0)
      formData.append('traceWinStop', 0)
      formData.append('isTrace', 0)
      formData.append('lotteryId', this.$route.query.id)
      formData.append('amount', this.multiple * this.zhu)
      postBet(formData).then(res => {
        let data = res.data
        if (data.message === 'success') {
          alert('success')
        } else {
          alert(data.data)
        }
        this.isShow = false
        this.iscreat()
      })
    },
    iscreat () {
      this.$parent.reset()
    }
  },
  watch: {
    multiple () {
      this.multiple = this.multiple > 9999 ? 9999 : this.multiple
    }
  }
}
</script>

<style scoped lang="scss">
.betContentBalance{
  .bet_info {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .calc {
      padding: 0 15px;
      background: rgba(0, 0, 0, .5);
      height: 110px;
      .current_ball {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        height: 24px;
        line-height: 24px;
        color: #caebda;
        margin-bottom: 10px;
        span {
          color: #caebda;
        }
      }
    }
    .beishu {
      display: flex;
      justify-content: space-between;
      text-align: center;
      color: #fff;
      line-height: 30px;
      .select_number {
        color: #fff;
        padding-right: 10px;
      }
      select {
        height: 30px;
      }
      div {
        border-radius: 4px;
        overflow: hidden;
        height: 30px;
        span {
          vertical-align: top;
          height: 100%;
          display: inline-block;
          width: 20px;
          font-size: 20px;
          color: #fff;
          background: #bbb;
        }
        input {
          height: 100%;
          background: #fff;
          text-align: center;
          width: 36px;
          vertical-align: top;
          &[type='range'] {
            width: 60px;
          }
        }
      }
    }
    .btn_wrap {
      background: #414141;
      height: 54px;
      line-height: 54px;
      padding: 0 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        .clear_btn {
          color: #ffaf36;
          background: none;
          font-size: 20px;
          margin-right: 5px;
        }
        span {
          font-size: 16px;
          color: #fff;
        }
      }
      .certain_btn {
        background: #af3a31;
        color: #fff;
        font-size: 14px;
        height: 40px;
        padding: 0 5px;
        border-radius: 4px;
      }
    }
  }
  .bet_model{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    .model_container {
      background: #fff;
      width: 70%;
      margin: 40% auto 0;
      h5 {
        background: #af3a31;
        color: #fff;
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        text-align: center;
      }
      ul {
        padding: 0 20px;
        li {
          line-height: 28px;
          height: 28px;
        }
      }
      .model_footer {
        border-top: 1px solid #DFE4ED;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        height: 40px;
        font-size: 18px;
        line-height: 40px;
      }
    }
  }
}
</style>
