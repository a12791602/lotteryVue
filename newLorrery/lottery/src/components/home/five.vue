<template>
  <div class='five'>
    <div class="user">
      <dl class="clearFix">
        <dt class="fl">
          <router-link tag="p" :to="{path: '/five/datum'}">
            <img :src='imageSrc' alt="" width="72" height="72">
          </router-link>
        </dt>
        <dd>账号：<span>{{userId}}</span></dd>
        <dd>余额：<span v-show="isMoneyShow">{{balance}}</span><span v-show="!isMoneyShow">****</span><span @click="isMoneyShow = true" v-show="!isMoneyShow">显示</span><span v-show="isMoneyShow" @click="isMoneyShow = false">隐藏</span></dd>
      </dl>
      <img :class="['reload', rotate ? 'active' : '']" v-show="isMoneyShow" src='./../../../static/roll.png' alt="" @click="reloadMoney">
    </div>
    <ul class="row_nav">
      <router-link tag="li" v-for="(item, index) in fiveNav1" :key="index" :to="{path: item.src}">
        <div :class="index">
          <i :class="['iconfont', item.icon]"></i>
        </div>
        <h6>{{item.name}}</h6>
      </router-link>
    </ul>
    <ul class="col_nav">
      <router-link tag="li" v-for="(item, index) in fiveNav2" :key="index" :to="{path: item.paths}">
        <span class="wrap">
          <i :class="['iconfont', item.icon]"></i>
        </span>
        <span>{{item.name}}</span>
        <i class="iconfont icon-you"></i>
      </router-link>
    </ul>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import { setStorage } from '@/storage/index'
import { getUserInfo, getBalance } from './../../api'
export default {
  name: 'five',
  data () {
    return {
      isMoneyShow: true,
      imageSrc: '',
      userId: '',
      balance: '',
      rotate: false,
      fiveNav1: [
        {name: '我要充值', icon: 'icon-creditcard', src: 'five/payway'},
        {name: '我要提现', icon: 'icon-cash', src: 'five/withdraw'},
        {name: '交易记录', icon: 'icon-notebook', src: 'five/tradeReport'},
        {name: '投注记录', icon: 'icon-notepad_add', src: 'five/betReport'}
      ],
      fiveNav2: [
        {name: '个人信息', icon: 'icon-address-book-o', paths: '/five/detail', viewC: true},
        {name: '安全中心', icon: 'icon-lock', paths: '/five/safety', viewC: true},
        {name: '代理中心', icon: 'icon-concard', paths: '/five/agency', viewC: false},
        {name: '今日盈亏', icon: 'icon-line-chart', paths: '/five/profits', viewC: true},
        {name: '我的消息', icon: 'icon-envelope', paths: '/mymsg/notice', viewC: true},
        {name: '充值信息', icon: 'icon-file', paths: '/five/rechargeserch', viewC: true}
      ]
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    reloadMoney () {
      this.rotate = true
      this.balance = '读取中...'
      setTimeout(() => {
        this.rotate = false
        this.getBalance()
      }, 800)
    },
    getUserInfo () {
      getUserInfo().then(res => {
        let data = res.data.data
        this.imageSrc = `./../../../static/actor/${data.image}.jpg`
        setStorage('username', data.userId)
        this.userId = data.userId
        this.balance = data.balance
      })
    },
    getBalance () {
      getBalance().then(res => {
        this.balance = res.data.data.balance
      })
    }
  }
}
</script>

<style scoped lang="scss">
.five {
  .user {
    padding-left: 30PX;
    position: relative;
    dl {
      dt {
        img {
          border-radius: 100%;
        }
      }
      dd {
        padding-left: 80px;
        line-height: 30px;
      }
    }
    img.reload {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      right: 30px;
      &.active {
        transition: All 2.4s ease-in-out;
        transform: rotate(3600deg);
      }
    }
  }
  .row_nav {
    display: flex;
    li {
      width: 25%;
      text-align: center;
      &:nth-child(1){
        div{
          background: #ff5f5f;
        }
      }
      &:nth-child(2){
        div{
          background: #ffac5f;
        }
      }
      &:nth-child(3) {
        div {
          background: #75dac4;
        }
      }
      &:nth-child(4) {
        div {
          background: #81afe4;
        }
      }
      div {
        width: 56px;
        height: 56px;
        border-radius: 8px;
        margin: 0 auto;
        .iconfont {
          line-height: 56px;
          font-size: 28px;
          color: #fff;
        }
      }
      h6 {
        font-size: 14px;
        margin: 6px 0;
      }
    }
  }
  .col_nav{
    li {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e8e8e8;
      padding: 0 20px;
      position: relative;
      .wrap {
        i {
          font-size: 22px;
          color: #af3a31;
        }
      }
      .icon-you{
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 30px;
        font-size: 18px;
      }
    }
  }
}
</style>
