<template>
  <div class="manageInvite">
    <headers>
      <div class="btn_wrap" slot="headerTitle">
        <button v-for="(list, index) in comLists" :key="index" @click="changeCom(list.com)" :class="{active: currentCom === list.com }">{{list.text}}</button>
      </div>
    </headers>
    <component :is="currentCom"></component>
  </div>
</template>

<script>
import mIcode from './manageInvite/mIcode'
import mInvite from './manageInvite/mInvite'
import headers from '@/components/public/headers.vue'
export default {
  name: 'manageInvite',
  data () {
    return {
      currentCom: this.$route.params.id,
      comLists: [
        { text: '下级开户', com: 'mInvite' },
        { text: '邀请码', com: 'mIcode' }
      ]
    }
  },
  methods: {
    changeCom (com) {
      this.currentCom = com
      this.$router.push(`/manageInvite/${this.currentCom}`)
    }
  },
  watch: {
    '$route' () {
      this.currentCom = this.$route.params.id
    }
  },
  components: {
    headers,
    mInvite,
    mIcode
  }
}
</script>

<style scoped lang="scss">
.manageInvite {
  .btn_wrap{
    width: 160px;
    border: 1px solid #FFF;
    border-radius: 4px;
    button{
      width: 50%;
      height: 40px;
      color: #fff;
      background: transparent;
      &.active{
        background: #fff;
        color: red;
      }
    }
  }
}
</style>
