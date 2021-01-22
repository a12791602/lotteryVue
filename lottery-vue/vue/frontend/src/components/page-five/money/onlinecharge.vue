<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='backTo')
    p 网银支付
    span
  .listStyle-content
    ul.listStyle-III
      li
        p 申请金额
        div
          input(type="number" @focus="parseIntAmount" @blur='parseIntAmount' placeholder='请输入金額', v-model='amount', value='amount', clearable='')
      li
        p 支付渠道
        div(@click='show1 = ! show1')
          | {{selectBank}}
          span.iconfont.icon-xia
      li
        .button
          button.button1(@click='sendReq()') 支付申请
      //- ul
      //-   li(style='background-color:#ddd;height:40px')
      //-     .button
      //-       button.button1(@click='popup()',style='background-color:#ddd;color:#888') 支付教程
  div.show(v-show='show3')
    ul
      .title
        p 温馨提示！
      .cont
        p {{content}}
      .but
        button.nodel(@click='goBack()') 确定
  actionSheet.mIcode-go(v-model='show1', :actions='payway', cancel-text='取消',@hide='hide')
</template>
<script>
import actionSheet from "../../public/actionSheet";
export default {
  components: {
    actionSheet
  },
  data() {
    return {
      withdrawType: 1,
      timeline: "今天",
      cardnum: "",
      bankUserId: "",
      amount: "",
      show1: false,
      show3: false,
      show4: false,
      selectBank: "请选择银行",
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
    excecuteJS(){
      setTimeout("document.getElementById('frm1').submit();",100);
    },
    backTo(){
      this.$router.go(-1)
    },
    parseIntAmount(){
      if(this.amount !== ''){
        this.amount = parseInt(this.amount);
      }
    },
    getWithdrawInformation() {
      this.$axios
        .get(this.$store.state.url + "api/pay/thirdparty/getBanks", {
          params: {type: 1}
        })
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.payway.push({
              name: res.data.data[i].name,
              code: res.data.data[i].code,
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
      this.bankUserId = item.code;
      this.show1 = !this.show1;
    },
    popup(){
      this.$pop.show({
              content: "qq",
              number: 5
            });
    },
    sendReq() {
      if (this.amount === "") {
        this.$pop.show({error:'',title:'温馨提示',content:'请输入金額!',content1:'',content2:'',number:2});
      }else if(this.selectBank === "请选择银行"){
        this.$pop.show({error:'',title:'温馨提示',content:'请选择银行卡!',content1:'',content2:'',number:2});
      }else {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("amount", parseInt(this.amount));
        formData.append("bankId", this.bankUserId);
        this.$axios
          .post(
            this.$store.state.url + "api/pay/thirdparty/deposit",
            formData,
            config
          )
          .then(res => {
            if (res.data.code === 1) {
              console.log(res.data.data);
              var z = document.createElement('p');
              z.innerHTML = res.data.data;
              //z.innerHTML='<script>alert("12345")<'+'/script>';
              document.body.appendChild(z);
              this.excecuteJS();
              console.log('成功');
            } else {
              this.content = res.data.content;
              this.$pop.show({error:'',title:'温馨提示',content:res.data.content,content1:'',content2:'',number:2});
            }
          })
          .catch(error => {
            console.log(error);
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
