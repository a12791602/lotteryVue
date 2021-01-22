<template>
  <div class="second">
    <ul class="lottery_ball">
      <li v-for="(item, index) in allLotterysNum" :key="index" :class="`lottery_${item.groupName}`">
        <div class="top">
          <span class="name">{{item.name}}</span>
          <div class="left">
            <span class="data">第{{item.seasonId}}期</span>
            <span class="times">{{item.restSeconds | initSfm}}</span>
          </div>
        </div>
        <div class="middle">
          <span v-for="(ball, index1) in item.lotteryBalls" :key="index1" :class="`lottery_${ball}`">{{ball}}</span>
        </div>
        <div class="bottom">
          <router-link tag="span" :to="{path: '/past', query: {id: item.lotteryId, name: item.name}}">往期开奖</router-link>
          <router-link tag="span" :to="{path: '/lotteryBet', query: {id: item.lotteryId, name: item.name, group: item.groupName}}">立即投注</router-link>
          <router-link tag="span" :to="{path: '/trend', query: {id: item.lotteryId, type: item.groupName}}">号码走势</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
'use strict'
import { getPastOpen } from '@/api'
import mixins from '@/utils/mixins'
export default {
  name: 'second',
  mixins: [mixins],
  data () {
    return {
      allLotterysNum: '',
      allLotterysTime: []
    }
  },
  created () {
    this.getAllLottery()
  },
  methods: {
    async getAllLottery () {
      let data = await getPastOpen({})
      this.allLotterysNum = data.data.data.map(v1 => {
        let nLen = Object.keys(v1).filter(v2 => /^n{1}[0-9]+$/g.test(v2)).length
        let nArr = Array.from({length: nLen}, (v2, i2) => `n${i2 + 1}`)
        return {
          lotteryBalls: nArr.map(v3 => v1[v3]),
          restSeconds: v1.restSeconds,
          seasonId: v1.seasonId,
          lotteryId: v1.lotteryId,
          name: v1.name,
          groupName: v1.groupName.includes('11x5') ? 'x11x5' : v1.groupName
        }
      })
      let timeInterval = setInterval(() => {
        this.allLotterysTime = []
        this.allLotterysNum.forEach(v => {
          this.allLotterysTime.push(v.restSeconds--)
        })
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timeInterval)
      })
    },
    async getNewLotteryOpen (indexArr, lotteryIdArr) {
      for (let i = 0; i < lotteryIdArr.length; i++) {
        let data = await getPastOpen({lotteryId: lotteryIdArr[i], count: 1})
        let tempData = data.data.data.map(v1 => {
          let nLen = Object.keys(v1).filter(v2 => /^n{1}[0-9]+$/g.test(v2)).length
          let nArr = Array.from({length: nLen}, (v2, i2) => `n${i2 + 1}`)
          return {
            lotteryBalls: nArr.map(v3 => v1[v3]),
            restSeconds: v1.restSeconds,
            seasonId: v1.seasonId,
            lotteryId: v1.lotteryId,
            name: v1.name,
            groupName: v1.groupName.includes('11x5') ? 'x11x5' : v1.groupName
          }
        })[0]
        this.allLotterysNum.splice(indexArr[i], 1, tempData)
      }
    }
  },
  watch: {
    allLotterysTime () {
      let indexArr = this.allLotterysTime.reduce((arr, v, i) => arr.concat(v ? [] : i), [])
      if (indexArr.length) {
        let lotteryIdArr = indexArr.map(v => this.allLotterysNum[v].lotteryId)
        this.getNewLotteryOpen(indexArr, lotteryIdArr)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.second {
  padding: 10px;
  .lottery_ball{
    li {
      margin-bottom: 5px;
      .top {
        background: #997259;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        height: 34px;
        line-height: 34px;
        span {
          color: #fff;
          &.times {
            background: #af3a31;
            border-radius: 4px;
            padding: 0 5px;
            margin-left: 8px;
          }
        }
      }
      .middle {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ebe0d1;
        height: 40px;
        line-height: 40px;
        text-align: center;
        span {
          color: #fff;
          border-radius: 50px;
        }
      }
      .bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 38px;
        line-height: 38px;
        background: #e9dac4;
        span {
          width: 90px;
          height: 26px;
          background: #fff;
          border-radius: 4px;
          text-align: center;
          line-height: 26px;
          margin: 0 5px;
        }
      }
      &.lottery_ssc {
        .middle {
          span {
            width: 32px;
            height: 32px;
            line-height: 32px;
            background: linear-gradient(135deg,#ffd08f,#f49000);
            margin: 0 5px;
          }
        }
      }
      &.lottery_pk10{
        .middle{
          span {
            background: linear-gradient(135deg,#ace4e9,#59bac2);
            height: 28px;
            width: 28px;
            line-height: 28px;
            margin: 0 2px;
          }
        }
      }
      &.lottery_x11x5{
        .middle {
          span {
            width: 36px;
            height: 36px;
            line-height: 36px;
            background: linear-gradient(135deg,#87F423,#19F4A0);
            margin: 0 5px;
          }
        }
      }
      &.lottery_k3 {
        .middle{
          span {
            color: transparent;
            width: 60px;
            height: 60px;
            background-image: url("./../../assets/images/diceK3.png")
          }
          @for $i from 1 through 6 {
            .lottery_#{$i}{
              background-position: 2px (60px * (1 - $i));
            }
          }
        }
      }
    }
  }
}
</style>
