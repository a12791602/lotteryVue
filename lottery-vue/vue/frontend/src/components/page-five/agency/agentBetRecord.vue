<template lang="jade">
.listStyle
  .listStyle-top(v-bind:class='{ blur: show2 }')
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 投注明細
    .dim(@click='show = ! show')
      | {{timeline}}
      span.iconfont.icon-xia
  .listStyle-content(v-bind:class='{ blur: show2 }')
    ul.listStyle-check-top
      li
        input.input-top(size='medium', placeholder='请输入用户帐号名称', v-model='accountName', value='accountName', clearable='')
        button(@click='getTradeList')
          i.iconfont.icon-you
    .listStyle-content-top
      actionSheet.mIcode-go(v-model='show', :actions='actions', cancel-text='取消',@hide='hide')
    ul.noVanTabs
      li(:class='index === active ? "active" : ""',v-for='(item,index) in pagelist', :key='index',@click='print(index,item)') {{item.name}}
    div
      ul.listStyle-I(v-show='showFlag')
        li(v-for='(item,index) in tradelist', :key='index', @click='select(item,$event)')
          .mInvite-left
            p
              span {{item.account}} - ￥{{item.amount}}
              br
              span
              | {{item.createTime}}
          .mInvite-right
            p
              span {{item.statusName}}
              br
              span
          i.iconfont.icon-xia
        li.col(@click='reGetTradeList()',v-if='count <= betOrderAllCount',style='text-align:center')
          p 查看更多
  actionSheet(v-model='show2',@hide='hide')
    ul.listStyle-II
      li
        span {{selected.lotteryName}}
      li
        p 第{{selected.seasonId}}期
        p {{selected.statusName}}
      li
        p 投注時間
        span {{selected.createTime}}
      li
        p 投注单号
        span {{selected.id}}
      li
        p 投注金额
        span ￥ {{selected.amount}}
      li
        p 派送奖金
        span ￥ {{selected.win}}
      li
        p 开奖号码
        span {{selected.openNum}}
      li
        p 我的投注
        | {{selected.content}}
        p 玩法
        | {{selected.playName}}
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
      active: 0,
      timeline: "今天",
      show: false,
      show2: false,
      accountChangeType: 100,
      betweenType: 1,
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
      count:20,
      betOrderAllCount:'',
      pagelist: [
        {
          name: "全部",
          Type: 100,
          callback: this.print
        },
        {
          name: "已中奖",
          Type: 1,
          callback: this.print
        },
        {
          name: "未中奖",
          Type: 2,
          callback: this.print
        },
        {
          name: "等待开奖",
          Type: 6,
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
      this.show=false;
      this.show2=false;
    },
    listStyleToSafety(){
      this.$router.push('/agency')
    },
    select(a) {
      this.show2 = !this.show2;
      this.selected = a;
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
    reGetTradeList(){
      this.count = this.count +20;
      this.getTradeList();
    },
    getTradeList() {
      if (this.accountName == "") {
        this.$axios
          .get(this.$store.state.url + "api/proxy/getbetOrderList", {
            params: {
              account: this.username,
              include: 2,
              status: this.accountChangeType,
              betweenType: this.betweenType,
              start:0,
              limit: this.count,
            }
          })
          .then(res => {
            this.tradelist = res.data.data.list;
            this.betOrderAllCount = res.data.data.betOrderAllCount;
          })
          .catch(error => {
            console.log("获取彩種ratio ERROR");
          });
      } else if (this.accountName !== "") {
        this.$axios
          .get(this.$store.state.url + "api/proxy/getbetOrderList", {
            params: {
              account: this.accountName,
              include: 0,
              status: this.accountChangeType,
              betweenType: this.betweenType,
              start:0,
              limit: this.count,
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
.col {
  background:#f2f2f2 !important;
  color:#ca2a2a;
}
</style>