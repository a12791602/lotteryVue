<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 银行卡管理
    span
  .listStyle-content
    ul(style='listStyle-I')
      li.row2(v-for='(item,index) in bankUserList', :key='index', @click='select(item,$event)')
        .title4
          p {{item.title}}[{{item.id}}] {{item.card | lastFive}}
        .title
          p 修改
      li
        .button
          button.button1(@click='goCreate()') 添加银行卡
    .warning
      p {{content}}
  actionSheet(v-model='show3',@hide='hide')
    ul.listStyle-II
      li 修改银行卡
      li
        p 银行
        div
          select(v-model='selectBank')
            option 请选择银行
            option(:value='item', v-for='(item,index) in payway2', :key='index') {{item}}
      li
        p 开户地址
        div
          input(placeholder='请输入开户地址', v-model='address', value='address', clearable='')
      li
        p 开户人姓名
        div
          input(placeholder='请输入银行卡的姓名', v-model='niceName', value='niceName', clearable='')
      li
        p 银行卡号
        div
          input(placeholder='请输入银行卡号', v-model='card', value='card', clearable='')
      li
        p 确认卡号
        div
          input(placeholder='请确认银行卡号', v-model='card2', value='card2', clearable='')
      li
        p 安全密码
        div
          input(placeholder='请输入安全密码', v-model='securityCode',maxlength='6', value='securityCode', clearable='')
      li
        .button
          button.button2(@click='sendReq()') 修改
          button.button3(@click='show3=!show3') 取消
</template>
<script>
import actionSheet from "../../public/actionSheet";
import md5 from "js-md5";
export default {
  components: {
    actionSheet
  },
  data() {
    return {
      content: "",
      securityCoe: "",
      securityCode: "",
      loading: false,
      dateFlag: 0,
      bankUserList: [],
      timeline: "今天",
      show1: false,
      show3: false,
      usertype: 2,
      selected: [],
      bankUserList: [],
      showFlag: true,

      id: "",
      bankNameId: "",
      payway: [],
      payway2: [],
      selectBank: "",
      address: "",
      niceName: "",
      card: "",
      card2: "",
      securityCode: "",
      content2: ""
    };
  },
  created() {
    this.getBankUserList();
    this.getBankNameList();
  },
  mounted() {},
  methods: {
    hide(){
      this.show3=!this.show3;
    },
    listStyleToSafety() {
      this.$router.push("/safety");
    },
    select(a) {
      this.id = a.id;
      this.selectBank = a.title;
      this.address = a.address;
      this.niceName = a.niceName;
      this.card = a.card;
      this.card2 = a.card;
      this.show3 = !this.show3;
    },
    goCreate() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getSecurityCenterStatus")
        .then(res => {
          this.securityCoe = res.data.data.securityCoe;
          if (this.securityCoe !== 1) {
            this.$pop.show({
              error: "",
              title: "温馨提示",
              content: "请先绑定安全密码!",
              content1: "",
              content2: "",
              number: 1
            });
            setTimeout(() => {
              this.$router.push({ path: "/setSafePwd" });
            }, 800);
          } else {
            this.$router.push({ path: "/newCard" });
          }
        })
        .catch(error => {
          console.log("取安全中心状态No111");
        });
    },
    onClick(item) {
      this.selectBank = item.name;
      this.bankNameId = item.id;
      this.show1 = !this.show1;
    },
    onConfirm(item, index) {
      this.bankNameId = this.payway[index].id;
      this.selectBank = this.payway[index].name;
      this.show1 = !this.show1;
    },
    onCancel() {
      this.show1 = !this.show1;
    },
    getBankNameList() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getBankNameList")
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.payway.push({
              name: res.data.data[i].title,
              id: res.data.data[i].id
            });
            this.payway2.push(res.data.data[i].title);
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    getBankUserList() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getBankUserList")
        .then(res => {
          this.bankUserList = res.data.data;
          if (res.data.data.length === 0) {
            this.content = "您尚未绑定银行卡，一共可以绑定 5 张银行卡。";
          } else {
            this.content =
              "您已绑定 " +
              res.data.data.length +
              " 张银行卡，一共可以绑定5张银行卡。为了您的资金安全，成功提现的银行卡会自动锁定，无法删除和修改。";
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },

    sendReq() {
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("bankNameId", this.bankNameId);
      formData.append("card", this.card);
      formData.append("card2", this.card2);
      formData.append("address", this.address);
      formData.append("niceName", this.niceName);
      formData.append("securityCode", md5(this.securityCode));
      this.$axios
        .post(this.$store.state.url + "api/proxy/setBankUser", formData, config)
        .then(res => {
          if (res.data.code === 1) {
            this.content2 = res.data.data.message;
            this.$pop.show({
              error: "",
              title: "温馨提示",
              content: res.data.data.message,
              content1: "",
              content2: "",
              number: 2
            });
            this.show3 = false;
          } else {
            this.content2 = res.data.data.message;
            this.$pop.show({
              error: "",
              title: "温馨提示",
              content: res.data.data.message,
              content1: "",
              content2: "",
              number: 2
            });
          }
          this.getBankUserList();
        })
        .catch(error => {
          console.log("setBankUserNo");
        });
    }
  },
  filters: {
    lastFive(value) {
      let end = value.slice(-5);
      return `*********${end}`;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
@import "../../../assets/scss/popcorn.scss";
</style>