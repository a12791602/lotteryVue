<template>
  <div class="revisePassword">
    <div class="input_wrap">
      <span>安全密码</span><input type="password" placeholder="请输入当前所使用的安全密码" :maxlength="len" v-model="inputValue" required="required" />
    </div>
    <div class="btn_wrap">
      <button @click="setSafeCode">确认</button>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { reviseSecurityCode } from '@/api'
export default {
  name: 'revisePassword',
  data () {
    return {
      inputValue: '',
      len: 6
    }
  },
  methods: {
    setSafeCode () {
      if (!this.inputValue) {
        return
      }
      if (this.inputValue.length !== this.len) {
        return
      }
      let formData = new FormData()
      formData.append('oldPassword', md5(this.inputValue))
      reviseSecurityCode(formData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.revisePassword {
  .input_wrap{
    padding: 0 20px;
    height: 50px;
    background: #fff;
    line-height: 50px;
    input {
      padding-left: 10px;
      margin-left: 15px;
      height: 40px;
      width: 50%;
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
