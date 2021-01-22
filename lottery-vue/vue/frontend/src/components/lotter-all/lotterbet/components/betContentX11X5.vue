<template lang='jade'>
.bet-content-foot
  div
    .bet-list-box
      span
        | {{current_player.remark}}
        b
          | 。奖金
          i(v-show='!isNaN(current_player.displayBonus)') {{current_player.displayBonus | keepTwoNum}}
          i(v-show='isNaN(current_player.displayBonus)') {{displayBonus1 | keepTwoNum}}—{{displayBonus2 | keepTwoNum}}
          |  元
        br
      ul.fushi
        li(v-for='(numViews, indexff) in current_player.numView', :key='indexff')
          p
            b {{numViews.title}}
            span
              a(v-for='(num,indexg) in numViews.nums', :key='indexg', :class="num.choose ? 'active' : '' ", @click='curBalls(indexff,indexg,num,numViews,current_player)') {{num.ball}}
</template>
<script>
export default {
  data() {
    return {
      d: [], //选中的号码的下标
      dd: [], //选中的号码的下标
      ka: [], //选中的号码的下标
      kb: [], //选中的号码的下标
      kc: [], //选中的号码的下标
      kd: [], //选中的号码的下标
      ke: [], //选中的号码的下标
      an: "",
      bn: "",
      cn: "",
      dn: "",
      en: ""
    };
  },
  computed: {
    current_player() {
      return this.$store.state.current_player;
    },
    playBonusId() {
      return this.$store.getters.playBonusId;
    },
    displayBonus1() {
      return this.$store.getters.displayBonus1;
    },
    displayBonus2() {
      return this.$store.getters.displayBonus2;
    },
    con() {
      return this.$store.state.con;
    }
  },
  methods: {
    //清空
    iscreat() {
      this.$store.commit("ZHU", "");
      this.$store.commit("CON", "");
      this.$store.state.money = "";
      this.d = [];
      this.dd = [];
      this.ka = [];
      this.kb = [];
      this.kc = [];
      this.kd = [];
      this.ke = [];
      this.an = "";
      this.bn = "";
      this.cn = "";
      this.dn = "";
      this.en = "";
      this.$store.commit("CURRENT_PLAYER", "clear");
    },
    //中间->投注选号
    curBalls(indexff, indexg, num, numViews, player) {
      if (num.noVisible === true) {
        return;
      }
      num.choose = !num.choose;
      if (num.choose === true) {
        this.d[indexg] = num.ball;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.commit("CON", this.dd.join(","));
        this.$store.commit("ZHU", "add");
        this.bet_boxjia(indexff, indexg, num, numViews, player);
      } else if (num.choose === false) {
        this.d.splice(indexg, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.commit("CON", this.dd.join(","));
        this.$store.commit("ZHU", "reduce");
        this.bet_boxjian(indexff, indexg, num, numViews, player);
      }
    },
    //----------公用函数-----------
    //排列组合
    groupSplit(arr, size) {
      let maxSize = arr.length,
        groupArr = [];
      if (size >= 1 && size <= maxSize) {
        getArr(arr, 0, []);
      }
      function each(arr, index, fn) {
        for (let i = index; i < maxSize; i++) {
          fn(arr[i], i, arr);
        }
      }
      function getArr(arr, _size, _arr, index) {
        if (_size === size) {
          return;
        }
        let len = _size + 1;
        each(arr, index || 0, function(val, i, arr) {
          _arr.splice(_size, 1, val);
          if (_size === size - 1) {
            groupArr.push(_arr.slice());
          }
          getArr(arr, len, _arr, i + 1);
        });
      }
      return groupArr;
    },
    //字符串"010203"拆分成数组["01","02","03"]
    strToarr(str) {
      return str.split("").reduce((arr, v, i, self) => {
        return !(i % 2)
          ? arr.concat(self.slice(i, i + 2).join(""))
          : arr.concat();
      }, []);
    },
    //胆拖
    getCountDt(betContent, stars) {
      let count = 0;
      let dmArr = [];
      let tmArr = [];
      for (let i = 0; i < betContent.length; i++) {
        let n = betContent[i];
        n = this.strToarr(n);
        if (i === 0) {
          dmArr = n;
        } else if (i === 1) {
          tmArr = n;
        }
      }
      if (dmArr.length === 0) {
        return 0;
      }
      count = this.groupSplit(tmArr, stars - dmArr.length).length;
      return count;
    },
    //直选排列组合
    getCountFront(betContent, stars) {
      if (betContent.length != stars) {
        return 0;
      }
      let count = 0;
      let tempArr = [];
      for (let i = 0; i < stars; i++) {
        let n = betContent[i];
        n = this.strToarr(n);
        tempArr.push(n);
      }
      if (stars == 2) {
        tempArr[0].forEach((item1, index1) => {
          tempArr[1].forEach((item2, index2) => {
            if (item1 != item2) {
              count++;
            }
          });
        });
      } else if (stars == 3) {
        tempArr[0].forEach((item1, index1) => {
          tempArr[1].forEach((item2, index2) => {
            if (item1 != item2) {
              tempArr[2].forEach((item3, index3) => {
                if (item1 !== item2 && item1 !== item3 && item2 !== item3) {
                  count++;
                }
              });
            }
          });
        });
      }
      return count;
    },
    //复式投注
    fushi() {
      if (
        this.playBonusId === "n11x5_x2" ||
        this.playBonusId === "n11x5_star2_group" ||
        this.playBonusId === "n11x5_x3" ||
        this.playBonusId === "n11x5_star3_group" ||
        this.playBonusId === "n11x5_x4" ||
        this.playBonusId === "n11x5_x5" ||
        this.playBonusId === "n11x5_x6" ||
        this.playBonusId === "n11x5_x7" ||
        this.playBonusId === "n11x5_x8"
      ) {
        let ret = "";
        if (
          this.playBonusId === "n11x5_x2" ||
          this.playBonusId === "n11x5_star2_group"
        ) {
          ret = this.groupSplit(this.dd, 2);
        }
        if (
          this.playBonusId === "n11x5_x3" ||
          this.playBonusId === "n11x5_star3_group"
        ) {
          ret = this.groupSplit(this.dd, 3);
        }
        if (this.playBonusId === "n11x5_x4") {
          ret = this.groupSplit(this.dd, 4);
        }
        if (this.playBonusId === "n11x5_x5") {
          ret = this.groupSplit(this.dd, 5);
        }
        if (this.playBonusId === "n11x5_x6") {
          ret = this.groupSplit(this.dd, 6);
        }
        if (this.playBonusId === "n11x5_x7") {
          ret = this.groupSplit(this.dd, 7);
        }
        if (this.playBonusId === "n11x5_x8") {
          ret = this.groupSplit(this.dd, 8);
        }
        this.$store.commit("ZHU", ret.length);
      }
    },
    //投注 ++++
    bet_boxjia(indexff, indexg, num, numViews, player) {
      //选一定位胆 ++
      if (this.playBonusId === "n11x5_dwd") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.commit(
          "CON",
          this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en
        );
      }
      //复式 ++
      this.fushi();
      //选二直选复式 ++
      if (this.playBonusId === "n11x5_star2_front") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.commit("CON", this.an + "," + this.bn);
        let count = this.getCountFront(this.con.split(","), 2);
        this.$store.commit("CON", this.an + "," + this.bn);
        this.$store.commit("ZHU", count);
      }
      //选三直选复式 ++
      if (this.playBonusId === "n11x5_star3_front") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc;
          this.cn = this.dd.join("");
        }
        this.$store.commit("CON", this.an + "," + this.bn + "," + this.cn);
        let count = this.getCountFront(this.con.split(","), 3);
        this.$store.commit("CON", this.an + "," + this.bn + "," + this.cn);
        this.$store.commit("ZHU", count);
      }
      //任选胆拖 ++
      //组选胆拖 ++
      if (
        this.playBonusId === "n11x5_x2_dt" ||
        this.playBonusId === "n11x5_star2_group_dt" ||
        this.playBonusId === "n11x5_x3_dt" ||
        this.playBonusId === "n11x5_star3_group_dt" ||
        this.playBonusId === "n11x5_x4_dt" ||
        this.playBonusId === "n11x5_x5_dt" ||
        this.playBonusId === "n11x5_x6_dt" ||
        this.playBonusId === "n11x5_x7_dt" ||
        this.playBonusId === "n11x5_x8_dt"
      ) {
        if (
          this.playBonusId === "n11x5_x2_dt" ||
          this.playBonusId === "n11x5_star2_group_dt"
        ) {
          this.$store.commit("DMNUM", 1);
        }
        if (
          this.playBonusId === "n11x5_x3_dt" ||
          this.playBonusId === "n11x5_star3_group_dt"
        ) {
          this.$store.commit("DMNUM", 2);
        }
        if (this.playBonusId === "n11x5_x4_dt") {
          this.$store.commit("DMNUM", 3);
        }
        if (this.playBonusId === "n11x5_x5_dt") {
          this.$store.commit("DMNUM", 4);
        }
        if (this.playBonusId === "n11x5_x6_dt") {
          this.$store.commit("DMNUM", 5);
        }
        if (this.playBonusId === "n11x5_x7_dt") {
          this.$store.commit("DMNUM", 6);
        }
        if (this.playBonusId === "n11x5_x8_dt") {
          this.$store.commit("DMNUM", 7);
        }
        if (indexff === 0) {
          this.$store.commit("DMARR", { flag: "push", value: num.ball });
          this.$store.commit("CURRENT_PLAYER", { target: "fixDm" });
          this.$store.commit("CURRENT_PLAYER", { target: "clearVisiable" });
          this.ka = [...this.$store.state.dmArr];
          //选择了胆码，取消拖码选择
          if (this.current_player.numView[1].nums[indexg].choose === true) {
            this.$store.commit("CURRENT_PLAYER", {
              target: "chooseFalse",
              index: indexg
            });
            this.kb.splice(indexg, 1, "");
            this.dd = this.kb;
            this.bn = this.dd.join("");
          }
          this.$store.commit("CURRENT_PLAYER", {
            target: "noVisiable",
            flag: "noVtrue1",
            index: indexg
          });
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.commit("CON", this.an + "," + this.bn);
        let count = this.getCountDt(
          this.con.split(","),
          this.$store.state.dmNum + 1
        );
        this.$store.commit("ZHU", count);
      }
    },
    //投注 ----
    bet_boxjian(indexff, indexg, num, numViews, player) {
      //选一定位胆 --
      if (this.playBonusId === "n11x5_dwd") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc;
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd;
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke;
          this.en = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.commit(
          "CON",
          this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en
        );
      }
      //复式 --
      this.fushi();
      //选二直选复式 -
      if (this.playBonusId === "n11x5_star2_front") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.commit("CON", this.an + "," + this.bn);
        let count = this.getCountFront(this.con.split(","), 2);
        this.$store.commit("CON", this.an + "," + this.bn);
        this.$store.commit("ZHU", count);
      }
      //选三直选复式 -
      if (this.playBonusId === "n11x5_star3_front") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc;
          this.cn = this.dd.join("");
        }
        this.$store.commit("CON", this.an + "," + this.bn + "," + this.cn);
        let count = this.getCountFront(this.con.split(","), 3);
        this.$store.commit("CON", this.an + "," + this.bn + "," + this.cn);
        this.$store.commit("ZHU", count);
      }
      //任选胆拖 --
      //组选胆拖 --
      if (
        this.playBonusId === "n11x5_x2_dt" ||
        this.playBonusId === "n11x5_star2_group_dt" ||
        this.playBonusId === "n11x5_x3_dt" ||
        this.playBonusId === "n11x5_star3_group_dt" ||
        this.playBonusId === "n11x5_x4_dt" ||
        this.playBonusId === "n11x5_x5_dt" ||
        this.playBonusId === "n11x5_x6_dt" ||
        this.playBonusId === "n11x5_x7_dt" ||
        this.playBonusId === "n11x5_x8_dt"
      ) {
        if (indexff === 0) {
          this.$store.commit("DMARR", { flag: "filter", value: num.ball });
          this.$store.commit("CURRENT_PLAYER", { target: "fixDm" });
          this.$store.commit("CURRENT_PLAYER", { target: "clearVisiable" });
          this.ka = [...this.$store.state.dmArr];
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.commit("CON", this.an + "," + this.bn);
        let count = this.getCountDt(
          this.con.split(","),
          this.$store.state.dmNum + 1
        );
        this.$store.commit("ZHU", count);
      }
    }
  },
  // 保留三个小数,不四舍五入
  filters: {
    keepTwoNum(value) {
      value = parseInt(value * 100) / 100;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betContentFoot.scss";
</style>


