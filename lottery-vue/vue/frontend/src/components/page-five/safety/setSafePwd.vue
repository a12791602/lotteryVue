<template lang="jade">
.setSafePwd
  .setSafePwd-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 设置安全密码
    span
  .setSafePwd-input
    div
      p 安全密码
      input(type='password', v-model='newPassword',maxlength="6" placeholder='请输入6位数密码', v-focus='')
    div
      p 确认密码
      input(type='password', v-model='newPassword2',maxlength="6" placeholder='请输入6位数密码')
  .setSafePwd-but
    button(@click='setSafePwd') 确定
  .setSafePwd-tisi
    | 安全密码用于提现、绑定银行卡等操作，可保障资金安全。
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      newPassword: null, //安全码
      newPassword2: null, //确认安全码
      content: "",
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/safety')
    },
    setSafePwd() {
      const newPassword_yz = /^[0-9]{6,6}$/;
      let yzPassword = newPassword_yz.test(this.newPassword);
      if (this.newPassword === "") {
        this.$pop.show({error:'',title:'温馨提示',content:'密码不能为空',content1:'',content2:'',number:2});
      } else if (yzPassword == false) {
        this.$pop.show({error:'',title:'温馨提示',content:'安全密码：6位数字',content1:'',content2:'',number:2});
      } else if (this.newPassword !== this.newPassword2) {
        this.$pop.show({error:'',title:'温馨提示',content:'两次密码输入不一致',content1:'',content2:'',number:2});
      } else {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let pwd1 = md5(this.newPassword);
        let pwd2 = md5(this.newPassword2);
        let formData = new FormData();
        formData.append("newPassword", pwd1);
        formData.append("newPassword2", pwd2);
        if (pwd1 === pwd2) {
          this.$axios
            .post(
              this.$store.state.url + "api/userCenter/setSecurityCode",
              formData,
              config
            )
            .then(res => {
              this.content = res.data.data.message;
              this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
              setTimeout(() => {
                if (this.content === "修改成功！") {
                  this.$router.push({ path: "/safety" });
                }
              }, 800);
            })
            .catch(error => {
              console.log("setSecurityCodeNo");
            });
        }
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
@import "../../../assets/scss/page-five/safety/setSafePwd.scss";
@import "../../../assets/scss/popcorn.scss";
</style>