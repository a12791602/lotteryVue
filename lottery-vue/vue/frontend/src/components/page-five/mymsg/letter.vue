<template lang="jade">
.listStyle
  .listStyle-content
    div
      ul.listStyle-IV(v-show='showFlag')
        li(v-for='(item,index) in letterlist', :key='index')
          .mInvite-left
            p
              a
                span [ {{item.id}} ]
                br
                | 发送时间 {{item.createTime}}
              br
              |  {{item.title}}
          .mInvite-right
            p
              span
</template>
<script>
export default {
  data() {
    return {
      letterlist: [],
      showFlag: true
    };
  },
  mounted() {
    this.getUserNoticeList();
  },
  methods: {
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
    print(index, title) {
      this.status = this.pagelist[index].Type;
      this.getTradeList();
    },
    getUserNoticeList() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getUserNoticeList", {
          params: {  type: 2,start:0,limit:100}
        })
        .then(res => {
          this.letterlist = res.data.data;
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
</style>