<template lang="jade">
.mymsg
  .mymsg-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    ul
      router-link(v-for='(navs,index) in nav', :to="'/manageInvite/'+navs.pathurl", tag='li', :key='index') {{navs.name}}
    span
  .mymsg-content
    router-view
</template>
<script>
export default {
  data() {
    return {
      nav: [
        {
          name: "下级开户",
          pathurl: "mInvite"
        },
        {
          name: "邀请码",
          pathurl: "mIcode"
        }
      ],
      radio: 0
    };
  },
  methods:{
    listStyleToSafety(){
      this.$router.push('/agency')
    },
    toNavs(index){
      if(index === 0){
        this.$router.push("mInvite?type=2")
      }else{
        this.$router.push("mInvite?type=1")
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/mymsg.scss";
</style>