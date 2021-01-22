<template lang="jade">
.mInvite
  .mInvite-content2
    ul
      li
        span 用户类型
        div(@click='usertype=0')
          input#member.magic-radio(v-model='usertype', type='radio', value='0',name='utype')
          label(for='member')
            span 会员
        div(@click='usertype=1')
          input#member2.magic-radio(v-model='usertype', type='radio', value='1',name='utype')
          label(for='member2')
            span 代理
      li
        span 设定返点
        select(v-model='rebateratio', @change='setrebet($event)')
          option(v-for='bet in betlist', :key='bet', :value='bet') {{bet}}
      li
        span 推广渠道
        input(type='text', v-model='extaddress', onfocus='this.select()', placeholder='请输入推廣渠道')
  .mInvite-go
    button(@click='getInviteCode()') 取得邀请码
</template>
<script>
export default {
  data() {
    return {
      usertype: 0,
      highbet: 0,
      rebateratio: 0,
      betlist: [],
      validtime: 0,
      extaddress: ""
    };
  },
  mounted() {
    this.createbetlist();
  },
  methods: {
    createbetlist() {
      this.$axios
        .get(this.$store.state.url + "api/agent/getExtQuota")
        .then(res => {
          console.log(res)
          this.highbet = res.data.data.rebateRatio;
          for (let i = res.data.data.rebateRatio * 10; i >= 0; i = i - 1) {
            this.betlist.push(i / 10);
          }
          return this.betlist;
        })
        .catch(error => {
          console.log("获取彩種ratio ERROR");
          this.highbet = 0;
          for (let i = this.highbet * 10; i >= 0; i = i - 1) {
            this.betlist.push(i / 10);
          }
          return this.betlist;
        });
    },
    setrebet(b) {
      this.rebateratio = b.target.value;
    },
    getInviteCode() {
      let _this = this;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("usertype", Number(this.usertype));
      formData.append("rebateratio", Number(this.rebateratio));
      formData.append("validtime", this.validtime);
      formData.append("extaddress", "123");
      this.$axios
        .post(
          this.$store.state.url + "api/agent/createInviteCode",
          formData,
          config
        )
        .then(res => {
          if(Number(this.usertype) === 1){
            this.$emit("setUserType(1)");
          }
          this.$router.push({ path: "/manageInvite/mIcode"});
        })
        .catch(error => {
          console.log("createInviteCodeNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/page-five/agency/mInvite.scss";
</style>
