<template>
  <div class="agentBillRecord">
    <headers>
      <span slot="headerTitle" @click="flag = true">{{currentText}}</span>
    </headers>
    <div class="nav_box">
      <ul>
        <li v-for="(list, index) in navLists" :key="index" @click="changeNav(list)" :class="{active: accountChangeType === list.accountChangeType}">{{list.text}}</li>
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
sudo ln /usr/local/src/node-v8.10.0-linux-x86/bin/node /usr/local/bin/node
<script>
import { tradeList } from '@/api'
import headers from '@/components/public/headers.vue'
export default {
  name: 'agentBillRecord',
  data () {
    return {
      account: this.$store.state.userName,
      include: 2,
      accountChangeType: 100,
      betweenType: 1,
      tradeList: '',
      currentText: '今日',
      flag: false,
      navLists: [
        { text: '所有类型', accountChangeType: 100 },
        { text: '提现记录', accountChangeType: 1 },
        { text: '充值记录', accountChangeType: 2 }
      ],
      times: [
        { text: '今日', betweenType: 1 },
        { text: '昨日', betweenType: 2 },
        { text: '七天', betweenType: 3 }
      ]
    }
  },
  created () {
    this.getTradeList()
  },
  methods: {
    changeType (list) {
      this.betweenType = list.betweenType
      this.getTradeList()
      this.flag = false
    },
    changeNav (list) {
      this.accountChangeType = list.accountChangeType
      this.getTradeList()
    },
    async getTradeList () {
      let params = {
        account: this.account,
        include: this.include,
        accountChangeType: this.accountChangeType,
        betweenType: this.betweenType
      }
      let data = await tradeList(params)
      this.tradeList = data.data.data.list
      console.log(data.data.data)
    }
  },
  components: {
    headers
  }
}
</script>

<style scoped lang="scss">
.agentBillRecord{
  .nav_box {
    ul {
      display: flex;
      text-align: center;
      height: 50px;
      line-height: 50px;
      li {
        width: 33.33%;
        &.active{
          border-bottom: 1px solid #dc3b40;
        }
      }
    }
  }
  .slide{
    li{
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
