<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 充值信息
    span
  .listStyle-content
    ul.listStyle-I
      li(v-for='(item,index) in rechargeList', :key='index', @click='select(item,$event)')
        .mInvite-left
          p
            | 金额
            b {{item.amount}}
            span {{item.bankName}}
            br
            a 产生日期{{item.createTime}}
        .mInvite-right
          p
            span ({{item.statusName}})
        i.iconfont.icon-xia
  actionSheet(v-model='show2',@hide='hide')
    ul.listStyle-II(style='text-align:center')
      li
        p 订单编号
        span {{this.id}}
      li
        p 订单时间
        span {{this.createTime}}
      li
        p 目前处理状况
        span {{this.statusName}}
      li
        p 申请充值金额
        span {{this.amount}}
      li
        .button
          button.button1(@click='show2=!show2') 确定
</template>
<script>
import actionSheet from "../../public/actionSheet";
export default {
  components: {
    actionSheet
  },
  data() {
    return {
      show2: false,
      id: "",
      status: "",
      statusName: "",
      amount: "",
      bankName: "",
      receiveNickName: "",
      receiveBankName: "",
      receiveCard: "",
      createTime: "",
      receiveAddress: "",
      rechargeList: [],
      checkCode: "",
      QRCodeUrl: "",
      bankNameCode: ""
    };
  },
  mounted() {
    this.getRechargeList();
  },
  methods: {
    hide(){
      this.show2=!this.show2;
    },
    listStyleToSafety(){
      this.$router.push('/five')
    },
    select(a) {
      this.id = a.id;
      this.status = a.status;
      this.statusName = a.statusName;
      this.amount = a.amount;
      this.receiveNickName = a.receiveNickName;
      this.receiveBankName = a.receiveBankName;
      this.receiveCard = a.receiveCard;
      this.createTime = a.createTime;
      this.receiveAddress = a.receiveAddress;
      this.checkCode = a.checkCode;
      this.show2 = !this.show2;
      this.bankName = a.bankName;
      this.bankNameCode = a.bankNameCode;
      this.selected = a;
      this.QRCodeUrl = a.QRCodeUrl;
    },
    getRechargeList() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getRechargeList", {
          params: { start: 0, limit: 100 }
        })
        .then(res => {
          this.rechargeList = res.data.data;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
</style>