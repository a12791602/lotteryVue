<template lang="jade">
.setemail
  .setemail-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 绑定密保邮箱
    span
  .setemail-content
    ul
      li
        p 邮箱地址：
        input(type='text', v-model='email', placeholder='请输入您要绑定的邮箱地址')
      li
        p 验证码：
        input(type='text', v-model='validCode', placeholder='请输入验证码')
        span.primary(@click='sendEmailCode',v-show='!iss') 发送验证码
        span.primarys(@click='sendEmailCode',v-show='iss') {{s}} 秒后重新获取
      li
        p 安全密码：
        input(type='password', v-model='securityCode',maxlength='6', placeholder='请输入您的安全码')
    .setemail-but
      button(type='primary', @click='saveBindEmail') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      iss:false,
      s:59,
      content: "提示内容!", //弹窗内容
      email: null, //邮箱
      validCode: "", //验证码
      securityCode: "", //安全码
      setInt:null
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/safety')
    },
    //取邮箱验证码
    sendEmailCode() {
      const email_yz = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      let yzemail = email_yz.test(this.email);
      console.log(email_yz.test(this.email))
      if (!this.email) {
        this.$pop.show({title:'温馨提示',content:'邮箱地址不能为空！',content1:'',content2:'',number:2});
      }else if(yzemail === false){
        this.$pop.show({title:'温馨提示',content:'邮箱地址格式不正确！',content1:'',content2:'',number:2});
      }else if (yzemail) {
        clearInterval(this.setInt);
        this.setInt = setInterval(() =>{
          this.iss = true;
          this.s --;
          if(this.s === 0){
            this.iss = false;
            clearInterval(this.setInt)
            this.s = 59;
          }
        },1000);
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("email", this.email);
        this.$axios
          .post(
            this.$store.state.url + "api/userCenter/sendEmailCode",
            formData,
            config
          )
          .then(res => {})
          .catch(error => {
            console.log("取验证码No");
          });
      }
    },
    //绑定邮箱
    saveBindEmail() {
      let securityCode = md5(this.securityCode);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("validCode", this.validCode);
      formData.append("securityCode", securityCode);
      this.$axios
        .post(
          this.$store.state.url + "api/userCenter/saveBindEmail",
          formData,
          config
        )
        .then(res => {
          this.content = res.data.data.message;
          this.$pop.show({title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:1});
          if (this.content === "绑定成功！") {
            this.$router.push({ path: "/five" });
          }
        })
        .catch(error => {
          console.log("取验证码No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/details/setemail.scss";
</style>
