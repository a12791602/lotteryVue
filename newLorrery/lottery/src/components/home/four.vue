<template>
  <div class="four">
    <headers>
      <ul class="title" slot="headerTitle">
        <li v-for="(item, index) in titles" :key="index" :class="{active: currentTitle === item.url}" @click="currentTitle = item.url">{{item.name}}</li>
      </ul>
    </headers>
    <transition name="router-fade" mode="out-in">
      <component :is="currentTitle"></component>
    </transition>
  </div>
</template>

<script>
import headers from './../public/headers'
import profit from './four/profit'
import winning from './four/winning'
export default {
  name: 'four',
  data () {
    return {
      currentTitle: 'winning',
      titles: [
        { name: '中奖信息', url: 'winning' },
        { name: '昨日盈利榜', url: 'profit' }
      ]
    }
  },
  components: {
    winning,
    profit,
    headers
  }
}
</script>

<style scoped lang="scss">
.router-fade-enter-active, .router-fade-leave-active,.model-enter-active, .model-leave-active  {
  transition: opacity .3s ease-in;
}
.router-fade-enter, .router-fade-leave-active,.model-enter, .model-leave-active {
  opacity: 0;
}
.four {
  .headers {
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      height: 40px;
      line-height: 38px;
      border: 1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      li {
        color: #fff;
        padding: 0 6px;
        transition: all 0.2s ease-in;
        &.active {
          background: #fff;
          color: #af3a31;
        }
      }
    }
  }
}
</style>
