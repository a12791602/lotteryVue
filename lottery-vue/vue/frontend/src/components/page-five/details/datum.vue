<template lang="jade">
.datum
  ul.datum-top
    li(@click='show = !show')
      p 头像
      div
        img(:src='"@/assets/img/one/"+image+".jpg"', alt='')
        i.iconfont.icon-you
    li
      p 昵称
      div
        input(type='text',placeholder='请设置昵称', v-model='nickname', value='nickname',ref='isnickname',@blur='nickNameFocus', @focus='nickNameFocus', v-show='isnicknameto')
        p {{nickname}}
        i.iconfont.icon-you(v-show='!nickname')
    li
      p 账号
      div
        p {{username}}
  actionSheet(v-model='show', title='修改头像',@hide='hide')
    .datum-img
      p 预览
      img(:src='imgUrl ? imgUrl : imgsrc')
      p {{imgName ? imgName : '小姐姐'}}
    .datum-img-box
      .datum-hide
        ul.datum-imgs
          li(v-for='(img,index) in imgs', :key='index')
            img(:src='"@/assets/img/one/"+img.paths+".jpg"', @click.stop='tonickname(img,$event,index)')
    .datum-but
      button(@click='saveImg') 保存头像
      button(@click='show = !show') 取消
  ul.datum-btn
    li
      p 手机
      div
        router-link(v-if='mobile === null', to='setmobile') {{ mobile === null ? '未设置' : 'mobile' }}
        span {{mobile}}
        i.iconfont.icon-you(v-show=' !mobile')
    li
      p 邮箱
      div
        router-link(v-if='email === null', to='setemail') {{ email === null ? '未设置' : email }}
        span {{email}}
        i.iconfont.icon-you(v-show=' !email')
    li
      p 性别
      div
        select(v-model='sex', @change='selecteds($event)')
          option(v-for='(sexs,index) in sexlist', :key='index', :value='index') {{sexs}}
        i.iconfont.icon-you
    li
      p 生日
      div
        p
          input(type='date',v-model='birthday',@change='toBirthday')
        i.iconfont.icon-you
</template>
<script>
import { setStore, getStore, removeStore } from "../../../config/mutil";
import actionSheet from "../../public/actionSheet";
export default {
  components: {
    actionSheet
  },
  data() {
    return {
      username:localStorage.getItem('Globalname'),
      isnicknameto: false,
      input: false,
      show: false,
      imgName: "",
      userImg: "",
      imgUrl: "",
      imgindex: 0, //头像ID
      image: 0, //用户头像ID
      nickname: "", //昵称
      sex: 0, //性别ID
      mobile: null, //手机号码
      email: null, //邮箱
      birthday: "", //生日
      nicknameShow1: true,
      nicknameShow2: false,
      imgsrc: require("@/assets/img/one/0.jpg"),
      sexlist: ["保密", "男", "女"],
      imgs: [
        { name: "小姐姐", paths: 0 },
        { name: "杰森斯坦森", paths: 1 },
        { name: "金莎", paths: 2 },
        { name: "高圆圆", paths: 3 },
        { name: "迪丽热巴", paths: 4 },
        { name: "黄宗泽", paths: 5 },
        { name: "肌肉男", paths: 6 },
        { name: "刘德华", paths: 7 },
        { name: "李冰冰", paths: 8 },
        { name: "苏有朋", paths: 9 },
        { name: "贝克汉姆", paths: 10 },
        { name: "谢霆锋", paths: 11 },
        { name: "李敏镐", paths: 12 },
        { name: "郑伊健", paths: 13 },
        { name: "全智贤", paths: 14 },
        { name: "李小龙", paths: 15 },
        { name: "李连杰", paths: 16 },
        { name: "小妹妹", paths: 17 },
        { name: "特朗普", paths: 18 },
        { name: "葛优", paths: 19 },
        { name: "文章", paths: 20 },
        { name: "赵薇", paths: 21 },
        { name: "张学友", paths: 22 },
        { name: "陈小春", paths: 23 },
        { name: "林心如", paths: 24 },
        { name: "吴奇隆", paths: 25 },
        { name: "张一山", paths: 26 },
        { name: "钟汉良", paths: 27 },
        { name: "波多野结衣", paths: 28 },
        { name: "赵丽颖", paths: 29 },
        { name: "王宝强", paths: 30 },
        { name: "朱茵", paths: 31 },
        { name: "科比", paths: 32 }
      ],
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    hide(){
      this.show=!this.show;
    },
    //生日选择
    toBirthday() {
      this.saveUserData();
    },
    //性别选择
    selecteds(e) {
      this.sex = e.target.value;
      this.$store.state.sex = this.sex;
      setStore("sex", this.$store.state.sex);
      this.saveUserData();
    },
    //昵称
    nickNameFocus() {
      if (this.$refs.isnickname.value === "") {
        this.isnicknameto = true;
      } else if (this.$refs.isnickname.value !== "") {
        this.nickname = this.$refs.isnickname.value;
        this.$store.state.nickname = this.nickname;
        setStore("nickname", this.$store.state.nickname);
        this.saveUserData();
      }
    },
    //提交个人信息
    saveUserData() {
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("nickName", this.nickname);
      formData.append("sex", this.sex);
      formData.append("birthday", this.birthday);
      this.$axios
        .post(
          this.$store.state.url + "api/userCenter/saveUserData",
          formData,
          config
        )
        .then(res => {
          if (this.$refs.isnickname.value !== "") {
            this.isnicknameto = false;
          }
        })
        .catch(error => {
          console.log("用户信息保存失败");
        });
    },
    //获取个人信息
    getUserData() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getUserData")
        .then(res => {
          this.image = res.data.data.image;
          this.nickname = res.data.data.nickName;
          if (!res.data.data.nickName) {
            this.isnicknameto = true;
          }
          this.mobile = res.data.data.mobile;
          this.email = res.data.data.email;
          if (res.data.data.sex !== null) {
            this.sex = res.data.data.sex;
          }
          if (res.data.data.sex !== null) {
            this.birthday = res.data.data.birthday;
          }
        })
        .catch(error => {
          console.log("获取个人信息No");
        });
    },
    //头像选择与编辑
    tonickname(img, event, index) {
      this.imgName = img.name;
      this.imgUrl = require("@/assets/img/one/" + img.paths + ".jpg");
      this.imgindex = index;
      localStorage.setItem("image", this.imgindex);
      this.image = localStorage.getItem("image");
      this.saveUserData();
    },
    //头像选择与提交
    saveImg() {
      this.userImg = this.imgUrl;
      this.show = !this.show;
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
@import "../../../assets/scss/page-five/details/datum.scss";
</style>