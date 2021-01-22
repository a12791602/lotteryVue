<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='listStyleToPayway')
    p 微信支付
    span
  .listStyle-content
    ul.listStyle-VI
      div(style='text-align:center;height:auto;min-height:160px;')
        img(:src='$store.state.url+this.QRCodeUrl', style='width:40%;height:auto;')
      li
        p 充值金额
        div
          input(type='number', placeholder='请输入充值金额', v-model='chargeamount', value='chargeamount', clearable='')
      li
        p 充值人姓名
        div
          input(placeholder='请输入充值人姓名', v-model='niceName', value='niceName', clearable='')
      li
        p {{attfirst}}
        div
          input(:placeholder='attsecond', v-model='checkCode', value='checkCode', clearable='')
      li
        .button
          button.button1(@click='isshow3') 充值申请
      //- ul
      //-   li(style='background-color:#ddd;height:40px')
      //-     .button
      //-       button.button1(@click='popup()',style='background-color:#ddd;color:#888') 支付教程
      .warning
        p 1、{{attthird}}
        br
        p 2、请正确填写姓名和充值金额，以便及时核对。
        br
        p 3、转账1笔提交1次，请勿重复提交订单。
        br
        p 4、请务必转账后再提交订单，否则无法及时查到您的款项！
        br
  div.showBottom(v-show='show2',@click='show2 = false')
    ul.listStyle-II
      li
        .center
          p 您所输入的资讯
      li
        p 充值金额
        span {{chargeamount}}
      li
        p 充值人姓名
        span {{niceName}}
      li
        p {{attfirst}}
        span {{checkCode}}
      li(style='text-align:center;background:#fff;')
        .center
          p 请确认上列信息正确！
      li
        .button
          button.button2(@click='sendReq()') 确定
          button.button3(@click='show2 = !show2') 取消
  div.show(v-show='show4')
    ul
      .title
        p 温馨提示！
      .cont
        p {{content}}
      .but
        button(@click='goBack()') 确定
</template>
<script>
export default {
  data() {
    return {
      timeline: "今天",
      cardnum: "",
      bankNameId: "",
      chargeamount: "",
      card: "",
      niceName: "",
      content: "",
      checkCode: "",
      show1: false,
      show2: false,
      show4: false,
      QRCodeUrl: "",
      receiveAddress: "",
      receiveBankId: "",
      receiveBankName: "",
      receiveCard: "",
      receiveNiceName: "",
      attfirst:"订单号后6位",
      attsecond:"请输入订单号后6位",
      attthird:"请务必填写正确订单号后6位！",
    };
  },
  mounted() {
    this.rechargeEntrance();
  },
  methods: {
    //返回payway页面
    listStyleToPayway(){
      this.$router.push("/payway");
    },
    rechargeEntrance() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/rechargeEntrance", {
          params: { rechargeWay: this.$route.query.id }
        })
        .then(res => {
          this.QRCodeUrl = res.data.data.QRCodeUrl;
          this.receiveAddress = res.data.data.receiveAddress;
          this.receiveBankId = res.data.data.receiveBankId;
          this.receiveBankName = res.data.data.receiveBankName;
          this.receiveCard = res.data.data.receiveCard;
          this.receiveNiceName = res.data.data.receiveNiceName;
          this.attfirst = res.data.data.attfirst;
          this.attsecond = res.data.data.attsecond;
          this.attthird = res.data.data.attthird;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    goBack() {
      this.$router.push({ path: "/five" });
    },
    isshow3(){
      if(this.chargeamount === ""){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入金额!',content1:'',content2:'',number:2});
      }else if(this.niceName === ''){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入姓名!',content1:'',content2:'',number:2});
      }else if(this.checkCode === ''){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入商户单号后6码!',content1:'',content2:'',number:2});
      }else{
        this.show2 = !this.show2;
      }
    },
    popup(){
      this.$pop.show({
              content: "ww",
              number: 5
            });
    },
    sendReq() {
      if (this.checkCode == "") {
        this.content = "单号不能為空！";
        this.show2 = !this.show2;
        this.$pop.show({error:'',title:'温馨提示',content:'单号不能為空！',content1:'',content2:'',number:2});
      } else {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("rechargeWay", 1);
        formData.append("receiveBankId", this.receiveBankId);
        formData.append("chargeamount", this.chargeamount);
        formData.append("niceName", this.niceName);
        formData.append("checkCode", this.checkCode);
        this.$axios
          .post(
            this.$store.state.url + "api/proxy/setPayRequest",
            formData,
            config
          )
          .then(res => {
            if (res.data.code === 1) {
              this.content = "申请完成，资讯可至充值信息页面查询。";
              this.show2 = false;
              this.show4 = !this.show4;
            } else if (res.data.code === 0) {
              this.content = res.data.data.message;
              this.show2 = !this.show2;
              this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
            } else {
              this.content = res.data.content;
              this.show2 = !this.show2;
              this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
            }
          })
          .catch(error => {
            console.log("setPayApplicationNo");
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