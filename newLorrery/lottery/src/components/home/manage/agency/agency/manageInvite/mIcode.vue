<template>
  <div class="mIcode">
    <div class="radio_box">
      <div v-for="(list, index) in radios" :key="index">
        <input type="radio" :id="list.id" :value="list.value" v-model="currentValue">
        <label :for="list.id">{{list.text}}</label>
      </div>
    </div>
    <ul class="code_wrap">
      <li v-for="(list, index) in codeLists" :key="index" @click="getDetailInfor(list)">
        <div>
          <h5>{{list.id}} 邀请码</h5>
          <p>{{list.code}}</p>
          <div class="test">产生时间 <span>{{list.date}}</span></div>
        </div>
        <div>
          <span>注册数 <br>({{list.count}})</span>
          <i class="iconfont icon-xia"></i>
        </div>
      </li>
    </ul>
    <div class="overly" v-show="flag" @click="flag = false"></div>
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div class="slide" v-show="flag">
        <h5>{{currentCode.id}}</h5>
        <div class="infor_wrap">
          <h6>{{currentCode.code}}</h6>
          <div class="box">
            <input type="text" :value="currentText" @focus="copyText" id="code">
          </div>
          <div class="box">
            <span>产生日期</span>
            <span>{{currentCode.date}}</span>
          </div>
          <div class="box">
            <span>注册数</span>
            <span>({{currentCode.count}})个账户</span>
          </div>
        </div>
        <div class="btn_wrap">
          <button @click="delCode">删除此邀请码</button>
          <button @click="flag = false">取消</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getInviteCode, delInviteCode } from '@/api'
export default {
  name: 'mIcode',
  data () {
    return {
      currentValue: 2,
      radios: [
        { text: '会员邀请码', value: 2, id: 'member' },
        { text: '代理邀请码', value: 1, id: 'agent' }
      ],
      currentCode: '',
      flag: false,
      codeLists: ''
    }
  },
  computed: {
    currentText () {
      return location.host + '/registered?code=' + this.currentCode.code
    }
  },
  methods: {
    async getInviteCode () {
      let data = await getInviteCode(this.currentValue)
      this.codeLists = data.data.data
    },
    getDetailInfor (list) {
      this.flag = true
      this.currentCode = list
    },
    delCode () {
      let formData = new FormData()
      formData.append('id', this.currentCode.id)
      delInviteCode(formData).then(data => {
        this.getInviteCode()
        this.flag = false
      })
    },
    copyText () {
      document.getElementById('code').select()
    }
  },
  watch: {
    currentValue: {
      handler: 'getInviteCode',
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.mIcode {
  .radio_box{
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #000;
  }
  .code_wrap {
    li {
      border-bottom: 1px solid #e8e8e8;
      height: 80px;
      align-items: center;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
    }
  }
  .slide {
    h5, h6 {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
    .infor_wrap {
      padding: 0 20px;
      .box{
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: space-between;
        input{
          height: 30px;
          border: 1px solid #eee;
          width: 100%;
        }
      }
    }
    .btn_wrap {
      padding: 0 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button{
        width: 160px;
        height: 40px;
        border-radius: 4px;
        &:first-child{
          background:#F94E4E ;
          color: #fff;
        }
      }
    }
  }
}
</style>
