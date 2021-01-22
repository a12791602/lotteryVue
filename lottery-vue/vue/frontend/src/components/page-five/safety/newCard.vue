<template>
<div class="listStyle">
  <div class="listStyle-top"><i @click="listStyleToGetCards" class="iconfont icon-left"></i>
    <p>绑定银行卡</p><span></span>
  </div>
  <div class="listStyle-content">
    <ul class="listStyle-III">
      <li>
        <p>选择银行</p>
        <div>
          <select v-model="selectBank">
            <option>请选择银行</option>
            <option :value="item.id" v-for="(item,index) in bankList" :key="index">{{item.title}}</option>
          </select>
        </div>
      </li>
      <li>
        <p>开户地址</p>
        <div>
          <input placeholder="请输入开户地址" v-model="address" value="address" clearable=""/>
        </div>
      </li>
      <li>
        <p>开户人姓名</p>
        <div>
          <input placeholder="请输入银行卡的姓名" v-model="niceName" value="niceName" clearable=""/>
        </div>
      </li>
      <li>
        <p>银行卡号</p>
        <div>
          <input placeholder="请输入银行卡号" v-model="card" value="card" clearable=""/>
        </div>
      </li>
      <li>
        <p>确认卡号</p>
        <div>
          <input placeholder="请确认银行卡号" v-model="card2" value="card2" clearable=""/>
        </div>
      </li>
      <li>
        <p>安全密码</p>
        <div>
          <input placeholder="请输入安全密码" v-model="securityCode" maxlength="6" value="securityCode" clearable="" type="password"/>
        </div>
      </li>
      <li>
        <div class="button">
          <button @click="sendReq()" class="button1">确定</button>
        </div>
      </li>
    </ul>
  </div>
  <div v-show="show3" class="show">
    <ul>
      <li class="title">
        <p>温馨提示！</p>
      </li>
      <li class="cont">
        <p>{{content}}</p>
      </li>
      <li class="but">
        <button @click="goBack()" class="nodel">确定</button>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      card: "",
      card2: "",
      address: "",
      niceName: "",
      securityCode: "",
      show1: false,
      show3: false,
      selectBank: "请选择银行",
      bankList: [],
      payway: [],
      payway2: [],
      content: ""
    };
  },
  mounted() {
    this.getBankNameList();
  },
  methods: {
    listStyleToGetCards(){
      this.$router.push('/getCards')
    },
    getBankNameList() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getBankNameList")
        .then(res => {
          this.bankList = res.data.data;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    goBack() {
      this.$router.push({ path: "/five" });
    },
    sendReq() {
      if(this.selectBank === '请选择银行'){
        this.$pop.show({error:'',title:'温馨提示',content:'请选择银行',content1:'',content2:'',number:2});
      }else 
      if(this.address === ''){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入开户地址',content1:'',content2:'',number:2});
      }else if(this.niceName === ''){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入银行卡的姓名',content1:'',content2:'',number:2});
      }else if(this.card === ''){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入银行卡号',content1:'',content2:'',number:2});
      }else if(this.card2 === ''){
        this.$pop.show({error:'',title:'温馨提示',content:'请确认银行卡号',content1:'',content2:'',number:2});
      }else if(this.securityCode === ''){
        this.$pop.show({error:'',title:'温馨提示',content:'请输入安全密码',content1:'',content2:'',number:2});
      }else{
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("id", "");
        formData.append("bankNameId", this.selectBank);
        formData.append("card", this.card);
        formData.append("card2", this.card2);
        formData.append("address", this.address);
        formData.append("niceName", this.niceName);
        formData.append("securityCode", md5(this.securityCode));
        this.$axios
          .post(this.$store.state.url + "api/proxy/setBankUser", formData, config)
          .then(res => {
            if (res.data.code === 1) {
              this.content = res.data.data.message;
              this.show3 = true;
            } else {
              this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
            }
          })
          .catch(error => {
            console.log("setBankUserNo");
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/page-five/public.scss";
@import "../../../assets/scss/listStyle.scss";
@import "../../../assets/scss/popcorn.scss";
</style>