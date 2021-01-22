<template lang="jade">
.listStyle
  .listStyle-top(v-bind:class='{ blur: show2 }')
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 会员管理
    span
  .listStyle-content(v-bind:class='{ blur: show2 }')
    .row
      .title 账号
      .title 类型
      .title 登录时间
      .title 下级人数
    ul(style='padding:0')
      li.row2(v-for='(item,index) in underUserList', :key='index', @click='select(item,$event)')
        .title
          p {{item.account}}
        .title2
          p {{item.userTypeName}}
        .title3
          p {{item.loginTime}}
        .title2
          p {{item.childCount}}
  actionSheet.listModel(v-model='show2',@hide='hide')
    ul.listStyle-II
      li
        span {{selected.account}}
      li
        p 返點率
        span {{selected.rebateRatio}}
      li
        .button
          button.button1(@click='show2 =! show2') 确定
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
      dateFlag: 0,
      underUserList: [],
      timeline: "今日",
      show: false,
      show2: false,
      usertype: 2,
      highbet: 0,
      rebateratio: 0,
      betlist: [],
      validtime: 0,
      extaddress: "",
      invitelist: "",
      selected: [],
      showFlag: true
    };
  },
  mounted() {
    this.getUnderUserList();
  },
  methods: {
    hide(){
      this.show=!this.show;
    },
    listStyleToSafety(){
      this.$router.push('/agency')
    },
    select(a) {
      this.show2 = !this.show2;
      this.selected = a;
    },
    getUnderUserList() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getUnderUserList", {
          params: { account: this.username }
        })
        .then(res => {
          this.underUserList = res.data.data;
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
<style type="text/css">
</style>