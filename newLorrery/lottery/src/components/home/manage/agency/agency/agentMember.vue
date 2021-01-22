<template>
  <div class="agentMember">
    <table cellspacing="0" cellpadding="0" border="0" width="100%">
      <thead>
      <tr>
        <th v-for="(list, index) in theadTitle" :key="index">{{list}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list, index) in memberLists" :key="index" @click="showReabte(list.account, list.rebateRatio)">
        <th>{{list.account}}</th>
        <th>{{list.userTypeName}}</th>
        <th>{{list.loginTime}}</th>
        <th>{{list.childCount}}</th>
        <th></th>
      </tr>
      </tbody>
    </table>
    <div class="overly" @click="flag = false" v-show="flag"></div>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="slide" v-show="flag">
        <h5>{{account}}</h5>
        <p>
          <span>返点率</span><span>{{rebate}}</span>
        </p>
        <div class="btn_wrap">
          <button @click="flag = false">确定</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { underUserList } from '@/api'
export default {
  name: 'agentMember',
  data () {
    return {
      memberLists: '',
      rebate: '',
      account: '',
      flag: false,
      theadTitle: ['账号', '类型', '登录时间', '下级人数']
    }
  },
  computed: {
    ...mapState(['userName'])
  },
  created () {
    this.getUnderUserList()
  },
  methods: {
    async getUnderUserList () {
      let data = await underUserList(this.userName)
      this.memberLists = data.data.data
      console.log(data.data.data)
    },
    showReabte (account, rebate) {
      this.account = account
      this.rebate = rebate
      this.flag = true
    }
  }
}
</script>

<style scoped lang="scss">
.agentMember{
  th{
    height: 50px;
    line-height: 50px;
    background: #f2f2f2;
  }
  .slide {
    z-index: 10;
    text-align: center;
    background: #fff;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    padding-bottom: 20px;
    h5 {
      color: #fff;
      background: #af3a31;
      height: 40px;
      line-height: 40px;
    }
    p {
      padding: 0 20px;
      display: flex;
      height: 40px;
      line-height: 40px;
      justify-content: space-between;
    }
    button{
      margin: 0 auto;
      display: block;
      width: 80%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      background: #af3a31;
    }
  }
}
</style>
