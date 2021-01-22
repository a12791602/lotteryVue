<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 交易明細
    .dim(@click='show = ! show')
      | {{timeline}}
      span.iconfont.icon-xia
  .listStyle-content
    ul.listStyle-check-top
      li
        input.input-top(size='medium', placeholder='请输入用户帐号名称', v-model='accountName', value='accountName', clearable='')
        button(@click='getTradeList()')
          i.iconfont.icon-you
    .listStyle-content-top
      actionSheet.mIcode-go(v-model='show', :actions='actions', cancel-text='取消',@hide='hide')
    ul.noVanTabs
      li.typeo(:class='index === active ? "active" : ""' v-for='(item,index) in pagelist', :key='index',@click='print(index,item)') {{item.name}}
    div
      ul.listStyle-I(v-show='showFlag')
        li(v-for='(item,index) in tradelist', :key='index', @click='select(item,$event)')
          .mInvite-left
            p
              span {{item.account}}
              br
              span
              | {{item.changeTime}}
          .mInvite-right
            p
              span {{item.accountChangeTypeName}}
              br
              span {{item.changeAmount}}
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
      active: 0,
      timeline: "今天",
      show: false,
      show2: false,
      accountChangeType: 100,
      betweenType: 1,
      accountChangeTypeName: "",
      changeAmount: "",
      changeTime: "",
      tradelist: [],
      accountName: "",
      usertype: 2,
      highbet: 0,
      rebateratio: 0,
      betlist: [],
      validtime: 0,
      extaddress: "",
      invitelist: "",
      selected: [],
      showFlag: true,
      pagelist: [
        {
          name: "所有类型",
          Type: 100,
          callback: this.print
        },
        {
          name: "提现记录",
          Type: 1,
          callback: this.print
        },
        {
          name: "充值记录",
          Type: 2,
          callback: this.print
        }
      ],
      actions: [
        {
          name: "今天",
          Type: 1,
          callback: this.onClick
        },
        {
          name: "昨天",
          Type: 2,
          callback: this.onClick
          //   subname: '描述信息'
        },
        {
          name: "七天",
          Type: 3,
          callback: this.onClick,
          loading: false
        }
      ]
    };
  },
  mounted() {
    this.getTradeList();
  },
  methods: {
    hide(){
      this.show=!this.show;
    },
    listStyleToSafety(){
      this.$router.push('/agency')
    },
    onClick(item) {
      this.timeline = item.name;
      this.betweenType = item.Type;
      this.show = !this.show;
      this.getTradeList();
    },
    print(index, item) {
      this.active = index;
      this.accountChangeType = item.Type;
      this.getTradeList();
    },
    getTradeList() {
      if (this.accountName == "") {
        this.$axios
          .get(this.$store.state.url + "api/proxy/getTradeList", {
            params: {
              account: this.username,
              include: 2,
              accountChangeType: this.accountChangeType,
              betweenType: this.betweenType
            }
          })
          .then(res => {
            this.tradelist = res.data.data.list;
          })
          .catch(error => {
            console.log("获取彩種ratio ERROR");
          });
      } else {
        this.$axios
          .get(this.$store.state.url + "api/proxy/getTradeList", {
            params: {
              account: this.accountName,
              include: 0,
              accountChangeType: this.accountChangeType,
              betweenType: this.betweenType
            }
          })
          .then(res => {
            this.tradelist = res.data.data.list;
          })
          .catch(error => {
            console.log("获取彩種ratio ERROR");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
</style>