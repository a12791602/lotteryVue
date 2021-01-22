<template lang="jade">
.home
  .home-cneter
    router-view
  .home-footer
    ul(@click='historyNum')
      router-link(v-for='(navs,index) in navbat', :to="'/'+navs.pathbat", tag='li', :key='index')
        i.iconfont(:class='navs.icon')
        span {{navs.name}}
        b.isNotice(:class='$store.state.isNotice ? "active" : ""' v-if='index === 4')
</template>
<script>
export default {
  data() {
    return {
      isNotice:false,
      noticeCount:0,
      five: 2,
      list: 0,
      navbat: [
        { icon: "icon-home", name: "首页", pathbat: "one" },
        { icon: "icon-date", name: "往期开奖", pathbat: this.$store.state.loginStatus ? "second" : "login" },
        { icon: "icon-campaign", name: "活动", pathbat: this.$store.state.loginStatus ? "three" : "login" },
        { icon: "icon-trophy", name: "发现", pathbat: this.$store.state.loginStatus ? "four" : "login" },
        { icon: "icon-vcard", name: "我的", pathbat: this.$store.state.loginStatus ? "five" : "login" }
      ]
    };
  },
  mounted(){
    if(this.$store.state.loginStatus === true){
      this.getUserNoticeList();
    }
  },
  methods: {
    historyNum() {
      this.$store.commit("historyNum", this.$route.path);
    },
    //判断是否有未读消息
    getUserNoticeList() {
      this.$axios.get(this.$store.state.url + "api/proxy/getNoReadNoticeStatus").then(res => {
          this.isNotice = res.data.data.flag;
          this.noticeCount = res.data.data.count;
          this.$store.state.isNotice = this.isNotice;
          this.$store.state.noticeCount = this.noticeCount;
        })
        .catch(error => {
          console.log("获取彩種ratio ERROR");
        });
    },
  }
};
</script>
<style lang='scss'>
@import "../../assets/scss/home.scss";
@import "../../assets/scss/three.scss";
@import "../../assets/scss/four.scss";
</style>
