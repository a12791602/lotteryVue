<template>
  <div class="betReport">
    <headers class="betH5">
      <span @click="changeData" slot="headerTitle">{{currentData}}</span>
    </headers>
    <ul class="nav">
      <li @click='changeNav(list)' v-for="(list, index) in navLists" :key="index" :class="list.status === status ? 'active' : ''">{{list.name}}</li>
    </ul>
    <ul class="lists">
      <li v-for="(list, index) in orderLists" :key="index" @click="getDetail(list)">
        <div class="left">
          <p>{{list.lotteryName}} -- ${{list.price}}</p>
          <p>{{list.createTime}}</p>
        </div>
        <div class="right">
          <div>
            <p>{{list.statusName}}</p>
            <p>{{list.win}}</p>
          </div>
          <div>
            <i class="iconfont icon-xia"></i>
          </div>
        </div>
      </li>
    </ul>
    <div class="overly" v-show="flag" @click="flag = !flag"></div>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div :class="['slide', slideClass]" v-show="flag">
        <ul>
          <li v-for="(list, index) in detailLists" :key="index" @click="selectData(list)">
            <span>{{list.text}}</span><span>{{list.value}}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { betOrderList } from '@/api'
import { getStorage } from '@/storage'
import headers from '@/components/public/headers.vue'
export default {
  name: 'betReport',
  data () {
    return {
      flag: false,
      account: getStorage('Globalname'),
      status: 100,
      betweenType: 1,
      navLists: [
        { name: '全部', com: 'all', status: 100 },
        { name: '已中奖', com: 'reward', status: 1 },
        { name: '未中奖', com: 'notReward', status: 2 },
        { name: '等待开奖', com: 'waitReward', status: 6 }
      ],
      orderLists: '',
      detailLists: '',
      data: [
        { text: '今天', type: 1 },
        { text: '昨天', type: 2 },
        { text: '七天', type: 3 }
      ],
      slideClass: '',
      currentData: '今天'
    }
  },
  created () {
    this.getbetOrderList()
  },
  methods: {
    selectData (list) {
      if (this.slideClass === 'data') {
        this.flag = false
        this.currentData = list.text
        this.betweenType = list.type
        this.getbetOrderList()
      }
    },
    getDetail (list) {
      this.slideClass = 'detail'
      this.flag = true
      this.detailLists = [
        { text: '', value: list.lotteryName },
        { text: `第${list.seasonId}期`, value: list.statusName },
        { text: '投注时间', value: list.createTime },
        { text: '投注单号', value: list.id },
        { text: '投注金额', value: list.price },
        { text: '派送奖金', value: list.win },
        { text: '开奖号码', value: list.openNum },
        { text: '我的投注', value: list.content },
        { text: '玩法', value: list.playName }
      ]
    },
    changeData () {
      this.slideClass = 'data'
      this.flag = true
      this.detailLists = this.data
    },
    changeNav (list) {
      this.status = list.status
      this.getbetOrderList()
    },
    async getbetOrderList () {
      let params = {account: this.account, status: this.status, betweenType: this.betweenType, include: 0, start: 0, limit: 100}
      let data = await betOrderList(params)
      this.orderLists = data.data.data.list
    }
  },
  components: {
    headers
  }
}
</script>

<style scoped lang="scss">
.betReport{
  .nav{
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
    li{
      width: 25%;
      &.active{
        background: #dc3b40;
        color: #fff;
      }
    }
  }
  .lists{
    li {
      height: 81px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid rgb(232, 232, 232);
      .right{
        display: flex;
        align-items: center;
        text-align: right;
        i{
          padding-left: 20px;
        }
      }
    }
  }
  .slide{
    background: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    text-align: center;
    li{
      height: 45px;
      line-height: 44px;
      padding: 0 20px;
    }
    &.detail{
      li{
        display: flex;
        justify-content: space-between;
        &:nth-child(1){
          justify-content: center;
        }
      }
    }
  }
}
</style>
