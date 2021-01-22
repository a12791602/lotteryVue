<template lang="jade">
.past
  header
    i.iconfont.icon-left(@click='past')
    p.pastTitle
      span {{this.$route.query.name}}
      | 开奖记录
    span(@click='checkListBtn') 彩种
  .pastBox
    ul
      li(:class="{'active': index === nums}", v-for='(num,index) in datas', :key='index', @click='pastBox($event,index)') {{num}}
  .pastList
    ul
      li(v-for='(getopen,index) in getPastOpens', :key='index')
        .pastListTitle
          p
            i {{getopen.seasonId}}
            | 期
          p(v-if="$route.query.group === 'k3'")
            span 和值
            span 大/小
            span 单/双
          p(:class="'pastListTitle'+$route.query.group", v-if="$route.query.group === 'ssc'")
            span
            span
            span
          p(v-if="$route.query.group === 'pk10'")
            span 冠亚和值
            span 大/小
            span 单/双
        .pastListCenter(:class='$route.query.group')
          div(:class='$route.query.group', v-if="$route.query.group === 'k3'")
            span {{getopen.n1}}
            span {{getopen.n2}}
            span {{getopen.n3}}
          div(:class='$route.query.group', v-if="$route.query.group === 'ssc'")
            span {{getopen.n1}}
            span {{getopen.n2}}
            span {{getopen.n3}}
            span {{getopen.n4}}
            span {{getopen.n5}}
          div(:class='$route.query.group', v-if="$route.query.group === 'pk10'")
            span {{getopen.n1}}
            span {{getopen.n2}}
            span {{getopen.n3}}
            span {{getopen.n4}}
            span {{getopen.n5}}
            span {{getopen.n6}}
            span {{getopen.n7}}
            span {{getopen.n8}}
            span {{getopen.n9}}
            span {{getopen.n10}}
          div(v-if="$route.query.group === 'k3'")
            span {{getopen.n1+getopen.n2+getopen.n3}}
            span
              i(:class="(getopen.n1+getopen.n2+getopen.n3) < 11 ? 'goodidea' : 'goodluck'")
                | {{(getopen.n1+getopen.n2+getopen.n3)
                | < 11 ? '小' : '大'}}
            span
              i(:class="(getopen.n1+getopen.n2+getopen.n3) % 2 === 0 ? 'goodidea' : 'goodluck'") {{(getopen.n1+getopen.n2+getopen.n3) %2 === 0 ? '双' : '单'}}
          div(v-if="$route.query.group === 'ssc'", v-show='false')
            span {{getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5}}
            span
              i(:class="(getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5) < 11 ? 'goodidea' : 'goodluck'")
                | {{(getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5)
                | < 11 ? '小' : '大'}}
            span
              i(:class="(getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5) % 2 === 0 ? 'goodidea' : 'goodluck'")
                | {{(getopen.n1+getopen.n2+getopen.n3+getopen.n4+getopen.n5) %2 === 0 ? '双' : '单'}}
          div(v-if="$route.query.group === 'pk10'")
            span {{getopen.n1+getopen.n2}}
            span
              i(:class="(getopen.n1+getopen.n2) < 12 ? 'goodidea' : 'goodluck'")
                | {{(getopen.n1+getopen.n2)
                | < 12 ? '小' : '大'}}
            span
              i(:class="(getopen.n1+getopen.n2) % 2 === 0 ? 'goodidea' : 'goodluck'") {{(getopen.n1+getopen.n2) %2 === 0 ? '双' : '单'}}
  .checkList(v-show='isCheckList')
    p.checkLisTitle 游戏筛选
    ul
      li(:class="{'active': indexx === allName}", v-for='(all,indexx) in lotteryAll', :key='indexx', @click='checkList($event,indexx,all)') {{all.name}}
</template>
<script>
export default {
  data() {
    return {
      nums: 0,
      allName: 0,
      count: 30,
      getPastOpens: 0,
      max: 14,
      datas: ["近30期", "近50期", "今日数据"],
      lotteryAll: null,
      isCheckList: false,
      checkListId: null,
      arrAll:[],
    };
  },
  watch: {
    //监听路由变化后
    $route(to, from, next) {
      // console.log(to.fullPath,"-----------");
      // console.log("to:",to);
      // console.log("from:",from);
      // console.log("2222222222222",this.$route.name)
    }
  },
  mounted() {
    this.getLotteryList();
    this.getPastOp();
  },
  methods: {
    past() {
      this.$router.go(-1);
    },
    //期数选择
    pastBox(e, index) {
      this.nums = index;
      if (index === 0) {
        this.count = 30;
      } else if (index === 1) {
        this.count = 50;
      } else if (index === 2) {
        this.count = -1;
      }
      this.getPastOp();
    },
    //点击筛选按钮时
    checkListBtn() {
      this.isCheckList = !this.isCheckList;
    },
    //游戏筛选
    checkList($event, index, all) {
      this.allName = index;
      this.checkListId = all.id;
      this.$router.push({
        query: { id: all.id, name: all.name, group: all.groupId }
      });
      this.getPastOp();
      this.isCheckList = !this.isCheckList;
      if (this.$route.query.id === all.id) {
        // console.log(index);
      }
    },
    checkOk() {},
    // 获取全部彩种
    getLotteryList() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getLotteryList")
        .then(res => {
          this.lotteryAll = res.data.data.all;
        })
        .catch(error => {
          console.log("获取所有彩种No");
        });
    },
    getPastOp() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.query.id, count: this.count }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/second.scss";
</style>
