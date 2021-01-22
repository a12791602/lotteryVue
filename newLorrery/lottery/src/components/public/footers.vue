<template>
  <div class="footers">
    <ul>
      <router-link tag="li" v-for="(item, index) in navs" :key="index" :class="[$route.name === item.src ? 'active' : '']" :to="'/' + item.src">
        <span><i :class="['iconfont', item.icon]"></i></span>
        <h5>{{item.name}}</h5>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'footers',
  data () {
    return {
      navs: [
        { icon: 'icon-home', name: '首页', src: 'one' },
        { icon: 'icon-date', name: '往期开奖', src: 'second' },
        { icon: 'icon-campaign', name: '活动', src: 'three' },
        { icon: 'icon-trophy', name: '发现', src: 'four' },
        { icon: 'icon-vcard', name: '我的', src: 'five' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.footers{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  ul{
    display: flex;
    background: #ae9880;
    border-bottom: 5px solid #af3a31;
    li {
      padding: 6px 0;
      width: 20%;
      &.active{
        background: #af3a31;
      }
      i{
        color: #ddd;
        font-size: 30px;
      }
      h5{
        color: #ddd;
        font-size: 14px;
      }
    }
  }
}
</style>
