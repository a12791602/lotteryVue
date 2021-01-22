<template>
  <div class="mInvite">
    <div class="type_wrap left_title">
      <span>用户类型</span>
      <div class="box" v-for="(list, index) in checkBoxs" :key="index">
        <input type="radio" :value="list.userType" :id="list.type" v-model="currentUserType">
        <label :for="list.type">{{list.value}}</label>
      </div>
    </div>
    <div class="rebate_wrap left_title">
      <span>设定返点</span>
      <select v-model="currentValue">
        <option :value="num" v-for="num in rebateRatio" :key="num">{{num}}</option>
      </select>
    </div>
    <div class="load_wrap left_title">
      <span>推广渠道</span>
      <input type="text" placeholder="请输入推广渠道" v-model="inputValue">
    </div>
    <div class="btn_wrap">
      <button @click="postInviteCode">取得邀请码</button>
    </div>
  </div>
</template>

<script>
import { extQuota, inviteCode } from '@/api'
export default {
  name: 'mInvite',
  data () {
    return {
      rebateRatio: '',
      currentValue: 0,
      currentUserType: 0,
      inputValue: '',
      checkBoxs: [
        { value: '会员', type: 'member', userType: 0 },
        { value: '代理', type: 'agent', userType: 1 }
      ]
    }
  },
  created () {
    this.getEextQuota()
  },
  methods: {
    async getEextQuota () {
      let data = await extQuota()
      let rebateRatio = data.data.data.rebateRatio * 10 + 1
      this.rebateRatio = Array.from({length: rebateRatio}, (v, i) => i / 10)
    },
    postInviteCode () {
      let formData = new FormData()
      formData.append('usertype', this.currentUserType * 1)
      formData.append('rebateratio', this.currentValue * 1)
      formData.append('extaddress', 123)
      formData.append('validtime', 0)
      inviteCode(formData).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mInvite{
  .left_title{
    height: 60px;
    align-items: center;
    display: flex;
    span{
      padding-right: 20px;
    }
    .box {
      padding-right: 15px;
    }
    select, input[type='text']{
      height: 40px;
      padding-left: 10px;
    }
  }
  .btn_wrap {
    button {
      background: #F94E4E;
      display: block;
      width: 80%;
      margin: 10px auto;
      height: 40px;
      line-height: 40px;
      color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
