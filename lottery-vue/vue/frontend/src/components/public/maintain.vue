<template lang="jade">
.x11x5pop
  div
    span 该游戏
    | ，正在更新维护中，敬请期待........
  div
    router-link(to='/one', tag='button') --->其它游戏
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.x11x5pop {
  @extend %faj;
  @extend %fdc;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  > div {
    color: #caebda;
    font-size: 16px;
    & span {
      color: #caebda;
    }
    & button {
      border: 1px solid #caebda;
      color: #caebda;
      background: none;
      padding: 6px 22px;
      border-radius: 4px;
      margin-top: 20px;
    }
  }
}
</style>

