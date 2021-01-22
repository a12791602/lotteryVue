<template lang="jade">
.agency
  .agency-top
    i.iconfont.icon-left(@click='tofive')
    p 代理中心
    span
  .agency-content
    .agency-content-top
      img(src='@/assets/img/one/agent.png')
    ul
      router-link(to='/agentIntro', tag='li')
        p 代理说明
        i.iconfont.icon-you
      router-link(to='/agentReport', tag='li')
        p 代理报表
        i.iconfont.icon-you
      router-link(to='/lowerReport', tag='li')
        p 下级报表
        i.iconfont.icon-you
      router-link(to='/manageInvite', tag='li')
        p 下级开户
        i.iconfont.icon-you
      router-link(to='/agentMember', tag='li')
        p 会员管理
        i.iconfont.icon-you
      router-link(to='/agentBetRecord', tag='li')
        p 投注明细
        i.iconfont.icon-you
      router-link(to='/agentBillRecord', tag='li')
        p 交易明细
        i.iconfont.icon-you
</template>
<script>
export default {
  methods:{
    tofive(){
      this.$router.push('/five');
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/agency.scss";
</style>