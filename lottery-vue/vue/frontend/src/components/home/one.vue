<template>
  <div class="one">
    <headers></headers>
    <div class="one-center">
      <swipe :autoplay="2200" :show-indicators="false">
        <swipeItem v-if="isbanner"><img src="https://hf89.com//res/upload/98488f66967c44a0877728544b620a2f.jpg" /></swipeItem>
        <swipeItem v-else v-for="(item,index) in bannerList" :key="index"><img :src="$store.state.url+item.img" /></swipeItem>
      </swipe>
      <div v-show="!$store.state.loginStatus">
        <div class="notice-bar">
          <span><i class="iconfont icon-laba"></i></span>
          <marquee scrollamount="2" width='80%'>{{title}}</marquee>
          <i class="iconfont icon-you active"></i>
        </div>
      </div>
      <div v-show="$store.state.loginStatus">
        <div class="notice-bar" @click="noticeClick">
          <span><i class="iconfont icon-laba"></i></span>
          <marquee scrollamount="2" width='80%'>{{title}}</marquee>
          <i class="iconfont icon-you active"></i>
        </div>
      </div>
      <ul class="lotteryList" v-show="!$store.state.loginStatus">
        <li v-for="(item,index) in lottery" :key="index" @click="toLogin">
          <span><i class="iconfont" :class="item.icon"></i></span>
          <h5>{{item.name}}</h5>
        </li>
        <router-link to="/lotterList" tag="li" class="lotter-list">
          <i class="iconfont icon-jia"></i>
          <h5>更多彩种</h5>
        </router-link>
      </ul>
      <ul class="lotteryList" v-show="$store.state.loginStatus">
        <router-link v-for="(item,index) in lotteryList" :key="index" tag="li" v-if="item.groupId" :to="{path:'/'+item.groupId,query:{id:item.id,name:item.name,group:item.groupId}}">
          <span><i class="iconfont" :class="'icon-'+item.groupId"></i></span>
          <h5>{{item.name}}</h5>
        </router-link>
        <router-link to="/lotterList" tag="li" class="lotter-list">
          <i class="iconfont icon-jia"></i>
          <h5>更多彩种</h5>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import headers from "../public/header";
import swipe from "../public/swipe";
import swipeItem from "../public/swipe-item";
export default {
  data() {
    return {
      isbanner: false,
      lotteryList: [],
      bannerList: [],
      getimgurl: "",
      titlelist: [],
      indexInfo: "",
      cacheTime: 1800000,
      title: "【欢迎光临】 欢迎来到宏發娛樂，您的支持是我们最大的源动力。",
      lottery: [
        { name: "宏發快3", icon:"icon-k3" },
        { name: "宏發时时彩", icon:"icon-ssc" },
        { name: "北京赛车", icon:"icon-pk10" },
        { name: "上海快3", icon:"icon-k3" },
        { name: "江苏快3", icon:"icon-k3" },
        { name: "广西快3", icon:"icon-k3" },
        { name: "河北快3", icon:"icon-k3" },
        { name: "湖北快3", icon:"icon-k3" },
        { name: "安徽快3", icon:"icon-k3" },
        { name: "甘肃快3", icon:"icon-k3" },
        { name: "北京快3", icon:"icon-k3" },
        { name: "重庆时时彩", icon:"icon-ssc" }
      ]
    };
  },
  mounted() {
    this.getLotterlist();
    this.showBanner();
  },
  methods: {
    showBanner() {
      if (
        location.hostname === "localhost" ||
        location.hostname === "m.edu0370.com"
      ) {
        this.isbanner = true;
      }
    },
    noticeClick() {
      this.$router.push({
        path: "/mymsg/notice"
      });
    },
    toLogin() {
      this.$router.push("/login");
    },
    a() {
      this.isbanner = true;
    },
    getLotterlist() {
      var now = new Date().getTime();
      if (localStorage.getItem("indexInfo") !== null) {
        var setupTime = localStorage.getItem("date_indexInfo");
        if (null == setupTime || now - setupTime > this.cacheTime) {
          localStorage.removeItem("indexInfo");
          localStorage.removeItem("date_indexInfo");
          this.$axios
            .get(this.$store.state.url + "api/index/getIndexInfo")
            .then(res => {
              localStorage.setItem("indexInfo", JSON.stringify(res.data.data));
              localStorage.setItem("date_indexInfo", now);
              this.title = "";
              this.lotteryList = res.data.data.hotLotterys;
              this.bannerList = res.data.data.banners;
              for (let i = 0; i < res.data.data.noticeList.length; i++) {
                this.title =
                  this.title + "       " + res.data.data.noticeList[i].title;
              }
            })
            .catch(error => {
              console.log("获取广告No");
            });
        } else {
          this.indexInfo = JSON.parse(localStorage.getItem("indexInfo"));
          this.title = "";
          this.lotteryList = this.indexInfo.hotLotterys;
          this.bannerList = this.indexInfo.banners;
          for (let i = 0; i < this.indexInfo.noticeList.length; i++) {
            this.title =
              this.title + "   " + this.indexInfo.noticeList[i].title;
          }
        }
      } else {
        this.$axios
          .get(this.$store.state.url + "api/index/getIndexInfo")
          .then(res => {
            localStorage.setItem("indexInfo", JSON.stringify(res.data.data));
            localStorage.setItem("date_indexInfo", now);
            this.title = "";
            this.lotteryList = res.data.data.hotLotterys;
            this.bannerList = res.data.data.banners;
            for (let i = 0; i < res.data.data.noticeList.length; i++) {
              this.title =
                this.title + "   " + res.data.data.noticeList[i].title;
            }
          })
          .catch(error => {
            console.log("获取广告No");
          });
      }
    }
  },
  components: {
    headers,
    swipe,
    swipeItem
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/one.scss";
</style>
