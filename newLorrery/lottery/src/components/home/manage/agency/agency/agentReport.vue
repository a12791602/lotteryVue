<template>
  <div class="agentReport">
    <headers>
      <h5 slot="headerTitle"><span @click="flag = true">{{currentTime}}</span></h5>
    </headers>
    <div class="serach">
      <input type="text" v-model="account" placeholder="请输入用户账号名称">
      <button @click="getUserTeam">
        <i class="iconfont icon-you"></i>
      </button>
    </div>
    <div class="lists">
      <ul>
        <li v-for="(list, index) in agentReports" :key="index">
          <span>{{list.text}}</span>
          <span>{{list.name}}</span>
        </li>
      </ul>
    </div>
    <div class="overly" v-show="flag" @click="flag = false"></div>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="slide" v-show="flag">
        <ul>
          <li v-for="(list, index) in times" :key="index" @click="changeTime(list)">{{list.name}}</li>
        </ul>
        <div>
          <p @click="flag = false">取消</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { userTeam } from '@/api'
import headers from '@/components/public/headers.vue'
export default {
  name: 'agentReport',
  data () {
    return {
      account: this.$route.query.id ? this.$route.query.id : this.$store.state.userName,
      dateFlag: 0,
      agentReports: '',
      currentTime: '今日',
      times: [
        { name: '今日', text: 0 },
        { name: '上日', text: 1 },
        { name: '本月', text: 2 },
        { name: '上月', text: 3 }
      ],
      flag: false
    }
  },
  created () {
    this.getUserTeam()
  },
  methods: {
    async getUserTeam () {
      let data = await userTeam(this.account, this.dateFlag)
      let agentReports = data.data.data
      if (agentReports.message) {
        this.$parent.$refs['model'].flag = true
        this.$parent.$refs['model'].modelText = agentReports.message
      }
      this.agentReports = [
        { name: '投注金额', text: agentReports.betAmount },
        { name: '中奖金额', text: agentReports.winningAmount },
        { name: '活动礼金', text: agentReports.activityAmount },
        { name: '团队返点', text: agentReports.teamRebateAmount },
        { name: '团队盈利', text: agentReports.profit },
        { name: '充值金额', text: agentReports.rechargeAmount },
        { name: '提现金额', text: agentReports.withdrawAmount },
        { name: '首充人数', text: agentReports.firstChargeCount },
        { name: '注册人数', text: agentReports.regCount },
        { name: '投注人数', text: agentReports.betPerCount },
        { name: '下级人数', text: agentReports.lowerCount },
        { name: '团队余额', text: agentReports.teamAmount },
        { name: '代理返点', text: agentReports.agentRebateAmount }
      ]
    },
    changeTime (list) {
      this.currentTime = list.name
      this.dateFlag = list.text
      this.flag = false
      this.getUserTeam()
    }
  },
  components: {
    headers
  }
}
</script>

<style scoped lang="scss">
  .agentReport{
    .serach {
      margin: 10px 0;
      height: 40px;
      display: flex;
      padding: 0 20px;
      justify-content: space-between;
      input{
        padding-left: 1rem;
      }
      button{
        width: 40px;
      }
    }
    .lists{
      ul{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        li {
          justify-content: center;
          height: 100px;
          display: flex;
          align-items: center;
          width: 33.33%;
          flex-direction: column;
        }
      }
    }
    .slide{
      text-align: center;
      position: fixed;
      right: 0;
      left: 0;
      bottom: 0;
      background: #fff;
      li, div {
        height: 40px;
        line-height: 40px;
      }
      div{
        margin-top: 15px;
      }
    }
  }
</style>
