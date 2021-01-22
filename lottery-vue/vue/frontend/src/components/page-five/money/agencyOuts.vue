<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='listStyleToFive')
    p 代理提现
    span
  .listStyle-content
    ul.listStyle-I
      li(@click="getWithdrawFlag")
        .mInvite-left
          i.iconfont.icon-creditcard(style='padding-right:10px')
          p 普通提现
        i.iconfont.icon-you
      li(@click="getAgentWithdrawFlag")
        .mInvite-left
          i.iconfont.icon-creditcard(style='padding-right:10px')
          p 返点提现
        i.iconfont.icon-you
</template>
<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    //返回Five页面
    listStyleToFive(){
      this.$router.push("/five");
    },
    //判断是否允许当前用户进行提款
    getWithdrawFlag() {
      this.$axios
        .get(this.$store.state.url + "/api/proxy/getWithdrawFlag")
        .then(res => {
          if (res.data.code === 1) {
            this.$router.push("/agencyOut?id=1");
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    //判断是否允许当前代理用户进行返点提款
    getAgentWithdrawFlag() {
      this.$axios
        .get(this.$store.state.url + "/api/proxy/getAgentWithdrawFlag")
        .then(res => {
          if (res.data.code === 1) {
            this.$router.push("/agencyOut?id=2");
          }else{
            // this.$pop.show({error:res.data.data.message,title:'温馨提示',content:'请选择银行',content1:'',content2:'',number:2});
            this.$message(res.data.data.message)
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    onCancel() {
      this.show1 = !this.show1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
@import "../../../assets/scss/popcorn.scss";
</style>