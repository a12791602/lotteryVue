import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home/home.vue'
import one from '@/components/home/one.vue'
import betk3 from '@/components/lotter-all/lotterbet/betk3.vue'
import betssc from '@/components/lotter-all/lotterbet/betssc.vue'
import betbj10 from '@/components/lotter-all/lotterbet/betbj10.vue'
import second from '@/components/home/second.vue'
import three from '@/components/home/three.vue'
import four from '@/components/home/four.vue'
import five from '@/components/home/five.vue'
import winning from '@/components/page-four/winning.vue'

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: "/AppDown",
      name: 'AppDown',
      component: resolve => require(['@/components/public/AppDown.vue'], resolve),
      meta: {
        title: '空白',
      }
    },
    {
      path: "/login",
      name: 'login',
      component: resolve => require(['@/components/login/login.vue'], resolve),
      meta: {
        title: '登陆',
        keepAlive: false,
        index:1
      }
    },
    {
      path: "/registered",
      name: 'registered',
      component: resolve => require(['@/components/login/registered.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/reset",
      name: 'reset',
      component: resolve => require(['@/components/login/reset.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/resetpwd",
      name: 'resetpwd',
      component: resolve => require(['@/components/login/resetpwd.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/resetway",
      name: 'resetway',
      component: resolve => require(['@/components/login/resetway.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/verifyPwdSafe",
      name: 'verifyPwdSafe',
      component: resolve => require(['@/components/login/verifyPwdSafe.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/pk10",
      name: "betbj10",
      component: betbj10,
      // component: resolve => require(['@/components/lotter-all/lotterbet/betbj10.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/betbjkl8",
      name: 'betbjkl8',
      component: resolve => require(['@/components/lotter-all/lotterbet/betbjkl8.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/k3",
      name: 'betk3',
      component:betk3,
      // component: resolve => require(['@/components/lotter-all/lotterbet/betk3.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/ssc",
      name: 'betssc',
      component:betssc,
      // component: resolve => require(['@/components/lotter-all/lotterbet/betsyx5.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/x11x5",
      name: 'betsyx5',
      component: resolve => require(['@/components/lotter-all/lotterbet/betsyx5.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/lotterList',
      name: 'lotterList',
      redirect: 'lotterList/lotterAll',
      component: resolve => require(['@/components/lotter-all/lotterList.vue'], resolve),
      meta: {
        keepAlive: true
      },
      children: [{
          path: 'lotterAll',
          name: 'lotterAll',
          component: resolve => require(['@/components/lotter-all/lotterAll.vue'], resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'k3s',
          name: 'k3s',
          component: resolve => require(['@/components/lotter-all/k3.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'sscs',
          name: 'sscs',
          component: resolve => require(['@/components/lotter-all/ssc.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'etfs',
          name: 'etfs',
          component: resolve => require(['@/components/lotter-all/etf.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'klcs',
          name: 'klcs',
          component: resolve => require(['@/components/lotter-all/klc.vue'], resolve),
          meta: {
            keepAlive: true
          },
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      redirect: 'one',
      component:home,
      // component: resolve => require(['@/components/home/home.vue'], resolve),
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: 'one',
          name: 'one',
          component:one,
          // component: resolve => require(['@/components/home/one.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'second',
          name: 'second',
          component:second,
          // component: resolve => require(['@/components/home/second.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'second/past',
          name: 'past',
          component: resolve => require(['@/components/page-second/past.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'three',
          name: 'three',
          component:three,
          // component: resolve => require(['@/components/home/three.vue'], resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'four',
          name: 'four',
          redirect: 'four/winning',
          component:four,
          // component: resolve => require(['@/components/home/four.vue'], resolve),
          meta: {
            keepAlive: false
          },
          children: [{
              path: 'winning',
              name: 'winning',
              // component:winning,
              component: resolve => require(['@/components/page-four/winning.vue'], resolve),
              meta: {
                keepAlive: true
              }
            },
            {
              path: 'profit',
              name: 'profit',
              component: resolve => require(['@/components/page-four/profit.vue'], resolve),
              meta: {
                keepAlive: true
              }
            }
          ]
        },
        {
          path: 'five',
          name: 'five',
          component:five,
          // component: resolve => require(['@/components/home/five.vue'], resolve),
          meta: {
            keepAlive: false
          }
        },
      ]
    },
    {
      path: '/safety',
      name: 'safety',
      component: resolve => require(['@/components/page-five/safety.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/verifyPwd',
      name: 'verifyPwd',
      component: resolve => require(['@/components/page-five/safety/verifyPwd.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/setPwd',
      name: 'setPwd',
      component: resolve => require(['@/components/page-five/safety/setPwd.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/verifySafePwd',
      name: 'verifySafePwd',
      component: resolve => require(['@/components/page-five/safety/verifySafePwd.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/changeSafePwd',
      name: 'changeSafePwd',
      component: resolve => require(['@/components/page-five/safety/changeSafePwd.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/safeMobile',
      name: 'safeMobile',
      component: resolve => require(['@/components/page-five/safety/safeMobile.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/safeEmail',
      name: 'safeEmail',
      component: resolve => require(['@/components/page-five/safety/safeEmail.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/setSafePwd',
      name: 'setSafePwd',
      component: resolve => require(['@/components/page-five/safety/setSafePwd.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/resetWay',
      name: 'resetWay',
      component: resolve => require(['@/components/page-five/safety/resetWay.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/setQuestion',
      name: 'setQuestion',
      component: resolve => require(['@/components/page-five/safety/setQuestion.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/safeQuestion',
      name: 'safeQuestion',
      component: resolve => require(['@/components/page-five/safety/safeQuestion.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/profits',
      name: 'profits',
      component: resolve => require(['@/components/page-five/profit.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/mymsg',
      name: 'mymsg',
      redirect: 'mymsg/notice',
      component: resolve => require(['@/components/page-five/mymsg.vue'], resolve),
      meta: {
        keepAlive: false
      },
      children: [{
          path: 'notice',
          name: 'notice',
          component: resolve => require(['@/components/page-five/mymsg/notice.vue'], resolve),
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'letter',
          name: 'letter',
          component: resolve => require(['@/components/page-five/mymsg/letter.vue'], resolve),
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      redirect: 'detail/datum',
      component: resolve => require(['@/components/page-five/detail.vue'], resolve),
      meta: {
        keepAlive: false
      },
      children: [{
          path: 'datum',
          name: 'datum',
          component: resolve => require(['@/components//page-five/details/datum.vue'], resolve),
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'title',
          name: 'title',
          component: resolve => require(['@/components/page-five/details/title.vue'],resolve),
          meta: {
            keepAlive: false
          }
        },

      ]
    },
    {
      path: '/agency',
      name: 'agency',
      component: resolve => require(['@/components/page-five/agency.vue'],resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/agentIntro',
      name: 'agentIntro',
      component: resolve => require(['@/components/page-five/agency/agentIntro.vue'],resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/agentReport',
      name: 'agentReport',
      component: resolve => require(['@/components/page-five/agency/agentReport.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/lowerReport',
      name: 'lowerReport',
      component: resolve => require(['@/components/page-five/agency/lowerReport.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/manageInvite',
      name: 'manageInvite',
      component: resolve => require(['@/components/page-five/agency/manageInvite.vue'], resolve),
      meta: {
        keepAlive: false
      },
      redirect: 'manageInvite/mInvite',
      children: [{
          path: 'mInvite',
          name: 'mInvite',
          component: resolve => require(['@/components/page-five/agency/manageInvite/mInvite.vue'], resolve),
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'mIcode',
          name: 'mIcode',
          component: resolve => require(['@/components/page-five/agency/manageInvite/mIcode.vue'], resolve),
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/agentMember',
      name: 'agentMember',
      component: resolve => require(['@/components/page-five/agency/agentMember.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/agentBetRecord',
      name: 'agentBetRecord',
      component: resolve => require(['@/components/page-five/agency/agentBetRecord.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/agentBillRecord',
      name: 'agentBillRecord',
      component: resolve => require(['@/components/page-five/agency/agentBillRecord.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/detail/setmobile',
      name: 'setmobile',
      component: resolve => require(['@/components//page-five/details/setmobile.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/detail/setemail',
      name: 'setemail',
      component: resolve => require(['@/components//page-five/details/setemail.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/bet',
      name: 'bet',
      component: resolve => require(['@/components/page-five/money/bet.vue'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/trade',
      name: 'trade',
      component: resolve => require(['@/components/page-five/money/trade.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/bankcharge',
      name: 'bankcharge',
      component: resolve => require(['@/components/page-five/money/bankcharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/weixincharge',
      name: 'weixincharge',
      component: resolve => require(['@/components/page-five/money/weixincharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/weixinbcharge',
      name: 'weixinbcharge',
      component: resolve => require(['@/components/page-five/money/weixinbcharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/creditccharge',
      name: 'creditccharge',
      component: resolve => require(['@/components/page-five/money/creditccharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/huabeicharge',
      name: 'huabeicharge',
      component: resolve => require(['@/components/page-five/money/huabeicharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/alipaycharge',
      name: 'alipaycharge',
      component: resolve => require(['@/components/page-five/money/alipaycharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/rechargeserch',
      name: 'rechargeserch',
      component: resolve => require(['@/components/page-five/money/rechargeserch.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/getCards',
      name: 'getCards',
      component: resolve => require(['@/components/page-five/safety/getCards.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/newCard',
      name: 'newCard',
      component: resolve => require(['@/components/page-five/safety/newCard.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/cashOut',
      name: 'cashOut',
      component: resolve => require(['@/components/page-five/money/cashOut.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/agencyOut',
      name: 'agencyOut',
      component: resolve => require(['@/components/page-five/money/agencyOut.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },{
      path: '/agencyOuts',
      name: 'agencyOuts',
      component: resolve => require(['@/components/page-five/money/agencyOuts.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/service',
      name: 'service',
      component: resolve => require(['@/components/page-five/service.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/payway',
      name: 'payway',
      component: resolve => require(['@/components/page-five/money/payway.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/onlinecharge',
      name: 'onlinecharge',
      component: resolve => require(['@/components/page-five/money/onlinecharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/alimobilecharge',
      name: 'alimobilecharge',
      component: resolve => require(['@/components/page-five/money/alimobilecharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/qqcharge',
      name: 'qqcharge',
      component: resolve => require(['@/components/page-five/money/qqcharge.vue'], resolve),
      meta: {
        keepAlive: false
      },
    },
  ]
})
