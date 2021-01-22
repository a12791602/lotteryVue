<template>
  <div class="profit">
    <ul>
      <li v-for="(item, index) in profits" :key="index">
        <div class="content_left">
          <img :src='"@/assets/img/one/" + item.img + ".jpg"' alt="">
          <div class="wraps">
            <p>账号名称：<span>{{item.account | initStar}}</span></p>
            <p>昨日盈利：<span>{{item.bonus}}</span></p>
          </div>
        </div>
        <div class="content_right">
          <span>{{index + 1}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { winList } from './../../../api'
export default {
  name: 'profit',
  data () {
    return {
      profits: ''
    }
  },
  created () {
    this.getWinList()
  },
  methods: {
    async getWinList () {
      let data = await winList()
      console.log(data)
      this.profits = data.data.data
    }
  },
  filters: {
    initStar (val) {
      let arr = val.split('')
      return arr.shift() + '***' + arr.pop()
    }
  }
}
</script>

<style scoped lang="scss">
.profit {
  ul {
    background: #fff;
    li {
      height: 70px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .content_left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 44px;
          height: 44px;
          border-radius: 4px;
          margin-right: 15px;
        }
      }
      .content_right {
        span {
          width: 34px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          border-radius: 100%;
          display: inline-block;
        }
      }
      &:nth-child(1) {
        .content_right {
          span {
            background: #C5575A;
            color: #fff;
          }
        }
      }
      &:nth-child(2) {
        .content_right {
          span {
            background: #53b0fe;
            color: #fff;
          }
        }
      }
      &:nth-child(3) {
        .content_right {
          span {
            background: #f8a968;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
