<template lang="jade">
.head-top
  .pop-head
  .pop-top
    .pop-top-left
    .pop-top-middle
      p(v-for='(contents,index) in content', :key='index') {{contents.show === routerUrl ? contents.title : ''}} 
      img(v-show="routerUrl === 'one'", src='@/assets/img/one/logo.png')
    .pop-top-right
      router-link.dim(v-show="routerUrl === 'five'", to='service', tag='span') 客服
      a(:href='os', v-show="routerUrl === 'one'", target='_top')
        b APP
        b.iconfont.icon-xiazai
</template>
<script>
export default {
  data() {
    return {
      isAndroidHeard:false,
      os: "",
      content: [
        {
          show: "one",
          check: false
        },
        {
          title: "往期开奖",
          show: "second",
          check: false
        },
        {
          title: "活动中心",
          show: "three",
          check: false
        },
        {
          title: "我的",
          show: "five",
          check: true
        }
      ],
      routerUrl: this.$route.name
    };
  },
  created() {
    this.checkOs();
  },
  methods: {
    checkOs() {
      var userAgent = navigator.userAgent;
      if (/Android/i.test(userAgent)) {
        //是否為Android
        this.os = "/app/hongfayule.apk";
      } else if (/iPhone|iPad/i.test(userAgent)) {
        //是否為iPhone或iPad
        this.os = "http://xmvip.vip/uyH3U4";
      } else if (/Windows/i.test(userAgent)) {
        //使否是用電腦觀看
        this.os = "/app/hongfayule.apk";
      }
      //判斷瀏覽器
      if (/Chrome/i.test(userAgent)) {
        //是否為Chrome
      } else if (/Firefox/i.test(userAgent)) {
        //是否為Chrome
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.head-top {
  height: 50px;
  width: 100%;
  background: rgb(175, 58, 49);
  position: fixed;
  top: 0px;
  z-index: 11;
  & .pop-head{
    // height: 46px;
  }
  & .pop-top {
    height: 50px;
    width: 100%;
    @extend %flex;
    @extend %aitems;
    @extend %sbetween;
    & .pop-top-left {
      @extend %faj;
      width: 20%;
      color: #fff;
      font-size: 16px;
    }
    & .pop-top-middle {
      @extend %faj;
      width: 60%;
      color: #fff;
      font-size: 20px;
      & img{
        height: 46px;
      }
    }
    & .pop-top-right {
      @extend %faj;
      width: 20%;
      color: #fff;
      font-size: 20px;
      & a {
        @extend %faj;
        color: #fff;
        font-size: 20px;
        & b{
          margin-right: 4px;
        }
        & b.iconfont{
          font-size: 22px;
        }
      }
      & .dim {
        border: solid 1px #fff;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        padding: 4px 8px;
      }
    }
  }
}
</style>
