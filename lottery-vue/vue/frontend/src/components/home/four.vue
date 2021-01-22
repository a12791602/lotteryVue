<template lang="jade">
.four
  .one-top
    ul
      router-link(v-for='(navs,index) in nav', :to="'/four/'+navs.pathurl", tag='li', :key='index') {{navs.name}}
  .four-conter
    router-view
</template>
<script>
export default {
  data() {
    return {
      nav: [
        { name: "中奖信息", pathurl: "winning" },
        { name: "昨日盈利榜", pathurl: "profit" }
      ]
    };
  },
  methods: {}
};
</script>
