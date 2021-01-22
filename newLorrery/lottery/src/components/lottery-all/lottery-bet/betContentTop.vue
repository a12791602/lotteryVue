<template>
  <div class="betContentTop">
    <headers class="betssc-top">
      <ul slot="headerTitle">
        <li>
          <i class="iconfont icon-left"></i>
        </li>
        <li>
          <span class="titles" @click="show = !show">{{titles}}</span>
        </li>
        <li>
          <span>{{$route.query.name}}</span>
        </li>
      </ul>
    </headers>
    <div class="betk3-content-top">
      <div class="content-left" @click="isShow = true">
        <p>{{lastSeasonId}}期开奖号码</p>
        <div :class="['lotterys', isShow ? '' : 'arrow']">
          <span v-for="(item, index) in balls" :key="index">{{item}}</span>
        </div>
      </div>
      <div class="content-right">
        <p>{{seasonId}}期投注截止</p>
        <p>{{time | initSfm}}</p>
      </div>
      <div class="lotterys_history" v-show="isShow">
        <ul>
          <li>
            <div>期号</div><div>开奖号码</div><div>开奖时间</div>
          </li>
          <li v-for="(item, index) in lotterysHistory" :key="index">
            <div>{{item.seasonId}}</div>
            <div><span v-for="(lottery, index) in item.lotteryBalls" :key="index" :class="lottery.class">{{lottery.ball}}</span></div>
            <div>{{item.openTime}}</div>
          </li>
        </ul>
        <div class="btn_wrap">
          <button @click="getPastOp(20)">查看更多</button>
          <button @click="goPast">往期开奖</button>
        </div>
      </div>
    </div>
    <div class="lottery_fix" v-show="show">
      <div class="lottery_scroll">
        <ul class="menu-list-top">
          <li v-for="(into, index) in playGroups" :key="index">
            <div class="title">{{into.title}}</div>
            <div class="menu-list-list-box">
              <div class="menu-list-list" v-for="(group, indexa) in into.groups" :key="indexa">
                <span v-for="(player, indexb) in group.players" :key="indexb" @click="k3Tab(player)">
                  <a href="javascript:;" :class="[player.id === currentGroupId ? 'active' : '']">{{player.groupName}}{{player.title}}</a>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="overly" v-show="isShow" @click="isShow = false"></div>
  </div>
</template>

<script>
import mixins from '@/utils/mixins'
import headers from '@/components/public/headers.vue'
import { getPlayTree, getCurrentSaleTime, getPastOpen } from './../../../api'
export default {
  name: 'betContentTop',
  mixins: [mixins],
  data () {
    return {
      lotteryId: '',
      ballsLen: '',
      balls: '',
      time: '',
      lastSeasonId: '',
      seasonId: '',
      playGroups: '',
      titles: '',
      show: false,
      timeOut: '',
      historyOpens: '',
      isShow: false,
      lotteryPos: [
        { name: '五星 一星 微信玩法', numArr: [0, 1, 2, 3, 4] },
        { name: '前四', numArr: [0, 1, 2, 3] },
        { name: '前三', numArr: [0, 1, 2] },
        { name: '中三', numArr: [1, 2, 3] },
        { name: '后三', numArr: [2, 3, 4] },
        { name: '前二', numArr: [0, 1] },
        { name: '后二', numArr: [3, 4] },
        { name: '龙虎和', numArr: [] }
      ],
      lotteryActiveNum: [0, 1, 2, 3, 4],
      currentGroupId: ''
    }
  },
  created () {
    this.lotteryId = this.$route.query.id
    this.getPastOp()
    this.geteServerTime()
    this.getPlayTree()
  },
  mounted () {
    let getPasInterval = setInterval(() => {
      this.getPastOp()
    }, 8000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(getPasInterval)
    })
  },
  computed: {
    lotterysHistory () {
      if (this.historyOpens.length) {
        let deepHistory = JSON.parse(JSON.stringify(this.historyOpens))
        deepHistory.forEach(v1 => {
          v1.lotteryBalls.forEach((v2, i2) => {
            if (this.lotteryActiveNum.includes(i2)) {
              v2.class = 'active'
            }
          })
        })
        return deepHistory
      }
    }
  },
  methods: {
    goPast () {
      this.$router.push({path: '/past', query: { id: this.lotteryId, name: this.$route.query.name }})
    },
    // 历史开奖记录
    getPastOp (count = 10) {
      getPastOpen({lotteryId: this.lotteryId, count}).then(res => {
        let data = res.data.data
        this.ballsLen = Object.keys(data[0]).filter(v => /^n{1}[0-9]+$/g.test(v)).length
        let nArr = Array.from({length: this.ballsLen}, (v, i) => `n${i + 1}`)
        this.balls = nArr.map(v => data[0][v])
        this.lastSeasonId = data[0].seasonId
        this.historyOpens = data.map(v1 => ({
          seasonId: v1.seasonId,
          openTime: v1.openTime.split(' ').pop(),
          lotteryBalls: nArr.map(v2 => ({ball: v1[v2], class: ''}))
        }))
      })
    },
    // 获取时间
    async geteServerTime () {
      let res = await getCurrentSaleTime(this.lotteryId)
      let data = res.data.data
      this.time = data.restSeconds
      this.seasonId = data.seasonId
      this.$store.commit('SAVESEASONID', this.seasonId)
      this.$parent.$parent.$refs['model'].flag = true
      this.$parent.$parent.$refs['model'].modelText = `${data.lastSeasonId}期已经截止<br>当前期号 <strong>${this.seasonId}</strong> <br>投注时请注意期号`
      let timeInterl = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(timeInterl)
          this.geteServerTime()
          this.$refs['model'].flag = true
        }
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timeInterl)
      })
    },
    // 玩法
    getPlayTree () {
      getPlayTree(this.lotteryId).then(res => {
        let data = res.data.data
        this.playGroups = data.playGroups
        let player = data.playGroups[2].groups[0].players[0]
        this.titles = player.fullTitle
        let firstplayer = player
        this.currentGroupId = firstplayer.id
        this.$store.commit('SAVECURRENTPLAYER', firstplayer)
        this.$store.commit('SAVEPLAYBONUSID', firstplayer.id)
        this.$store.commit('SAVEFULLTITLE', firstplayer.fullTitle)
        this.$emit('changeLoading')
      })
    },
    // 切换玩法
    k3Tab (player) {
      this.$emit('changeLoading')
      this.currentGroupId = player.id
      this.show = !this.show
      this.titles = player.fullTitle
      // this.lotteryActiveNum = this.lotteryPos.find(v => v.name.includes(player.qunName)).numArr
      this.$store.commit('SAVECURRENTPLAYER', player)
      this.$store.commit('SAVEPLAYBONUSID', player.id)
      this.$store.commit('SAVEFULLTITLE', player.fullTitle)
      this.$emit('changeLoading')
      this.$parent.reset() // 切换玩法 清除选球
    },
    lotteryBasketChange (id) {
      let player = ''
      for (let v1 in this.playGroups) {
        let groups = this.playGroups[v1].groups
        for (let v2 in groups) {
          player = groups[v2].players.find(v => v.id === id)
          if (player) {
            break
          }
        }
        if (player) {
          break
        }
      }
      this.k3Tab(player)
    }
  },
  components: {
    headers
  }
}
</script>

