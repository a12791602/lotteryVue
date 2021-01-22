<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      os: ""
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
        // this.os = "/app/hongfayule.apk";
        window.location.href = "/app/hongfayule.apk";
      } else if (/iPhone|iPad/i.test(userAgent)) {
        //是否為iPhone或iPad
        // this.os = "https://www.pgyer.com/GndQ";
        window.location.href = "http://xmvip.vip/uyH3U4";
      } else if (/Windows/i.test(userAgent)) {
        //使否是用電腦觀看
        // this.os = "/app/hongfayule.apk";
        window.location.href = "/app/hongfayule.apk";
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

