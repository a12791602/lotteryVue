<template lang="jade">
.verifySafePwd
  .verifySafePwd-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 验证安全密码
  .verifySafePwd-input
    p 原安全密码
    input(type='password',maxlength='6', placeholder='请输入当前所使用的密码', v-focus='')
  .verifySafePwd-butverifySafePwd-but
    button(type='primary', @click='verifySafePwd') 确定
  .verifySafePwd-tisi  安全密码用于提现、绑定银行卡等操作，可保障资金安全。 
</template>
<script>
export default {
  data() {
    return {
      popshow: false,
      a: 1,
      b: 2
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/resetpwd')
    },
    verifySafePwd() {
      this.$router.push({
        path: "/setPwd"
      });
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
@import "../../assets/scss/page-five/safety/verifySafePwd.scss";
</style>