<template>
  <div class='lottery_list'>
    <headers>
      <h5 slot="headerTitle">{{lotteryName}}</h5>
    </headers>
    <ul class="lottery_nav">
      <li v-for="(item, index) in navTitle" :key="index" @click="goLotteryList(item)" :class="{active: lotteryType === item.pathsrc}">
        <span>
          <i :class="['iconfont', item.icon]"></i>
        </span>
        <h5>{{item.name}}</h5>
      </li>
    </ul>
    <ul class="lotterys">
      <router-link v-for="(item, index) in loterySorts" :key="index" tag="li" :to="{path: '/lotteryBet', query:{id: item.id, name: item.name, group: item.groupId}}">
        <span><i :class="['iconfont', 'icon-' + item.groupId]"></i></span>
        <h5>{{item.name}}</h5>
      </router-link>
    </ul>
  </div>
</template>

<script>
import headers from './../public/headers.vue'
import { getLotteryListAll } from './../../api'

export default {
  name: 'lotteryList',
  data () {
    return {
      navTitle: [
        { name: '全部彩种', pathsrc: 'all', icon: 'icon-all' },
        { name: '快3', pathsrc: 'k3', icon: 'icon-k3' },
        { name: '时时彩', pathsrc: 'ssc', icon: 'icon-ssc' },
        { name: '快乐彩', pathsrc: 'pk10', icon: 'icon-pk10' },
        { name: '11选5', pathsrc: 'x11x5', icon: 'icon-x11x5' }
      ],
      lotteryListsAll: '',
      lotteryType: 'all',
      lotteryName: '全部彩种'
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.lotteryType = this.$route.params.id
  },
  created () {
    this.lotteryType = this.$route.params.id
    this.getLotteryAll()
  },
  activated () {},
  deactivated () {},
  computed: {
    loterySorts () {
      let lotteryType = this.lotteryType
      let lotteryAll = this.lotteryListsAll
      if (lotteryAll) {
        return lotteryType === 'all' ? lotteryAll : lotteryAll.filter(v => v.groupId === lotteryType)
      }
    }
  },
  methods: {
    getLotteryAll () {
      getLotteryListAll().then(res => {
        this.lotteryListsAll = res.data.data
        console.log(this.lotteryListsAll)
      })
    },
    goLotteryList (item) {
      this.$router.push({ name: 'lotteryList', params: { id: item.pathsrc } })
      this.lotteryName = item.name
    }
  },
  components: {
    headers
  }
}
</script>

<style scoped lang="scss">
.lottery_list {
  .lottery_nav {
    background: #000;
    display: flex;
    li {
      padding: 5px 0;
      width: 20%;
      text-align: center;
      i {
        font-size: 44px;
        &.icon-all{
          color: #F24C03;
        }
        &.icon-k3{
          color: #C6312A;
        }
        &.icon-ssc{
          color: #F4A721;
        }
        &.icon-pk10{
          color: #2FBBF2;
        }
        &.icon-x11x5{
          color: #8BD56B;
        }
      }
      h5 {
        color: #fff;
        font-size: 16px;
      }
      &.active{
        background: #444;
      }
    }
  }
  .lotterys{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    border-bottom: 1px solid #DFE4ED;
    li {
      width: 33.33%;
      border-top: 1px solid #DFE4ED;
      border-left: 1px solid #DFE4ED;
      padding: 10px 0;
      i{
        font-size: 56px;
      }
      .icon-ssc{
        color: #F4A721;
      }
      .icon-k3{
        color: #C6312A;
      }
      .icon-pk10{
        color: #2FBBF2;
      }
      h5{
        font-size: 14px;
        margin-top: 5px;
      }
      &.lottery-list{
        i {
          color: #fa7e00;
        }
      }
    }
  }
}
</style>
