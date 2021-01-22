<template>
  <div class="setPassword">
    <div class="input_wrap">
      <span>安全密码</span><input type="password" :placeholder=" '请输入'+ len + '位数密码'" :maxlength="len" v-model="inputValue" required="required" />
    </div>
    <div class="input_wrap">
      <span>确认密码</span><input type="password" :placeholder=" '请输入'+ len + '位数密码'" :maxlength="len" v-model="confirmInputValue" required="required" />
    </div>
    <div class="btn_wrap">
      <button @click="setSafeCode">确认</button>
    </div>
  </div>
</template>

<script>
import { securityCode } from '@/api'
import md5 from 'js-md5'
export default {
  name: 'setPassword',
  data () {
    return {
      len: 6,
      inputValue: '',
      confirmInputValue: ''
    }
  },
  methods: {
    setSafeCode () {
      if (!this.inputValue) {
        console.log('密码不能为空')
        return
      }
      if (this.inputValue.length !== this.len || typeof this.inputValue * 1 === 'number') {
        console.log('不符合要求')
        return
      }
      if (this.inputValue !== this.confirmInputValue) {
        console.log('密码不一致')
        return
      }
      let formData = new FormData()
      formData.append('newPassword', md5(this.inputValue))
      formData.append('newPassword2', md5(this.confirmInputValue))
      securityCode(formData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.setPassword{
  .input_wrap{
    padding: 0 20px;
    height: 50px;
    background: #fff;
    line-height: 50px;
    input {
      padding-left: 10px;
      margin-left: 15px;
      height: 40px;
      width: 120px;
    }
  }
  .btn_wrap {
    margin-top: 40px;
    text-align: center;
    button{
      width: 80%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      background:#F94E4E ;
      border-radius: 4px;
    }
  }
}
</style>
