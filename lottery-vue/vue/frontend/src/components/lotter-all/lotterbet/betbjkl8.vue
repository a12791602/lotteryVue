<template lang="jade">
.betbjkl8
  ul.betbjkl8-top
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
      .menu-list
    li
      p 北京快乐8
  .betbjkl8-content
    .lottery-box
      .lottery-top(@click='lottery = !lottery')
        p
          | 888888开奖：
          ul
            li(v-for='(item,index) in 10', :key='index')
              span {{item}}
            | ...
        p
          | 888888投注：
          span
          i.iconfont(:class=" lottery ? 'icon-up' :'icon-down'")
        .lottery-ms(v-show=' !lottery')
          p
            span 期号
            span 开奖号码
          ul
            li(v-for=' (item,index) in 10', :key='index')
              div
                span 888888
                span 00:00:00
              i.iconfont.icon-plus-minus
              div
                ul
                  li(v-for='(item,index) in 20', :key='index') 02
      .lottery-content
        .lottery-scoll-box
          p(v-for='(annotations,index) in annotation', :key='index', v-show='index === renxuanlist')
            | {{annotations.title}}
            ul
              li(v-show='index===0')
                | 奖金
                span 7.80
                | 元
              li(v-show='index===1')
                | 奖金
                span 32.43
                | 元
              li(v-show='index===2')
                span(@click='pop3=!pop3') 奖金详情
              li(v-show='index===3')
                span(@click='pop4=!pop4') 奖金详情
              li(v-show='index===4')
                span(@click='pop5=!pop5') 奖金详情
              li(v-show='index===5')
                span(@click='pop6=!pop6') 奖金详情
              li(v-show='index===6')
                span(@click='pop7=!pop7') 奖金详情
          .lottery-scoll.lottery-scoll1
            p
              span 上盘
            ul
              li.choose1(v-for='(val,shang) in 40', :key='shang', @click='selecNumShang($event,shang,val)') {{ shang < 9 ? '0'+(shang+1) : (shang+1) }}
          .lottery-scoll.lottery-scoll2
            p
              span 下盘
            ul
              li.choose2(v-for='(val,xia) in 40', :key='xia', @click='selecNumXia($event,xia,val)') {{xia+41}}
      .bjkl8popup
      cart(:cart='con,selected', ref='cart')
</template>
<script>
import cart from "../../public/cart";
export default {
  data() {
    return {
      selected: [], //已经选择的号码
      con: "", //转换成数字后的号码
      choose1: 1, //号码选中状态
      choose2: "", //号码选中状态
      show: false,
      show1: false,
      lottery: true,
      pop3: false,
      pop4: false,
      pop5: false,
      pop6: false,
      pop7: false,
      navs: 0,
      renxuanlist: 0,
      quweilist: 0,
      titles: "任选一",
      annotation: [
        {
          title:
            "从01-80中选择1个号码组成一注，当期开奖结果的20个号码中包含所选号码，即可中奖。"
        },
        {
          title:
            "从01-80中选择2-8个号码，当期开奖结果的20个号码中包含所选号码中的两个，即可中奖。"
        },
        {
          title:
            "从01-80中选择3-8个号码，当期开奖结果的20个号码中包含所选号码中的三个，即可中奖。"
        },
        {
          title:
            "从01-80中选择4-8个号码，当期开奖结果的20个号码中包含所选号码中的四个，即可中奖。"
        },
        {
          title:
            "从01-80中选择5-8个号码，当期开奖结果的20个号码中包含所选号码中的五个，即可中奖。"
        },
        {
          title:
            "从01-80中选择6-8个号码，当期开奖结果的20个号码中包含所选号码中的六个，即可中奖。"
        },
        {
          title:
            "从01-80中选择7-8个号码，当期开奖结果的20个号码中包含所选号码中的七个，即可中奖。"
        }
      ],
      renxuan: [
        {
          a: ["任选", "趣味"],
          valus: [
            "任选一",
            "任选二",
            "任选三",
            "任选四",
            "任选五",
            "任选六",
            "任选七"
          ]
        }
      ],
      quwei: ["上下盘", "奇偶盘", "和值大小单双"]
    };
  },
  methods: {
    banckto(){
      this.$router.push('/one');
    },
    menunav(event, index, muens) {
      if (muens) {
        this.navs = index;
      }
    },
    showrenxuan(e, item, index) {
      this.titles = item;
      this.renxuanlist = index;
      this.show = !this.show;
      this.con = "";
    },
    showquwei(event, item, index) {
      this.titles = item;
      this.quweilist = index;
      this.show = !this.show;
      this.con = "";
    },
    selecNumShang(e, shang, val) {
      switch (this.renxuanlist) {
        case 0:
          if (e.target.className.indexOf("choose1 active")) {
            e.target.className = "choose1 active"; //切换按钮样式
            this.selected.push(e.target.innerHTML);
          } else {
            e.target.className = "choose1";
            this.selected.pop(e.target.innerHTML);
          }
          this.selected = [...new Set(this.selected)]; //ES6去重
          this.con = this.selected.join(" ");
          return this.con;
          break;
        case 1:
          if (e.target.className.indexOf("choose1 active")) {
            e.target.className = "choose1 active"; //切换按钮样式
            this.selected.push(e.target.innerHTML);
          } else {
            e.target.className = "choose1";
            this.selected.pop(e.target.innerHTML);
          }
          this.selected = [...new Set(this.selected)]; //ES6去重
          this.con = this.selected.join(" ");
          return this.con;
      }
    },
    selecNumXia(e, xia, val) {
      switch (this.renxuanlist) {
        case 0:
          if (e.target.className.indexOf("choose2 active")) {
            e.target.className = "choose2 active"; //切换按钮样式
            this.selected.push(e.target.innerHTML);
          } else {
            e.target.className = "choose2";
            this.selected.pop(e.target.innerHTML);
          }
          this.selected = [...new Set(this.selected)]; //ES6去重
          this.con = this.selected.join(" ");
          return this.con;
          break;
        case 1:
          break;
      }
    }
  },
  components: {
    cart
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betbjkl8.scss";
</style>