<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 我要提现
    span
  .listStyle-content
    ul.listStyle-III
      li
        p 最高提现额度 
        | {{moneyDepositMax}}
      li
        p 最低提现额度 
        | {{moneyDepositMin}}
      li
        p 账户余额 
        | {{$store.state.balance}}
      li
        p 可提现余额 
        | {{myAmount}}
      li
        p 今日余提现次数 
        | {{countMax}}
      li
        p 申请金额
        div
          input(type="number" @focus="parseIntAmount" @blur='parseIntAmount' placeholder='请输入金額', v-model='amount', value='amount', clearable='')
      li
        p 账号
        div(@click='show1 = ! show1')
          | {{selectBank}}
          span.iconfont.icon-xia
      li
        p 账户安全码
        div
          input(placeholder='请输入安全码', v-model='securityCode',maxlength='6' value='securityCode', clearable='' type="password")
      li
        .button
          button.button1(@click='sendReq()') 提现申请
  div.show(v-show='show3')
    ul
      .title
        p 温馨提示！
      .cont
        p {{content}}
      .but
        button.nodel(@click='goBack()') 确定
  actionSheet.mIcode-go(v-model='show1', :actions='payway', cancel-text='取消')
</template>
<script>
import md5 from "js-md5";
import actionSheet from "../../public/actionSheet";
export default {
  components: {
    actionSheet
  },
  data(){
    return {
      withdrawType: 1,
      timeline: "今天",
      cardnum: "",
      bankUserId: "",
      amount: "",
      show1: false,
      show3: false,
      show4: false,
      selectBank: "请选择银行卡",
      bankList: [],
      payway: [],
      withdrawInformation: "",
      securityCode: "",
      moneyDepositMax: "",
      myAmount: "",
      moneyDepositMin: "",
      countMax: "",
      content: ""
    };
  },
  created() {
    this.getWithdrawInformation();
  },
  methods: {
    hide(){
      this.show1=!this.show1;
    },
    listStyleToSafety(){
      this.$router.push('/five')
    },
    parseIntAmount(){
      if(this.amount !== ''){
        this.amount = parseInt(this.amount);
      }
    },
    getWithdrawInformation() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getWithdrawInformation", {params: { withdrawType: this.$store.state.userType }})
        .then(res => {
          if (this.$store.state.userType === "0") {
            this.withdrawType = 1;
          } else if (this.$store.state.userType === "1"){
            this.withdrawType = 2;
          }
          this.withdrawInformation = res.data.data;
          this.bankList = res.data.data.bankUserList;
          this.moneyDepositMax = res.data.data.moneyDepositMax;
          this.myAmount = res.data.data.amount;
          this.moneyDepositMin = res.data.data.moneyDepositMin;
          this.countMax = res.data.data.countMax;
          for (let i = 0; i < res.data.data.bankUserList.length; i++) {
            this.payway.push({
              name: res.data.data.bankUserList[i].bankTitle,
              id: res.data.data.bankUserList[i].id,
              callback: this.onClick
            });
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    goBack() {
      this.$router.push({ path: "/five" });
    },
    onClick(item) {
      this.selectBank = item.name;
      this.bankUserId = item.id;
      this.show1 = !this.show1;
    },
    sendReq() {
      if (this.amount === "") {
        this.$pop.show({error:'',title:'温馨提示',content:'请输入金額!',content1:'',content2:'',number:2});
      }else if(this.selectBank === "请选择银行卡"){
        this.$pop.show({error:'',title:'温馨提示',content:'请选择银行卡!',content1:'',content2:'',number:2});
      }else if(this.securityCode === ""){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入安全码!',content1:'',content2:'',number:2});
      } else {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("amount", parseInt(this.amount));
        formData.append("bankUserId", this.bankUserId);
        formData.append("securityCode", md5(this.securityCode));
        // formData.append("withdrawType", this.withdrawType);
        this.$axios
          .post(
            this.$store.state.url + "api/proxy/setWithdraw",
            formData,
            config
          )
          .then(res => {
            if (res.data.code === 1) {
              this.content = res.data.data.message;
              this.show3 = true;
            } else {
              this.content = res.data.data.message;
              this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
            }
          })
          .catch(error => {
            console.log("setWithdrawNo");
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
@import "../../../assets/scss/popcorn.scss";
@import "../../../assets/scss/page-five/public.scss";
</style>