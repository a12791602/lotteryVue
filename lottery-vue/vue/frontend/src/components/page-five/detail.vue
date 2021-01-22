<template lang="jade">
.detail
  .detail-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 个人资料
    span
  .detail-content
    router-view
</template>
<script>
export default {
  data() {
    return {};
  },
  methods:{
    listStyleToSafety(){
      this.$router.push('/five')
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/detail.scss";
</style>