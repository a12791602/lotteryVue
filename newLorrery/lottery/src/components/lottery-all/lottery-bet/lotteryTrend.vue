<template>
  <div class="lotteryTrend">
    <div class="lottery_sort">
      <ul style="display: flex;">
        <li v-for="(item, index) in lotterySorts" :key="index" style="margin-left: 10px">
          <div class="">
            <span>{{item.name}}</span>
          </div>
          <div class="">
            <a href="" v-for="(list, index1) in item.lotterys" :key="index1" @click.prevent="changeLottery(list.id, list.groupId)" style="margin: 0 5px" :class="[currentId === list.id ? 'on' : '']">{{list.name}}</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="star_type" v-if="isStarType">
      <span v-for="(item, index) in currentStarType" :key="index" @click="changeStarType(item.id)" :class="[item.id === currentStarId ? 'active' : '']">{{item.name}}</span>
    </div>
    <div class="options">
      <div class="lottery_line">
        <span v-for="(item, index) in lineOptions" :key="index">
          <input type="checkbox" :value="item.tag" :checked="item.checked" :id="item.tag" v-model="tableStatus">
          <label :for="item.tag">{{item.name}}</label>
        </span>
      </div>
      <div class="lottery_date">
        <span v-for="(item, index) in lotteryDates" :key="index" @click="getLotteryHistory(item.count, true)" :class="[count === item.count ? 'active' : '']">{{item.name}}</span>
      </div>
      <span @click="reload">刷新</span>
    </div>
    <table cellspacing="0" cellpadding="0" border="0" v-if="flag">
      <thead>
      <tr>
        <th rowspan="2">期号</th>
        <th rowspan="2">
          开奖号码
          <div v-show="currentStarId > 1">
            <input type="checkbox" id="selectActive" v-model="selectStatus" name="checkbox">
            <label for="selectActive">全部</label>
          </div>
        </th>
        <th v-for="(item, index) in currentPosTitle" :key="index" :colspan="singlePosLen">{{item.name}}</th>
        <th v-if="isShowThreeStar" v-for="(item, index) in threeStarTitle" :key="index + 'i'" rowspan="2">{{item}}</th>
        <th v-if="isShowTwoStar" v-for="(item, index) in twoStarTitle" :key="index + 'j'" :colspan="index ? '' : 10" :rowspan="index ? 2 : ''">{{item}}</th>
        <th v-if="isShowK3" v-for="(item, index) in k3Title" :key="index + 'k'" :colspan="item.span">{{item.content}}</th>
      </tr>
      <tr>
        <th v-for="(num, index) in posTitlesNum" :key="index">{{num}}</th>
        <th v-if="isShowTwoStar" v-for="num in singlePosLen" :key="num + 'i'">{{num - 1}}</th>
        <th v-if="isShowK3" v-for="(item, index) in k3AddSort" :key="index + 'j'">{{item}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in lotteryHistoryTrs" :key="index" :class="index % 5 === 4 ? trClass : ''">
        <th>{{item.seasonId}}</th>
        <th class="num1">
          <strong v-for="(ball, index1) in item.balls" :key="index1" :class="{ball: ballClassArr.includes(index1) && isStarType}" v-show="selectStatus ? 1 : ballClassArr.includes(index1) ? 1 : 0">{{ball.num}} </strong>
        </th>
        <th v-for="(list, index2) in item.pos" :key="index2" :class="['num2', list.bg, list.bg ? thClass : '']" @mouseleave="changeTrBg($event, index2)" @mouseover="changeTrBg($event, index2)">
          <span :class="[list.class, list.class ? ballClass : '']" v-show="list.class ? true : spanShow">{{list.content}}</span>
        </th>
        <th v-for="(list, index3) in item.lotterySpreads" :key="index3 + 'i'">
          <span :class="list.class" v-show="list.class ? true : spanShow">{{list.ball}}</span>
        </th>
        <th v-for="(lists, index1) in item.threeStarData" :key="index1 + 'j'" v-if="isShowThreeStar" :class="lists.class">
          <span style="width: 100%;height: 100%">{{lists.content}}</span>
        </th>
        <th v-if="isShowTwoStar"  v-for="(list, index) in item.twoStarData" :key="index + 'k'" :class="[list.class, list.bg, list.bg ? thClass : '']">
          <span v-show="list.class ? true : spanShow">{{list.content}}</span>
        </th>
        <th v-if="isShowK3" v-for="(list, index) in item.k3AddContent" :key="index + 'l'" :class="[list.class, list.bg, list.bg ? thClass : '']">
          <span style="width: 100%" v-show="list.class ? true : spanShow">{{list.content}}</span>
        </th>
      </tr>
      </tbody>
      <tfoot>
      <tr v-for="(item, index) in countLotteryTrs" :key="index">
        <th>{{item.name}}</th>
        <th></th>
        <th v-for="(list, index1) in item.lotterys" :key="index1">{{list}}</th>
      </tr>
      <tr>
        <th rowspan="2">期号</th>
        <th rowspan="2">开奖号码</th>
        <th v-for="(num, index) in posTitlesNum" :key="index">{{num}}</th>
        <th v-if="isShowThreeStar" v-for="(item, index) in threeStarTitle" :key="index + 'i'" rowspan="2">{{item}}</th>
        <th v-if="isShowTwoStar" v-for="num in singlePosLen" :key="num + 'i'">{{num - 1}}</th>
        <th v-if="isShowTwoStar" v-for="(item, index) in twoStarTitle.slice(1, 3)" :key="index + 'j'" :rowspan="2">{{item}}</th>
        <th v-if="isShowK3" v-for="(item, index) in k3AddSort" :key="index + 'j'">{{item}}</th>
      </tr>
      <tr>
        <th v-for="(item, index) in currentPosTitle" :key="index" :colspan="singlePosLen">{{item.name}}</th>
        <th v-if="isShowTwoStar" colspan="10">跨度走势</th>
        <th v-if="isShowK3" v-for="(item, index) in k3Title" :key="index + 'k'" :colspan="item.span">{{item.content}}</th>
      </tr>
      </tfoot>
    </table>
    <div class="canvas" v-show="istrend">
      <div v-for="(items, index1) in canvasPostion" :key="index1">
        <div v-for="(item, index2) in items" :key="index2" :style="{ left: item.left, top: item.top, transform: 'rotate(' + item.angle + ')', width: item.length, transformOrigin: item.dir }"></div>
      </div>
    </div>
    <loading v-if="!flag"></loading>
  </div>
</template>

<script>
'use strict'
import _ from 'lodash'
import loading from '@/components/public/loading.vue'
import { getPastOpen, getLotteryListAll } from './../../../api'
export default {
  name: 'lotteryTrend',
  data () {
    return {
      isMoblie: '',
      currentId: this.$route.query.id,
      lotteryType: this.$route.query.type,
      ballClassArr: [],
      lotterySorts: '',
      trClass: 'active',
      spanShow: true,
      thClass: '',
      ballClass: '',
      lotteryLen: '',
      selectStatus: true,
      lotteryHistorys: '',
      rowLotteryBalls: '',
      flag: false,
      currentStarId: 1,
      tableStatus: ['line1', 'line2', 'line3', 'line4', 'line5'],
      lineOptions: ['辅助线', '遗漏', '遗漏条', '走势', '号温'].map((v, i) => ({
        name: v,
        tag: `line${i + 1}`,
        checked: 'checked'
      })),
      lotteryDates: ['最近30期', '最近50期', '最近100期', '最近300期'].map(v => ({
        name: v,
        count: v.match(/[0-9]+/g)[0] * 1
      })),
      k3Title: [
        {span: 16, content: '和值'},
        {span: 4, content: '和值组合形态'},
        {span: 5, content: '号码形态'}
      ],
      k3AddSort: [...Array.from({length: 16}, (v, i) => i + 3), '小奇', '小偶', '大奇', '大偶', '三同号', '三不同号', '三连号', '二同号', '二不同号'],
      threeStarTitle: ['大小形态', '奇偶形态', '质合形态', '012形态', '豹子', '组三', '组六', '跨度', '直选和值', '和值尾数'],
      twoStarTitle: ['跨度走势', '对子', '和值'],
      pk10Title: ['大小形态', '单双形态'],
      pos: [],
      canvasPostion: [],
      count: 30, // 获取彩种的行数
      splitNum: 10,
      istrend: true,
      lotteryPos: '',
      lotteryData: '',
      lotteryCurrentData: '',
      starTypes: [
        {
          name: 'ssc',
          starTypes: [
            { name: '五星', id: 1, pos: [0, 1, 2, 3, 4, 5] },
            { name: '前四', id: 2, pos: [0, 1, 2, 3, 5] },
            { name: '后四', id: 3, pos: [1, 2, 3, 4, 5] },
            { name: '前三', id: 4, pos: [0, 1, 2, 5] },
            { name: '中三', id: 5, pos: [1, 2, 3, 5] },
            { name: '后三', id: 6, pos: [2, 3, 4, 5] },
            { name: '前二', id: 7, pos: [0, 1, 5] },
            { name: '后二', id: 8, pos: [3, 4, 5] }
          ]
        },
        {
          name: 'pk10',
          starTypes: [
            { name: '十星走势', id: 9, pos: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
            { name: '冠亚军走势', id: 10, pos: [0, 1, 10] },
            { name: '前五走势', id: 11, pos: [0, 1, 2, 3, 4, 10] },
            { name: '后五走势', id: 12, pos: [5, 6, 7, 8, 9, 10] }
          ]
        }
      ],
      currentStarType: '',
      posAllTitles: [
        {
          name: 'pk10',
          title: ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名', '号码分步']
        },
        {
          name: 'ssc',
          title: ['万位', '千位', '百位', '十位', '个位', '号码分步']
        },
        {
          name: 'x11x5',
          title: ['第一球', '第二球', '第三球', '第四球', '第五球', '号码分步']
        },
        {
          name: 'k3',
          title: ['万位', '千位', '百位', '号码分步']
        }
      ],
      posTitle: '',
      currentPosTitle: '',
      posTitlesNum: '',
      lotterySpreads: '',
      lotteryHistoryTrs: '',
      threeStarData: '',
      twoStarData: '',
      k3AddContent: '',
      screenWidth: document.body.clientWidth
    }
  },
  created () {
    this.currentStarType = this.starTypes[0].starTypes
    let agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    this.isMoblie = agents.some(v => navigator.userAgent.includes(v))
    this.createPosTitle()
    this.getLotteryAll()
    this.getLotteryHistory()
  },
  computed: {
    isShowTwoStar () {
      return [7, 8].includes(this.currentStarId)
    },
    isShowThreeStar () {
      return [4, 5, 6].includes(this.currentStarId)
    },
    isLotteryStart1 () { // 索引从1开始
      return ['x11x5', 'pk10', 'k3'].includes(this.lotteryType)
    },
    isStarType () { // 有多种筛选模式 五星 四星 冠亚军
      return this.lotteryType === 'ssc' || this.lotteryType === 'pk10'
    },
    isShowPk10 () {
      return this.lotteryType === 'pk10'
    },
    isShowK3 () {
      return this.lotteryType === 'k3'
    },
    singlePosLen () {
      let map = new Map([['x11x5', 11], ['k3', 6], ['ssc', 10], ['pk10', 10]])
      return map.get(this.lotteryType)
    },
    totalLotteryTimes () {
      return this.rowLotteryBalls.map(v1 => v1.map(v2 => v2.filter(Boolean).length))
    },
    averageLotteryTimes () {
      return this.totalLotteryTimes.map(v1 => v1.map(v2 => v2 !== 0 ? Math.floor(this.count / v2) : this.count))
    },
    maxLeakTimes () {
      return this.rowLotteryBalls.map(v1 => v1.map(v2 => {
        let arr = []
        let j = 0
        v2.forEach(v3 => {
          !v3 ? j++ : j = 0
          arr.push(j)
        })
        return Math.max.apply(Array, arr)
      }))
    },
    maxLinkTimes () {
      return this.rowLotteryBalls.map(v1 => v1.map(v2 => {
        let arr = []
        let j = 0
        v2.forEach(v3 => {
          v3 ? j++ : j = 0
          arr.push(j)
        })
        return Math.max(...new Set(arr))
      }))
    },
    countLotteryTrs () {
      if (this.rowLotteryBalls) {
        let tempArrOri = [
          { name: '出现总次数', lotterys: this.totalLotteryTimes },
          { name: '平均遗漏值', lotterys: this.averageLotteryTimes },
          { name: '最大遗漏值', lotterys: this.maxLeakTimes },
          { name: '最大连出值', lotterys: this.maxLinkTimes }
        ]
        return tempArrOri.map(v => ({
          name: v.name,
          lotterys: v.lotterys.toString().split(',')
        }))
      }
    }
  },
  mounted () {
    window.onresize = _.debounce(() => {
      this.screenWidth = document.body.clientWidth
    })
  },
  methods: {
    async getLotteryAll () {
      let data = await getLotteryListAll()
      let lotteryAll = data.data.data
      let groupId = [...new Set(lotteryAll.map(v => v.groupName))]
      this.lotterySorts = groupId.map(v1 => ({
        name: v1,
        lotteryType: lotteryAll.find(v2 => v2.groupName === v1).groupId,
        lotterys: lotteryAll.filter(v2 => v2.groupName === v1)
      }))
    },
    async getLotteryHistory (count = this.count, flag) {
      this.flag = false
      !flag && (this.currentStarId = this.isStarType ? this.starTypes.find(v => v.name === this.lotteryType).starTypes[0].id : '')
      this.count = count
      let data = await getPastOpen({lotteryId: this.$route.query.id, count: this.count})
      let tempData = data.data.data
      this.lotteryLen = Object.keys(tempData[0]).filter(v => /^n{1}[0-9]+$/.test(v)).length
      this.lotteryData = tempData.map(v1 => Array.from({length: this.lotteryLen}, (v, i) => v1['n' + (i + 1)]))
      // 开奖号码 横向
      this.lotteryHistorys = tempData.map((v1, i1) => {
        return {
          seasonId: !this.isMoblie ? v1.seasonId : v1.seasonId.slice(8),
          balls: Array.from({length: this.lotteryLen}, (v, i) => ({ num: v1['n' + (i + 1)] }))
        }
      })
      if (flag && this.isStarType) { // 点击期号
        let temp = this.currentStarType.find(v => v.id === this.currentStarId).pos
        this.lotteryCurrentData = this.lotteryData.map(v1 => v1.filter((v2, i2) => temp.includes(i2)))
        this.lotteryLen = this.lotteryCurrentData[0].length
      } else {
        this.lotteryCurrentData = this.lotteryData
      }
      this.createLotteryPos()
      this.isShowThreeStar && this.createLotteryStatus()
      this.isShowTwoStar && this.createSpanTrend()
      this.getLotterySpreads()
      this.getRowLotterySpreads()
      this.isShowK3 && this.createK3Add()
      this.createNumHot()
      this.createLotteryHistoryTrs()
      this.flag = true
    },
    changeLottery (id, groupId) {
      this.$router.push({ path: 'trend', query: { id, type: groupId } })
      this.lotteryType = groupId
      this.currentId = id
      this.isStarType && (this.currentStarType = this.starTypes.find(v => v.name === groupId).starTypes)
      this.getLotteryHistory()
      this.createPosTitle()
      this.getCurrentTitle()
      this.ballClassArr = []
    },
    changeStarType (id) {
      this.currentStarId = id
      let temp = this.currentStarType.find(v => v.id === id).pos
      this.lotteryLen = temp.length - 1
      this.lotteryCurrentData = this.lotteryData.map(v1 => v1.filter((v2, i2) => temp.includes(i2)))
      this.ballClassArr = temp
      this.getCurrentTitle()
      this.createLotteryPos()
      this.getLotterySpreads()
      this.getRowLotterySpreads()
      this.createNumHot()
      this.isShowThreeStar && this.createLotteryStatus()
      this.isShowTwoStar && this.createSpanTrend()
      this.createLotteryHistoryTrs()
    },
    createPosTitle () {
      let title = this.posAllTitles.find(v => v.name === this.lotteryType).title
      let arr = Array.from({length: this.singlePosLen}, (v, i) => this.isLotteryStart1 ? (i + 1) : i)
      this.posTitle = title.map((v, i) => ({
        name: v,
        id: i,
        num: arr
      }))
      this.getCurrentTitle()
    },
    getCurrentTitle () {
      if (this.isStarType) {
        let pos = this.currentStarType.find(v => v.id === this.currentStarId).pos
        let currentPosTitle = this.posTitle.filter(v => pos.includes(v.id))
        this.currentPosTitle = currentPosTitle.map(({id, name}) => ({id, name}))
        this.posTitlesNum = currentPosTitle.reduce((arr, v) => arr.concat(v.num), [])
      } else {
        this.currentPosTitle = this.posTitle.map(({id, name}) => ({id, name}))
        this.posTitlesNum = this.posTitle.map(v => v.num).toString().split(',')
      }
    },
    createNumHot () {
      this.lotteryPos.forEach(v1 => {
        v1.forEach((v2, i2) => {
          v2.forEach((v3, i3) => {
            if (v3.class) {
              let flag = this.averageLotteryTimes[i2][i3]
              if (flag < 8) {
                v3.class = v3.class + ' red'
              } else if (flag > 10) {
                v3.class = v3.class + ' blue'
              } else {
                v3.class = v3.class + ' yellow'
              }
            }
          })
        })
      })
    },
    createLotteryPos () {
      let [singlePosLen, lotteryLen] = [this.singlePosLen, this.lotteryLen]
      let isStart1 = this.isLotteryStart1 // pk10 x11x5 索引从1开始，其他从0开始
      let lotteryPos = this.lotteryCurrentData.map((v1, i1, self) => Array.from({length: lotteryLen}, (v2, i2) => Array.from({length: singlePosLen}, (v3, i3) => {
        let item = self[i1][i2]
        let i = isStart1 ? (i3 + 1) : i3
        return {
          content: item === i ? item : (i1 + 1) % this.splitNum,
          class: item === i ? 'active' : ''
        }
      })))
      // 开奖号码 竖向
      let initArr = Array.from({length: lotteryLen}, v => [])
      this.lotteryCurrentData.toString().split(',').forEach((v, i) => {
        initArr[i % lotteryLen].push(v * 1)
      })
      let rowLotteryBalls = Array.from({length: lotteryLen}, v => Array.from({length: singlePosLen}, v => Array.from({length: this.count}, v => '')))
      initArr.forEach((v1, i1) => {
        v1.forEach((v2, i2) => {
          let v = isStart1 ? v2 - 1 : v2
          rowLotteryBalls[i1][v][i2] = initArr[i1][i2] + ''
        })
      })
      // 竖向active号码与最底部的间隔
      let missingLine = rowLotteryBalls.map(v1 => v1.map(v2 => v2.join('') ? this.count - v2.reverse().findIndex(v3 => v3) : 0))
      // 遗漏条添加class
      missingLine.forEach((v1, i1) => {
        v1.forEach((v2, i2) => {
          for (let i3 = v2; i3 < this.count; i3++) {
            lotteryPos[i3][i1][i2].bg = 'bg'
            lotteryPos[i3][i1][i2].content = this.count - i3
          }
        })
      })
      this.lotteryPos = lotteryPos
      // 竖向active号位置 码平均总次数 遗漏值 连出值
      this.rowLotteryBalls = rowLotteryBalls
    },
    // 号码分布
    getLotterySpreads () {
      this.lotterySpreads = this.lotteryCurrentData.map((v1, i1) => Array.from({length: this.singlePosLen}, (v2, i2) => {
        let i = this.isLotteryStart1 ? i2 + 1 : i2
        let flag = v1.some(v3 => v3 === i)
        let len = v1.filter(v4 => v4 === i).length
        return {
          ball: flag ? i : ((i1 + 1) % this.splitNum),
          class: flag ? (len > 1 ? 'balls double' : 'balls') : '',
          sameBallLen: flag ? len : 0
        }
      }))
    },
    getRowLotterySpreads () {
      let rowLotterySpreads = Array.from({length: this.singlePosLen}, v => Array.from({length: this.count}, v => ''))
      this.lotterySpreads.forEach((v1, i1) => {
        v1.forEach((v2, i2) => {
          rowLotterySpreads[i2][i1] = v2.sameBallLen ? Array(v2.sameBallLen).fill(v2.ball).join(',') : ''
        })
      })
      this.rowLotteryBalls.push(rowLotterySpreads.map(v => v.toString().split(',')))
    },
    createLotteryHistoryTrs () {
      let pro = ['lotterySpreads', 'threeStarData', 'twoStarData', 'k3AddContent']
      this.lotteryHistorys.forEach((v, i) => {
        v.pos = Object.assign(this.lotteryPos[i].reduce((arr, v1) => arr.concat(v1), []))
        pro.forEach(v1 => {
          v[v1] = this[v1][i]
        })
        // v.lotterySpreads = this.lotterySpreads[i]
        // v.threeStarData = this.threeStarData[i]
        // v.twoStarData = this.twoStarData[i]
        // v.k3AddContent = this.k3AddContent[i]
      })
      this.lotteryHistoryTrs = this.lotteryHistorys
    },
    changeTrBg (e, index2) {
      let trRowArr = [...document.querySelectorAll('tbody tr th:nth-child(' + (3 + index2) + ')')]
      trRowArr.forEach(v => {
        let classList = v.classList
        e.type === 'mouseover' ? classList.add('thbg') : classList.remove('thbg')
      })
    },
    createK3Add () {
      let length = this.k3AddSort.length
      this.k3AddContent = this.lotteryCurrentData.map((v, i) => {
        let add = v.reduce((num, v) => num + v)
        let indexNum = (i + 1) % this.splitNum
        let len1 = v.length
        let len2 = [...new Set(v)].length
        let spreads = [len2 === 1, len1 === len2, (v[0] + v[2] === 2 * v[1]) && (v[0] !== v[2]), len2 === 2, len2 !== 1]
        let status1 = ['三同号', '三不同号', '三连号', '二同号', '二不同号']
        let status2 = (add > 11 ? '大' : '小') + (add % 2 ? '奇' : '偶')
        let index = ['小奇', '小偶', '大奇', '大偶'].findIndex(v => v === status2)
        return Array.from({length}, (v1, i1) => {
          if (i1 < 16) {
            let flag = add === i1 + 3
            return {
              content: flag ? add : indexNum,
              class: flag ? 'span' : ''
            }
          } else if (i1 > 19) {
            let flag = spreads[i1 - 20]
            return {
              content: flag ? status1[i1 - 20] : '',
              class: flag ? 'span' : ''
            }
          } else {
            let flag = index === i1 - 16
            return {
              content: flag ? status2 : indexNum,
              class: flag ? 'span' : ''
            }
          }
        })
      })
      let k3AddRow = Array.from({length}, v => [])
      let flatK3Add = this.k3AddContent.reduce((arr, v) => arr.concat(v), [])
      flatK3Add.forEach((v, i) => {
        k3AddRow[i % length].push(v)
      })
      let rowClassNum = k3AddRow.map(v1 => v1.map(v2 => v2.class ? 1 : ''))
      let bottomLength = rowClassNum.map(v => v.join('') ? v.length - [...v].reverse().findIndex(v => v) : 0)
      bottomLength.forEach((v1, i1) => {
        for (let i2 = v1; i2 < this.count; i2++) {
          this.k3AddContent[i2][i1].bg = 'bg'
          this.k3AddContent[i2][i1].content = this.count - i2
        }
      })
      this.rowLotteryBalls.push(rowClassNum)
    },
    // 三星
    createLotteryStatus () {
      let statusArr = [[0, 3, 6, 9], [1, 4, 7], [2, 5, 8]]
      this.threeStarData = this.lotteryCurrentData.map((v, i) => {
        let tempArr = v.reduce(([str1, str2, str3, str4], v2) => [
          str1 += v2 > 4 ? '大 ' : '小 ',
          str2 += v2 % 2 ? '单 ' : '双 ',
          str3 += Array(v2).fill(1).reduce((num, v, i) => (v2 % (i + 1) ? num : num++), 0) > 2 ? '合 ' : '质 ',
          str4 += statusArr.findIndex(v3 => v3.includes(v2)) + ' '], ['', '', '', ''])
        let sameLen = [...new Set(v)].length
        let tempClassArr = tempArr.map((v, i) => {
          return {
            content: v,
            class: (i % 2) ? 'th2' : 'th1'
          }
        })
        let Othertemp = [
          {
            content: sameLen === 1 ? '是' : (i + 1) % this.splitNum,
            class: 'th1'
          },
          {
            content: sameLen === 2 ? '✓' : '',
            class: 'th2'
          },
          {
            content: sameLen === 3 ? '✓' : '',
            class: 'th1'
          },
          {
            content: Math.max.apply(Array, v) - Math.min.apply(Array, v) + '',
            class: 'th2'
          },
          {
            content: v.reduce((num, v2) => num + v2) + '',
            class: 'th1'
          },
          {
            content: (v.reduce((num, v2) => num + v2) + '').split('').pop(),
            class: 'th2'
          }
        ]
        return [...tempClassArr, ...Othertemp]
      })
      this.createRowStatus(this.threeStarData, this.threeStarTitle.length)
    },
    // 二星
    createSpanTrend () {
      let spanTrend = this.lotteryCurrentData.map((v, i) => {
        let [ball1, ball2] = v
        let index = (i + 1) % this.splitNum
        let difference = Math.abs(ball1 - ball2)
        return Array.from({length: this.singlePosLen}, (v, i1) => {
          let flag = difference === i1
          return {
            class: flag ? 'span' : '',
            content: flag ? difference + '' : index
          }
        })
      })
      let tempArr = spanTrend.map(v1 => v1.map(v2 => v2.class ? v2.content : '')).toString().split(',')
      let spanRowTrend = Array.from({length: this.singlePosLen}, () => [])
      tempArr.forEach((v, i) => {
        spanRowTrend[i % this.singlePosLen].push(v)
      })
      let twoRowArr = spanRowTrend.map(v1 => {
        return v1.join('') ? this.count - Array.from(v1).reverse().findIndex(v1 => v1) : 0
      })
      twoRowArr.forEach((v1, i1) => {
        for (let i2 = twoRowArr[i1]; i2 < this.count; i2++) {
          spanTrend[i2][i1].bg = 'bg'
          spanTrend[i2][i1].content = this.count - i2
        }
      })
      this.twoStarData = this.lotteryCurrentData.map((v, i) => {
        let [ball1, ball2] = v
        let index = (i + 1) % this.splitNum
        let flag = ball1 === ball2
        let doubleAdd = [
          {
            content: flag ? '是' : index,
            class: flag ? 'span' : ''
          },
          {
            content: (ball1 + ball2) + '',
            class: 'th2'
          }
        ]
        return [...spanTrend[i], ...doubleAdd]
      })
      this.createRowStatus(this.twoStarData, 12)
    },
    // 二星 三星
    createRowStatus (starData, length) {
      let lotteryStatusArr = starData.map(v => v.map(v1 => (v1.class && typeof v1.content === 'string') ? v1.content : ''))
      let tempArr = Array.from({length}, v => [])
      lotteryStatusArr.toString().split(',').forEach((v, i) => {
        tempArr[i % length].push(v)
      })
      this.rowLotteryBalls.push(tempArr)
    },
    // 绘制走势条
    drawTrendLine () {
      this.pos = ''
      this.canvasPostion = ''
      let len = this.currentPosTitle.length - 1
      let eleActive = Array.from(document.querySelectorAll('tbody tr th.num2 span.active'))
      let eleArr = Array.from({length: len}, v => [])
      // 获取class为active的坐标信息 getBoundingClientRect
      eleActive.forEach((v, i) => {
        let ele = eleActive[i]
        eleArr[i % len].push({
          x: ele.offsetLeft,
          y: ele.offsetTop,
          w: ele.offsetWidth,
          h: ele.offsetHeight
        })
      })
      this.canvasPostion = eleArr.map(v1 => {
        return v1.map((v2, i2, self2) => {
          if (!self2[i2 + 1]) {
            return ''
          }
          let pro = v2
          let pro1 = self2[i2 + 1]
          let x = (pro1.x + pro1.w / 2) - (pro.x + pro.w / 2)
          let y = (pro1.y + pro1.h / 2) - (pro.y + pro.h / 2)
          let angle = Math.floor(Math.atan((y / x)) * 180 / Math.PI)
          return {
            left: pro1.x >= pro.x ? (Math.floor(pro.x + pro.w / 2) + 'px') : (Math.floor(pro1.x + pro1.w / 2) + 'px'),
            top: Math.floor(pro.y + (pro.h) / 2) - 2 + 'px',
            // width: Math.floor(Math.abs(pro1.x + pro1.width / 2 - (pro.x + pro.width / 2))) + 'px',
            // height: Math.floor(Math.abs(pro1.y + pro1.height / 2 - (pro.y + pro.height / 2))) + 'px',
            length: Math.floor(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) + 'px',
            angle: angle + 'deg',
            dir: angle > 0 ? 'left center' : 'right center'
          }
        }).filter(Boolean)
      })
    },
    reload () {
      if (this.tableStatus.length === this.lineOptions.length) {
        this.istrend = false
        setTimeout(() => {
          this.istrend = true
        }, 2000)
      } else {
        this.tableStatus = this.lineOptions.map(v => v.tag)
      }
    },
    asyncDrawLine () {
      this.$nextTick(() => {
        this.drawTrendLine()
      })
    }
  },
  watch: {
    // 渲染dom后加载
    flag () {
      this.asyncDrawLine()
    },
    currentStarId () {
      this.asyncDrawLine()
    },
    selectStatus () {
      this.asyncDrawLine()
    },
    screenWidth () {
      this.asyncDrawLine()
    },
    tableStatus () {
      this.trClass = this.tableStatus.includes('line1') ? 'active' : ''
      this.spanShow = this.tableStatus.includes('line2') ? 1 : 0
      this.thClass = this.tableStatus.includes('line3') ? '' : 'thBg'
      this.istrend = this.tableStatus.includes('line4') ? 1 : 0
      this.ballClass = this.tableStatus.includes('line5') ? '' : 'ball'
    }
  },
  components: {
    loading
  }
}
</script>

<style scoped lang="scss">
  .lotteryTrend {
    margin-top: -60px;
    .star_type {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      span {
        cursor: pointer;
        padding: 0 15px;
        &.active {
          color: #4caae4;
        }
      }
    }
    .options {
      display: flex;
      align-items: center;
      .lottery_line {
        label {
          cursor: pointer;
        }
      }
      .lottery_date {
        span.active {
          color: #ff9b00;
        }
      }
      span {
        cursor: pointer;
        padding: 0 10px;
      }
    }
    table {
      background: #f2f2f2;
      font-size: 12px;
      border: 1px solid #ccc;
      border-collapse: collapse;
      text-align: center;
      width: 100%;
      tr {
        border-bottom: 1px solid #ccc;
        line-height: 20px;
      }
      thead, tfoot {
        th {
          border-right: 1px solid #ccc;
        }
      }
      tbody {
        background: #fff;
        tr {
          transition: all 0.2s ease-in;
          strong{
            &.ball{
              color: #0086b3;
            }
          }
          &:hover{
            background: #ffdcd0;
          }
          &.active{
            border-bottom: 2px solid #f0a298;
          }
          th{
            transition: all 0.2s ease-in;
            border-right: 1px solid #f0a298;
            &.bg, &.thbg{
              background: #ffdcd0;
              transition: all 0.2s ease-in;
            }
            &.thbg{
              opacity: 1!important;
            }
            &.thBg{
              opacity: 0;
            }
            &.th1{
              background: #49cfdc
            }
            &.th2{
              background: #c2e783;
            }
            &.span{
              background: #2bb5c2;
            }
            span{
              transition: all 0.2s ease-in;
              display: inline-block;
              width: 14px;
              height: 14px;
              line-height: 14px;
              @keyframes ballScale {
                0%{
                  transform: scale(0);
                }
                100%{
                  transform: scale(1);
                }
              }
              &.ball{
                background: #008535!important;
                z-index: 1;
              }
              &.active{
                animation: ballScale 0.2s ease-in;
                position: relative;
                z-index: 5;
                color: #fff;
                border-radius: 50px;
                &.red {
                  background: #e84d39;
                }
                &.blue {
                  background: #00a2ff;
                }
                &.yellow {
                  background: #ff9b00;
                }
              }
              &.balls{
                border-radius: 50px;
                color: #fff;
                background: #34bc0f;
                animation: ballScale 0.2s ease-in;
                &.double{
                  background: #bd3ed4;
                }
              }
            }
          }
        }
      }
    }
    .canvas {
      div {
        div{
          position: absolute;
          background: red;
          height: 2px;
          // transition: all 0.2s ease-in;
        }
      }
    }
    .on {
      color: red;
    }
  }
</style>
