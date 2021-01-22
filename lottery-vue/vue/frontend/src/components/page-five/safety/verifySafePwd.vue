<template lang="jade">
.verifySafePwd
  .verifySafePwd-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 验证安全密码
    span
  .verifySafePwd-input
    p 原安全密码
    input(type='password', v-model='oldPassword',maxlength='6', placeholder='请输入当前所使用的安全密码', v-focus='')
  router-link.zhaohui(to='/service', tag='p') 找回安全密码？
  .verifySafePwd-but
    button(@click='validSecurityCode') 确定
  .verifySafePwd-tisi  安全密码用于提现、绑定银行卡等操作，可保障资金安全。 
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      content: "提示内容!", //弹窗内容
      oldPassword: "" //原安全码
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/safety');
    },
    validSecurityCode() {
      if(!this.oldPassword){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入当前所使用的安全密码',content1:'',content2:'',number:2});
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
                this.$router.push({ path: "/changeSafePwd" });
              }
            }, 800);
          })
          .catch(error => {
            console.log("验证安全密码No");
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
@import "../../../assets/scss/page-five/safety/verifySafePwd.scss";
</style>