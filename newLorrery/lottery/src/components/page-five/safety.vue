<template>
  <div class="safety">
    <ul>
      <li @click="$router.push('/safety/reviseLoginPwd')">
        <span>修改登陆密码</span>
        <span>修改<i class="iconfont icon-you"></i></span>
      </li>
      <router-link tag="li" :to="securityCoe ? '/safePassword/revisePassword' : '/safePassword/setPassword'">
        <span>{{securityCoe ? '已' : '未'}}设置安全密码</span>
        <span>{{securityCoe ? '修改' : '设置'}}<i class="iconfont icon-you"></i></span>
      </router-link>
      <router-link tag="li" :to="mobile ? '/safePhone/revisePhone' : '/safePhone/setPhone'">
        <span>{{mobile ? '已' : '未'}}设置密保手机</span>
        <span>{{mobile ? '修改' : '设置'}}<i class="iconfont icon-you"></i></span>
      </router-link>
      <router-link tag="li" :to="question ? '/safeQuestion/reviseQuestion' : '/safeQuestion/setQuestion'">
        <span>{{question ? '已' : '未'}}设置密保问题</span>
        <span>{{question ? '修改' : '设置'}}<i class="iconfont icon-you"></i></span>
      </router-link>
      <router-link tag="li" :to="email ? '/safeMail/reviseMail' : '/safeMail/setMail'">
        <span>{{email ? '已' : '未'}}设置密保邮箱</span>
        <span>{{email ? '修改' : '设置'}}<i class="iconfont icon-you"></i></span>
      </router-link>
      <router-link tag="li" to="/safety/manageBank">
        <span>银行卡管理</span>
        <span>设置<i class="iconfont icon-you"></i></span>
      </router-link>
      <li>
        <span>退出登录</span><i class="iconfont icon-you"></i>
      </li>
    </ul>
  </div>
</template>
ln -s app/software/nodejs/bin/npm /usr/local/bin
ln -s app/software/nodejs/bin/node /usr/local/bin
<script>
import { securityCenterStatus } from '@/api'
export default {
  name: 'safety',
  data () {
    return {
      securityCoe: '',
      mobile: '',
      question: '',
      email: ''
    }
  },
  created () {
    this.getSecurityCenterStatus()
  },
  methods: {
    async getSecurityCenterStatus () {
      let data = await securityCenterStatus()
      let tempData = data.data.data
      // this.email = tempData.email
      // this.mobile = tempData.mobile
      // this.question = tempData.question
      this.securityCoe = tempData.securityCoe
    }
  }
}
</script>

<style scoped lang="scss">
.safety{
  ul {
    li {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e8e8e8;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
