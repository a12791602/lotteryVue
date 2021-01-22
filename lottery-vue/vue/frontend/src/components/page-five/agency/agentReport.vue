<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 代理报表
    .dim(@click='show = ! show')
      | {{timeline}}
      span.iconfont.icon-xia
  .listStyle-content
    .listStyle-content-top
      actionSheet.mIcode-go(v-model='show', :actions='actions', cancel-text='取消',@hide='hide')
    ul.listStyle-check-top
      li
        input.input-top(size='medium', placeholder='请输入用户帐号名称', v-model='accountName', value='accountName', clearable='')
        button(@click='getUserTeam()')
          i.iconfont.icon-you
    .listStyle-content-list
      ul
        li
          span {{userTeam.betAmount}}
          span 投注金额
        li
          span {{userTeam.winningAmount}}
          span 中奖金额
        li
          span {{userTeam.activityAmount}}
          span 活动礼金
        li
          span {{userTeam.teamRebateAmount}}
          span 团队返点
        li
          span {{userTeam.profit}}
          span 团队盈利
        li
          span {{userTeam.rechargeAmount}}
          span 充值金额
        li
          span {{userTeam.withdrawAmount}}
          span 提现金额
        li
          span {{userTeam.firstChargeCount}}
          span 首充人数
        li
          span {{userTeam.regCount}}
          span 注册人数
        li
          span {{userTeam.betPerCount}}
          span 投注人数
        li
          span {{userTeam.lowerCount}}
          span 下级人数
        li
          span {{userTeam.teamAmount}}
          span 团队余额
        li
          span {{userTeam.agentRebateAmount}}
          span 代理返点
        li
          // span {{userTeam.wages}}
          // span 代理工资
        li
          // span {{userTeam.periodicDividends}}
          // span 代理分红
</template>
<script>
import actionSheet from "../../public/actionSheet";
export default {
  components: {
    actionSheet
  },
  data() {
    return {
      username:localStorage.getItem('Globalname'),
      accountName: "",
      dateFlag: 0,
      timeline: "今日",
      show: false,
      show2: false,
      usertype: 2,
      highbet: 0,
      rebateratio: 0,
      userTeam: [],
      validtime: 0,
      extaddress: "",
      invitelist: "",
      selected: [],
      showFlag: true,
      actions: [
        {
          name: "今日",
          type: 0,
          callback: this.onClick
        },
        {
          name: "昨日",
          type: 1,
          callback: this.onClick
        },
        {
          name: "本月",
          type: 2,
          callback: this.onClick,
          loading: false
        },
        {
          name: "上月",
          type: 3,
          callback: this.onClick,
          loading: false
        }
      ]
    };
  },
  mounted() {
    this.serchAccount();
    this.getUserTeam();
  },
  methods: {
    hide(){
      this.show=!this.show;
    },
    listStyleToSafety(){
      this.$router.push('/agency')
    },
    onClick(name) {
      this.timeline = name.name;
      this.dateFlag = name.type;
      this.show = !this.show;
      this.getUserTeam();
    },
    serchAccount() {
      if (!this.$route.query.id) {
      } else {
        this.accountName = this.$route.query.id;
        console.log(this.accountName);
      }
    },
    getUserTeam() {
      if (this.accountName == "") {
        this.$axios
          .get(this.$store.state.url + "api/proxy/getUserTeam", {
            params: {
              account: this.username,
              dateFlag: this.dateFlag
            }
          })
          .then(res => {
            this.userTeam = res.data.data;
          })
          .catch(error => {
            console.log("获取列表Error");
          });
      } else if (this.accountName !== "") {
        this.$axios
          .get(this.$store.state.url + "api/proxy/getUserTeam", {
            params: { account: this.accountName, dateFlag: this.dateFlag }
          })
          .then(res => {
            this.userTeam = res.data.data;
          })
          .catch(error => {
            console.log("获取列表Error");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
</style>