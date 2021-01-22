<template>
  <div class="rechargeserch">
    <ul class="recharge_lists">
      <li v-for="(list, index) in rechargeLists" :key="index" @click="getRechargeDetail(list)">
        <div class="infor_left">
          <h6>金额 <span>{{list.amount}}</span><strong>{{list.bankName}}</strong></h6>
          <p>产生时间{{list.createTime}}</p>
        </div>
        <div class="infor_right">
          <span>{{list.statusName}}</span>
          <i class="iconfont icon-xia"></i>
        </div>
      </li>
    </ul>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="recharge_detail" v-show="isShow">
        <ul>
          <li v-for="(list, index) in rechargeDeatil" :key="index">
            <span>{{list.name}}</span>
            <span>{{list.content}}</span>
          </li>
        </ul>
        <div class="btn_wrap">
          <button @click="cancelDetail">确定</button>
        </div>
      </div>
    </transition>
    <div class="overly" v-show="isShow" @click="isShow = false"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { rechargeList } from '@/api'
export default {
  name: 'rechargeserch',
  data () {
    return {
      rechargeLists: '',
      rechargeDeatil: '',
      isShow: false
    }
  },
  created () {
    this.getRechargeList()
  },
  computed: {
    ...mapState(['loadingFlag'])
  },
  methods: {
    async getRechargeList () {
      // this.$store.commit('SAVELOADINGFLAG', true)
      let data = await rechargeList({start: 0, limit: 100})
      this.rechargeLists = data.data.data
      // this.$store.commit('SAVELOADINGFLAG', false)
    },
    getRechargeDetail (list) {
      this.isShow = true
      this.rechargeDeatil = [
        { name: '订单编号', content: list.id },
        { name: '订单时间', content: list.createTime },
        { name: '目前处理状况', content: list.statusName },
        { name: '申请充值金额', content: list.amount }
      ]
    },
    cancelDetail () {
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="scss">
.rechargeserch{
  .recharge_lists{
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      height: 61px;
      border-bottom: 1px solid #e8e8e8;
      h6{
        font-size: 14px;
      }
      p{
        font-size: 12px;
      }
    }
  }
  .recharge_detail{
    z-index: 15;
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    ul{
      li {
        &:first-child{
          text-align: center;
        }
        &:not(:first-child) {
          display: flex;
          justify-content: space-between;
        }
        padding: 0 15px;
        height: 51px;
        border-bottom: 1px solid #E8E8E8;
        line-height: 50px;
      }
    }
    .btn_wrap{
      padding: 0 15px;
      height: 50px;
      line-height: 50px;
      button {
        background: #F94E4E;
        border-radius: 4px;
        height: 40px;
        color: #fff;
        width: 100%;
        display: inline-block;
      }
    }
  }
}

</style>
