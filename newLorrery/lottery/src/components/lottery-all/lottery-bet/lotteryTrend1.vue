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
    <div class="star_type">
      <span v-for="(item, index) in starTypes" :key="index" @click="changeStarType(item.id)" :class="[item.id === currentStarId ? 'active' : '']">{{item.name}}</span>
    </div>
    <div class="options">
      <div class="lottery_line">
        <span v-for="(item, index) in lineOptions" :key="index">
          <input type="checkbox" :value="item.tag" :checked="item.checked" :id="item.tag" v-model="tableStatus">
          <label :for="item.tag">{{item.name}}</label>
        </span>
      </div>
      <div class="lottery_date">
        <span v-for="(item, index) in lotteryDates" :key="index" @click="getLotteryHistory(item.count)" :class="[count === item.count ? 'active' : '']">{{item.name}}</span>
      </div>
      <span @click="reload">刷新</span>
    </div>
    <table ref="table" cellspacing="0" cellpadding="0" border="0" v-if="flag" :class="tableClass">
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
        <th v-for="(item, index) in posTitles" :key="index">{{item.name}}</th>
        <th rowspan="2" v-for="(item1, index1) in threeStarTitle" :key="index1 + 'i'" v-if="isShowThreeStar && !isMoblie">{{item1}}</th>
        <th v-if="isShowTwoStar && !isMoblie" v-for="(item2, index2) in twoStarTitle" :key="index2 + 'j'" :rowspan="index2 ? 2 : ''">{{item2}}</th>
        <th v-if="isShowPk10 && !isMoblie" v-for="(item3, index3) in pk10Title" :key="index3 + 'k'" rowspan="2">{{item3}}</th>
        <th v-if="isShowK3 && !isMoblie" v-for="(item3, index3) in k3Title" :key="index3 + 'n'">{{item3.name}}</th>
      </tr>
      <tr>
        <th v-for="(nums, index1) in posTitles" :key="index1" :class="nums.flag">
          <span v-for="(num, index2) in nums.num" :key="index2">{{num}}</span>
        </th>
        <th v-if="isShowK3 && !isMoblie" v-for="(item, index) in k3Title" :key="index + 'i'">
          <span v-for="(title, index1) in item.title" :key="index1" :style="{width: item.w}">{{title}}</span>
        </th>
        <th v-if="isShowTwoStar && !isMoblie">
          <span v-for="num in singlePosLen" :key="num">{{num - 1}}</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in lotteryHistoryTrs" :key="index" :class="item.class">
        <th>{{item.seasonId}}</th>
        <th class="num1">
          <strong v-for="(ball, index1) in item.balls" :key="index1" :class="ball.class">{{ball.num}},</strong>
        </th>
        <th class="num2" v-for="(lists, index2) in item.pos" :key="index2">
          <span v-for="(list, index3) in lists" :key="index3" :class="list.bg" @mouseover="changeRowClass($event, index2, index3)" @mouseout="changeRowClass($event, index2, index3)">
            <span :class="list.class" :ref="list.class">{{list.num}}</span>
          </span>
        </th>
        <th class="num2" v-if="!isMoblie">
          <span v-for="(lists, index1) in item.lotterySpreads" :key="index1">
            <span :class="lists.class">{{lists.ball}}</span>
          </span>
        </th>
        <th v-for="(lists, index1) in item.lotteryStatus" :key="index1 + 'i'" v-if="isShowThreeStar && !isMoblie">
          <span style="width: 100%" v-if="typeof lists !== 'object'">{{lists}}</span>
          <span style="width: 100%" :class="lists.class" v-else>{{lists.content}}</span>
        </th>
        <th class="num2" v-if="isShowTwoStar && !isMoblie">
          <span v-for="(lists, index2) in item.spanTrend" :key="index2" :class="lists.class">
            <span>{{lists.num}}</span>
          </span>
        </th>
        <th v-if="isShowTwoStar && !isMoblie">{{item.double}}</th>
        <th v-if="isShowTwoStar && !isMoblie">
          <span :class="item.and.class" style="width: 100%">{{item.and.content}}</span>
        </th>
        <th v-if="isShowPk10 && !isMoblie" v-for="(lists, index2) in item.pk10Trend" :key="index2 + 'j'">{{lists}}</th>
        <th v-if="isShowK3 && !isMoblie">
          <span v-for="(lists, index2) in item.k3Add" :key="index2" :class="lists.class" style="width: 6.25%">{{lists.num}}</span>
        </th>
        <th v-if="isShowK3 && !isMoblie">
          <span v-for="(lists, index2) in item.addGroup" :key="index2" :class="lists.class" style="width: 25%">{{lists.num}}</span>
        </th>
        <th v-if="isShowK3 && !isMoblie">
          <span v-for="(lists, index2) in item.numSpreads" :key="index2" :class="lists.class" style="width: 20%">{{lists.num}}</span>
        </th>
      </tr>
      </tbody>
      <tfoot>
      <tr v-for="(item, index) in countLotteryTrs" :key="index">
        <th>{{item.name}}</th>
        <th></th>
        <th v-for="(list, index1) in item.lotterys" :key="index1">
          <span v-for="(times, index2) in list" :key="index2" :style="{ width: initWidth(index1) }">{{times}}</span>
        </th>
      </tr>
      <tr>
        <th rowspan="2">期号</th>
        <th rowspan="2">开奖号码</th>
        <th v-for="(nums, index1) in posTitles" :key="index1">
          <span v-for="(num, index2) in nums.num" :key="index2">{{num}}</span>
        </th>
        <th v-if="isShowThreeStar && !isMoblie" rowspan="2" v-for="(list, index2) in threeStarTitle" :key="index2 + 'i'">{{list}}</th>
        <th v-if="isShowTwoStar && !isMoblie">
          <span v-for="num in singlePosLen" :key="num">{{num - 1}}</span>
        </th>
        <th v-if="isShowTwoStar && !isMoblie" rowspan="2">对子</th>
        <th v-if="isShowTwoStar && !isMoblie" rowspan="2">和值</th>
        <th v-if="isShowPk10 && !isMoblie" v-for="(item3, index3) in pk10Title" :key="index3 + 'k'" rowspan="2">{{item3}}</th>
        <th v-if="isShowK3 && !isMoblie" v-for="(item, index) in k3Title" :key="index + 'i'">
          <span v-for="(title, index1) in item.title" :key="index1" :style="{width: item.w}">{{title}}</span>
        </th>
      </tr>
      <tr>
        <th v-for="(item, index) in posTitles" :key="index" :class="item.flag">{{item.name}}</th>
        <th v-if="isShowTwoStar && !isMoblie">跨度走势</th>
        <th v-if="isShowK3 && !isMoblie" v-for="(item3, index3) in k3Title" :key="index3 + 'n'">{{item3.name}}</th>
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
  // import './../../../../config/rem'
  import loading from '@/components/public/loading.vue'
  import { getPastOpen, getLotteryListAll } from './../../../api'
  export default {
    name: 'lotteryTrend',
    data () {
      let k3AddGroup = ['小奇', '小偶', '大奇', '大偶']
      let k3NumSpreads = ['三同号', '三不同号', '三连号', '二同号', '二不同号']
      let k3AddRank = 16
      return {
        isMoblie: '',
        currentId: this.$route.query.id,
        lotteryType: this.$route.query.type,
        preLotteryType: '',
        lotterySorts: '',
        lotteryLen: '',
        tableClass: '',
        selectStatus: true,
        lotteryHistorys: '',
        rowLotteryBalls: '',
        flag: false,
        currentStarId: '',
        tableStatus: ['line1', 'line2', 'line3', 'line4', 'line5'],
        lineOptions: ['辅助线', '遗漏', '遗漏条', '走势', '号温'].map((v, i) => ({
          name: v,
          tag: `line${i}`,
          checked: 'checked'
        })),
        lotteryDates: ['最近30期', '最近50期', '最近100期', '最近300期'].map(v => ({
          name: v,
          count: v.match(/[0-9]+/g).pop()
        })),
        k3AddGroup,
        k3NumSpreads,
        k3AddRank,
        k3Title: [
          { name: '和值', title: Array.from({length: k3AddRank}, (v, i) => i + 3), w: '6.25%' },
          { name: '和值组合形态', title: k3AddGroup, w: '25%' },
          { name: '号码形态', title: k3NumSpreads, w: '20%' }
        ],
        threeStarTitle: ['大小形态', '奇偶形态', '质合形态', '012形态', '豹子', '组三', '组六', '跨度', '直选和值', '和值尾数'],
        twoStarTitle: ['跨度走势', '对子', '和值'],
        pk10Title: ['大小形态', '单双形态'],
        rowLotteryStatus: '',
        pos: [],
        canvasPostion: [],
        lotteryData: '',
        count: 30, // 获取彩种的行数
        splitNum: 20,
        istrend: true
      }
    },
    created () {
      let agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      this.isMoblie = agents.some(v => navigator.userAgent.includes(v))
      this.getLotteryAll()
      this.getLotteryHistory()
    },
    computed: {
      isLotteryStart1 () { // 索引从1开始
        return ['x11x5', 'pk10', 'k3'].includes(this.lotteryType)
      },
      isStarType () { // 有多种筛选模式 五星 四星 冠亚军
        return this.lotteryType === 'ssc' || this.lotteryType === 'pk10'
      },
      isShowThreeStar () {
        return [4, 5, 6].includes(this.currentStarId)
      },
      isShowTwoStar () {
        return [7, 8].includes(this.currentStarId)
      },
      isShowPk10 () {
        return this.lotteryType === 'pk10'
      },
      isShowK3 () {
        return this.lotteryType === 'k3'
      },
      starTypes () {
        let starTypes = ''
        switch (this.lotteryType) {
          case 'ssc':
            starTypes = [
              { name: '五星', id: 1, pos: [0, 1, 2, 3, 4, 5] },
              { name: '前四', id: 2, pos: [0, 1, 2, 3, 5] },
              { name: '后四', id: 3, pos: [1, 2, 3, 4, 5] },
              { name: '前三', id: 4, pos: [0, 1, 2, 5] },
              { name: '中三', id: 5, pos: [1, 2, 3, 5] },
              { name: '后三', id: 6, pos: [2, 3, 4, 5] },
              { name: '前二', id: 7, pos: [0, 1, 5] },
              { name: '后二', id: 8, pos: [3, 4, 5] }
            ]
            break
          case 'x11x5':
            starTypes = []
            break
          case 'k3':
            starTypes = []
            break
          case 'pk10':
            starTypes = [
              { name: '冠亚军走势', id: 9, pos: [0, 1, 10] },
              { name: '前五走势', id: 10, pos: [0, 1, 2, 3, 4, 10] },
              { name: '后五走势', id: 11, pos: [5, 6, 7, 8, 9, 10] }
            ]
            break
          default:
            starTypes = []
        }
        return starTypes
      },
      singlePosLen () {
        if (this.lotteryType === 'x11x5') {
          return 11
        } else if (this.lotteryType === 'k3') {
          return 6
        } else {
          return 10
        }
      },
      sscDetail () {
        if (this.currentStarId && this.isStarType) {
          return this.starTypes.find(v => v.id === this.currentStarId).pos
        }
      },
      posTitle () {
        let lotteryType = this.lotteryType
        let posAll = lotteryType === 'pk10' ? ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'] : ['万位', '千位', '百位', '十位', '个位']
        let arr = Array.from({length: this.singlePosLen}, (v, i) => this.isLotteryStart1 ? (i + 1) : i)
        let pos = posAll.slice(-this.lotteryLen)
        !this.isMoblie && pos.push('号码分步')
        return pos.map((v, i) => ({
          name: pos[i],
          id: i,
          num: arr
        }))
      },
      posTitles () {
        return this.isStarType ? this.posTitle.filter(v => this.sscDetail.includes(v.id)) : this.posTitle
      },
      lotterySpreads () {
        if (this.lotteryHistorys) {
          let detail = this.isStarType ? this.sscDetail.slice(0) : Array.from({length: 6}, (v, i) => i)
          detail.pop()
          let balls = this.lotteryHistorys.map(v1 => v1.balls.filter((v2, i2) => detail.includes(i2)))
          return balls.map((v1, i1) => Array.from({length: this.singlePosLen}, (v2, i2) => {
            let i = this.isLotteryStart1 ? i2 + 1 : i2
            let flag = v1.find(v => v.num === i)
            let len = v1.filter(v4 => v4.num === i).length
            return {
              ball: flag ? i : ((i1 + 1) % this.splitNum ? (i1 + 1) % this.splitNum : this.splitNum),
              class: flag ? (len > 1 ? 'ball double' : 'ball') : '',
              sameBallLen: flag ? len : 0
            }
          }))
        }
      },
      // 号码分布 竖向 号码位置
      rowLotterySpreads () {
        if (this.lotterySpreads) {
          let rowLotterySpreads = Array.from({length: this.singlePosLen}, v => Array.from({length: this.count}, v => ''))
          this.lotterySpreads.forEach((v1, i1) => {
            v1.forEach((v2, i2) => {
              rowLotterySpreads[i2][i1] = v2.sameBallLen ? Array(v2.sameBallLen).fill(v2.ball).join(',') : ''
            })
          })
          return rowLotterySpreads.map(v => v.toString().split(','))
        }
      },
      lotteryHistoryTrs () {
        if (this.lotteryHistorys) {
          // 号码分布 竖向active 位置
          if (this.isStarType) {
            console.log(this.lotteryHistorys)
            this.rowLotteryBalls.length = this.posTitle.length - 1
            this.rowLotteryBalls.push(this.rowLotterySpreads)
          } else {
            this.rowLotteryBalls.push(this.rowLotterySpreads)
            this.rowLotteryBalls.length = this.posTitle.length
          }
          this.createNumHot()
          let lotteryHistorys = JSON.parse(JSON.stringify(this.lotteryHistorys)) // 深拷贝 改变属性不会影响原始状态，配合computed,实时跟踪
          if (this.isStarType) {
            let details = this.sscDetail
            lotteryHistorys.forEach((v, i) => {
              v.pos = v.pos.filter((v2, i2) => details.includes(i2))
              v.balls.forEach((v3, i3) => {
                if (details.includes(i3)) {
                  v3.class = 'ball'
                } else {
                  v3.class = 'gone'
                  if (this.selectStatus) {
                    v3.class = ''
                  }
                }
              })
              if (this.isShowThreeStar) {
                let ballsActive = v.balls.filter(v1 => v1.class === 'ball').map(v1 => v1.num)
                v.lotteryStatus = this.createLotteryStatus(ballsActive, i)
              }
              if (this.isShowTwoStar) {
                let ballsActive = v.balls.filter(v1 => v1.class === 'ball').map(v1 => v1.num)
                let [spanTrend, double, and] = this.createSpanTrend(ballsActive, i)
                v.spanTrend = spanTrend
                v.double = double
                v.and = and
              }
              if (this.isShowPk10) {
                let ballsActive = v.balls.filter(v1 => v1.class === 'ball').map(v1 => v1.num)
                v.pk10Trend = this.createPk10Trend(ballsActive)
              }
            })
            if (this.isShowThreeStar) {
              let lotteryStatus = lotteryHistorys.map(v => v.lotteryStatus.slice(4, 7))
              this.createRowThreeStatus(lotteryStatus)
            }
            if (this.isShowTwoStar) {
              let spanTrend = lotteryHistorys.map(v => v.spanTrend)
              let tempArr = Array.from({length: this.singlePosLen}, v => Array(this.count).fill(''))
              spanTrend.forEach((v1, i1) => {
                v1.forEach((v2, i2) => {
                  if (v2.class) {
                    tempArr[i2][i1] = v2.num + ''
                  }
                })
              })
              // 获取最底下的class到根部的距离
              let splitSpanArr = this.getCloseBottom(tempArr)
              // 为跨度走势添加背景class
              lotteryHistorys.forEach((v1, i1) => {
                v1.spanTrend.forEach((v2, i2) => {
                  let num = splitSpanArr[i2]
                  if (i1 >= num) {
                    v2.class = v2.class + 'spanbg'
                  }
                })
              })
              let double = lotteryHistorys.map(v => v.double)
              this.createRowTwoStatus(spanTrend, double)
            }
          }
          if (this.isShowK3) {
            let [k3Add, addGroup, numSpreads] = [[], [], []]
            lotteryHistorys.forEach((v, i) => {
              let balls = v.balls.map(v1 => v1.num)
              v.k3Add = this.createK3Add(balls, i)
              v.addGroup = this.createAddGroup(balls, i)
              v.numSpreads = this.createNumSpreads(balls, i)
              k3Add.push(v.k3Add)
              addGroup.push(v.addGroup)
              numSpreads.push(v.numSpreads)
            })
            let tempArrLen = [this.k3AddRank, this.k3AddGroup.length, this.k3NumSpreads.length]
            let [tempAdd, tempAddGroup, tempNumSpreads] = tempArrLen.map(v => Array.from({length: v}, v1 => []))
            if (!this.isMoblie) {
              this.getK3RowActive(k3Add, tempAdd)
              this.getK3RowActive(addGroup, tempAddGroup)
              this.getK3RowActive(numSpreads, tempNumSpreads)
              this.rowLotteryBalls.push(tempAdd, tempAddGroup, tempNumSpreads)
              let [a, b, c] = [this.getCloseBottom(tempAdd), this.getCloseBottom(tempAddGroup), this.getCloseBottom(tempNumSpreads)]
              let k3Arr = {a, b, c}
              let k3 = ['k3Add', 'addGroup', 'numSpreads']
              lotteryHistorys.forEach((v1, i1) => {
                k3.forEach((v2, i2) => {
                  v1[v2].forEach((v3, i3) => {
                    if (i1 >= k3Arr[Object.keys(k3Arr)[i2]][i3]) {
                      v3.class = v3.class + 'bg'
                    }
                  })
                })
              })
            }
          }
          // 改变辅助线 遗漏 遗漏条 走势 号温
          this.changeTableStatus(lotteryHistorys)
          return lotteryHistorys
        }
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
          let tempArr = JSON.parse(JSON.stringify(tempArrOri))
          if (this.isStarType) {
            if (this.isShowThreeStar) {
              tempArr.forEach(v1 => {
                let last = v1.lotterys.length - 1
                v1.lotterys[last] = (Array(5).join(',') + v1.lotterys[last].join(',') + Array(4).join(',')).split(',')
                v1.lotterys = v1.lotterys.concat(v1.lotterys.pop().map(v2 => [v2]))
              })
            }
            if (this.isShowTwoStar) {
              tempArr.forEach(v1 => {
                v1.lotterys.push([])
              })
            }
            if (this.isShowPk10) {
              tempArr.forEach(v => {
                v.lotterys.push([], [])
              })
            }
            // 星种切换 筛选相匹配的
            let details = this.sscDetail
            return tempArr.map(v1 => ({
              name: v1.name,
              lotterys: v1.lotterys.filter((v2, i2) => this.isShowThreeStar || this.isShowTwoStar || this.isShowPk10 ? details.includes(i2) || i2 > this.lotteryLen : details.includes(i2))
            }))
          } else {
            return tempArr
          }
        }
      }
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
      changeStarType (id) {
        this.currentStarId = id
      },
      getK3RowActive (arr, temp) {
        arr.forEach((v1, i1) => {
          v1.forEach((v2, i2) => {
            temp[i2][i1] = v2.class ? v2.num : ''
          })
        })
      },
      changeLottery (id, groupId) {
        this.$router.push({ path: 'trend', query: { id, type: groupId } })
        this.lotteryType = groupId
        this.currentId = id
        this.getLotteryHistory()
      },
      createNumHot () {
        this.lotteryHistorys.forEach((v1, i1) => {
          v1.lotterySpreads = this.lotterySpreads[i1]
          v1.pos.forEach((v2, i2) => {
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
      async getLotteryHistory (count = this.count) {
        this.flag = false
        this.currentStarId = this.isStarType ? this.starTypes[0].id : ''
        this.count = count
        let data = await getPastOpen({lotteryId: this.$route.query.id, count: this.count})
        let tempData = data.data.data
        this.lotteryLen = Object.keys(tempData[0]).filter(v => /^n{1}[0-9]+$/.test(v)).length
        let nArr = Array.from({length: this.lotteryLen}, (v, i) => 'n' + (i + 1))
        let temp = tempData.map(v1 => nArr.map(v2 => v1[v2]))
        let [length, singlePosLen] = [this.lotteryLen, this.singlePosLen]
        let isStart1 = this.isLotteryStart1 // pk10 x11x5 索引从1开始，其他从0开始
        switch (this.lotteryType) {
          case 'x11x5':
            this.tableClass = 'x11x5'
            break
          case 'k3':
            this.tableClass = 'k3'
            break
          default:
            this.tableClass = ''
        }
        // 开奖号码 横向
        let lotteryHistorys = tempData.map((v1, i1) => {
          return {
            class: !((i1 + 1) % 5) ? 'active' : '',
            seasonId: !this.isMoblie ? v1.seasonId : v1.seasonId.slice(8),
            balls: Array.from({length}, (v, i) => ({ num: v1['n' + (i + 1)], class: '' })),
            // 万千百十个 位置
            pos: Array.from({length}, (v2, i2) => Array.from({length: singlePosLen}, (v3, i3) => {
              let item = temp[i1][i2]
              let i = isStart1 ? (i3 + 1) : i3
              return {
                num: item === i ? item : (i1 + 1) % this.splitNum ? (i1 + 1) % this.splitNum : this.splitNum,
                class: item === i ? 'active' : '',
                bg: ''
              }
            }))
          }
        })
        // 开奖号码 竖向
        let initArr = Array.from({length}, v => [])
        temp.toString().split(',').forEach((v, i) => {
          initArr[i % length].push(v * 1)
        })
        let rowLotteryBalls = Array.from({length}, v => Array.from({length: singlePosLen}, v => Array.from({length: this.count}, v => '')))
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
              lotteryHistorys[i3].pos[i1][i2].bg = 'bg'
            }
          })
        })
        this.lotteryHistorys = lotteryHistorys
        window.lotteryHistorys = lotteryHistorys
        // 竖向active号位置 码平均总次数 遗漏值 连出值
        this.rowLotteryBalls = rowLotteryBalls
        this.flag = true
      },
      getCloseBottom (temp) {
        return temp.map(v1 => v1.join('') ? this.count - v1.reverse().findIndex(v1 => v1) : 0)
      },
      // 和值
      createK3Add (balls, i) {
        let add = balls.reduce((num, v) => num + v)
        return Array.from({length: this.k3AddRank}, (v1, i1) => {
          let flag = add === i1 + 3
          return {
            num: flag ? add : (i + 1) % this.splitNum ? (i + 1) % this.splitNum : this.splitNum,
            class: flag ? 'span' : ''
          }
        })
      },
      changeRowClass (e, index2, index3) {
        // this.lotteryHistorys.forEach(v1 => {
        //   let temp = v1.pos[index2][index3].bg
        //   v1.pos[index2][index3].bg = e.type === 'mouseover' ? temp + ' rowactive' : temp.replace(/ rowactive/g, '')
        // })
        let thArr = Array.from(document.querySelectorAll('.num2'))
        let indexArr = Array.from({length: this.count}, (v, i) => (![7, 8].includes(this.currentStarId) ? this.posTitles.length : (this.posTitles.length + 1)) * i + index2)
        indexArr.map(v => thArr[v]).map(v => v.children[index3]).forEach(v => {
          v.className = e.type === 'mouseover' ? v.className + ' rowactive' : v.className.replace(/ rowactive/g, '')
        })
      },
      // 和值组合形态
      createAddGroup (balls, i) {
        let add = balls.reduce((num, v) => num + v)
        let status = (add > 11 ? '大' : '小') + (add % 2 ? '奇' : '偶')
        let index = this.k3AddGroup.findIndex(v => v === status)
        return Array.from({length: 4}, (v, i1) => {
          let flag = index === i1
          return {
            num: flag ? status : (i + 1) % this.splitNum ? (i + 1) % this.splitNum : this.splitNum,
            class: flag ? 'span' : ''
          }
        })
      },
      // 号码形态
      createNumSpreads (balls, i) {
        let len1 = balls.length
        let len2 = [...new Set(balls)].length
        let flag = [len2 === 1, len1 === len2, balls[0] + balls[2] === 2 * balls[1], len2 === 2, len2 !== 1]
        return this.k3NumSpreads.reduce((arr, v, i1) => arr.concat(flag[i1] ? {num: v, class: 'span'} : {num: (i + 1) % this.splitNum ? (i + 1) % this.splitNum : this.splitNum, class: ''}), [])
      },
      // 三星
      createLotteryStatus (balls, i) {
        let statusArr = [[0, 3, 6, 9], [1, 4, 7], [2, 5, 8]]
        let tempArr = balls.reduce(([str1, str2, str3, str4], v2) => [
          str1 += v2 > 4 ? '大' : '小',
          str2 += v2 % 2 ? '单' : '双',
          str3 += Array(v2).fill(1).reduce((num, v, i) => (v2 % (i + 1) ? num : num++), 0) > 2 ? '合' : '质',
          str4 += statusArr.findIndex(v3 => v3.includes(v2))], ['', '', '', ''])
        let sameLen = [...new Set(balls)].length
        let panther = sameLen === 1 ? '是' : (i + 1) % this.splitNum ? (i + 1) % this.splitNum : this.splitNum
        let tempClassArr = tempArr.map((v, i) => {
          return {
            content: v,
            class: (i % 2) ? 'th2' : 'th1'
          }
        })
        let groupThree = sameLen === 2 ? '✓' : ''
        let groupSix = {
          content: sameLen === 3 ? '✓' : '',
          class: 'th2'
        }
        let kuaDu = {
          content: Math.max.apply(Array, balls) - Math.min.apply(Array, balls),
          class: 'th2'
        }
        let total = balls.reduce((num, v2) => num + v2)
        let totalLast = (total + '').split('').pop()
        return [...tempClassArr, panther, groupThree, groupSix, kuaDu, total, totalLast]
      },
      // 三星 豹子 组三 组六 竖向号码位置
      createRowThreeStatus (lotteryStatus) {
        this.rowLotteryBalls.length = 6
        let lotteryStatusArr = lotteryStatus.map(v1 => v1.map(v2 => typeof v2 === 'object' ? v2.content : v2)).toString().split(',')
        let rowLotteryStatus = Array.from({length: 3}, v1 => [])
        lotteryStatusArr.forEach((v, i) => {
          rowLotteryStatus[i % 3].push(lotteryStatusArr[i])
        })
        rowLotteryStatus[0].forEach((v, i, self) => {
          self[i] = v === '是' ? '是' : ''
        })
        this.rowLotteryBalls.push(rowLotteryStatus)
      },
      // 二星
      createSpanTrend (balls, i) {
        let [ball1, ball2] = balls
        let index = (i + 1) % this.splitNum ? (i + 1) % this.splitNum : this.splitNum
        let difference = Math.abs(ball1 - ball2)
        let spanTrend = Array.from({length: this.singlePosLen}, (v, i1) => {
          let flag = difference === i1
          return {
            class: flag ? 'span' : '',
            num: flag ? difference : index
          }
        })
        let double = ball1 === ball2 ? '是' : index
        let and = {
          content: ball1 + ball2,
          class: 'th2'
        }
        return [spanTrend, double, and]
      },
      // 二星跨度走势 对子 竖向号码位置
      createRowTwoStatus (spanTrend, double) {
        this.rowLotteryBalls.length = 6
        let spanTrendArr = Array.from({length: this.singlePosLen}, v => Array.from({length: 5}, v => ''))
        spanTrend.forEach((v1, i1) => {
          v1.forEach((v2, i2) => {
            spanTrendArr[i2][i1] = v2.class ? v2.num + '' : ''
          })
        })
        let doubleArr = double.map(v => v === '是' ? '是' : '')
        this.rowLotteryBalls.push(spanTrendArr, [doubleArr])
      },
      // pk10
      createPk10Trend (balls) {
        return balls.reduce(([str1, str2], v) => [
          str1 += v > 5 ? '大' : '小',
          str2 += v & 2 ? '奇' : '偶'
        ], ['', ''])
      },
      // 绘制走势条
      drawTrendLine () {
        this.clearPos()
        let len = !this.isMoblie ? this.posTitles.length - 1 : this.posTitles.length
        // let eleActive = Array.from(this.$refs['active'])
        let eleActive = Array.from(document.querySelectorAll('tbody tr span.active'))
        let eleArr = Array.from({length: len}, v => [])
        // 获取class为active的坐标信息 getBoundingClientRect
        eleActive.forEach((v, i) => {
          let ele = eleActive[i]
          eleArr[i % len].push({
            x: ele.offsetLeft,
            y: ele.offsetTop,
            width: ele.offsetWidth,
            height: ele.offsetHeight
          })
        })
        this.canvasPostion = eleArr.map(v1 => {
          return v1.map((v2, i2, self2) => {
            if (!self2[i2 + 1]) {
              return ''
            }
            let pro = v2
            let pro1 = self2[i2 + 1]
            let x = (pro1.x + pro1.width / 2) - (pro.x + pro.width / 2)
            let y = (pro1.y + pro1.height / 2) - (pro.y + pro.height / 2)
            let angle = Math.floor(Math.atan((y / x)) * 180 / Math.PI)
            return {
              left: pro1.x >= pro.x ? (Math.floor(pro.x + pro.width / 2) + 'px') : (Math.floor(pro1.x - 8 + pro1.width / 2) + 'px'),
              top: Math.floor(pro.y + (pro.height) / 2) + 'px',
              // width: Math.floor(Math.abs(pro1.x + pro1.width / 2 - (pro.x + pro.width / 2))) + 'px',
              // height: Math.floor(Math.abs(pro1.y + pro1.height / 2 - (pro.y + pro.height / 2))) + 'px',
              length: Math.floor(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) + 'px',
              angle: angle + 'deg',
              dir: angle > 0 ? 'left center' : 'right center'
            }
          }).filter(Boolean)
        })
      },
      clearPos () {
        this.pos = ''
        this.canvasPostion = ''
      },
      changeTableStatus (lotteryHistorys) {
        if (!this.tableStatus.includes('line1')) {
          lotteryHistorys.forEach(v => {
            v.class = ''
          })
        }
        if (!this.tableStatus.includes('line2')) {
          lotteryHistorys.forEach(v1 => {
            v1.pos.forEach(v2 => {
              v2.forEach(v3 => {
                if (!v3.class) {
                  v3.num = ''
                }
              })
            })
            v1.lotterySpreads.forEach(v2 => {
              if (!v2.class) {
                v2.ball = ''
              }
            })
            if (this.isShowThreeStar) {
              if (v1.lotteryStatus[4] !== '是') {
                v1.lotteryStatus[4] = ''
              }
            }
            if (this.isShowTwoStar) {
              v1.spanTrend.forEach(v2 => {
                if (v2.class !== 'span') {
                  v2.num = ''
                }
              })
              if (v1.double !== '是') {
                v1.double = ''
              }
            }
          })
        }
        if (!this.tableStatus.includes('line3')) {
          lotteryHistorys.forEach(v1 => {
            v1.pos.forEach(v2 => {
              v2.forEach(v3 => {
                v3.bg = ''
              })
            })
            if (this.isShowTwoStar) {
              v1.spanTrend.forEach(v2 => {
                if (v2.class === 'spanbg') {
                  v2.class = ''
                }
              })
            }
          })
        }
        if (this.tableStatus.includes('line4')) {
          this.istrend = true
        } else {
          this.istrend = false
        }
        if (!this.tableStatus.includes('line5')) {
          lotteryHistorys.forEach(v1 => {
            v1.pos.forEach(v2 => {
              v2.forEach(v3 => {
                if (v3.class) {
                  v3.class = 'active'
                }
              })
            })
          })
        }
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
      initWidth (v) {
        if (this.lotteryType === 'k3') {
          if (v === 4) {
            return '6.25%'
          } else if (v === 5) {
            return '25%'
          } else if (v === 6) {
            return '20%'
          } else {
            return '16.6%'
          }
        }
      }
    },
    // beforeUpdate () {
    //   console.log(123)
    // },
    // updated () {
    //   console.log(456)
    // },
    watch: {
      // 渲染dom后加载
      flag () {
        this.$nextTick(() => {
          this.drawTrendLine()
        })
      },
      currentStarId () {
        this.$nextTick(() => {
          this.drawTrendLine()
        })
      },
      selectStatus () {
        this.$nextTick(() => {
          this.drawTrendLine()
        })
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
      &.x11x5 {
        tr {
          th > span {
            width: 9.09%;
          }
        }
      }
      &.k3 {
        tr {
          th > span {
            width: 16.6%;
          }
        }
      }
      background: #f2f2f2;
      font-size: 12px;
      border: 1px solid #ccc;
      border-collapse: collapse;
      text-align: center;
      width: 100%;
      strong {
        &.ball {
          color: #4caae4;
        }
        &.gone {
          display: none;
        }
        thead {
          background: #f2f2f2;
        }
        tfoot {
          background: #f2f2f2;
        }
        tr {
          th {
            &.seen {
              display: none;
            }
          }
        }
      }
      tbody {
        background: #fff;
        tr {
          &.active {
            border-bottom: 2px solid #f0a298;
          }
          th {
            > {
              span {
                &.th1 {
                  background: #49cfdc;
                }
                &.th2 {
                  background: #c2e783;
                }
              }
            }
          }
          &:hover {
            background: #ffdcd0!important;
          }
        }
      }
      tr {
        border-bottom: 1px solid #ccc;
        transition: all 0.2s ease-in;
        th {
          line-height: 21px;
          border-right: 2px solid #f0a298;
          > {
            span {
              display: inline-block;
              width: 10%;
              border-right: 1px solid #ccc;
              height: 100%;
              line-height: 26px;
              transition: all 0.2s ease-in;
              &.spanbg {
                background: #ffdcd0;
              }
              &.span {
                background: #2bb5c2;
                color: #fff;
                span {
                  color: #fff;
                }
              }
              &.bg, &.rowactive {
                background: #ffdcd0;
              }
              span {
                line-height: 15px;
                display: inline-block;
                width: 15px;
                height: 15px;
                &.active {
                  background: #008535;
                  color: #fff;
                  border-radius: 100%;
                  z-index: 10;
                  position: relative;
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
                &.ball {
                  background: #34bc0f;
                  color: #fff;
                  border-radius: 100%;
                }
                &.double {
                  background: #bd3ed4;
                  color: #fff;
                  border-radius: 100%;
                }
              }
              &:last-child {
                border-right: none;
              }
            }
          }
        }
      }
    }
    .canvas {
      transition: all .2s ease-in;
      div {
        div{
          position: absolute;
          background: red;
          height: 2px;
        }
      }
    }
    .on {
      color: red;
    }
  }
</style>
