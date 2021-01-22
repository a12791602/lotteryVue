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
      kf: [], //选中的号码的下标
      kg: [], //选中的号码的下标
      kh: [], //选中的号码的下标
      ki: [], //选中的号码的下标
      kj: [], //选中的号码的下标
      an: "",
      bn: "",
      cn: "",
      dn: "",
      en: "",
      fn: "",
      gn: "",
      hn: "",
      in: "",
      jn: ""
    };
  },
  destroyed() {
    this.iscreat();
  },
  computed: {
    current_player() {
      return this.$store.state.current_player;
    },
    playBonusId(){
      return this.current_player.id;
    },
    displayBonus1() {
      let displayBonus1 = "";
      if (
        this.current_player.displayBonus &&
        this.current_player.displayBonus.indexOf("-") != -1
      ) {
        displayBonus1 = this.current_player.displayBonus.split("-")[0];
        displayBonus1 = Number(displayBonus1);
      }
      return displayBonus1;
    },
    displayBonus2() {
      let displayBonus2 = "";
      if (
        this.current_player.displayBonus &&
        this.current_player.displayBonus.indexOf("-") != -1
      ) {
        displayBonus2 = this.current_player.displayBonus.split("-")[1];
        displayBonus2 = Number(displayBonus2);
      }
      return displayBonus2;
    }
  },
  methods: {
    //清空
    iscreat() {
      this.$store.state.zhu = "";
      this.$store.state.money = "";
      this.$store.state.con = "";
      this.d = [];
      this.dd = [];
      this.ka = [];
      this.kb = [];
      this.kc = [];
      this.kd = [];
      this.ke = [];
      this.kf = [];
      this.kg = [];
      this.kh = [];
      this.ki = [];
      this.kj = [];
      this.an = "";
      this.bn = "";
      this.cn = "";
      this.dn = "";
      this.en = "";
      this.fn = "";
      this.gn = "";
      this.hn = "";
      this.in = "";
      this.jn = "";
      if (this.current_player.numView) {
        this.current_player.numView.forEach((item1, index1) => {
          if (item1.nums) {
            item1.nums.forEach((item2, index2) => {
              if (item2.choose === true) {
                this.$store.state.current_player.numView[index1].nums[
                  index2
                ].choose = false;
              }
            });
          }
        });
      }
    },
    //中间->投注选号
    curBalls(indexff, indexg, num, numViews, player) {
      num.choose = !num.choose;
      if (num.choose === true) {
        this.d[indexg] = num.ball;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.con = this.dd.join(",");
        this.$store.state.zhu++;
        this.bet_boxjia(indexff, indexg, num, numViews, player);
      } else if (num.choose === false) {
        this.d.splice(indexg, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.con = this.dd.join(",");
        this.$store.state.zhu--;
        this.bet_boxjian(indexff, indexg, num, numViews, player);
      }
    },
    //----------公用函数-----------
    //复式 betContent = [0,0,0,0,0] , count = 5
    getCount(betContent, stars) {
      if (betContent.length != stars) {
        return 0;
      }
      let count = 1;
      for (let i = 0; i < stars; i++) {
        let n = betContent[i];
        n = [...new Set(n)];
        count *= n.length;
      }
      return count;
    },
    //组选共用函数
    getCombin(num, len) {
      if (num < len) {
        return 0;
      }
      let nums = 1;
      let lens = 1;
      for (let i = 0; i < len; i++) {
        nums *= num - i;
        lens *= len - i;
      }
      return nums / lens;
    },
    //組選五
    // bets = ["0,1", "1,2,3"]
    getzuCount5(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        count += n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          count--;
        }
      }
      return count;
    },
    // 組選10
    // bets = ["0,1,3", "1,2,3"]
    getzuCount10(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        count += n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          count--;
        }
      }
      return count;
    },
    // 組選20
    // bets = ["0,1,3", "1,2,3"]
    getzuCount20(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        let nowCount = n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          nowCount--;
        }
        count += this.getCombin(nowCount, 2);
      }
      return count;
    },
    //組選30
    // bets = ["0,1,3", "1,2,3"]
    getzuCount30(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n2.length; i++) {
        let nowCount = n1.length;
        if (n1.indexOf(n2[i]) >= 0) {
          nowCount--;
        }
        count += this.getCombin(nowCount, 2);
      }
      return count;
    },
    //組選60
    // bets = ["0,1,3", "1,2,3"]
    getzuCount60(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        let nowCount = n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          nowCount--;
        }
        count += this.getCombin(nowCount, 3);
      }
      return count;
    },
    //組選120
    // bets = ["0", "1","3","7","9"]
    getCount120(bets) {
      return this.getCombin(bets, 5);
    },
    //四星-組選4
    // bets = ["0,1,3", "1,2,3"]
    getzuCount4(bets) {
      if (bets.length != 2 || bets[0] === "" || bets[1] === "") {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        count += n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          count--;
        }
      }
      return count;
    },
    //四星-組選12
    // bets = ["0,1,3", "1,2,3"]
    getzuCount12(bets) {
      if (bets.length != 2 || bets[0] === "" || bets[1] === "") {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      if (n1.length < 1) {
        return 0;
      }
      if (n2.length < 2) {
        return 0;
      }
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        let a = n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          a--;
        }
        count += this.getCombin(a, 2);
      }
      return count;
    },
    //四星-組選24
    //bets = ["0", "1","9"]
    getzuCount24(bets) {
      return this.getCombin(bets, 4);
    },
    //三星-组三
    //bets = ["0", "1","9"]
    getzuCount3(bets) {
      return this.getCombin(bets, 2) * 2;
    },
    //三星-跨度
    sankuadu(bets) {
      let betCount = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[bets[i]];
      }
      return count;
    },
    //三星-直选和值
    sanzhixuanhezhi(bets) {
      let betCount = [
        1,
        3,
        6,
        10,
        15,
        21,
        28,
        36,
        45,
        55,
        63,
        69,
        73,
        75,
        75,
        73,
        69,
        63,
        55,
        45,
        36,
        28,
        21,
        15,
        10,
        6,
        3,
        1
      ];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[Number(bets[i])];
      }
      return count;
    },
    //三星-组选和值
    sanzuxuanhezhi(bets) {
      let betCount = [
        1,
        2,
        2,
        4,
        5,
        6,
        8,
        10,
        11,
        13,
        14,
        14,
        15,
        15,
        14,
        14,
        13,
        11,
        10,
        8,
        6,
        5,
        4,
        2,
        2,
        1
      ];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[Number(bets[i]) - 1];
      }
      return count;
    },
    // 二星-组选複式
    //bets = ["6","7"]
    erzuxuanfushi(bets) {
      let count = 0;
      let size = bets.length;
      count = this.getCombin(size, 2);
      return count;
    },
    //二星-跨度
    erkuadu(bets) {
      let betCount = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[bets[i]];
      }
      return count;
    },
    //二星-直选和值
    erzhixuanhezhi(bets) {
      let betCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[bets[i]];
      }
      return count;
    },
    //二星-组选和值
    erzuxuanhezhi(bets) {
      let betCount = [1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[Number(bets[i]) - 1];
      }
      return count;
    },
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
    //投注 ++++
    bet_boxjia(indexff, indexg, num, numViews, player) {
      //大小单双 +
      if (this.playBonusId === "ssc_dxds") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("+");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("+");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("+");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("+");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("+");
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
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.playBonusId === "ssc_star4_front_group6" ||
        this.playBonusId === "ssc_star5_none2" ||
        this.playBonusId === "ssc_star4_front_none2" ||
        this.playBonusId === "ssc_star3_front_none2" ||
        this.playBonusId === "ssc_star3_mid_none2" ||
        this.playBonusId === "ssc_star3_last_none2"
      ) {
        let ret = this.groupSplit(this.dd, 2);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.state.zhu = arr.length;
      }
      //三码不定位、三星组六 +
      if (
        this.playBonusId === "ssc_star5_none3" ||
        this.playBonusId === "ssc_star3_mid_group6" ||
        this.playBonusId === "ssc_star3_last_group6" ||
        this.playBonusId === "ssc_star3_front_group6"
      ) {
        let ret = this.groupSplit(this.dd, 3);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.state.zhu = arr.length;
      }
      //复式 +
      if (
        this.playBonusId === "ssc_star5" ||
        this.playBonusId === "ssc_star4_front" ||
        this.playBonusId === "ssc_star3_front" ||
        this.playBonusId === "ssc_star3_mid" ||
        this.playBonusId === "ssc_star3_last" ||
        this.playBonusId === "ssc_star2_front" ||
        this.playBonusId === "ssc_star2_last" ||
        this.playBonusId === "ssc_star1_dwd"
      ) {
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
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke;
          this.en = this.dd.join("");
        }
        if (this.playBonusId === "ssc_star4_front") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.con = this.$store.state.con + ",-";
        }
        if (this.playBonusId === "ssc_star3_front") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.con = this.$store.state.con + ",-" + ",-";
        }
        if (this.playBonusId === "ssc_star3_mid") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.con = "-," + this.$store.state.con + ",-";
        }
        if (this.playBonusId === "ssc_star3_last") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.con = "-,-," + this.$store.state.con;
        }
        if (this.playBonusId === "ssc_star2_front") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.con = this.$store.state.con + ",-" + ",-" + ",-";
        }
        if (this.playBonusId === "ssc_star2_last") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.con = "-,-,-," + this.$store.state.con;
        }
        if (this.playBonusId === "ssc_star1_dwd") {
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
          if (indexff === 3) {
            this.kd[indexg] = num.ball;
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join("");
          }
          if (indexff === 4) {
            this.ke[indexg] = num.ball;
            this.dd = this.ke;
            this.en = this.dd.join("");
          }
          if (this.playBonusId === "ssc_star1_dwd") {
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
          }
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
        }
        if (this.playBonusId === "ssc_star5") {
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
        }
      }
      //龙虎和 +
      if (this.playBonusId === "ssc_side_lhh") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = "[万千]" + this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = "[万百]" + this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc;
          this.cn = "[万十]" + this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = "[万个]" + this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke;
          this.en = "[千百]" + this.dd.join("");
        }
        if (indexff === 5) {
          this.kf[indexg] = num.ball;
          this.dd = this.kf.filter(function(n) {
            return n;
          });
          this.fn = "[千十]" + this.dd.join("");
        }
        if (indexff === 6) {
          this.kg[indexg] = num.ball;
          this.dd = this.kg.filter(function(n) {
            return n;
          });
          this.gn = "[千个]" + this.dd.join("");
        }
        if (indexff === 7) {
          this.kh[indexg] = num.ball;
          this.dd = this.kh.filter(function(n) {
            return n;
          });
          this.hn = "[百十]" + this.dd.join("");
        }
        if (indexff === 8) {
          this.ki[indexg] = num.ball;
          this.dd = this.ki.filter(function(n) {
            return n;
          });
          this.in = "[百个]" + this.dd.join("");
        }
        if (indexff === 9) {
          this.kj[indexg] = num.ball;
          this.dd = this.kj.filter(function(n) {
            return n;
          });
          this.jn = "[十个]" + this.dd.join("");
        }
        if (this.playBonusId === "ssc_side_lhh") {
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
          if (this.fn === "") {
            this.fn = "-";
          }
          if (this.gn === "") {
            this.gn = "-";
          }
          if (this.hn === "") {
            this.hn = "-";
          }
          if (this.in === "") {
            this.in = "-";
          }
          if (this.jn === "") {
            this.jn = "-";
          }
        }
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en +
          "," +
          this.fn +
          "," +
          this.gn +
          "," +
          this.hn +
          "," +
          this.in +
          "," +
          this.jn;
      }
      //三星包胆 +
      if (
        this.playBonusId === "ssc_star3_front_group_contains" ||
        this.playBonusId === "ssc_star3_mid_group_contains" ||
        this.playBonusId === "ssc_star3_last_group_contains"
      ) {
        for (let i = 0; i < numViews.nums.length; i++) {
          this.$store.state.zhu = 54;
          this.$store.state.con = num.ball;
          numViews.nums[i].choose = false;
          numViews.nums[indexg].choose = true;
        }
      }
      //二星包胆 +
      if (
        this.playBonusId === "ssc_star2_front_group_contains" ||
        this.playBonusId === "ssc_star2_last_group_contains"
      ) {
        for (let i = 0; i < numViews.nums.length; i++) {
          this.$store.state.zhu = 9;
          this.$store.state.con = num.ball;
          numViews.nums[i].choose = false;
          numViews.nums[indexg].choose = true;
        }
      }
      //五星--组选5 +
      if (this.playBonusId === "ssc_star5_group5") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选10 +
      if (this.playBonusId === "ssc_star5_group10") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount10(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选20 +
      if (this.playBonusId === "ssc_star5_group20") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选30 +
      if (this.playBonusId === "ssc_star5_group30") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount30(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选60 +
      if (this.playBonusId === "ssc_star5_group60") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选120 +
      if (this.playBonusId === "ssc_star5_group120") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
      }
      //前四--组选4 +
      if (this.playBonusId === "ssc_star4_front_group4") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount4(
          this.$store.state.con.split(",")
        );
      }
      //前四--组选12 +
      if (this.playBonusId === "ssc_star4_front_group12") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount12(
          this.$store.state.con.split(",")
        );
      }
      //前四--组选24 +
      if (this.playBonusId === "ssc_star4_front_group24") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
      }
      //前三、中三、后三组选 -
      if (
        this.playBonusId === "ssc_star3_front_group3" ||
        this.playBonusId === "ssc_star3_mid_group3" ||
        this.playBonusId === "ssc_star3_last_group3"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount3(lengths);
      }
      //二星组选 复式 +
      if (
        this.playBonusId === "ssc_star2_front_group" ||
        this.playBonusId === "ssc_star2_last_group"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzuxuanfushi(this.dd);
      }
      //三星直选和值 +
      if (
        this.playBonusId === "ssc_star3_front_and" ||
        this.playBonusId === "ssc_star3_mid_and" ||
        this.playBonusId === "ssc_star3_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sanzhixuanhezhi(this.dd);
      }
      //三星组选和值 +
      if (
        this.playBonusId === "ssc_star3_front_group_and" ||
        this.playBonusId === "ssc_star3_mid_group_and" ||
        this.playBonusId === "ssc_star3_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sanzuxuanhezhi(this.dd);
      }
      //三星跨度 +
      if (
        this.playBonusId === "ssc_star3_front_kd" ||
        this.playBonusId === "ssc_star3_mid_kd" ||
        this.playBonusId === "ssc_star3_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sankuadu(this.dd);
      }
      //二星直选和值 +
      if (
        this.playBonusId === "ssc_star2_front_and" ||
        this.playBonusId === "ssc_star2_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzhixuanhezhi(this.dd);
      }
      //二星组选和值 +
      if (
        this.playBonusId === "ssc_star2_front_group_and" ||
        this.playBonusId === "ssc_star2_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzuxuanhezhi(this.dd);
      }
      //二星跨度 +
      if (
        this.playBonusId === "ssc_star2_front_kd" ||
        this.playBonusId === "ssc_star2_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erkuadu(this.dd);
      }
    },
    //投注 ----
    bet_boxjian(indexff, indexg, num, numViews, player) {
      //大小单双 -
      if (this.playBonusId === "ssc_dxds") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("+");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("+");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc;
          this.cn = this.dd.join("+");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd;
          this.dn = this.dd.join("+");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke;
          this.en = this.dd.join("+");
        }
        if (this.playBonusId === "ssc_dxds") {
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
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6 -
      if (
        this.playBonusId === "ssc_star4_front_group6" ||
        this.playBonusId === "ssc_star5_none2" ||
        this.playBonusId === "ssc_star4_front_none2" ||
        this.playBonusId === "ssc_star3_front_none2" ||
        this.playBonusId === "ssc_star3_mid_none2" ||
        this.playBonusId === "ssc_star3_last_none2"
      ) {
        let ret = this.groupSplit(this.dd, 2);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.state.zhu = arr.length;
      }
      //三码不定位、前三组六、中三组六、后三组六 -
      if (
        this.playBonusId === "ssc_star5_none3" ||
        this.playBonusId === "ssc_star3_mid_group6" ||
        this.playBonusId === "ssc_star3_last_group6" ||
        this.playBonusId === "ssc_star3_front_group6"
      ) {
        let ret = this.groupSplit(this.dd, 3);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.state.zhu = arr.length;
      }
      //复式 -
      if (
        this.playBonusId === "ssc_star5" ||
        this.playBonusId === "ssc_star4_front" ||
        this.playBonusId === "ssc_star3_front" ||
        this.playBonusId === "ssc_star3_mid" ||
        this.playBonusId === "ssc_star3_last" ||
        this.playBonusId === "ssc_star2_front" ||
        this.playBonusId === "ssc_star2_last" ||
        this.playBonusId === "ssc_star1_dwd"
      ) {
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
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke;
          this.en = this.dd.join("");
        }
        if (this.playBonusId === "ssc_star4_front") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
        } else if (this.playBonusId === "ssc_star3_front") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
        } else if (this.playBonusId === "ssc_star3_mid") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
        } else if (this.playBonusId === "ssc_star3_last") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
        } else if (this.playBonusId === "ssc_star2_front") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
        } else if (this.playBonusId === "ssc_star2_last") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
        } else if (this.playBonusId === "ssc_star1_dwd") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn + this.en;
        } else if (this.playBonusId === "ssc_star5") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn + this.en;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
        }
      }
      //龙虎和 -
      if (this.playBonusId === "ssc_side_lhh") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = "[万千]" + this.dd.join("");
          if (this.an == "" || this.an == "-" || this.an == "[万千]") {
            this.an = this.dd.join("");
          }
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = "[万百]" + this.dd.join("");
          if (this.bn == "" || this.bn == "-" || this.bn == "[万百]") {
            this.bn = this.dd.join("");
          }
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc;
          this.cn = "[万十]" + this.dd.join("");
          if (this.cn == "" || this.cn == "-" || this.cn == "[万十]") {
            this.cn = this.dd.join("");
          }
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd;
          this.dn = "[万个]" + this.dd.join("");
          if (this.dn == "" || this.dn == "-" || this.dn == "[万个]") {
            this.dn = this.dd.join("");
          }
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke;
          this.en = "[千百]" + this.dd.join("");
          if (this.en == "" || this.en == "-" || this.en == "[千百]") {
            this.en = this.dd.join("");
          }
        }
        if (indexff === 5) {
          this.kf.splice(indexg, 1, "");
          this.dd = this.kf.filter(function(n) {
            return n;
          });
          this.fn = "[千十]" + this.dd.join("");
          if (this.fn == "" || this.fn == "-" || this.fn == "[千十]") {
            this.fn = this.dd.join("");
          }
        }
        if (indexff === 6) {
          this.kg.splice(indexg, 1, "");
          this.dd = this.kg.filter(function(n) {
            return n;
          });
          this.gn = "[千个]" + this.dd.join("");
          if (this.gn == "" || this.gn == "-" || this.gn == "[千个]") {
            this.gn = this.dd.join("");
          }
        }
        if (indexff === 7) {
          this.kh.splice(indexg, 1, "");
          this.dd = this.kh.filter(function(n) {
            return n;
          });
          this.hn = "[百十]" + this.dd.join("");
          if (this.hn == "" || this.hn == "-" || this.hn == "[百十]") {
            this.hn = this.dd.join("");
          }
        }
        if (indexff === 8) {
          this.ki.splice(indexg, 1, "");
          this.dd = this.ki.filter(function(n) {
            return n;
          });
          this.in = "[百个]" + this.dd.join("");
          if (this.in == "" || this.in == "-" || this.in == "[百个]") {
            this.in = this.dd.join("");
          }
        }
        if (indexff === 9) {
          this.kj.splice(indexg, 1, "");
          this.dd = this.kj.filter(function(n) {
            return n;
          });
          this.jn = "[十个]" + this.dd.join("");
          if (this.jn == "" || this.jn == "-" || this.jn == "[十个]") {
            this.jn = this.dd.join("");
          }
        }
        if (this.playBonusId === "ssc_side_lhh") {
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
          if (this.fn === "") {
            this.fn = "-";
          }
          if (this.gn === "") {
            this.gn = "-";
          }
          if (this.hn === "") {
            this.hn = "-";
          }
          if (this.in === "") {
            this.in = "-";
          }
          if (this.jn === "") {
            this.jn = "-";
          }
        }
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en +
          "," +
          this.fn +
          "," +
          this.gn +
          "," +
          this.hn +
          "," +
          this.in +
          "," +
          this.jn;
      }
      //三星包胆 -
      if (
        this.playBonusId === "ssc_star3_front_group_contains" ||
        this.playBonusId === "ssc_star3_mid_group_contains" ||
        this.playBonusId === "ssc_star3_last_group_contains"
      ) {
        for (let i = 0; i < numViews.nums.length; i++) {
          this.$store.state.zhu = 0;
          this.$store.state.con = "";
        }
      }
      //二星包胆 -
      if (
        this.playBonusId === "ssc_star2_front_group_contains" ||
        this.playBonusId === "ssc_star2_last_group_contains"
      ) {
        for (let i = 0; i < numViews.nums.length; i++) {
          this.$store.state.zhu = 0;
          this.$store.state.con = "";
        }
      }
      //五星--组选5 -
      if (this.playBonusId === "ssc_star5_group5") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选10 -
      if (this.playBonusId === "ssc_star5_group10") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount10(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选20 -
      if (this.playBonusId === "ssc_star5_group20") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选30 -
      if (this.playBonusId === "ssc_star5_group30") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount30(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选60 -
      if (this.playBonusId === "ssc_star5_group60") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
      }
      //五星--组选120 -
      if (this.playBonusId === "ssc_star5_group120") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
      }
      //前四--组选4 -
      if (this.playBonusId === "ssc_star4_front_group4") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount4(
          this.$store.state.con.split(",")
        );
      }
      //前四--组选12 -
      if (this.playBonusId === "ssc_star4_front_group12") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount12(
          this.$store.state.con.split(",")
        );
      }
      //前四--组选24 -
      if (this.playBonusId === "ssc_star4_front_group24") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
      }
      //前三、中三、后三组选 -
      if (
        this.playBonusId === "ssc_star3_front_group3" ||
        this.playBonusId === "ssc_star3_mid_group3" ||
        this.playBonusId === "ssc_star3_last_group3"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount3(lengths);
      }
      //二星组选 复式 -
      if (
        this.playBonusId === "ssc_star2_front_group" ||
        this.playBonusId === "ssc_star2_last_group"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzuxuanfushi(this.dd);
      }
      //三星直选和值 -
      if (
        this.playBonusId === "ssc_star3_front_and" ||
        this.playBonusId === "ssc_star3_mid_and" ||
        this.playBonusId === "ssc_star3_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sanzhixuanhezhi(this.dd);
      }
      //三星组选和值 -
      if (
        this.playBonusId === "ssc_star3_front_group_and" ||
        this.playBonusId === "ssc_star3_mid_group_and" ||
        this.playBonusId === "ssc_star3_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sanzuxuanhezhi(this.dd);
      }
      //三星跨度 -
      if (
        this.playBonusId === "ssc_star3_front_kd" ||
        this.playBonusId === "ssc_star3_mid_kd" ||
        this.playBonusId === "ssc_star3_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sankuadu(this.dd);
      }
      //二星直选和值 -
      if (
        this.playBonusId === "ssc_star2_front_and" ||
        this.playBonusId === "ssc_star2_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzhixuanhezhi(this.dd);
      }
      //二星组选和值 -
      if (
        this.playBonusId === "ssc_star2_front_group_and" ||
        this.playBonusId === "ssc_star2_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzuxuanhezhi(this.dd);
      }
      //二星跨度 -
      if (
        this.playBonusId === "ssc_star2_front_kd" ||
        this.playBonusId === "ssc_star2_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erkuadu(this.dd);
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