<style scoped lang="scss">
.betContentTop {
  .betssc-top {
    display: flex;
    align-items: center;
    height: 60px;
    background: #af3a31;
    ul{
      display: flex;
      width: 100%;
    }
    li {
      width: 33.33%;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        color: #fff;
        position: inherit;
      }
      .titles{
        display: inline-block;
        padding: 0 5px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .betk3-content-top {
    position: relative;
    display: flex;
    justify-content: space-between;
    background: #22563f;
    height: 70px;
    /*overflow: hidden;*/
    .content-left {
      width: 47%
    }
    .lotterys {
      display: flex;
      position: relative;
      flex-wrap: wrap;
      &:after {
        content: '';
        transition: all 0.2s ease-in;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 0;
        height: 0;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-top: 8px solid #78ba9e;
      }
      &.arrow:after {
        transform: rotate(180deg);
      }
      .animated{
        animation-duration:1s;animation-fill-mode:both
      }
      @keyframes zoomInDown {
        0%{opacity:0;transform:scale3d(.1,.1,.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(.55,.055,.675,.19)}
        60%{opacity:1;transform:scale3d(.475,.475,.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(.175,.885,.32,1)}
      }
      span {
        display: inline-block;
        text-align: center;
        line-height: 26px;
        width: 26px;
        height: 26px;
        margin: 0 4px;
        font-size: 14px;
        color: #caebda;
        background: #317455;
        border-radius: 100%;
        &.zoomInDown {
          animation-name:zoomInDown
        }
      }
    }
    .lotterys_history {
      top: 70px;
      background: #22563f;
      z-index: 10;
      position: absolute;
      right: 0;
      left: 0;
      padding-bottom: 15px;
      li {
        display: flex;
        line-height: 34px;
        height: 34px;
        div {
          text-align: center;
          width: 33.33%;
          color: #caebda;
          span {
            display:inline-block;
            color: #caebda;
            width: 20px;
            line-height:20px;
            height: 20px;
            border-radius:50%;
            &.active{
              color: #317455;
              background: #caebda;
            }
          }
        }
      }
    }
    .btn_wrap {
      margin-top: 5px;
      text-align: center;
      button {
        background: transparent;
        border-radius: 4px;
        color: #caebda;
        border: 1px solid #caebda;
        display: inline-block;
        width: 100px;
        height: 30px;
        line-height: 28px;
      }
    }
    p {
      color: #caebda;
    }
  }
  .lottery_fix {
    position: fixed;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 0;
    z-index: 10;
    .lottery_scroll {
      overflow-y: scroll;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      .menu-list-top {
        background: #317455;
        li {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          margin-bottom: 5px;
          .title {
            text-align: center;
            color: #f4c829;
            font-size: 16px;
            font-weight: bolder;
            width: 15%;
            margin-top: 4px;
          }
          .menu-list-list-box {
            width: 85%;
            .menu-list-list {
              span {
                display: inline-block;
                font-size: 14px;
                width: 105px;
                text-align: center;
                line-height: 24px;
                height: 28px;
                border-radius: 4px;
                margin: 4px 3px;
                a {
                  border: 2px solid rgba(255, 255, 255, 0.4);
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                  color: #eee;
                  &.active{
                    color: #f0c930;
                    border-color: #f0c930;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
