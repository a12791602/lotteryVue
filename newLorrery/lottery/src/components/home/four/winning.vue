<template>
  <div class="winning">
    <transition-group tag="div"></transition-group>
    <ul>
      <li v-for="(item, index) in winDatas" :key="index">
        <img :src='"@/assets/img/one/" + item.img + ".jpg"' alt="">
        <div class="text">
          <p><span class="name">{{item.name}}</span>在<span>{{item.lottery}}</span></p>
          <p><span>喜中 ￥ {{item.money}}</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getLotteryListAll } from './../../../api'
export default {
  name: 'winning',
  data () {
    return {
      winDatas: [],
      lotterys: ''
    }
  },
  created () {
    this.getLotteryAll()
  },
  methods: {
    initArr () {
      let numArr = Array.from({length: 10}, (v, i) => i)
      let lowerArr = Array.from({length: 26}, (v, i) => String.fromCharCode(i + 97))
      let upperArr = lowerArr.map(v => v.toLocaleUpperCase())
      let arr = [...numArr, ...lowerArr, ...upperArr]
      return arr.sort(() => Math.random() > 0.5 ? -1 : 1)
    },
    createLi () {
      let initArr = this.initArr()
      let len = initArr.length
      return {
        lottery: this.lotterys[parseInt(Math.random() * this.lotterys.length)],
        name: initArr[parseInt(Math.random() * len)] + Array.from({length: parseInt(Math.random() * 3 + 4)}, () => '*').join('') + initArr[parseInt(Math.random() * len)],
        money: (Math.random() * 1000 + 500).toFixed(2),
        img: parseInt(Math.random() * 32)
      }
    },
    async getLotteryAll () {
      let data = await getLotteryListAll()
      this.lotterys = data.data.data.map(v => v.name)
      this.winDatas = Array.from({length: 20}, () => this.createLi())
      let interval = setInterval(() => {
        this.winDatas.shift()
        this.winDatas.push(this.createLi())
      }, 1500)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(interval)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.winning {
  ul {
    li {
      transition: all 0.2s ease-in;
      padding-left: 15px;
      height: 68px;
      display: flex;
      align-items: center;
      img {
        margin-right: 15px;
        width: 44px;
        height: 44px;
        border-radius: 4px;
      }
      .name {
        padding-right: 20px;
      }
      &:nth-child(even){
        background: rgba(255, 201, 187, 0.1);
      }
      &:nth-child(even) {
        background: #fff;
      }
    }
  }
}
</style>
