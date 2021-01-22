<template lang="jade">
.safeEmail
  .safeEmail-top
    i.iconfont.icon-left(@click='safeEmailToSafety')
    p 验证密保邮箱
    span
  .safeEmail-content
    ul
      li
        p 密保邮箱：
        span {{email}}
      li
        p 安全密码：
        input(type='password', v-model='oldPassword',maxlength='6', placeholder='请输入您的安全码')
    .safeEmail-but
      button(type='primary', @click='validSecurityCode') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      content: "提示内容!", //弹窗内容
      start1: false,
      email: null, //手机号
      oldPassword: "" //验证码
    };
  },
  mounted() {
    this.getBindEmail();
  },
  methods: {
    //返回safety页面
    safeEmailToSafety(){
      this.$router.push("/safety")
    },
    //验证密保邮箱
    validSecurityCode() {
      if(!this.oldPassword){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入您的安全码！',content1:'',content2:'',number:2});
      }else{
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let oldPassword = md5(this.oldPassword);
        let formData = new FormData();
        formData.append("oldPassword", oldPassword);
        this.$axios
          .post(
            this.$store.state.url + "api/userCenter/validSecurityCode",
            formData,
            config
          )
          .then(res => {
            this.content = res.data.data.message;
            this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
            setTimeout(() => {
              if (this.content === "验证成功！") {
                this.$router.push({ path: "/detail/setemail" });
              }
            }, 800);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //获取已经绑定的密保邮箱
    getBindEmail() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getBindEmail")
        .then(res => {
          this.email = res.data.data.email;
        })
        .catch(error => {
          console.log("获取已经绑定的手机号码No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/safety/safeEmail.scss";
</style>
