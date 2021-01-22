<template lang="jade">
.safeQuestion
  .safeQuestion-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 验证密保问题
    span
  .safeQuestion-input
    div
      p 问题一:
      select(v-model='title1', disabled='')
        option(v-for='(item,index) in options', :key='index', :value='item.value', disabled='') {{item.label}}
    //div
      p 答案:
      input(type='text', v-model='answer1', v-focus='')
  .safeQuestion-input
    div
      p 问题二:
      select(v-model='title2', disabled='')
        option(v-for='(item,index) in options', :key='index', :value='item.value', disabled='') {{item.label}}
    //div
      p 答案:
      input(type='text', v-model='answer2')
  .safeQuestion-but
    button(@click='setQuestion') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      content: "提示内容!", //弹窗内容
      options: [
        { value: 1, label: "您的出生地是哪里？" },
        { value: 2, label: "您高中的学校是？" },
        { value: 3, label: "您父亲的名字是？" },
        { value: 4, label: "您母亲的名字是？" },
        { value: 5, label: "您的兴趣爱好是什么？" },
        { value: 6, label: "您配偶的名字是？" },
        { value: 7, label: "您大学学校的名字是？" },
        { value: 8, label: "你的家乡是？" }
      ],
      title1: "1", //密保问题一
      title2: "1", //密保问题二
      answer1: "", //密保答案一
      answer2: "", //密保答案二
      answer3: "", //密保答案一
      answer4: "" //密保答案二
    };
  },
  mounted() {
    this.getUserSafeData();
  },
  methods: {
    listStyleToSafety(){
      this.$router.push("/safety");
    },
    //获取密保问题
    getUserSafeData() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getUserSafeData")
        .then(res => {
          this.title1 = res.data.data.title1;
          this.title2 = res.data.data.title2;
          this.answer3 = res.data.data.answer1;
          this.answer4 = res.data.data.answer2;
        })
        .catch(error => {
          console.log("获取密保问题No");
        });
    },
    //验证密保问题
    setQuestion() {
      this.$router.push("/safety")
    //   let md5answer1 = md5(this.answer1);
    //   let md5answer2 = md5(this.answer2);
    //   if (md5answer1 === this.answer3) {
    //     if (md5answer2 === this.answer4) {
    //       this.$pop.show({error:'',title:'温馨提示',content:'验证成功！',content1:'',content2:'',number:2});
    //       setTimeout(() => {
    //         if (this.content === "验证成功！") {
    //           this.$router.push({ path: "/setQuestion" });
    //         }
    //       }, 1000);
    //     }
    //   } else {
    //     this.$pop.show({error:'',title:'温馨提示',content:'验证失败！',content1:'',content2:'',number:2});
    //   }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/safety/safeQuestion.scss";
</style>