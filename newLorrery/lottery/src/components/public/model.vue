<template>
  <div class="model" ref="model" v-show="flag">
    <div class="model_wrap">
      <div class="model_header">
        <h5>温馨提示</h5>
        <i class="iconfont icon-close" @click="flag = false"></i>
      </div>
      <div class="model_body">
        <div v-html="modelText"></div>
      </div>
      <div class="model_footer">
        <button @click="flag = false">确认<strong>({{time}})</strong></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'model',
  data () {
    return {
      modelText: '',
      flag: false,
      time: 3
    }
  },
  methods: {},
  watch: {
    modelText () {
      if (this.modelText) {
        this.flag = true
        let interval = setInterval(() => {
          if (!this.time) {
            console.log(this.time)
            clearInterval(interval)
            this.flag = false
            this.time = 3
            this.modelText = ''
            return
          }
          this.time--
        }, 1000)
        this.$once('hook:beforeDestroy', () => {
          clearInterval(interval)
          console.log('broke')
        })
      }
      if (this.modelText) {}
    }
  }
}
</script>

<style scoped lang="scss">
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
