<template lang="jade">
.registered
  .registered-title
    i.iconfont.icon-left(@click="listStyleToSafety")
    p 用户注册
    router-link(to='', tag='b') 客服
  .registered-content
    ul
      li
        span 邀请码
        input(type='text', onfocus='this.select()', v-model='invitationCode', v-focus='', placeholder='请输入邀请码')
      li
        span 账号
        input(type='text', onfocus='this.select()', v-model='username', placeholder='请输入您要注册的账号')
      li
        span 设置密码
        input(:type="pwd ? 'text' : 'password'", v-model='password1', onfocus='this.select()', placeholder='请输入您的密码')
        i.iconfont(:class="pwd ? 'icon-guanbi' : 'icon-buxianshimima'", @click='pwd = !pwd')
      li
        span 确认密码
        input(type='password', v-model='password2', onfocus='this.select()', placeholder='请再次输入您的密码')
      li
        span 验证码
        input(type='text', onfocus='this.select()', v-model='verification', placeholder='请输入验证码')
        img(:src='captchaCodeImg', @click='getCaptchaCode')
  router-link(to='') 已有账号？立即登录
  .registered-go
    button(@click='registeredGo') 立即注册
  .login-pop(v-show='pop', @click='pop = false')
    div
      i.iconfont.icon-information
      | {{content}}
  .login-pop(v-show='popdone', @click='popdone = false,donetologin()')
    div
      i.iconfont.icon-information
      | {{content}}
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      pop: false,
      popdone: false,
      content: "",
      pwd: false, //是否显示密码
      newDate: null,
      invitationCode: "", //邀请码
      username: "", //用户名
      password1: "", //密码
      password2: "", //确认密码
      verification: "", //验证码
      captchaCodeImg: "", //验证码图
      code: ""
    };
  },
  created() {
    this.getCaptchaCode();
    this.serchCode();
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/login')
    },
    serchCode() {
      if (!this.$route.query.code) {
      } else {
        this.invitationCode = this.$route.query.code;
      }
    },
    getCaptchaCode() {
      this.newDate = new Date().getTime();
      this.captchaCodeImg =
        this.$store.state.url + "code.jpg?_=" + this.newDate;
    },
    registeredGo() {
      const user_yz = /^[A-Za-z][A-Za-z0-9]{5,20}$/;
      const pwd1_yz = /^[A-Za-z0-9]{6,20}$/;
      let yzuser = user_yz.test(this.username);
      let yzpwd1 = pwd1_yz.test(this.password1);
      if (this.invitationCode === "") {
        this.content = "邀请码不能为空";
        this.pop = true;
      } else if (this.username === "") {
        this.content = "用户名不能为空";
        this.pop = true;
      } else if (this.password1 === "") {
        this.content = "密码不能为空";
        this.pop = true;
      } else if (this.password2 === "") {
        this.content = "确认密码不能为空";
        this.pop = true;
      } else if (this.verification === "") {
        this.content = "验证码不能为空";
        this.pop = true;
      } else if (yzuser == false) {
        this.content = "用户名：字母开头，6-20位，包括大小字母、数字";
        this.pop = true;
      } else if (yzpwd1 == false) {
        this.content = "密码：6-20位，包括大小字母、数字";
        this.pop = true;
      } else if (this.password1 !== this.password2) {
        this.content = "两次密码不一致";
        this.pop = true;
      } else {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("inviteCode", this.invitationCode);
        formData.append("account", this.username);
        formData.append("password", this.password1);
        formData.append("code", this.verification);
        this.$axios
          .post(this.$store.state.url + "api/user/register", formData, config)
          .then(res => {
            if (res.data.code === 1) {
              this.content = "注册完成! 请使用新账号密码登录";
              this.popdone = true;
            } else {
              this.getCaptchaCode();
              this.content = res.data.data;
              this.pop = true;
            }
          })
          .catch(error => {
            console.log("No", "post失败");
          });
      }
    },
    donetologin() {
      this.$router.push({ path: "/login" });
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
@import "../../assets/scss/login/registered.scss";
</style>