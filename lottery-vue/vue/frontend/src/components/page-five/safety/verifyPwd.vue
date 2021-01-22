<template lang="jade">
.verifyPwd
  .verifyPwd-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 验证原密码
    span
  .verifyPwd-input
    p 原密码
    input(type='password', v-model='oldPassword', placeholder='请输入当前所使用的密码', v-focus='')
  .verifyPwd-but
    button(@click='validOldLoginPassword') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      content: "提示内容!", //弹窗内容
      oldPassword: "" //原密码
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/safety')
    },
    validOldLoginPassword() {
      if(!this.oldPassword){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入当前所使用的密码！',content1:'',content2:'',number:2});
      }else{
        let oldPassword = md5(this.oldPassword);
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("oldPassword", oldPassword);
        this.$axios
          .post(
            this.$store.state.url + "api/userCenter/validOldLoginPassword",
            formData,
            config
          )
          .then(res => {
            this.content = res.data.data.message;
            this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
            setTimeout(() => {
              if (this.content === "验证成功！") {
                this.$router.push({ path: "/setPwd" });
              }
            }, 800);
          })
          .catch(error => {
            console.log("绑定邮箱No");
          });
      }
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
@import "../../../assets/scss/page-five/safety/verifyPwd.scss";
</style>