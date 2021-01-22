<template>
  <div class="notice">
    <ul>
      <li v-for="(list, index) in noticeLists" :key="index" @click="getDetailNotice(list)">
        <div class="list_left">
          <span>[{{list.id}}]</span>
          <p>发送时间 {{list.createTime}}</p>
          <h5>{{list.title}}</h5>
        </div>
        <div class="list_right">
          <span v-show="list.isRead"></span>
        </div>
      </li>
    </ul>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="notice_detail" v-show="isShow">
        <h5>{{noticeTitle}}</h5>
        <div class="notice_wrap">
          <p v-html="noticeContent"></p>
          <button @click="isShow = false">确定</button>
        </div>
      </div>
    </transition>
    <div class="overly" v-show="isShow" @click="isShow = false"></div>
  </div>
</template>

<script>
import { readNotice, noticeInfor } from '@/api'
export default {
  name: 'notice',
  data () {
    return {
      noticeTitle: '',
      noticeContent: '',
      isShow: ''
    }
  },
  props: ['noticeLists'],
  methods: {
    async getDetailNotice (list) {
      list.isRead = false
      let data = await noticeInfor(list.id)
      let tempData = data.data.data
      this.noticeTitle = tempData.title
      this.noticeContent = tempData.content
      readNotice(list.id)
      this.isShow = true
    }
  }
}
</script>

<style scoped lang="scss">
.notice{
  ul {
    li {
      padding: 0 20px;
      height: 61px;
      border-bottom: 1px solid #E8E8E8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .list_left{
        font-size: 12px!important;
        h5{
          font-size: 14px!important;
        }
      }
      .list_right {
        span {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 100%;
          background: #af3a31;
        }
      }
    }
  }
  .notice_detail {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 15;
    h5{
      height: 60px;
      background: #ff4f49;
      text-align: center;
      line-height: 60px;
      color: #fff;
    }
    .notice_wrap {
      padding: 15px;
      button {
        margin-top: 20px;
        font-size: 14px;
        display: block;
        background: #ff4f49;
        color: #fff;
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 100%;
      }
    }
  }
}
</style>
