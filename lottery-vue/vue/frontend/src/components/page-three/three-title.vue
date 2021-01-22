<template lang="jade">
.three-title
  i.iconfont.icon-left(@click='hide')
  p 信息
</template>
<script>
export default {
  data() {
    return {
      isshow: {
        showPage: false
      }
    };
  },
  props: {
    threeTitle: {
      type: Boolean
    }
  },
  methods: {
    hide() {
      this.isshow.showPage = false;
      this.$emit("sonclick", this.isshow);
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/main.scss";
.three-title {
  @extend %faj;
  font-size: 20px;
  color: #fff;
  position: fixed;
  top: 0px;
  height: 46px;
  width: 100%;
  background: rgb(175, 58, 49);
  z-index: 11;
  & i {
    position: absolute;
    left: 16px;
  }
}
</style>
