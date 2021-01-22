<template>
  <div class="agency">
    <ul>
      <router-link tag="li" v-for="(list, index) in agencyLists" :key="index" :to="list.src">
        <span>{{list.name}}</span>
        <i class="iconfont icon-you"></i>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'agency',
  data () {
    return {
      agencyLists: [
        { name: '代理说明', src: '/agency/agentIntro' },
        { name: '代理报表', src: '/agency/agentReport' },
        { name: '下级报表', src: '/agency/lowerReport' },
        { name: '下级开户', src: '/manageInvite/mInvite' },
        { name: '会员管理', src: '/agency/agentMember' },
        { name: '投注明细', src: '/agency/agentBetRecord' },
        { name: '交易明细', src: '/agency/agentBillRecord' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.agency{
  ul {
    li {
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      height: 51px;
      line-height: 50px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
