<template>
  <div class="agentBetRecord">
    <headers>
      <span slot="headerTitle" @click="flag = true">{{currentText}}</span>
    </headers>
    <div class="search_box">
      <input type="text" v-model="account" placeholder="请输入用户账户名称">
      <button @click="searchOrderList">
        <i class="iconfont icon-you"></i>
      </button>
    </div>
    <div class="nav_box">
      <ul>
        <li v-for="(list, index) in navList" :key="index" @click="changeStatus(list)" :class="{active: status === list.status}">{{list.text}}</li>
      </ul>
    </div>
    <div class="overly" v-show="flag" @click="flag = false"></div>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="slide" v-show="flag">
        <ul>
          <li v-for="(list, index) in times" :key="index" @click="changeType(list)">{{list.text}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import headers from '@/components/public/headers.vue'
import { betOrderList } from '@/api'
export default {
  name: 'agentBetRecord',
  data () {
    return {
      account: this.$store.state.userName,
      include: 2,
      status: 100,
      betweenType: 1,
      start: 0,
      limit: 20,
      betLists: '',
      navList: [
        { text: '全部', status: 100 },
        { text: '已中奖', status: 1 },
        { text: '未中奖', status: 2 },
        { text: '等待开奖', status: 6 }
      ],
      currentText: '今天',
      times: [
        { text: '今天', betweenType: 1 },
        { text: '昨天', betweenType: 2 },
        { text: '七天', betweenType: 3 }
      ],
      flag: false,
      modelText: ''
    }
  },
  created () {
    this.getBetOrderList()
  },
  methods: {
    searchOrderList () {
      if (this.account) {
        this.getBetOrderList()
      } else {
        this.$refs['model'].flag = true
        this.modelText = '请输入下级账号'
      }
    },
    changeType (list) {
      this.currentText = list.text
      this.betweenType = list.betweenType
      this.getBetOrderList()
      this.flag = false
    },
    changeStatus (list) {
      this.status = list.status
      this.getBetOrderList()
    },
    async getBetOrderList () {
      let params = {
        account: this.account,
        status: this.status,
        betweenType: this.betweenType,
        include: this.include,
        start: this.start,
        limit: this.limit
      }
      let data = await betOrderList(params)
      let tempData = data.data.data
      if (tempData.list) {
        this.betLists = tempData.list
      } else {
        this.$parent.$refs['model'].flag = true
        this.$parent.$refs['model'].modelText = tempData.message
        this.account = ''
      }
    }
  },
  components: {
    headers
  }
}
</script>

<style scoped lang="scss">
.agentBetRecord{
  .search_box{
    height: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input, button{
      height: 40px;
    }
    input{
      width: 200px;
      padding-left: 10px;
    }
    button{
      width: 60px;
    }
  }
  .nav_box{
    ul{
      height: 50px;
      line-height: 50px;
      text-align: center;
      display: flex;
      li {
        width: 25%;
        &.active{
          border-bottom: 1px solid #dc3b40;
        }
      }
    }
  }
  .slide{
    li {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
