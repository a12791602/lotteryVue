<template lang="jade">
.second
  headers
  .second-conter
    p(v-show='false') {{h}}
    ul.secondBox
      li(v-for='(all,index) in getPastOpens', :key='index')
        .title
          h2 {{all.name}}
          p
            span
              | 第
              i {{all.seasonId}}
              | 期
            span
              i(v-for='(cd,indexa) in times', :key='indexa', v-if='indexa === index') {{cd | setTime}}
        .conter(:class='all.groupName', v-if="all.groupName === 'k3'")
          span.Dice(:class="'Dice'+all.n1")
          span.Dice(:class="'Dice'+all.n2")
          span.Dice(:class="'Dice'+all.n3")
        .conter(:class='all.groupName', v-if="all.groupName === 'ssc'")
          span {{all.n1}}
          span {{all.n2}}
          span {{all.n3}}
          span {{all.n4}}
          span {{all.n5}}
        .conter(:class='all.groupName', v-if="all.groupName === 'pk10'")
          span {{all.n1}}
          span {{all.n2}}
          span {{all.n3}}
          span {{all.n4}}
          span {{all.n5}}
          span {{all.n6}}
          span {{all.n7}}
          span {{all.n8}}
          span {{all.n9}}
          span {{all.n10}}
        .btn
          router-link(:to="{path:'/second/past',query:{id:all.lotteryId,name:all.name,group:all.groupName}}", tag='button') 往期开奖
          button(@click='looksucc($event,all)') 立即投注
</template>
<script>
import headers from "../public/header";
export default {
  data() {
    return {
      loading:true,
      getPastOpens: "",
      getPastOpens2: "",
      today: "",
      times: [],
      h:'',
      h2:'',
      timer: "",
      lotteryId: -1,
      count: ""
    };
  },
  mounted() {
    this.getPastOp();
    this.initSetTimeout();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    //监听路由变化后
    $route(to, from, next) {
      // console.log(to.fullPath,"-----------");
      // console.log("to:",to);
    }
  },
  methods: {
    //立即投注
    looksucc(e, all) {
      this.$router.push({
        path: all.groupName,
        query: { id: all.lotteryId, name: all.name, group: all.groupName }
      });
      this.betsuccess = !this.betsuccess;
    },
    //获取全部彩种
    getPastOp() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.lotteryId, count: this.count }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          for (let i = 0; i < this.getPastOpens.length; i++) {
            this.times[i] = this.getPastOpens[i].restSeconds;
          }
        })
        .catch(error => {
          console.log("获取全部彩种No");
        });
    },
    getPastOps() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.lotteryId, count: 1 }
        })
        .then(res => {
          this.times[this.h2] = res.data.data[0].restSeconds;
          this.getPastOpens[this.h2].seasonId = res.data.data[0].seasonId;
          this.getPastOpens[this.h2].n1 = res.data.data[0].n1;
          this.getPastOpens[this.h2].n2 = res.data.data[0].n2;
          this.getPastOpens[this.h2].n3 = res.data.data[0].n3;
          this.getPastOpens[this.h2].n4 = res.data.data[0].n4;
          this.getPastOpens[this.h2].n5 = res.data.data[0].n5;
          this.getPastOpens[this.h2].n6 = res.data.data[0].n6;
          this.getPastOpens[this.h2].n7 = res.data.data[0].n7;
          this.getPastOpens[this.h2].n8 = res.data.data[0].n8;
          this.getPastOpens[this.h2].n9 = res.data.data[0].n9;
          this.getPastOpens[this.h2].n10 = res.data.data[0].n10;
        })
        .catch(error => {
          console.log("获取全部彩种No");
        });
    },
    reset() {
      this.getPastOps();
      this.initSetTimeout();
    },
    //倒计时
    initSetTimeout() {
      this.timer = setInterval(() => {
        for (let k = 0; k < this.times.length; k++) {
          this.times[k] = this.times[k] - 1;
          this.h = this.times[0];
          if (this.times[k] < 0) {
            this.lotteryId = this.getPastOpens[k].lotteryId;
            this.h2 = k;
            clearInterval(this.timer);
            this.reset();
          }
        }
      }, 1000);
    }
  },
  components: {
    headers
  },
  filters: {
    setTime(value) {
      var hours = Math.floor((value % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
      var minutes = Math.floor((value % (1 * 60 * 60)) / (1 * 60));
      var seconds = Math.floor((value % (1 * 60)) / 1);
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      value = hours + ":" + minutes + ":" + seconds;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/second.scss";
</style>

