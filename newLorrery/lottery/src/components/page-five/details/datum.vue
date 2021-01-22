<template>
  <div class="datum">
    <div class="info">
      <div class="list" @click="getImg">
        <span>头像</span>
        <span style="display: flex;align-items: center">
          <img :src="image" alt="" width="50" height="50">
          <i class="iconfont icon-you"></i>
        </span>
      </div>
      <div class="list">
        <span>昵称</span>
        <span></span>
      </div>
      <div class="list">
        <span>账号</span>
        <span>{{userId}}</span>
      </div>
    </div>
    <div class="info">
      <div class="list">
        <span>手机</span>
        <span></span>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="list">
        <span>邮箱</span>
        <span></span>
      </div>
      <div class="list">
        <span>性别</span>
        <span></span>
        <i class="iconfont icon-you"></i>
      </div>
      <div class="list">
        <span>生日</span>
        <span></span>
        <i class="iconfont icon-you"></i>
      </div>
    </div>
    <div :class="['selectWrap', isShow ? 'active' : '']">
      <h6>修改头像 <i class="iconfont icon-cuo" @click="isShow = false"></i></h6>
      <div class="view">
        <h5>预览</h5>
        <img :src='"./../../../../static/actor/"+currentImg.paths+".jpg"' alt="" width="130" height="130">
        <h4>{{currentImg.name}}</h4>
      </div>
      <div class="img_wrap">
        <ul>
          <li v-for="(item, index) in imgSrcs" :key="index">
            <img :src='"@/assets/img/one/"+item.paths+".jpg"' alt="" @click="selectImg(item)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="btn_wrap">
        <button class="save btn">保存头像</button>
        <button class="cancel btn">取消</button>
      </div>
    </div>
    <div class="overly" v-show="isShow" @click="isShow = false"></div>
  </div>
</template>

<script>
import { getUserInfo } from '../../../api'

export default {
  name: 'datum',
  data () {
    let name = ['小姐姐', '杰森斯坦森', '金莎', '高圆圆', '迪丽热巴', '黄宗泽', '肌肉男', '刘德华', '李冰冰', '苏有朋', '贝克汉姆', '谢霆锋', '李敏镐', '郑伊健', '全智贤', '李小龙', '李连杰', '小妹妹', '特朗普', '葛优', '文章', '赵薇', '张学友', '陈小春', '林心如', '吴奇隆', '张一山', '钟汉良', '波多野结衣', '赵丽颖', '王宝强', '朱茵', '科比']
    return {
      imgSrcs: name.map((v, i) => ({ name: v, paths: i })),
      currentImg: { name: '小姐姐', paths: 0 },
      isShow: false,
      image: '',
      userId: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getUserInfo().then(res => {
        let data = res.data.data
        this.image = data.image
        this.userId = data.userId
      })
    },
    getImg () {
      this.isShow = true
    },
    selectImg (item) {
      this.currentImg = item
      this.image = `./../../../static/actor/${item.paths}.jpg`
    }
  }
}
</script>

<style scoped lang="scss">
.datum {
  height: 100%;
  overflow-y: hidden;
  .info {
    .list {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #E8E8E8;
      font-size: 16px;
      background: #fff;
    }
  }
  .selectWrap {
    padding: 10px 20px;
    z-index: 10;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    transform: translateY(100%);
    &.active {
      transform: translateY(0);
      transition: all 0.2s ease-in;
    }
    h6 {
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      position: relative;
      i {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 20px;
      }
    }
    .view {
      text-align: center;
      margin-bottom: 10px;
      h5 {
        font-size: 14px;
        line-height: 26px;
    }
      img {
        margin: 0 auto;
        border-radius: 4px;
      }
    }
    .img_wrap{
      width: 80%;
      margin: 0 auto;
      overflow-x: scroll;
      ul {
        display: flex;
        li {
          margin: 0 6px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 6px;
          }
        }
      }
    }
    .btn_wrap {
      margin-top: 15px;
      text-align: center;
      button {
        display: inline-block;
        width: 132px;
        height: 32px;
        font-size: 16px;
        color: #fff;
        line-height: 32px;
        border-radius: 6px;
        &.save {
          background: #F94E4E;
        }
      }
    }
  }
}
</style>
