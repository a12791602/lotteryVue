<template lang="jade">
.profit
  ul(v-show='showFlag')
    li(v-for='(item,index) in getLastDay', :key='index', v-show='index < 10')
      .profit-left
        img(:src='"@/assets/img/one/"+item.img+".jpg"')
        .profit-xq
          p 账号昵称：
            span {{item.account | capitalize}}
          p 昨日盈利：
            span ￥{{item.bonus}}
      .profit-right
        span {{index+1}}
  //- pop(:pop='selectedFood', ref='pop', @sonclick='haashow')
</template>
<script>
import pop from "./pop";
export default {
  data() {
    return {
      selectedFood: {},
      showFlag: true,
      getLastDay: null
    };
  },
  mounted() {
    this.getLastDayWinList();
  },
  methods: {
    //获取昨日盈利数据
    getLastDayWinList() {
      if(localStorage.getItem("getLastDays") !== null){
        this.getLastDay = JSON.parse(localStorage.getItem("getLastDays"));
      }else{
        this.$axios
          .get(this.$store.state.url + "api/lottery/getLastDayWinList")
          .then(res => {
            localStorage.setItem("getLastDays",JSON.stringify(res.data.data));
            this.getLastDay = JSON.parse(localStorage.getItem("getLastDays"));
          })
          .catch(error => {
            console.log("获取昨日盈利数据No");
          });
      }
    },
    haashow(isshow) {
      this.showFlag = !isshow.showPage;
    }
  },
  //  隐藏中间内容,以*代替
  filters: {
    capitalize(value) {
      let start = value.slice(0, 1);
      let end = value.slice(-1);
      return `${start}***${end}`;
    }
  },
  components: {
    pop
  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
@import "../../assets/scss/page-four/profit.scss";
</style>