<template>
  <div class="lowerReport">
    <headers>
      <span slot="headerTitle" @click="show = true">{{currentTime}}</span>
    </headers>
    <div class="table_wrap">
      <table cellspacing="0" cellpadding="0" border="0" width="100%">
        <thead>
        <tr>
          <th v-for="(title, index) in theadTitle" :key="index">{{title}}</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in memberLists" :key="index" @click="goaGentReport(list.account)">
            <th>{{list.account}}</th>
            <th>{{list.userTypeName}}</th>
            <th>{{list.teamCount}}</th>
            <th>{{list.count}}</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="overly" v-show="flag || show" @click="show = flag = false"></div>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="slide" v-show="flag">
        <div>
          <h5>{{memberName}}</h5>
          <router-link tag="p" class="p1" :to="{path: '/agency/agentReport', query: {id: memberName}}">
            <span>查看报表</span>
            <i class="iconfont icon-you"></i>
          </router-link>
          <button @click="flag = false">确定</button>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="slide" v-show="show">
        <ul>
          <li v-for="(list, index) in times" :key="index" @click="changeTime(list)">{{list.name}}</li>
        </ul>
        <p @click="show = false">取消</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { underLevelRepor } from '@/api'
import headers from '@/components/public/headers.vue'
export default {
  name: 'lowerReport',
  data () {
    return {
      account: this.$store.state.userName,
      dateFlag: 0,
      currentTime: '今日',
      start: 0,
      limit: 20,
      theadTitle: ['账号', '类型', '报表人数', '盈利'],
      times: [
        { name: '今日', text: 0 },
        { name: '上日', text: 1 },
        { name: '本月', text: 2 },
        { name: '上月', text: 3 }
      ],
      memberLists: '',
      flag: false,
      show: false,
      memberName: ''
    }
  },
  created () {
    this.getUnderLevelRepor()
  },
  methods: {
    async getUnderLevelRepor () {
      let params = {
        account: this.account,
        dateFlag: this.dateFlag,
        start: this.start,
        limit: this.limit
      }
      let data = await underLevelRepor(params)
      this.memberLists = data.data.data.list
    },
    goaGentReport (account) {
      this.flag = true
      this.memberName = account
    },
    changeTime (list) {
      this.currentTime = list.name
      this.dateFlag = list.text
      this.flag = false
      this.show = false
      this.getUnderLevelRepor()
    }
  },
  components: {
    headers
  }
}
</script>

<style scoped lang="scss">
.lowerReport {
  table {
    tr {
      height: 50px;
    }
  }
  .slide{
    text-align: center;
    h5, p{
      height: 50px;
      line-height: 50px;
    }
    p.p1{
      display: flex;
      justify-content: space-between;
      text-align: center;
      padding: 0 20px;
    }
    button{
      display: block;
      width: 80%;
      margin: 0 auto;
      height: 50px;
    }
    ul {
      li {
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
</style>
