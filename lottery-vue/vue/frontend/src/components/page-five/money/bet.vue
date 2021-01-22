<template lang="jade">
.listStyle
  .listStyle-top
    i.iconfont.icon-left(@click='banckto')
    p 投注记录
    .dim(@click='show = ! show')
      | {{timeline}}
      span.iconfont.icon-xia
  .listStyle-content
    .listStyle-content-top
      actionSheet.mIcode-go(v-model='show', :actions='actions', cancel-text='取消',@hide='hide')
    ul.noVanTabs
      li(:class='index === active ? "active" : ""',v-for='(item,index) in pagelist', :key='index',@click='print(index,item)') {{item.name}}
    div
      ul.listStyle-I(v-show='showFlag')
        li(v-for='(item,index) in tradelist', :key='index', @click='select(item,$event)')
          .mInvite-left
            p
              span {{item.lotteryName}} - ￥{{item.amount}}
              br
              span
              | {{item.createTime}}
          .mInvite-right
            p
              span(v-bind:class="{'class-a': item.status===1, 'class-b': item.status===2}") {{item.statusName}}
              br
              span(v-bind:class="{'class-a': item.status===1, 'class-b': item.status===2}") {{item.win}}
          i.iconfont.icon-xia
    actionSheet(v-model='show2',@hide='hide')
      ul.listStyle-II
        li
          span {{selected.lotteryName}}
        li
          p 第{{selected.seasonId}}期
          p(v-bind:class="{'class-a': selected.status===1, 'class-b': selected.status===2}") {{selected.statusName}}
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
          span.selectedplayName {{selected.content}}
        li
          p 玩法
          span {{selected.playName}}
        li
          .button
            button.button4(@click='show3 =! show3') 撤单
        li
          .button
            button.button1(@click='show2 =! show2') 确定
  div.show(v-show="show3")
    ul
      .title
        p 温馨提示！
      .cont
        p 确定要将此单撤回?
      .but
        button.del.active(@click='cancelLottery(selected.id,selected.lotteryId)') 确定
        button.nodel(@click='show3 = !show3') 取消
</template>
<script>
import actionSheet from "../../public/actionSheet";
export default {
  components: {
    actionSheet
  },
  data() {
    return {
      username: localStorage.getItem("Globalname"),
      active: 0,
      timeline: "今天",
      show: false,
      show2: false,
      show3: false,
      accountChangeType: 100,
      betweenType: 1,
      status: 100,
      changeAmount: "",
      changeTime: "",
      tradelist: [],
      usertype: 2,
      highbet: 0,
      rebateratio: 0,
      betlist: [],
      validtime: 0,
      extaddress: "",
      content: "",
      invitelist: "",
      selected: [],
      showFlag: true,
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
    hide() {
      this.show = false;
      this.show2 = false;
    },
    //返回到上一次进来的页面
    banckto() {
      this.$router.go(-1);
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
      this.status = item.Type;
      this.getTradeList();
    },
    cancelLottery(a, b) {
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("lotteryId", b);
      formData.append("ids", a);
      this.$axios
        .post(this.$store.state.url + "api/lottery/cancel", formData, config)
        .then(res => {
          this.getTradeList();
          this.show3 = false;
          this.show2 = false;
        })
        .catch(error => {
          console.log(error);
          console.log("撤單ERROR");
        });
    },
    getTradeList() {
      console.log(this.status, this.betweenType)
      this.$axios
        .get(this.$store.state.url + "api/proxy/getbetOrderList", {
          params: {
            account: this.username,
            include: 0,
            status: this.status,
            betweenType: this.betweenType,
            start:0,
            limit:100
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
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
@import "../../../assets/scss/popcorn.scss";
@import "../../../assets/scss/page-five/public.scss";
.class-a {
  color: rgb(255, 74, 74) !important;
}
.class-b {
  color: rgb(89, 168, 93) !important;
}
</style>
