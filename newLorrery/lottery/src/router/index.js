import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'one',
      component: resolve => { require(['@/components/home/one.vue'], resolve) }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => { require(['@/components/login/login.vue'], resolve) }
    },
    {
      path: '/one',
      name: 'one',
      meta: {
        name: '首页',
        keepalive: true
      },
      component: resolve => { require(['@/components/home/one.vue'], resolve) }
    },
    {
      path: '/second',
      name: 'second',
      meta: {
        name: '往期开奖'
      },
      component: resolve => { require(['@/components/home/second.vue'], resolve) }
    },
    {
      path: '/three',
      name: 'three',
      meta: {
        name: '活动中心'
      },
      component: resolve => { require(['@/components/home/three.vue'], resolve) }
    },
    {
      path: '/four',
      name: 'four',
      component: resolve => { require(['@/components/home/four.vue'], resolve) }
    },
    {
      path: '/five',
      name: 'five',
      meta: {
        name: '我的'
      },
      component: resolve => { require(['@/components/home/five.vue'], resolve) }
    },
    {
      path: '/five/datum',
      name: 'datum',
      meta: {
        name: '个人资料'
      },
      component: resolve => { require(['@/components/page-five/details/datum.vue'], resolve) }
    },
    {
      path: '/five/safety',
      name: 'safety',
      meta: {
        name: '安全中心'
      },
      component: resolve => { require(['@/components/page-five/safety.vue'], resolve) }
    },
    {
      path: '/lotteryList/:id',
      name: 'lotteryList',
      component: resolve => { require(['@/components/lottery-all/lotteryList.vue'], resolve) },
      meta: {
        keepalive: true
      }
    },
    {
      path: '/lotteryBet',
      name: 'lotteryBet',
      component: resolve => { require(['@/components/lottery-all/lottery-bet/lotteryBet'], resolve) }
    },
    {
      path: '/past',
      name: 'past',
      component: resolve => { require(['@/components/lottery-all/past.vue'], resolve) }
    },
    {
      path: '/trend',
      name: 'trend',
      component: resolve => require(['@/components/lottery-all/lottery-bet/lotteryTrend.vue'], resolve)
    },
    {
      path: '/five/rechargeserch',
      name: 'rechargeserch',
      meta: {
        name: '充值信息'
      },
      component: resolve => require(['@/components/home/manage/rechargeserch/index.vue'], resolve)
    },
    {
      path: '/five/profits',
      name: 'profits',
      meta: {
        name: '今日盈亏'
      },
      component: resolve => require(['@/components/home/manage/profits/index.vue'], resolve)
    },
    {
      path: '/mymsg/:id',
      name: 'mymsg',
      component: resolve => require(['@/components/home/manage/mymsg/index.vue'], resolve)
    },
    {
      path: '/five/agency',
      name: 'agency',
      meta: {
        name: '代理中心'
      },
      component: resolve => require(['@/components/home/manage/agency/index.vue'], resolve)
    },
    {
      path: '/agency/agentMember',
      name: 'agentMember',
      meta: {
        name: '会员管理'
      },
      component: resolve => require(['@/components/home/manage/agency/agency/agentMember.vue'], resolve)
    },
    {
      path: '/agency/agentReport',
      name: 'agentReport',
      meta: {
        name: '代理报表'
      },
      component: resolve => require(['@/components/home/manage/agency/agency/agentReport.vue'], resolve)
    },
    {
      path: '/agency/lowerReport',
      name: 'lowerReport',
      meta: {
        name: '下级报表'
      },
      component: resolve => require(['@/components/home/manage/agency/agency/lowerReport.vue'], resolve)
    },
    {
      path: '/manageInvite/:id',
      name: 'manageInvite',
      component: resolve => require(['@/components/home/manage/agency/agency/manageInvite.vue'], resolve)
    },
    {
      path: '/agency/agentBetRecord',
      name: 'agentBetRecord',
      meta: {
        name: '投注明细'
      },
      component: resolve => require(['@/components/home/manage/agency/agency/agentBetRecord.vue'], resolve)
    },
    {
      path: '/agency/agentIntro',
      name: 'agentIntro',
      meta: {
        name: '代理说明'
      },
      component: resolve => require(['@/components/home/manage/agency/agency/agentIntro.vue'], resolve)
    },
    {
      path: '/agency/agentBillRecord',
      name: 'agentBillRecord',
      meta: {
        name: '交易明细'
      },
      component: resolve => require(['@/components/home/manage/agency/agency/agentBillRecord.vue'], resolve)
    },
    {
      path: '/five/betreport',
      name: 'betReport',
      meta: {
        name: '投注记录'
      },
      component: resolve => require(['@/components/home/manage/report/betReport.vue'], resolve)
    },
    {
      path: '/safety/reviseLoginPwd',
      name: 'reviseLoginPwd',
      meta: {
        name: '修改登陆密码'
      },
      component: resolve => require(['@/components/page-five/reviseLoginPwd'], resolve)
    },
    {
      path: '/safePassword/setPassword',
      name: 'setPassword',
      meta: {
        name: '设置安全密码'
      },
      component: resolve => require(['@/components/page-five/safePassword/setPassword.vue'], resolve)
    },
    {
      path: '/safePassword/revisePassword',
      name: 'revisePassword',
      meta: {
        name: '修改安全密码'
      },
      component: resolve => require(['@/components/page-five/safePassword/revisePassword.vue'], resolve)
    },
    {
      path: '/safePhone/setPhone',
      name: 'setPhone',
      meta: {
        name: '绑定密保手机'
      },
      component: resolve => require(['@/components/page-five/safePhone/setPhone.vue'], resolve)
    },
    {
      path: '/safePhone/revisePhone',
      name: 'revisePhone',
      meta: {
        name: '修改密保手机'
      },
      component: resolve => require(['@/components/page-five/safePhone/revisePhone.vue'], resolve)
    },
    {
      path: '/safeQuestion/setQuestion',
      name: 'setQuestion',
      meta: {
        name: '设置密保问题'
      },
      component: resolve => require(['@/components/page-five/safeQuestion/setQuestion.vue'], resolve)
    },
    {
      path: '/safeQuestion/reviseQuestion',
      name: 'reviseQuestion',
      meta: {
        name: '修改密保问题'
      },
      component: resolve => require(['@/components/page-five/safeQuestion/reviseQuestion.vue'], resolve)
    },
    {
      path: '/safeMail/setMail',
      name: 'setMail',
      meta: {
        name: '绑定密保邮箱'
      },
      component: resolve => require(['@/components/page-five/safeMail/setMail.vue'], resolve)
    },
    {
      path: '/safeMail/reviseMail',
      name: 'reviseMail',
      meta: {
        name: '修改密保邮箱'
      },
      component: resolve => require(['@/components/page-five/safeMail/reviseMail.vue'], resolve)
    },
    {
      path: '/safety/manageBank',
      name: 'manageBank',
      meta: {
        name: '银行卡管理'
      },
      component: resolve => require(['@/components/page-five/manageBank'], resolve)
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
