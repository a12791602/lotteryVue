<template lang="jade">
.mInvite
  .mInvite-top(@change='typechange')
    div(@click='usertype=2',style='width:48%')
      input#member.magic-radio(v-model='usertype', type='radio', value='2',name='utype')
      label(for='member')
        span 会员邀请码
    div(@click='usertype=1',style='width:48%')
      input#member2.magic-radio(v-model='usertype', type='radio', value='1',name='utype')
      label(for='member2')
        span 代理邀请码
  .mInvite-content
    ul(v-show='showFlag')
      li(v-for='(item,index) in invitelist', :key='index', @click='select(item,$event)')
        .mInvite-left
          p
            span {{item.id}} 邀请码
            br
            |  {{item.code}}
            br
            span 产生日期
            | {{item.date}}
        .mInvite-right
          p
            span 注册数
            br
            span ({{item.count}})
        i.iconfont.icon-xia
  actionSheet(v-model='show',@hide='hide')
    .listStyle-II
      li
        span {{selected.id}}
      li
        span {{selected.code}}
      li
        input(type='text', v-model='url', onfocus='this.select()')
      li
        p 产生日期
        span {{selected.date}}
      li
        p 注册数
        span ({{selected.count}})个帐户
      li
        .button
          button.button2(@click='select2()') 删除此邀请码
          button.button3(@click='show = !show') 取消
  div.show(v-show='show2')
    ul
      li.title
        p 温馨提示！
      li.cont
        p 确定要删除此邀请码?
      li.but
        button.del.active(@click='delInviteCode()') 删除
        button.nodel(@click='select2()') 取消
</template>
<script>
import actionSheet from "../../../public/actionSheet";
export default {
  components: {
    actionSheet
  },
  data() {
    return {
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
      showFlag: true,
      url: ""
    };
  },
  mounted() {
    // if (this.$route.query.type) {
    //   if (this.$route.query.type == 0){
    //     this.usertype= 2;
    //   } else if ( this.$route.query.type == 1) {
    //     this.usertype= 1;
    //   }
    // }
    this.getInviteList();
  },
  filters: {
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  methods: {
    hide(){
      this.show=!this.show;
    },
    setUserType(v){
      this.usertype = v;
      console.log(this.usertype,v,"---------")
    },
    select(a) {
      this.show = !this.show;
      this.selected = a;
      this.url =
        "http://" + location.hostname + "/registered?code=" + a.code;
    },
    select2() {
      this.show2 = !this.show2;
    },
    typechange() {
      this.getInviteList();
    },
    getInviteList() {
      this.$axios
        .get(this.$store.state.url + "api/agent/inviteCode", {
          params: { type: this.usertype }
        })
        .then(res => {
          this.invitelist = res.data.data;
        })
        .catch(error => {
          console.log("获取邀请码列表Err");
        });
    },
    setrebet(b) {
      this.rebateratio = b.target.value;
    },
    delInviteCode() {
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      console.log(this.selected.id)
      formData.append("id", this.selected.id);
      this.$axios
        .post(
          this.$store.state.url + "api/agent/deleteInviteCode",
          formData,
          config
        )
        .then(res => {
          this.getInviteList();
          this.show = !this.show;
          this.show2 = !this.show2;
        })
        .catch(error => {
          console.log("deleteInviteCodeNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/page-five/agency/mInvite.scss";
@import "../../../../assets/scss/page-five/public.scss";
</style>
