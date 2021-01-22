<template lang="jade">
.betssc
  ul.betssc-top
    li
      i.iconfont.icon-left(@click="banckto")
    li
      p.wangfa
        | 玩
        br
        | 法
      .menu(@click='show = !show')
        | {{titles}}
        i.iconfont(:class="show ? 'icon-up' : 'icon-down'")
      .menu-list(v-show='show',@click="show = false")
        .menu-listShow
          .popscroll
            ul.menu-list-top
              li(v-for='(into,index) in playGroups', :key='index')
                .title {{into.title}}
                .menu-list-list-box
                  .menu-list-list(v-for='(group,indexa) in into.groups', :key='indexa')
                    span(v-for='(player,indexb) in group.players', :key='indexb', @click='k3Tab($event,indexa,indexb,player,group,into,index)')
                      a {{player.groupName}}{{player.title}}
    li.betssclist
      span(@click='getLotteryList') {{listname}}
      i.iconfont(:class="showa ? 'icon-up' : 'icon-down' ", @click='getLotteryList')
      .betk3listRight(v-show='showa')
        ul
          li(v-for='(listssc,index) in LotteryList', :key='index', @click='listnames($event,index,listssc)')
            a {{listssc.name}}
  .lookAllDiv(v-show='lookAllUl')
    p.lookAllDivTitle
      i.iconfont.icon-left(@click='lookAllDivTitle')
      b.cont 查看更多
      span
    .lookAllUlBox
      ul.lookAllUl
        li
          p 期号
          p 开奖号码
          p 开奖时间
        li(v-for='(item,index) in getPastOpens', :key='index')
          p {{item.seasonId.substring(4).split("-").join("")*1}}
            i.iconfont.icon-plus-minus
          p
            a {{n1}}
            a {{n2}}
            a {{n3}}
            a {{n4}}
            a {{n5}}
          p {{item.addTime.substring(11)}}
  .betssc-content
    div(v-show='!show')
      .betk3-content-top
        .content-left(@click='countNums')
          p {{lastSeasonId !== '' ? lastSeasonId.slice(4)*1 : lastSeasonIds}}期开奖号码
          div(v-if="shownum === false")
            p {{n1}}
            p {{n2}}
            p {{n3}}
            p {{n4}}
            p {{n5}}
            i.iconfont(:class="betsscContentTopPop ? 'icon-up' : 'icon-down'")
          .contnet-left-num(v-if="shownum === true && isGetItem === true")
            .num
              .span
                transition(name='down-up-translate-fade')
                  div {{i}}
              .span
                transition(name='down-up-translate-fade')
                  div {{j}}
              .span
                transition(name='down-up-translate-fade')
                  div {{k}}
              .span
                transition(name='down-up-translate-fade')
                  div {{l}}
              .span
                transition(name='down-up-translate-fade')
                  div {{h}}
            i.iconfont(:class="betsscContentTopPop ? 'icon-up' : 'icon-down'")
        .content-right(@click='tolooksucc')
          div
            p.seasonId {{seasonId !== '' ? seasonId : Number(lastSeasonIds)+1}}期投注截止
            .time
              p {{countDown !== '' ? countDown : "00:00:00"}}
          i.iconfont.icon-sanjiaoleft
      .betk3-content-top-pop(v-show='betsscContentTopPop',@click="betsscContentTopPop = false")
        ul.look
          li
            p 期号
            p 开奖号码
            p 开奖时间
          li(v-for='(item,index) in getPastOpens', :key='index', v-if='index < 10')
            p
              | {{item.seasonId.substring(4).split("-").join("")*1}}
              i.iconfont.icon-plus-minus
            p
              a {{item.n1}}
              a {{item.n2}}
              a {{item.n3}}
              a {{item.n4}}
              a {{item.n5}}
            p {{item.addTime.substring(11)}}
        p.lookAll
          button(@click='lookAll') 查看更多
          button(@click='lookAllTo') 往期开奖
      .betk3-content-foot
        div
          .betssc-list-box(v-show='true')
            span
              | {{current_player_bonus.remark}}
              b
                | 。奖金
                i(v-show='Number(current_player_bonus.displayBonus)') {{current_player_bonus.displayBonus | keepTwoNum}}
                i(v-show='isNaN(current_player_bonus.displayBonus)') {{displayBonus1 | keepTwoNum}}—{{displayBonus2 | keepTwoNum}}
                |  元
              br
            ul.fushi
              li(v-for='(numViews, indexff) in current_player.numView', :key='indexff')
                p
                  b {{numViews.title}}
                  span
                    a(v-for='(num,indexg) in numViews.nums', :key='indexg', :class="num.choose ? 'active' : '' ", @click='curBalls(indexff,indexg,num,numViews,current_player)') {{num.ball}}
  .betssc-footer
    .betssc-footer-top(v-show='zhu > 0')
      .betssc-footer-tops
        p 当前选号
        span {{con}}
      .betssc-footer-buttoms
        p 每注金额
        input(type='number', v-model='money', onfocus='this.select()')
        span(v-if="money === ''") 请输入要投注的金额
        span(v-else, v-show="playBonusId !== 'ssc_dxds'")
          | 单注最高可中
          p(v-show='! isNaN(money*displayBonus)') {{(money*parseInt(displayBonus*1000))/1000 | keepTwoNum}}
          p(v-show='isNaN(money*displayBonus)')
            | {{youhezhi ? (money*parseInt(displayBonus2*1000))/1000 : (money* parseInt(displayBonus1*1000))/1000 | keepTwoNum}}
          | 元
    .betssc-footer-buttom
      .betssc-footer-buttom-left
        button(@click='iscreat') 清空
        p
          span(v-if='zhu >0') 共{{zhu}}注,
          span(v-if="this.money !== '' ") 共{{zhu*money}}元
      .betssc-footer-buttom-right(@click='betC', v-show='betnot') 马上投注
  .betcBox(v-show='betGoshow')
    ul.betc(v-show='betGoshow')
      li 投注确认
      li
        p
          span {{listname}}快3 ：
          | {{seasonId}}期
        p
          span 投注金额：
          b {{money*zhu}}元
        p
          span 投注内容：
          span.popcon {{con}}
      li
        button(@click='betCancel') 取消
        button(@click='betGo') 确定
  .betcBox(v-show='betsuccess')
    ul.betc(v-show='betsuccess')
      li 温馨提示！
      li
        p
          b 投注成功,
          | 您可以在我的账户查看注单详情
      li
        button(@click='looksucc') 查看注单
        button(@click='betsucc') 继续投注
  bets(ref='pop')      
