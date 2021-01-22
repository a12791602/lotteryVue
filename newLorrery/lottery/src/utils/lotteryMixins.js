'use strict'
import { mapState } from 'vuex'
const lotteryMixins = {
  data () {
    return {
      con: '', // 最终号码
      zhu: 0, // 注数
      money: '',
      dd: [], // 当前所选号码
      selectBalls: ['全', '大', '小', '奇', '偶', '清'].map((v, i) => ({name: v, type: i + 1}))
    }
  },
  computed: {
    ...mapState(['currentPlayer', 'playBonusId', 'rebate'])
  },
  methods: {
    // 大小单双全清
    getTypeBall ({indexff, type}) {
      let numViews = this.currentPlayer.numView[indexff].nums
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
          numViews.forEach(v => { (parseInt(v.ball) % 2) ? v.choose = true : v.choose = false })
          break
        case 5:
          numViews.forEach(v => { !(parseInt(v.ball) % 2) ? v.choose = true : v.choose = false })
          break
        case 6:
          numViews.forEach(v => { v.choose = false })
          break
        default:
      }
      this.curBalls({})
    },
    // 排列组合
    groupSplit (len, size) {
      if (len > size) {
        let a = Array.from({length: len}, (v, i) => (i * 1 + 1)).reduce((num, v) => num * v, 1)
        let b = Array.from({length: size}, (v, i) => (i * 1 + 1)).reduce((num, v) => num * v, 1)
        let c = Array.from({length: (len - size)}, (v, i) => (i * 1 + 1)).reduce((num, v) => num * v, 1)
        return a / (b * c)
      } else if (len === size) {
        return 1
      } else {
        return 0
      }
    },
    // 存储vuex
    saveZhuCon () {
      this.$store.commit('SAVEZHU', this.zhu)
      this.$store.commit('SAVECON', this.con)
    },
    // 计算复式
    fushi (bets, zhu) {
      if (bets.length !== zhu) {
        return 0
      }
      let all = []
      for (let i = 0; i < bets.length; i++) {
        let n = this.toListByLength(bets[i], 2)
        all.push(n)
      }
      return this.getCountCached(all, 0, all.length, new Set())
    },
    toListByLength (str, len) {
      let line = []
      for (let i = 0; i < str.length; i += len) {
        line.push(str.substring(i, i + len))
      }
      return line
    },
    getCountCached (lines, index, allSize, cache) {
      let line = lines[index]
      let size = line.length
      let count = 0
      for (let i = 0; i < size; i++) {
        let n = line[i]
        if (!cache.has(n)) {
          if (index + 1 < allSize) {
            cache.add(n)
            count += this.getCountCached(lines, index + 1, allSize, cache)
            cache.delete(n)
          } else {
            count++
          }
        }
      }
      return count
    }
  }
}
export default lotteryMixins
