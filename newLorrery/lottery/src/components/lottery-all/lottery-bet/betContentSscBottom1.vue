<template>
  <div class="betContentSscBottom">
    <div class="game_info">
      <p>{{currentPlayer.remark}} <span class="reward"> 奖金{{currentPlayer.displayBonus | keepTwoNum}}元</span> {{rebate}}</p>
    </div>
    <ul class="lottery_ball">
      <li v-for="(numViews, indexff) in currentPlayer.numView" :key="indexff">
        <div class="ball_top">
          <span class="pos">{{numViews.title}}</span>
          <div class="ball_wrap">
            <span v-for="(num, indexg) in numViews.nums" :key="indexg" :class="['ball', num.choose ? 'active' : '']" @click="curBalls({indexff, indexg, num, numViews, flag: true})">{{num.ball}}</span>
          </div>
        </div>
        <div class="ball_bottom" v-show="!isType">
          <span v-for="(item, index) in selectBalls" :key="index" @click="getTypeBall({numViews: numViews.nums, type: item.type, indexff})">{{item.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'betContentSscBottom',
  data () {
    return {
      con: '', // 已选号码
      zhu: 0, // 注数
      money: '',
      d: [], // 选中的号码的下标
      dd: [], // 选中的号码的下标 //kw wn 中间变量
      ka: [], // 选中的号码的下标
      kb: [], // 选中的号码的下标
      kc: [], // 选中的号码的下标
      kd: [], // 选中的号码的下标
      ke: [], // 选中的号码的下标
      kf: [], // 选中的号码的下标
      kg: [], // 选中的号码的下标
      kh: [], // 选中的号码的下标
      ki: [], // 选中的号码的下标
      kj: [], // 选中的号码的下标
      an: '',
      bn: '',
      cn: '',
      dn: '',
      en: '',
      fn: '',
      gn: '',
      hn: '',
      in: '',
      jn: '',
      knArr: '',
      selectBalls: [
        { name: '全', type: 1 },
        { name: '大', type: 2 },
        { name: '小', type: 3 },
        { name: '奇', type: 4 },
        { name: '偶', type: 5 },
        { name: '清', type: 6 }
      ]
    }
  },
  computed: {
    ...mapState(['currentPlayer', 'playBonusId', 'rebate']),
    isType () {
      return ['contains', 'and', 'lhh', 'dxds'].some(v => this.playBonusId.includes(v))
    },
    createKN () {
      let len = this.currentPlayer.numView.length
      return Array.from({length: len}, (v, i) => ('k' + String.fromCharCode(i + 65).toLocaleLowerCase() + '+' + String.fromCharCode(i + 65).toLocaleLowerCase() + 'n').split('+'))
    }
  },
  methods: {
    returnLotteryBall (con, zhu) {
      let conArr = con.split(',').filter(Boolean)
      if (this.currentPlayer.numView.length === 1) {
        this.d = conArr.reduce((arr, v) => (arr[v] = v, arr), [])
        let numView = this.currentPlayer.numView[0].nums
        conArr.forEach(v => {
          numView[v].choose = true
        })
      } else {
        let createKN = this.createKN
        let [kw, wn] = [createKN.map(v => v[0]), createKN.map(v => v[1])]
        conArr.forEach((v, i) => {
          this[wn[i]] = v
        })
        let conIndexArr = conArr.map(v => v.split(''))
        conIndexArr.forEach((v1, i1) => {
          v1.forEach(v2 => {
            this[kw[i1]][v2] = v2
          })
        })
        let numView = this.currentPlayer.numView
        conIndexArr.forEach((v1, i1) => {
          v1.forEach(v2 => {
            numView[i1].nums[v2].choose = true
          })
        })
      }
      this.zhu = zhu
      this.con = con
      this.$store.commit('SAVEZHU', this.zhu)
      this.$store.commit('SAVECON', this.con)
    },
    getTypeBall ({numViews, type, indexff}) {
      switch (type) {
        case 1:
          numViews.forEach(v => { v.choose = true })
          break
        case 2:
          numViews.forEach((v, i, self) => { (i >= parseInt(self.length / 2)) ? v.choose = true : v.choose = false })
          break
        case 3:
          numViews.forEach((v, i, self) => { (i < parseInt(self.length / 2)) ? v.choose = true : v.choose = false })
          break
        case 4:
          numViews.forEach((v, i) => { (i % 2) ? v.choose = true : v.choose = false })
          break
        case 5:
          numViews.forEach((v, i) => { !(i % 2) ? v.choose = true : v.choose = false })
          break
        case 6:
          numViews.forEach(v => { v.choose = false })
          break
        default:
      }
      this.curBalls({numViews, indexff})
    },
    curBalls ({indexff, indexg, num, numViews, flag}) {
      let size = this.currentPlayer.numView.length
      if (flag) { // 点击小球
        num.choose = !num.choose
        if (size === 1) { // 单行通用
          num.choose ? this.d[indexg] = num.ball : this.d.splice(indexg, 1, '')
          this.clacSingleBall({numViews, num, indexg})
        } else { // 多行通用
          let arr = this.createKN
          console.log(arr)
          let [kw, wn] = arr[indexff]
          num.choose ? this[kw][indexg] = num.ball : this[kw].splice(indexg, 1, '')
          this.calcDoubleBalls({ arr, kw, wn, size, num, numViews })
        }
      } else { // 点击 大小单双
        if (size === 1) { // 单行通用
          this.d = numViews.map(v => (v.choose ? v.ball : ''))
          this.clacSingleBall({numViews, num, indexg})
        } else { // 多行通用
          let arr = this.createKN
          let [kw, wn] = arr[indexff] // ka an
          this[kw] = numViews.map(v => (v.choose ? v.ball : ''))
          this.calcDoubleBalls({arr, kw, wn, size})
        }
      }
      // 存储vuex
      this.$store.commit('SAVEZHU', this.zhu)
      this.$store.commit('SAVECON', this.con)
    },
    // 多行投注
    calcDoubleBalls ({arr, kw, wn, size, num, numViews}) {
      let playBonusId = this.playBonusId
      this.dd = this[kw].filter(Boolean)
      this[wn] = this.dd.join('')
      // 直选复式
      if (['ssc_star5', 'ssc_star4_front', 'ssc_star3_front', 'ssc_star3_mid', 'ssc_star3_last', 'ssc_star2_front', 'ssc_star2_last', 'ssc_star2_any', 'ssc_star3_any', 'ssc_star4_any'].includes(playBonusId)) {
        this.zhu = arr.reduce((num, v) => (num *= this[v[1]].length), 1)
        let tempCon = arr.reduce((str, v) => (str += this[v[1]] + ','), '')
        if (playBonusId === 'ssc_star5') {
          this.con = tempCon
        } else if (playBonusId.includes('any')) {
          if (tempCon.split(',').length > size) {
            this.con = tempCon
            let conArr = arr.reduce((arr, v) => arr.concat([this[v[1]]]), [])
            let group = Array.from({length: 5}, (v, i) => i)
            let tempArr = this.groupSplitArr(group, size)
            this.zhu = tempArr.reduce((num1, v1) => (num1 += v1.reduce((num2, v2) => (num2 *= (conArr[v2] ? conArr[v2].length : 0)), 1)), 0)
          } else {
            this.zhu = 0
          }
        } else {
          let con = tempCon
          let temp = Array.from({length: (5 - size)}, v => '-').join(',')
          if (playBonusId.includes('front')) {
            this.con = con + temp
          } else if (playBonusId.includes('mid')) {
            this.con = '-,' + con + '-'
          } else if (playBonusId.includes('last')) {
            this.con = temp + ',' + con
          }
        }
        return
      }
      // 大小单双 龙虎和
      if (['ssc_dxds', 'ssc_side_lhh'].includes(playBonusId)) {
        num.choose ? this.zhu++ : this.zhu--
        if (this.playBonusId === 'ssc_dxds') {
          this[wn] = this.dd.length ? this.dd.join('+') : '-'
          this.con = arr.reduce((str, v) => (str += this[v[1]] + ','), '')
        } else {
          let title = '[' + numViews.title + ']'
          this[wn] = (this.dd.length ? title : '') + this.dd.join('')
          this.con = arr.reduce((str, v) => (str += (this[v[1]] ? this[v[1]] : '-') + ','), '')
        }
        return
      }
      // 定位胆
      if (playBonusId === 'ssc_star1_dwd') {
        this.zhu = arr.reduce((num, v) => (num += this[v[1]].length), 0)
        this[wn] = this.dd.length ? this.dd.join('') : '-'
        this.con = arr.reduce((str, v) => (str += (this[v[1]] ? this[v[1]] : '-') + ','), '')
        return
      }
      // 五星 四星 | 组选
      if (['ssc_star5_group5', 'ssc_star5_group10', 'ssc_star5_group20', 'ssc_star5_group30', 'ssc_star5_group60', 'ssc_star4_front_group4', 'ssc_star4_front_group12', 'ssc_star4_last_group4', 'ssc_star4_last_group12'].includes(playBonusId)) {
        let [ka, kb] = [this.ka.filter(Boolean), this.kb.filter(Boolean)]
        if (['ssc_star5_group5', 'ssc_star5_group10', 'ssc_star4_front_group4', 'ssc_star4_last_group4'].includes(this.playBonusId)) { // 上下至少一注
          let len = ka.filter(v => kb.includes(v)).length
          this.zhu = ka.length * kb.length - len
        } else if (['ssc_star5_group20', 'ssc_star4_front_group12', 'ssc_star4_last_group12'].includes(this.playBonusId)) { // 1个2重号在 2个单号
          let kbGroup = this.groupSplit(kb.length, 2)
          let len = ka.filter(v => kb.includes(v)).length
          this.zhu = kbGroup * ka.length - (len * (kb.length - 1))
        } else if (this.playBonusId === 'ssc_star5_group30') { // 两个2重号 1个单号
          let kaGroup = this.groupSplit(ka.length, 2)
          let len = ka.filter(v => kb.includes(v)).length
          this.zhu = kaGroup * kb.length - (len * (ka.length - 1))
        } else if (this.playBonusId === 'ssc_star5_group60') { // 1个2重号在 3个单号
          let kbGroup = this.groupSplit(kb.length, 3)
          let len = ka.filter(v => kb.includes(v)).length
          this.zhu = kbGroup * ka.length - (len * this.groupSplit(kb.length - 1, 2))
        }
      }
      this.con = arr.reduce((str, v) => (str += this[v[1]] + ','), '')
    },
    // 单行计算
    clacSingleBall ({numViews, num, indexg}) {
      let playBonusId = this.playBonusId
      this.dd = this.d.filter(Boolean)
      this.con = this.dd.join(',')
      // 一帆风顺 好事成双 三星报喜 四季发财
      if (['ssc_star5_other1', 'ssc_star5_other2', 'ssc_star5_other3', 'ssc_star5_other4'].includes(playBonusId)) {
        this.zhu = this.dd.length
        return
      }
      // 不定位
      if (['ssc_star5_none1', 'ssc_star5_none2', 'ssc_star5_none3', 'ssc_star4_front_none1', 'ssc_star4_front_none2', 'ssc_star4_last_none1', 'ssc_star4_last_none2', 'ssc_star3_front_none1', 'ssc_star3_front_none2', 'ssc_star3_mid_none1', 'ssc_star3_mid_none2', 'ssc_star3_last_none1', 'ssc_star3_last_none2'].includes(playBonusId)) {
        this.zhu = this.groupSplit(this.dd.length, playBonusId.match(/[0-9]/g).pop())
        return
      }
      // 组选包胆
      if (['ssc_star3_front_group_contains', 'ssc_star3_mid_group_contains', 'ssc_star3_last_group_contains', 'ssc_star2_front_group_contains', 'ssc_star2_last_group_contains'].includes(playBonusId)) {
        numViews.nums.forEach((v, i) => {
          if (i !== indexg) {
            v.choose = false
          } else {
            this.con = v.ball
          }
        })
        this.zhu = num.choose ? (playBonusId.includes(3) ? 54 : 9) : ''
        return
      }
      // 五星组选120
      if (['ssc_star5_group120'].includes(playBonusId)) {
        this.zhu = this.groupSplit(this.dd.length, 5)
        return
      }
      // 四星组选6
      if (['ssc_star4_front_group6', 'ssc_star4_last_group6'].includes(playBonusId)) {
        this.zhu = this.groupSplit(this.dd.length, 2)
        return
      }
      // 四星组选24
      if (['ssc_star4_front_group24', 'ssc_star4_last_group24'].includes(playBonusId)) {
        this.zhu = this.groupSplit(this.dd.length, 4)
        return
      }
      // 三星 直选和值
      if (['ssc_star3_front_and', 'ssc_star3_mid_and', 'ssc_star3_last_and'].includes(playBonusId)) {
        let betCount = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]
        this.zhu = this.dd.reduce((num, v) => (num += betCount[v]), 0)
        return
      }
      // 三星 直选跨度
      if (['ssc_star3_front_kd', 'ssc_star3_mid_kd', 'ssc_star3_last_kd'].includes(playBonusId)) {
        let betCount = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54]
        this.zhu = this.dd.reduce((num, v) => (num += betCount[v]), 0)
        return
      }
      // 三星 组三
      if (['ssc_star3_front_group3', 'ssc_star3_mid_group3', 'ssc_star3_last_group3'].includes(playBonusId)) {
        this.zhu = this.dd.length * (this.dd.length - 1)
        return
      }
      // 三星 组六
      if (['ssc_star3_front_group6', 'ssc_star3_mid_group6', 'ssc_star3_last_group6'].includes(playBonusId)) {
        let zhu = this.dd.length - 2
        this.zhu = (zhu * (zhu + 1) * (zhu + 2)) / 6
        return
      }
      // 三星 组选和值
      if (['ssc_star3_front_group_and', 'ssc_star3_mid_group_and', 'ssc_star3_last_group_and'].includes(playBonusId)) {
        let betCount = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]
        this.zhu = this.dd.reduce((num, v) => (num += betCount[v - 1]), 0)
        return
      }
      // 二星 直选和值
      if (['ssc_star2_front_and', 'ssc_star2_last_and'].includes(playBonusId)) {
        let betCount = Array.from({length: 19}, (v, i) => i < 10 ? i + 1 : 19 - i)
        this.zhu = this.dd.reduce((num, v) => (num += betCount[v]), 0)
        return
      }
      // 二星直选跨度
      if (['ssc_star2_front_kd', 'ssc_star2_last_kd'].includes(playBonusId)) {
        let betCount = Array.from({length: 10}, (v, i) => !i ? 10 : (10 - i) * 2)
        this.zhu = this.dd.reduce((num, v) => (num += betCount[v]), 0)
        return
      }
      // 二星 组选复式
      if (['ssc_star2_front_group', 'ssc_star2_last_group'].includes(playBonusId)) {
        let zhu = this.dd.length - 1
        this.zhu = (zhu * (zhu + 1)) / 2
        return
      }
      // 二星 组选和值
      if (['ssc_star2_front_group_and', 'ssc_star2_last_group_and'].includes(playBonusId)) {
        let betCount = Array.from({length: 9}, (v, i) => (i === 4 ? 5 : (i < 4 ? [i + 1, i + 1] : [9 - i, 9 - i]))).toString().split(',')
        this.zhu = this.dd.reduce((num, v) => (num += (betCount[v - 1] * 1)), 1)
      }
    },
    // 排列组合 求算注数
    groupSplit (len, size) {
      if (len > size) {
        let a = Array.from({length: len}, (v, i) => (i * 1 + 1)).reduce((num, v) => (num *= v), 1)
        let b = Array.from({length: size}, (v, i) => (i * 1 + 1)).reduce((num, v) => (num *= v), 1)
        let c = Array.from({length: (len - size)}, (v, i) => (i * 1 + 1)).reduce((num, v) => (num *= v), 1)
        return a / (b * c)
      } else if (len === size) {
        return 1
      } else {
        return 0
      }
    },
    // 排列组合 返回数组
    groupSplitArr (arr, size) {
      let allResult = []
      let group = function (arr, size, result) {
        let arrLen = arr.length
        if (size > arrLen) {
          return
        }
        if (size === arrLen) {
          allResult.push([].concat(result, arr))
        } else {
          for (let i = 0; i < arrLen; i++) {
            let newResult = [].concat(result)
            newResult.push(arr[i])
            if (size === 1) {
              allResult.push(newResult)
            } else {
              let newArr = [].concat(arr)
              newArr.splice(0, i + 1)
              group(newArr, size - 1, newResult)
            }
          }
        }
      }
      group(arr, size, [])
      return allResult
    },
    // 清空注码
    iscreat () {
      this.con = ''
      this.zhu = 0
      this.money = ''
      this.d = []
      this.dd = []
      this.ka = []
      this.kb = []
      this.kc = []
      this.kd = []
      this.ke = []
      this.kf = []
      this.kg = []
      this.kh = []
      this.ki = []
      this.kj = []
      this.an = ''
      this.bn = ''
      this.cn = ''
      this.dn = ''
      this.en = ''
      this.fn = ''
      this.gn = ''
      this.hn = ''
      this.in = ''
      this.jn = ''
      this.currentPlayer.numView.forEach(v1 => {
        v1.nums.forEach(v2 => {
          v2.choose = false
        })
      })
    }
  },
  filters: {
    keepTwoNum (str) {
      if (str) {
        return !str.includes('-') ? (parseInt(str * 100) / 100) : str.split('-').map(v => (parseInt(v * 100) / 100)).join('-')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .betContentSscBottom {
    background: #317455;
    height: 100%;
    .game_info {
      p{
        color: #caebda;
        .reward {
          color: #f0c930;
        }
      }
    }
    .lottery_ball{
      li {
        .ball_top {
          display: flex;
          justify-content: space-between;
          .pos {
            color: #caebda;
          }
          .ball_wrap {
            .ball {
              display: inline-block;
              width: 32px;
              height: 32px;
              border-radius: 100%;
              font-size: 14px;
              background: #caebda;
              text-align: center;
              line-height: 32px;
              margin: 2px;
              &.active {
                @-webkit-keyframes layui-scale{
                  0%{opacity:.3;-webkit-transform:scale(.5)}
                  100%{opacity:1;-webkit-transform:scale(1)}
                }
                @keyframes layui-scale{
                  0%{opacity:.3;-ms-transform:scale(.5);transform:scale(.5)}
                  100%{opacity:1;-ms-transform:scale(1);transform:scale(1)}
                }
                background: yellow;
                -webkit-animation:layui-scale .3s both;
                animation:layui-scale .3s both
              }
            }
          }
        }
        .ball_bottom {
          display: flex;
          justify-content: center;
          span {
            color: #fff;
            display: inline-block;
            width: 32px;
            height: 32px;
            margin: 4px;
            text-align: center;
            line-height: 32px;
            border-radius: 100%;
          }
        }
      }
    }
  }
</style>
