<template lang="jade">
.setQuestion
  .setQuestion-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 设置密保问题
    span
  .setQuestion-input
    div
      p 问题一
      select(v-model='title1', @change='selecteds1($event)')
        option(v-for='(item,index) in options', :key='index', :value='item.value') {{item.label}}
    div
      p 答案：
      input(type='text', v-model='answer1', v-focus='')
  .setQuestion-input
    div
      p 问题二
      select(v-model='title2', @change='selecteds2($event)')
        option(v-for='(item,index) in options', :key='index', :value='item.value') {{item.label}}
    div
      p 答案：
      input(type='text', v-model='answer2')
  .setQuestion-but
    button(@click='setQuestion') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      content:'',
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
      answer2: "" //密保答案二
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/safety')
    },
    selecteds1(e) {
      this.title1 = e.target.value;
    },
    selecteds2(e) {
      this.title2 = e.target.value;
    },
    //设置密保问题
    setQuestion() {
      if(this.answer1 == ""){
        this.$pop.show({error:'',title:'温馨提示',content:'第一个密保答案不能为空！',content1:'',content2:'',number:2});
      }else if(this.answer2 == ""){
        this.$pop.show({error:'',title:'温馨提示',content:'第二个密保答案不能为空！',content1:'',content2:'',number:2});
      }else if(this.title1 == this.title2){
        this.$pop.show({error:'',title:'温馨提示',content:'密保问题不能相同！',content1:'',content2:'',number:2});
      }else{
        let md5answer1 = md5(this.answer1);
        let md5answer2 = md5(this.answer2);
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("title1", this.title1);
        formData.append("title2", this.title2);
        formData.append("answer1", md5answer1);
        formData.append("answer2", md5answer2);
        this.$axios
          .post(
            this.$store.state.url + "api/userCenter/setSecurityQuestion",
            formData,
            config
          )
          .then(res => {
            this.content = res.data.data.message;
            this.$pop.show({error:'',title:'温馨提示',content:res.data.data.message,content1:'',content2:'',number:2});
            setTimeout(() => {
              if (this.content === "设定成功！") {
                this.$router.push({ path: "/safety" });
              }
            }, 800);
          })
          .catch(error => {
            console.log("设置密保问题No");
          });
      }
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
@import "../../../assets/scss/page-five/safety/setQuestion.scss";
</style>