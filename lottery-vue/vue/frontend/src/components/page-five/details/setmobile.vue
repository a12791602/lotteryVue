<template lang="jade">
.setmobile
  .setmobile-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 绑定密保手机
    span
  .setmobile-content
    ul
      li
        p 手机号：
        input(type='number', v-model='mobile', placeholder='请输入您要绑定的手机号码')
      li
        p 验证码：
        input(v-model='validCode', type='text', placeholder='请输入验证码')
        span.primary(@click='sendMobilCode',v-show='!iss') 发送验证码
        span.primarys(@click='sendMobilCode',v-show='iss') {{s}} 秒后重新获取
      li
        p 安全密码：
        input(type='password', v-model='securityCode',maxlength='6', placeholder='请输入您的安全码')
    .setmobile-but
      button(type='primary', @click='saveBindPhone') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      iss:false,
      s:59,
      content: "提示内容!", //弹窗内容
      mobile: null, //手机号
      validCode: "", //验证码
      securityCode: "" //安全码
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/safety')
    },
    //取验证码
    sendMobilCode() {
      const mobile_yz = /^[1][3,4,5,7,8][0-9]{9}$/;
      let yzmobile = mobile_yz.test(this.mobile);
      if (!this.mobile) {
        this.$pop.show({error:'',title:'温馨提示',content:'手机号码不能为空！',content1:'',content2:'',number:2});
      } else if(this.mobile){
        clearInterval(this.setInt);
        if (yzmobile) {
          let config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true
          };
          let formData = new FormData();
          formData.append("mobil", Number(this.mobile));
          this.$axios
            .post(
              this.$store.state.url + "api/userCenter/sendMobilCode",
              formData,
              config
            )
            .then(res => {})
            .catch(error => {
              console.log("取验证码No");
            });
        };
        this.setInt = setInterval(() =>{
          this.iss = true;
          this.s --;
          if(this.s === 0){
            this.iss = false;
            clearInterval(this.setInt)
            this.s = 59;
          }
        },1000);
      }
    },
    //绑定手机号码
    saveBindPhone() {
      let securityCode = md5(this.securityCode);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("mobil", Number(this.mobile));
      formData.append("validCode", this.validCode);
      formData.append("securityCode", securityCode);
      this.$axios
        .post(
          this.$store.state.url + "api/userCenter/saveBindPhone",
          formData,
          config
        )
        .then(res => {
          this.content = res.data.data.message;
          this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
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
@import "../../../assets/scss/page-five/details/setmobile.scss";
</style>
