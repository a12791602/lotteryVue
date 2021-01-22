<template>
  <div class="past">
    <headers>
      <h5 slot="headerTitle">{{$route.query.name}}</h5>
    </headers>
    <ul class="datas">
      <li :class="[currentDate === item.count ? 'active' : '']" v-for="(item, index) in dates" :key="index" @click="currentDate = item.count">{{item.name}}</li>
    </ul>
    <div class="lottery_wrap">
      <ul class="lottery_list">
        <li v-for="(item, index) in historyOpens" :key="index">
          <p>{{item.seasonId}}</p>
          <div class="ball">
            <span v-for="(lottery, index) in item.lotterysBall" :key="index">{{lottery}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headers from './../public/headers'
import { getPastOpen } from './../../api'
export default {
  name: 'past',
  data () {
    return {
      currentDate: 30,
      dates: [
        { name: '近30期', count: 30 },
        { name: '近50期', count: 50 },
        { name: '今日数据', count: -1 }
      ]
    }
  },
  asyncComputed: {
    async historyOpens () {
      let data = await getPastOpen({lotteryId: this.$route.query.id, count: this.currentDate})
      let history = data.data.data
      let lotteryLen = Object.keys(history[0]).filter(v => /^n{1}[0-9]+$/g.test(v)).length
      let nArr = Array.from({length: lotteryLen}, (v, i) => `n${i + 1}`)
      return history.map(v1 => ({
        seasonId: v1.seasonId,
        lotterysBall: nArr.map(v2 => v1[v2])
      }))
    }
  },
  components: {
    headers
  }
}
</script>

<style scoped lang="scss">
.past {
  .datas {
    position: fixed;
    left: 0;
    top: 60px;
    right: 0;
    display: flex;
    text-align: center;
    background: #AE9880;
    li {
      color: #fff;
      width: 33.33%;
      height: 40px;
      line-height: 40px;
      &.active {
        border-bottom: 2px solid #af3a31;
      }
    }
  }
  .lottery_wrap {
    padding: 12px;
    margin-top: 40px;
    li {
      background: #fff;
      border-radius: 4px;
      margin-bottom: 15px;
      p {
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border-bottom: 1px solid #eee;
      }
      .ball {
        height: 60px;
        line-height: 60px;
        text-align: center;
        span {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 1px solid #999;
          border-radius: 100%;
          line-height: 38px;
          margin: 0 4px;
        }
      }
    }
  }
}
</style>
