<template lang="jade">
.reset
  .reset-title
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 忘记密码
    span
  .reset-content
    ul
      li
        span 账号
        input(type='text', onfocus='this.select()', v-focus='', placeholder='请输入账号')
      li
        span 验证码
        input(type='text', onfocus='this.select()', placeholder='请输入验证码')
        img(:src='captchaCodeImg', @click='getCaptchaCode')
  .reset-go
    button(@click='resetGo') 确定
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getCaptchaCode();
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/login')
    },
    getCaptchaCode() {
      this.newDate = new Date().getTime();
      this.captchaCodeImg =
        this.$store.state.url + "code.jpg?_=" + this.newDate;
    },
    resetGo() {
      this.$router.push("resetway");
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/login/reset.scss";
</style>