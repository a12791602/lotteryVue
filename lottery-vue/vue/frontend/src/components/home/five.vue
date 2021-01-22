<template lang="jade">
.five(v-show='$store.state.loginStatus')
  headers
  .five-top
    div
      .five-top-left
        router-link(to='/detail/datum', tag='p')
          img(:src='"@/assets/img/one/"+image+".jpg"', alt='')
      .five-top-right
        p
          | 账号：
          span {{username}}
        p
          | 余额：
          span(v-show=' !money ') *****
          span(v-show='money', ref='money') {{ balances }}
          button(v-show='!money', @click='money = !money') 显示
      .five-top-right2(v-show='money', @click='F5money')
        img(:class=" toF5money ? 'totransition' : ''", src='@/assets/img/one/ROLL.png', alt='')
    ul
      router-link(to='/payway', tag='li')
        .icon-top.top-1
          i.iconfont.icon-creditcard(aria-hidden='true')
        span 我要充值
      li(@click='safeCenter()')
        .icon-top.top-2
          i.iconfont.icon-cash(aria-hidden='true')
        span 我要提现
      router-link(to='/trade', tag='li')
        .icon-top.top-3
          i.iconfont.icon-notebook(aria-hidden='true')
        span 交易记录
      router-link(to='/bet', tag='li')
        .icon-top.top-4
          i.iconfont.icon-notepad_add(aria-hidden='true')
        span 投注记录
  .five-content
    ul
      router-link(:to='fiveNavs.paths', tag='li', v-for='(fiveNavs,index) in fiveNav', :key='index', v-if='fiveNavs.viewC')
        .five-content-nav
          i.iconfont(:class='fiveNavs.icon')
          p {{fiveNavs.name}}
        .NoticeBox
          span.isNotices(:class='$store.state.isNotice ? "active" : ""' v-if='index === 4')
          i.iconfont.icon-you
  div.show(v-show='show2')
    ul
      li.title
        p 温馨提示！
      li.cont
        p {{content}}
      li.but
        button.del.active(@click='goToSet()') 确定
        button.nodel(@click='show2 = !show2') 取消
</template>
<script>
import headers from "../public/header";
export default {
  data() {
    return {
      username: localStorage.getItem("Globalname"),
      bankUserFlag: "", //银行卡状态
      securityCoe: "", //安全码状态
      question: "", //密保问题状态
      content: "",
      show2: false,
      balances: "", //用户余额
      image: 1, //用户头像
      money: false,
      toF5money: false, //刷新动画
      water: "",
      fiveNav: [
        {
          name: "个人信息",
          icon: "icon-address-book-o",
          paths: "detail",
          viewC: true
        },
        {
          name: "安全中心",
          icon: "icon-lock",
          paths: "safety",
          viewC: true
        },
        {
          name: "代理中心",
          icon: "icon-concard",
          paths: "agency",
          viewC: false
        },
        {
          name: "今日盈亏",
          icon: "icon-line-chart",
          paths: "profits",
          viewC: true
        },
        {
          name: "我的消息",
          icon: "icon-envelope",
          paths: "mymsg",
          viewC: true
        },
        {
          name: "充值信息",
          icon: "icon-file",
          paths: "rechargeserch",
          viewC: true
        }
      ]
    };
  },
  mounted() {
    this.getTopUserData();
    this.getBalance();
    this.checkType();
  },
  methods: {
    
    checkType() {
      if (this.$store.state.userType == 1) {
        this.fiveNav[2].viewC = true;
      }
    },
    //刷新余额
    F5money() {
      this.toF5money = !this.toF5money;
      //this.$refs.money.innerHTML = "讀取中...";
      this.balances = "读取中...";
      setTimeout(() => {
        this.getBalance();
        this.toF5money = !this.toF5money;
        //this.$refs.money.innerHTML = Number(this.balances).toFixed(2) + "元";
      }, 800);
    },
    //獲取安全中心狀態
    safeCenter() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getSecurityCenterStatus")
        .then(res => {
          this.securityCoe = res.data.data.securityCoe;
          this.bankUserFlag = res.data.data.bankUserFlag;
          this.question = res.data.data.question;
          if (this.securityCoe == 0) {
            this.content = "请先设置安全密码及绑定银行帐户，是否跳转至设置页？";
            this.show2 = !this.show2;
          } else if (this.bankUserFlag == 0) {
            this.content = "请先绑定银行帐户，是否跳转至设定页？";
            this.show2 = !this.show2;
          } else if (this.question == 0) {
            this.content = "请先设置密保问题，是否跳转至设定页？";
            this.show2 = !this.show2;
          }
          if (
            this.securityCoe == 1 &&
            this.bankUserFlag == 1 &&
            this.question === 1
          ) {
            this.waterFall();
            // if (this.$store.state.userType === "0") {
            //   this.waterFall();
            // } else if (this.$store.state.userType === "1") {
            //   this.$router.push({path:"/agencyOuts"});
            // }
          }
        })
        .catch(error => {
          console.log("獲取安全中心狀態");
        });
    },
    //判断是否允许当前会员用户进行提款
    waterFall() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getWithdrawFlag")
        .then(res => {
          this.water = res.data.code;
          if (res.data.code === 1) {
            this.$router.push({ path: "/cashOut" });
          }
        })
        .catch(error => {
          console.log("取安全中心状态No111");
        });
    },
    //判断是否允许当前代理用户进行提款
    getAgentWithdrawFlag() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getAgentWithdrawFlag")
        .then(res => {
          this.water = res.data.code;
          if (res.data.code === 1) {
            this.$router.push({ path: "/agencyOuts" });
          }
        })
        .catch(error => {
          console.log("取安全中心状态No111");
        });
    },
    goToSet() {
      console.log(111);
      if (this.securityCoe == 0) {
        this.$router.push({ path: "/setSafePwd" });
      } else if (this.bankUserFlag == 0) {
        this.$router.push({ path: "/newCard" });
      } else if (this.question == 0) {
        this.$router.push({ path: "/setQuestion" });
      } else {
        this.waterFall();
      }
    },
    //获取头部个人信息
    getTopUserData() {
      if (localStorage.getItem("image") !== null) {
        this.image = localStorage.getItem("image");
      } else {
        this.$axios
          .get(this.$store.state.url + "api/userCenter/getTopUserData")
          .then(res => {
            localStorage.setItem("image", res.data.data.image);
            this.image = localStorage.getItem("image");
          })
          .catch(error => {
            console.log("获取头部个人信息No");
          });
      }
    },
    //获取用户余额
    getBalance() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getBalance")
        .then(res => {
          this.$store.state.balance = res.data.data.balance;
          if (res.data.code === 1) {
            this.balances = Number(res.data.data.balance).toFixed(2) + "元";
          } else {
            this.balances = "加载延时,请重刷";
          }
        })
        .catch(error => {
          console.log("获取用户余额");
          this.balances = "加载延时,请重刷";
        });
    }
  },
  filters: {
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/five.scss";
@import "../../assets/scss/page-five/public.scss";
@import "../../assets/scss/popcorn.scss";
.iconfont {
  display: inline-block;
}
i {
  text-align: center;
}
</style>