</template>
<script>
import bets from '../../page-five/money/bets.vue';
export default {
  data() {
    return {
      i: 0, //动画
      j: 0,
      k: 0,
      l: 0,
      h: 0,
      n1:1,
      n2:1,
      n3:1,
      n4:1,
      n5:1,
      shwoBet:false,
      lookAllUl:false,
      shownum: false,
      startyet: false,
      interval: null, //动画
      youhezhi: false, //判断是否有‘和’
      content: "提示内容!", //弹窗内容
      bet: false, //投注弹窗
      betsuccess: false,
      betGoshow: false,
      show: false, //头部中间
      showa: false, //头部右
      showan: 0, //头部右数字
      time: "",
      titles: "五星 复式",
      listname: this.$route.query.name.substring(0, 2),
      lotteryId: "sj1fc",
      LotteryList: "",
      money: "", //投注金额
      groupId: "",
      displayBonus: 0,
      displayBonus1: 0,
      displayBonus2: 0,
      displayBonus3: "",
      amount: 0, //总金额
      con: "", //已选号码
      zhu: 0, //注数
      rates: 0, //最高可中
      current_player: {}, //當前玩法
      current_player_bonus: {}, //當前玩法
      playBonus: "", //玩法树
      playBonusId: "ssc_star5", //点击选中后获取此玩法ID
      playGroups: "",
      navlist: 0,
      navlistb: 0,
      navlistf: 0,
      betsscContentTopPop: false,
      getPastOpens: "", //获取过去开奖号码10个
      getPastOpenB: "", //获取过去开奖号码第一个
      seasonId: "", //截取后的期号
      seasonId2: "", //当前期号
      seasonId3: "",
      lastSeasonId: "",
      lastSeasonIds: "",
      isGetItem:false,
      countDown: "",
      players: "",
      intotitle: "",
      itemstitle: "复式",
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
      jn: "",
      splayGroups: [],
      sgroups: [], 
      sgroups2: [], 
      splayers: [], 
      snumView: [], 
      snums: "", 
      timer: "",
      timer2: "",
      cacheTime: 600000,
      historyNum: 0,
      betnot:true,
      countNum:10,
    };
  },
  destroyed() {
    this.endCount();
    this.iscreat();
    document.removeEventListener("visibilitychange",this.listen);
  },
  created() {
    this.noGetItem();
    this.endCount();
  },
  mounted() {
    document.addEventListener("visibilitychange",this.listen);
    this.endCount();
    this.getPlayTree();
    this.geteServerTime(); //获取彩種當前獎期時間
  },
  watch: {
    money(newVal) {
      if (this.money === "") {
        setTimeout(() => {
          if (this.money === "") {
            this.money = "";
          }
        }, 1000);
      } else {
        this.money = parseInt(newVal);
      }
    }
  },
  methods: {
    listen() {
        if(document.hidden === false){
          this.geteServerTime();
        }
    },
    //没打接口前
    noGetItem(){
      if(this.startyet == false){
        this.start();
        this.isGetItem = true;
        this.shownum = true;
        let myDate = new Date();
        let getMonth = myDate.getMonth()+1;
        let getDate = myDate.getDate();
        let getHours = myDate.getHours()*60;
        let getMinutes = myDate.getMinutes();
        let getHM = getHours+getMinutes;
        if(getHM < 1000){
          getHM = "0"+getHM;
        }
        this.lastSeasonIds = getMonth+getDate.toString()+getHM;
      }else{
        this.end();
        this.isGetItem = false;
        this.shownum = false;
      }
    },
    //返回到上一次进来的页面
    banckto() {
      this.$router.push(this.$store.state.historyNum);
    },
    //查看20条记录
    lookAll() {
      this.countNum = 20;
      this.betsscContentTopPop = !this.betsscContentTopPop;
      this.lookAllUl = !this.lookAllUl;
      this.getPastOp();
    },
    //往期开奖
    lookAllTo() {
      this.$router.push({
        path: "second/past",
        query: {
          id: this.$route.query.id,
          name: this.$route.query.name,
          group: this.$route.query.group
        }
      });
    },
    lookAllDivTitle() {
      this.lookAllUl = !this.lookAllUl;
    },
    //筛子动画
    start() {
      var _this = this;
      this.startyet = true;
      this.interval = setInterval(function() {
        _this.i = Math.floor(Math.random() * 9 + 1);
        _this.j = Math.floor(Math.random() * 9 + 1);
        _this.k = Math.floor(Math.random() * 9 + 1);
        _this.l = Math.floor(Math.random() * 9 + 1);
        _this.h = Math.floor(Math.random() * 9 + 1);
      }, 39);
    },
    end() {
      var _this = this;
      clearInterval(this.interval);
    },
    endCount() {
      if (this.timer) {
        for (let i = 0; i <= this.timer; i++) {
          clearInterval(i);
        }
      }
      if (this.timer2) {
        for (let i = 0; i <= this.timer2; i++) {
          clearTimeout(i);
        }
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
        this.con = this.dd.join(",");
        this.zhu++;
        this.betssc_boxjia(indexff, indexg, num, numViews, player);
      } else if (num.choose === false) {
        this.d.splice(indexg, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu--;
        this.betssc_boxjian(indexff, indexg, num, numViews, player);
      }
    },
    //投注 ++++
    betssc_boxjia(indexff, indexg, num, numViews, player) {
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
          this.con =
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
        this.zhu = arr.length;
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
        this.zhu = arr.length;
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
        this.playBonusId === "ssc_star1_dwd" ) {
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
        if (this.playBonusId === "ssc_star4_front") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.con = this.con + ",-";
        }
        if (this.playBonusId === "ssc_star3_front") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.con = this.con + ",-" + ",-";
        }
        if (this.playBonusId === "ssc_star3_mid") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.con = "-," + this.con + ",-";
        }
        if (this.playBonusId === "ssc_star3_last") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.con = "-,-," + this.con;
        }
        if (this.playBonusId === "ssc_star2_front") {
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.con = this.con + ",-" + ",-" + ",-";
        }
        if (this.playBonusId === "ssc_star2_last") {
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.con = "-,-,-," + this.con;
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
          this.con =
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
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.zhu = this.getCount(this.con.split(","), 5);
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
        this.con =
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
        if (this.con.indexOf("和") !== -1) {
          this.youhezhi = true;
        } else if (this.con.indexOf("和") === -1) {
          this.youhezhi = false;
        }
      }
      //三星包胆 +
      if (
        this.playBonusId === "ssc_star3_front_group_contains" ||
        this.playBonusId === "ssc_star3_mid_group_contains" ||
        this.playBonusId === "ssc_star3_last_group_contains"
      ) {
        for (let i = 0; i < numViews.nums.length; i++) {
          this.zhu = 54;
          this.con = num.ball;
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
          this.zhu = 9;
          this.con = num.ball;
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount5(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount10(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount20(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount30(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount60(this.con.split(","));
      }
      //五星--组选120 +
      if (this.playBonusId === "ssc_star5_group120") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount4(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount12(this.con.split(","));
      }
      //前四--组选24 +
      if (this.playBonusId === "ssc_star4_front_group24") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
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
        this.zhu = this.getzuCount3(lengths);
      }
      //二星组选 复式 +
      if (
        this.playBonusId === "ssc_star2_front_group" ||
        this.playBonusId === "ssc_star2_last_group"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.erzuxuanfushi(this.dd);
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
        this.zhu = this.sanzhixuanhezhi(this.dd);
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
        this.zhu = this.sanzuxuanhezhi(this.dd);
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
        this.zhu = this.sankuadu(this.dd);
      }
      //二星直选和值 +
      if (
        this.playBonusId === "ssc_star2_front_and" ||
        this.playBonusId === "ssc_star2_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.erzhixuanhezhi(this.dd);
      }
      //二星组选和值 +
      if (
        this.playBonusId === "ssc_star2_front_group_and" ||
        this.playBonusId === "ssc_star2_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.erzuxuanhezhi(this.dd);
      }
      //二星跨度 +
      if (
        this.playBonusId === "ssc_star2_front_kd" ||
        this.playBonusId === "ssc_star2_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.erkuadu(this.dd);
      }
    },
    //投注 ----
    betssc_boxjian(indexff, indexg, num, numViews, player) {
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
          this.con =
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
        this.zhu = arr.length;
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
        this.zhu = arr.length;
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
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
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
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.playBonusId === "ssc_star4_front") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
        } else if (this.playBonusId === "ssc_star3_front") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
        } else if (this.playBonusId === "ssc_star3_mid") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
        } else if (this.playBonusId === "ssc_star3_last") {
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
        } else if (this.playBonusId === "ssc_star2_front") {
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
        } else if (this.playBonusId === "ssc_star2_last") {
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
        } else if (this.playBonusId === "ssc_star1_dwd") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + this.en;
        } else if (this.playBonusId === "ssc_star5") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.zhu = this.getCount(this.con.split(","), 5);
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
        this.con =
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
        if (this.con.indexOf("和") !== -1) {
          this.youhezhi = true;
        } else if (this.con.indexOf("和") === -1) {
          this.youhezhi = false;
        }
      }
      //三星包胆 -
      if (
        this.playBonusId === "ssc_star3_front_group_contains" ||
        this.playBonusId === "ssc_star3_mid_group_contains" ||
        this.playBonusId === "ssc_star3_last_group_contains"
      ) {
        for (let i = 0; i < numViews.nums.length; i++) {
          this.zhu = 0;
          this.con = "";
        }
      }
      //二星包胆 -
      if (
        this.playBonusId === "ssc_star2_front_group_contains" ||
        this.playBonusId === "ssc_star2_last_group_contains"
      ) {
        for (let i = 0; i < numViews.nums.length; i++) {
          this.zhu = 0;
          this.con = "";
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount5(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount10(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount20(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount30(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount60(this.con.split(","));
      }
      //五星--组选120 -
      if (this.playBonusId === "ssc_star5_group120") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount4(this.con.split(","));
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
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount12(this.con.split(","));
      }
      //前四--组选24 -
      if (this.playBonusId === "ssc_star4_front_group24") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
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
        this.zhu = this.getzuCount3(lengths);
      }
      //二星组选 复式 -
      if (
        this.playBonusId === "ssc_star2_front_group" ||
        this.playBonusId === "ssc_star2_last_group"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.erzuxuanfushi(this.dd);
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
        this.zhu = this.sanzhixuanhezhi(this.dd);
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
        this.zhu = this.sanzuxuanhezhi(this.dd);
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
        this.zhu = this.sankuadu(this.dd);
      }
      //二星直选和值 -
      if (
        this.playBonusId === "ssc_star2_front_and" ||
        this.playBonusId === "ssc_star2_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.erzhixuanhezhi(this.dd);
      }
      //二星组选和值 -
      if (
        this.playBonusId === "ssc_star2_front_group_and" ||
        this.playBonusId === "ssc_star2_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.erzuxuanhezhi(this.dd);
      }
      //二星跨度 -
      if (
        this.playBonusId === "ssc_star2_front_kd" ||
        this.playBonusId === "ssc_star2_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.zhu = this.erkuadu(this.dd);
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
    //清空
    iscreat() {
      this.zhu = "";
      this.money = "";
      this.con = "";
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
      for (let h = 0; h < this.snumView.length; h++) {
        if (null != this.snumView[h]) {
          for (let j = 0; j < this.snumView[h].length; j++) {
            for (let k = 0; k < this.snumView[h][j].nums.length; k++) {
              this.snumView[h][j].nums[k].choose = false;
            }
          }
        }
      }
    },
    betCancel() {
      this.betGoshow = !this.betGoshow;
    },
    setupPlayTree() {
      this.current_player = this.playGroups[0].groups[0].players[0];
      this.current_player_bonus = this.current_player;
      for (let i = 0; i < this.playGroups.length; i++) {
        this.splayGroups.push(this.playGroups[i]);
      }
      for (let j = 0; j < this.splayGroups.length; j++) {
        this.sgroups.push(this.splayGroups[j].groups);
      }
      for (let k = 0; k < this.sgroups.length; k++) {
        for (let j = 0; j < this.sgroups[k].length; j++) {
          this.sgroups2.push(this.sgroups[k][j]);
        }
      }
      for (let i = 0; i < this.sgroups2.length; i++) {
        this.splayers.push(this.sgroups2[i].players);
      }
      for (let h = 0; h < this.splayers.length; h++) {
        for (let i = 0; i < this.splayers[h].length; i++) {
          this.snumView.push(this.splayers[h][i].numView);
        }
      }
      this.displayBonus = this.splayers[0][0].displayBonus;
    },
    //玩法术
    getPlayTree() {
      // this.$axios.get("static/ssc.json")
      //   .then(res => {
      //       this.playBonus = res.data.data.playBonus;
      //       this.playGroups = res.data.data.playGroups;
      //       this.current_player = this.playGroups[0].groups[0].players[0];
      //       this.setupPlayTree();
      //     })
      //     .catch(error => {
      //       console.log("玩法树No");
      //     });

      const now = new Date().getTime();
      if (localStorage.getItem("playTree_" + this.$route.query.id) !== null) {
        this.playBonus = JSON.parse(localStorage.getItem("playTree_" + this.$route.query.id)).playBonus;
        this.playGroups = JSON.parse(
          localStorage.getItem("playTree_" + this.$route.query.id)
        ).playGroups;
        this.current_player = this.playGroups[0].groups[0].players[0];
        this.setupPlayTree();
      } else if (
        localStorage.getItem("playTree_" + this.$route.query.id) === null
      ) {
        this.$axios.get(this.$store.state.url + "api/lottery/getPlayTree", {params: { lotteryId: this.lotteryId }})
        .then(res => {
            this.playBonus = res.data.data.playBonus;
            this.playGroups = res.data.data.playGroups;
            this.current_player = this.playGroups[0].groups[0].players[0];
            localStorage.setItem(
              "playTree_" + this.$route.query.id,
              JSON.stringify(res.data.data)
            );
            localStorage.setItem("date_playTree_" + this.$route.query.id, now);
            this.setupPlayTree();
          })
          .catch(error => {
            console.log("玩法树No");
            this.$store.state.loginStatus = false;
            this.$pop.show({title:'温馨提示',content:'获取不成功,请检查您的网络！',content1:'',content2:'',number:1});
          });
      }
    },
    //投注
    betGo() {
      this.$loading.show({number:"a"});
      this.betGoshow = false;
      this.betnot = false;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("order[0].content", this.con);
      formData.append("order[0].betCount", this.zhu);
      formData.append("order[0].price", this.money);
      formData.append("order[0].unit", 1);
      formData.append("order[0].playId", this.playBonusId);
      formData.append("count", this.zhu);
      formData.append("traceOrders[0].price", this.money);
      formData.append("traceOrders[0].seasonId", this.seasonId2);
      formData.append("bounsType", 0);
      formData.append("traceWinStop", 0);
      formData.append("isTrace", 0);
      formData.append("lotteryId", this.$route.query.id);
      formData.append("amount", this.money * this.zhu);
      this.iscreat();
      this.$axios
        .post(this.$store.state.url + "api/lottery/bet", formData, config)
        .then(res => {
          if (res.data.message === "success") {
            this.$loading.hide();
              this.betnot = true;
              this.betsuccess = !this.betsuccess;
              this.iscreat();
          } else {
                this.betnot = true;
                this.iscreat();
          }
        })
        .catch(error => {
          console.log("投注No");
          this.iscreat();
          this.$pop.show({title:'温馨提示',content:'投注失败,请检查您的网络！',content1:'',content2:'',number:1});
          this.betnot = true;
        });
    },
    //查看注单
    looksucc() {
      this.$router.push({ path: "/bet" });
      this.betsuccess = !this.betsuccess;
    },
    tolooksucc(){
      this.looks = !this.looks;
      this.betsscContentTopPop = false;
      this.$refs.pop.banckto();
      this.$refs.pop.getTradeList();
    },
    betsucc() {
      this.betsuccess = !this.betsuccess;
      this.iscreat();
    },
    //右上获取彩种
    getLotteryList() {
      this.$loading.show({number:"a"});
      this.showa = !this.showa;
      this.betsscContentTopPop = false;
      this.countNum = 10;
      if (localStorage.getItem("lotteryListSSC") !== null) {
        this.$loading.hide();
        this.LotteryList = JSON.parse(localStorage.getItem("lotteryListSSC"));
        this.groupId = this.LotteryList[0].groupId;
        for (let i = 0; i < this.LotteryList.length; i++) {
          if (this.LotteryList[i].id === this.$route.query.id) {
            this.listname = this.LotteryList[i].name.substring(0, 2);
          }
        }
      } else {
        this.$axios
          .get(this.$store.state.url + "api/lottery/getLotteryList",{params:{type:'ssc'}})
          .then(res => {
            this.$loading.hide();
            localStorage.setItem("lotteryListSSC", JSON.stringify(res.data.data));
            this.LotteryList = res.data.data;
            this.groupId = this.LotteryList[0].groupId;
            for (let i = 0; i < this.LotteryList.length; i++) {
              if (this.LotteryList[i].id === this.$route.query.id) {
                this.listname = this.LotteryList[i].name.substring(0, 2);
              }
            }
          })
          .catch(error => {
            console.log("右上彩种No");
          });
      }
    },
    //头部右->菜单点击
    listnames(e, index, into) {
      this.countNum = 10;
      this.titles ="五星 复式";
      // this.historyNum++;
      this.listname = into.name.substring(0, 2);
      this.lotteryId = into.id;
      this.showan = index;
      this.showa = !this.showa;
      this.$router.push({ query: { id: into.id } });
      this.getPlayTree(); //玩法术
      this.geteServerTime(); //获取彩種當前獎期時間
      this.iscreat(); //清空
      this.$router.push({
        query: {
          id: this.$route.query.id,
          name: into.name,
          group: this.groupId
        }
      });
    },
    //头部菜单项
    k3Tab(e, indexa, indexb, items, group, into, index) {
      this.titles = into.title + " " + items.groupName + " " + items.title;
      this.show = !this.show;
      this.intotitle = into.title;
      this.itemstitle = items.title;
      this.playBonusId = items.id;
      this.navlist = index;
      this.navlistb = indexa;
      this.navlistf = indexb;
      this.current_player = items;
      this.current_player_bonus = this.current_player;
      this.displayBonus = items.displayBonus;
      if (isNaN(this.displayBonus)) {
        let ar = [];
        ar = this.displayBonus.split("-");
        this.displayBonus1 = Number(ar[0]);
        this.displayBonus2 = Number(ar[1]);
        this.displayBonus3 = this.displayBonus1 + "-" + this.displayBonus2;
      }
      this.iscreat();
    },
    //获取彩種當前獎期時間
    geteServerTime() {
      clearTimeout(this.timer2);
      this.$axios
        .get(this.$store.state.url + "api/lottery/getCurrentSaleTime", {
          params: { lotteryId: this.$route.query.id }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.seasonId2 = res.data.data.seasonId;
            this.seasonId =
              this.seasonId2
                .substring(4)
                .split("-")
                .join("") * 1;
            this.seasonId3 = this.seasonId2 - 1;
            this.lastSeasonId = res.data.data.lastSeasonId;
            this.today = res.data.data.restSeconds;
            this.setTimeMode();
            this.getPastOp(); //获取过去开奖号码10个
            this.initSetTimeout();
          }
        })
        .catch(error => {
          console.log("获取彩種當前獎期時間No");
        });
    },
    //時間格式轉換
    setTimeMode() {
      var hours = Math.floor((this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
      var minutes = Math.floor((this.today % (1 * 60 * 60)) / (1 * 60));
      var seconds = Math.floor((this.today % (1 * 60)) / 1);
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.countDown = hours + ":" + minutes + ":" + seconds;
    },
    //倒计时
    initSetTimeout() {
      if (this.startyet == false) {
        this.start();
      }
      this.shownum = true;
      this.endCount();
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        if (this.today < 1) {
          this.endCount();
          this.timesUp();
        }
        if ( this.getPastOpenB && this.getPastOpenB[0].lotteryId != this.$route.query.id ) {
          this.endCount();
        }
        if(this.getPastOpenB && this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 47){
          this.getPastOp();
        }else if(this.getPastOpenB && this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 46){
          this.getPastOp();
        }else if(this.getPastOpenB && this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 45){
          this.getPastOp();
        }else if(this.getPastOpenB && this.getPastOpenB[0].seasonId === this.lastSeasonId){
          this.end();
          this.startyet = false;
          this.shownum = false;
        }
        this.setTimeMode();
      }, 1000);
    },
    //時間到彈窗
    timesUp() {
      this.$pop.show({title:'温馨提示',content:'',content1:String(this.seasonId*1 ),content2:String(Number(this.seasonId+1)),number:3});
      this.geteServerTime();
    },
    countNums(){
      this.showa = false;
      this.betsscContentTopPop = !this.betsscContentTopPop;
      this.countNum = 10;
      if(this.betsscContentTopPop === true){
        this.getPastOp();
      }
    },
    //获取过去开奖号码10个
    getPastOp() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.query.id, count: this.countNum }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          this.getPastOpenB = res.data.data;
          this.n1 = this.getPastOpens[0].n1;
          this.n2 = this.getPastOpens[0].n2;
          this.n3 = this.getPastOpens[0].n3;
          this.n4 = this.getPastOpens[0].n4;
          this.n5 = this.getPastOpens[0].n5;
          if (Number(res.data.data[0].seasonId) !== Number(this.lastSeasonId)) {
            this.reGetPastOp();
          } else {
            clearTimeout(this.timer2);
            this.end();
            this.startyet = false;
            this.shownum = false;
          }
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    },
    reGetPastOp() {
      clearTimeout(this.timer2);
      this.timer2 = setTimeout(() => {
        this.countNum = 10;
        this.getPastOp();
      }, 12000);
    },
    betC() {
      if (this.zhu <= 0) {
        this.$pop.show({title:'温馨提示',content:'请至少选择一注号码投注!',content1:'',content2:'',number:2});
      }
      if (this.money === "") {
        this.$pop.show({title:'温馨提示',content:'请填写您要投注的金额!',content1:'',content2:'',number:2});
      }
      if (this.zhu > 0 && this.money !== "") {
        this.betGoshow = !this.betGoshow;
      }
    }
  },
  components:{
    bets
  },
  //focus
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  // 保留三个小数,不四舍五入
  filters: {
    keepTwoNum(value) {
      value = parseInt(value * 100) / 100;
      return value;
    },
    keepThreeNum(value) {
      value = parseInt(value * 1000) / 1000;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betssc.scss";
@import "../../../assets/scss/popcorn.scss";
</style>