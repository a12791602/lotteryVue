<template lang="jade">
.listStyle
  .listStyle-content
    div
      ul.listStyle-IV(v-show='showFlag')
        li(v-for='(item,index) in letterlist', :key='index', @click='select(item,$event)')
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
              span.isNotices(:class='item.isRead ? "" : "active"')
    div.showBottom(v-show='show2',@click='show2 = false')
      ul.listStyle-V
        li
          span {{selected.title}}
        div(style='padding:20px 30px 0; max-height: 420px; overflow-y: scroll;', v-html='notice')
        li
          .button
            button.button1(@click='show2 = false') 确定
</template>
<script>
export default {
  data() {
    return {
      isRead:false,
      letterlist: [],
      showFlag: true,
      show2: false,
      notice: "",
      selected: "",
      content: ""
    };
  },
  mounted() {
    this.getUserNoticeList();
  },
  methods: {
    aaaaaa(){
      this.show2 = false;
    },
    select(a) {
      this.selected = a;
      a.isRead = true;
      this.getNoticeInfor(a.id);
      if(a.isRead === true){
        this.addReadNotice(a.id);
      }
      this.show2 = !this.show2;
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
          params: { type: 1,start:0,limit:10}
        })
        .then(res => {
          this.letterlist = res.data.data;
        })
        .catch(error => {
          console.log("获取彩種ratio ERROR");
        });
    },
    addReadNotice(x){
      this.$axios.get(this.$store.state.url + "api/proxy/addReadNotice", {params: { noticeId: x }})
    },
    
    getNoticeInfor(x) {
      this.$axios
        .get(this.$store.state.url + "/api/proxy/getNoticeInfor", {
          params: { id: x }
        })
        .then(res => {
          this.notice = res.data.data.content;
        })
        .catch(error => {
          console.log("获取CCCCONTENT ERROR");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
</style>