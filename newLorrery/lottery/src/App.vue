<template>
  <div id="app">
    <headers v-if="$route.meta.name" ref="header"></headers>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepalive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepalive"></router-view>
    </transition>
    <footers v-if="['one', 'second', 'three', 'four', 'five'].includes($route.name)"></footers>
    <loading v-show="loadingFlag"></loading>
    <model ref="model"></model>
  </div>
</template>

<script>
import '@/style/common.scss'
import headers from '@/components/public/headers.vue'
import model from '@/components/public/model.vue'
import footers from './components/public/footers'
import loading from '@/components/public/loading.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {},
  computed: {
    ...mapState(['loadingFlag'])
  },
  mounted () {
    // console.log(this.$refs['header'])
  },
  watch: {
    '$route' (to, from) {
      // console.log(this.$refs['header'])
      // console.log(to, from)
    }
  },
  components: {
    headers,
    footers,
    loading,
    model
  }
}
</script>

<style lang="scss">
#app {
  .router-fade-enter-active, .router-fade-leave-active,.model-enter-active, .model-leave-active  {
    transition: opacity .3s ease-in;
  }
  .router-fade-enter, .router-fade-leave-active,.model-enter, .model-leave-active {
    opacity: 0;
  }
}
.model {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, .5);
  .model_wrap{
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    width: 70%;
    margin: 100px auto 0;
    .model_header{
      position: relative;
      background: #af3a31;
      text-align: center;
      height: 50px;
      line-height: 50px;
      h5 {
        color: #fff;
        font-size: 16px;
      }
      i {
        color: #fff;
        border: 1px solid #fff;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        line-height: 20px;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
      }
    }
    .model_body {
      padding: 15px 0;
      text-align: center;
    }
    .model_footer {
      button {
        display: block;
        width: 100%;
        text-align: center;
        background: transparent;
        font-size: 14px;
        color: #af3a31;
        padding: 10px 0;
        border-top: 1px solid #000;
      }
    }
  }
}
</style>
