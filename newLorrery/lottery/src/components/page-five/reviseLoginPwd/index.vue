<template>
  <div class="reviseLoginPwd">
    <div class="input_box">
      <span>原始密码</span>
      <input type="password" placeholder="请输入当前所使用的密码" v-model="inputValue" v-focus>
    </div>
    <div class="btn_wrap">
      <button @click="reviseLoginPwd">确定</button>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { validOldLoginPassword } from '@/api'
export default {
  name: 'index',
  data () {
    return {
      inputValue: ''
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      console.log(123)
    })
  },
  methods: {
    reviseLoginPwd () {
      if (this.inputValue) {
        let formData = new FormData()
        formData.append('oldPassword', md5(this.inputValue))
        validOldLoginPassword(formData).then(data => {
          let rescult = data.data.data
          if (rescult.message) {
            this.$parent.$refs['model'].modelText = rescult.message
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log(this.$parent.$refs['model'].flag)
      }
    }
  },
  watch: {
    '$router' () {
      this.$nextTick(() => {
        console.log(123)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.reviseLoginPwd {
  .input_box {
    margin-top: 20px;
    height: 60px;
    background: #fff;
    padding: 0 20px;
    line-height: 60px;
    input {
      width: 200px;
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
    }
  }
  .btn_wrap {
    padding: 0 20px;
    margin-top: 40px;
    button {
      display: block;
      width: 100%;
      background: #F94E4E;
      color: #fff;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
