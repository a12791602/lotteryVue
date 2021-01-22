<template lang="jade">
.resetWay
  .resetWay-top
    i.iconfont.icon-left(@click='resetWay')
    p 找回安全密码
    span
  .resetWay-input
    router-link(to='', tag='div')
      p 通过密保问题
      i.iconfont.icon-you
    router-link(to='', tag='div')
      p 通过密保邮箱
      i.iconfont.icon-you
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    resetWay() {
      this.$router.push("/safety");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/safety/resetWay.scss";
</style>