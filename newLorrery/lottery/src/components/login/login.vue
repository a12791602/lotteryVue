<template>
<div class="login">
  <div class="header">
    <i class="iconfont icon-left"></i>
    <p>用户登录</p>
  </div>
  <div class="login_bg"></div>
  <div class="login_container">
    <div class="login_form">
      <div class="input_wrap">
        <i class="iconfont icon-user"></i>
        <input type="text" placeholder="请输入用户名" v-model.trim="newUserInfo.user">
      </div>
      <div class="input_wrap">
        <i class="iconfont icon-lock"></i>
        <input :type="inputStatus.name" placeholder="请输入密码" v-model.trim="newUserInfo.pwd">
        <i :class="['iconfont pwd', inputStatus.flag ? 'icon-buxianshimima' : 'icon-guanbi']" @click="changeType"></i>
      </div>
      <div class="input_wrap">
        <i class="iconfont icon-lock"></i>
        <input type="text" placeholder="请输入验证码" v-model.trim="newUserInfo.verification">
        <img :src="captchaCodeImg" alt="" @click="getCaptchaCode" height="40" width="100">
      </div>
    </div>
    <div class="remember">
      <input type="checkbox" id="rember_code" v-model="checked">
      <label for="rember_code" @click="checkeds">
        <span>记住密码</span>
      </label>
    </div>
    <button class="login_btn" @click="submit">登陆</button>
    <div class="link_wrap">
      <a href="javascript:;">立即注册</a>|
      <a href="javascript:;">忘记密码</a>
    </div>
  </div>
  <!--<transition name="model" >-->
    <!--<model :text="tip" v-show="tip" @click.native="tip = ''"></model>-->
  <!--</transition>-->
</div>
</template>

<script>
import md5 from 'js-md5'
import model from './../public/model'
import { login } from './../../api'
import { setStorage, getStorage } from './../../storage'
export default {
  name: 'login',
  data () {
    return {
      checked: '',
      newUserInfo: {
        user: '',
        pwd: '',
        verification: '',
        rempwd: ''
      },
      inputStatus: {
        name: 'password',
        flag: true
      },
      loginSta: '',
      captchaCodeImg: '',
      tip: ''
    }
  },
  created () {
    this.getCaptchaCode()
  },
  mounted () {
    this.newUserInfo.user = getStorage('username')
    this.newUserInfo.pwd = getStorage('password')
  },
  methods: {
    getCaptchaCode () {
      this.captchaCodeImg = 'http://edu0370.com/code.jpg?_=' + new Date().getTime()
    },
    changeType () {
      this.inputStatus.flag = !this.inputStatus.flag
      this.inputStatus.name = this.inputStatus.flag ? 'password' : 'text'
    },
    submit () {
      const yzname = /^[A-Za-z][A-Za-z0-9]{6,20}$/.test(this.newUserInfo.user)
      const yzpwd = /^[A-Za-z0-9]{6,12}$/.test(this.newUserInfo.pwd)
      if (!this.newUserInfo.user) {
        this.tip = '用户名不能为空！'
        return
      } else if (!this.newUserInfo.pwd) {
        this.tip = '密码不能为空！'
        return
      } else if (!yzname) {
        this.tip = '用户名：字母开头，6-20位，包括大小字母、数字'
        return
      } else if (!yzpwd) {
        this.tip = '密码：6-12位，包括大小字母、数字'
        return
      } else {
        this.$router.push({name: 'one'})
        let config = {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }
        let formData = new FormData()
        formData.append('account', this.newUserInfo.user)
        formData.append('password', md5(this.newUserInfo.pwd))
        formData.append('code', this.newUserInfo.verification)
        login(formData, config).then(res => {
          setStorage('username', this.newUserInfo.user)
          setStorage('password', this.newUserInfo.pwd)
          let data = res.data
          console.log(res)

          this.loginSta = true
          this.$store.state.JSESSIONICookie = data.data.sessionId
          this.$store.state.userType = data.data.userType
          this.$store.state.loginStatus = this.loginSta
          setStorage('JSESSIONICookie', this.$store.state.JSESSIONICookie)
          setStorage('userType', this.$store.state.userType)
          setStorage('loginSta', this.$store.state.loginStatus)
          if (data.code === 1) {
            this.$store.state.Globalname = data.data.account
            this.$store.state.Globalword = md5(this.newUserInfo.pwd)
            setStorage('Globalname', this.$store.state.Globalname)
            setStorage('Globalword', this.$store.state.Globalword)
            this.$router.push({name: 'one'})
          }
        })
      }
      this.tip = ''
    },
    checkeds () {}
  },
  watch: {
    'checked' () {
      if (getStorage('password') && this.checked) {
        this.newUserInfo.user = getStorage('username')
        this.newUserInfo.pwd = getStorage('password')
      }
    }
  },
  components: {
    model
  }
}
</script>

<style scoped lang="scss">
.login {
  margin-top: -60px;
  height: 100%;
  background: #af3a31;
  margin-bottom: -60px;
  padding-bottom: 60px;
  .header {
    height: 56px;
    line-height: 56px;
    font-size: 24px;
    position: relative;
    .icon-left {
      position: absolute;
      color: #fff;
      font-size: 36px;
      left: 15px;
    }
    p{
      text-align: center;
      color: #fff;
    }
  }
  .login_bg {
    background: url("./../../assets/img/one/game.png") no-repeat center;
    width: 300px;
    height: 240px;
    margin: 20px auto;
  }
  .login_container{
    width: 90%;
    margin: 0 auto;
    .login_form {
      margin-bottom: 20px;
      .input_wrap {
        background: #fff;
        height: 40px;
        line-height: 40px;
        padding: 0 8px;
        position: relative;
        border-bottom: 1px solid #c6c6c6;
        img {
          position: absolute;
          right: 0;
          top: 0;
        }
        .iconfont {
          font-size: 24px;
          color: #ae9880;
        }
        .pwd {
          position: absolute;
          right: 10px;
        }
        input {
          height: 100%;
          vertical-align: top;
          margin-left: 10px;
        }
      }
    }
    .remember {
      span {
        color: #fff;
      }
    }
    .login_btn {
      width: 100%;
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 18px;
      background: #F94E4E;
      margin: 15px 0;
      border-radius: 6px;
    }
    .link_wrap {
      text-align: center;
      color: #fff;
      a {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>
