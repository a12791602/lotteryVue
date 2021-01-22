<template lang="jade">
.login(v-show='loginStatus === false')
  .login-title
    i.iconfont.icon-left(@click="loginS")
    p 用户登录
    span
  .login-conter
    .login-center-img
      div
    .login-form
      .login-user
        i.iconfont.icon-user
        input(type='text', v-model.trim='newUserInfo.user', placeholder='请输入用户名', onfocus='this.select()',v-focus='')
      .login-pwd
        i.iconfont.icon-lock
        input(:type="pwd ? 'text' : 'password'", v-model='newUserInfo.pwd', placeholder='请输入密码', onfocus='this.select()', @keyup.enter='login')
        i.iconfont(:class="pwd ? 'icon-guanbi' : 'icon-buxianshimima'", @click='pwd = !pwd')
      .login-captchaCodeImg(v-show='errorcode')
        i.iconfont.icon-lock
        input(type='text', onfocus='this.select()', v-model='newUserInfo.verification', placeholder='请输入验证码')
        img(:src='captchaCodeImg', @click='getCaptchaCode')
      .login-rememb
        input(style='border-color:#FFF;color:#FFF;',type='checkbox',v-model='checked', @click='checkeds')
        span 记住密码
      .login-go
        button(@click='login', v-show='loginReq') 立即登陆
      .login-live
        router-link(to='registered') 立即注册
        //router-link(to='reset') 忘记密码
        router-link(to='service') 忘记密码
  .login-pop(v-show='pop', @click='pop = false')
    div
      i.iconfont.icon-information
      | {{content}}
</template>
<script>
import md5 from "js-md5";
import headers from "../public/header";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      pop: false,
      pwd: false,
      loginReq: true,
      checked: false, //记住密码否?
      content: "", //弹窗内容
      newDate: null, //时间戳
      errorcode: false, //判断账号密码错误次数
      loginStatus: false, //当前登陆状态
      captchaCodeImg: "",
      newUserInfo: {
        user: "",
        pwd: "",
        verification: "",
        rempwd: ""
      },
    };
  },
  created() {
    this.checkeds();
  },
  methods: {
    //登陆成功
    loginS(){
      this.$router.push("/one")
    },
    getCaptchaCode() {
      this.newDate = new Date().getTime();
      this.captchaCodeImg =
        this.$store.state.url + "code.jpg?_=" + this.newDate;
    },
    login() {
      this.loginReq = false;
      setTimeout(() => {
        this.loginReq = true;
      }, 1200);
      const user_yz = /^[A-Za-z][A-Za-z0-9]{5,20}$/;
      const pwd_yz = /^[A-Za-z0-9]{6,120}$/;
      let yzuser = user_yz.test(this.newUserInfo.user);
      let yzpwd = pwd_yz.test(this.newUserInfo.pwd);
      if (this.newUserInfo.user === "") {
        this.content = "用户名不能为空";
        this.pop = true;
      } else if (this.newUserInfo.pwd === "") {
        this.content = "密码不能为空";
        this.pop = true;
      } else if (yzuser == false) {
        this.content = "用户名：字母开头，6-20位，包括大小字母、数字";
        this.pop = true;
      } else if (yzpwd == false) {
        this.content = "密码：6-20位，包括大小字母、数字";
        this.pop = true;
      } else if (yzuser == true && yzpwd == true) {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let pwd = this.newUserInfo.pwd;
        if (localStorage.getItem("password") && pwd === "PASSWORD") {
          pwd = localStorage.getItem("password");
        } else {
          pwd = md5(this.newUserInfo.pwd);
        }
        let formData = new FormData();
        formData.append("account", this.newUserInfo.user);
        formData.append("password", pwd);
        formData.append("code", this.newUserInfo.verification);
        this.$axios
          .post(this.$store.state.url + "api/user/login", formData, config)
          .then(res => {
            this.$store.state.JSESSIONICookie = res.data.data.sessionId;
            this.$store.state.userType = res.data.data.userType;
            this.loginSta = true;
            this.$store.state.loginStatus = this.loginSta;
            localStorage.setItem("JSESSIONICookie", this.$store.state.JSESSIONICookie);
            localStorage.setItem("userType", this.$store.state.userType);
            localStorage.setItem("loginSta", this.loginSta);
            if (res.data.code === 1) {
              this.$store.state.Globalname = res.data.data.account;
              this.$store.state.Globalword = this.newUserInfo.pwd;
              localStorage.setItem("Globalname", this.$store.state.Globalname);
              localStorage.setItem("Globalword", pwd);
              if (this.checked === true) {
                localStorage.setItem("username", res.data.data.account);
                localStorage.setItem("password", pwd);
              } else {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
              }
              this.$router.push({ path: "/one" });
            } else {
              if (res.data.code === 0) {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
              }
              if (res.data.data.errCount >= 3) {
                this.getCaptchaCode();
                setTimeout(() => {
                  this.errorcode = true;
                }, 0);
              } else {
                this.errorcode = false;
              }
              this.newUserInfo.pwd = "";
              this.checked = false;
              localStorage.removeItem("password");
            }
          })
          .catch(error => {
            console.log(error);
            // if(this.$store.state.loginStatus === false){
            //   this.$pop.show({error: "",title: "温馨提示",content: "获取不成功,请检查您的网络！",content1: "",content2: "",number: 1});
            // }
            // this.$pop.show({error: "",title: "温馨提示",content: "获取不成功,请检查您的网络！",content1: "",content2: "",number: 1});
          });
      }
    },
    checkeds() {
      if (localStorage.getItem("password")) {
        this.checked = true;
        this.newUserInfo.user = localStorage.getItem("username");
        this.newUserInfo.pwd = "PASSWORD";
        this.newUserInfo.rempwd = localStorage.getItem("password");
      }
    }
  },
  components: {
    headers
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
<style lang="scss" scopde>
@import "../../assets/scss/login/login.scss";
</style>
