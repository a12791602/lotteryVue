<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='listStyleToFive')
    p 充值方式
    span
  .listStyle-content
    ul.listStyle-I
      router-link(:to="{path:payw.alino+'charge',query:{id:payw.id}}", tag='li', v-for='(payw,index) in paywaylist', :key='index', v-if='payw.opentype === 0')
        .mInvite-left(style='width:76%')
          i.iconfont.icon-creditcard(style='padding-right:10px')
          p
            | {{payw.alias}}
            br
            span(style='font-size:12px;color:#bbb') {{payw.content}}
        i.iconfont.icon-you
</template>
<script>
export default {
  data() {
    return {
      content: "",
      receiveAddress: "",
      paywaylist: ""
    };
  },
  mounted() {
    this.getRechargeWayList();
  },
  methods: {
    //返回Five页面
    listStyleToFive(){
      this.$router.push("/five");
    },
    getRechargeWayList() {
      this.$axios
        .get(this.$store.state.url + "/api/proxy/getRechargeWayList")
        .then(res => {
          this.paywaylist = res.data.data;
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