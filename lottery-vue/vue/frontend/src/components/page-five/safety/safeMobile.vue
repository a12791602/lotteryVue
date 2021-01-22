<template lang="jade">
.safeMobile
  .safeMobile-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 验证密保手机
    span
  .safeMobile-content
    ul
      li
        p 手机号：
        span {{mobile}}
      li
        p 安全密码：
        input(type='password', v-model='oldPassword',maxlength='6', placeholder='请输入您的安全码')
    .safeMobile-but
      button(type='primary', @click='validSecurityCode') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      content: "提示内容!", //弹窗内容
      start1: false,
      mobile: null, //手机号
      oldPassword: "" //验证码
    };
  },
  mounted() {
    this.getBindPhone();
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/')
    },
    //验证安全码
    validSecurityCode() {
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
              this.$router.push({ path: "/detail/setmobile" });
            }
          }, 800);
        })
        .catch(error => {
          console.log("验证安全码No");
        });
    },
    //取验证码
    sendMobilCode() {
      this.start1 = true;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("mobil", this.mobile);
      this.$axios
        .post(
          this.$store.state.url + "api/userCenter/sendMobilCode",
          formData,
          config
        )
        .then(res => {
          this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
        })
        .catch(error => {
          console.log("取验证码No");
        });
    },
    //验证成功后
    safeMobile() {
      this.content = res.data.data.message;
      this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
      if (this.content === "绑定成功！") {
        setTimeout(() =>{
          this.$router.push({ path: "/safety" });
        },800)
      }
    },
    //获取已经绑定的手机号码
    getBindPhone() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getBindPhone")
        .then(res => {
          this.mobile = res.data.data.mobile;
        })
        .catch(error => {
          console.log("获取已经绑定的手机号码No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/safety/safeMobile.scss";
</style>
