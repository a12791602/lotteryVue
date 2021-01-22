<template>
  <div class="headers">
    <h5>{{$route.meta.name}}</h5>
    <slot name="headerTitle"></slot>
  </div>
</template>

<script>
export default {
  name: 'headers'
}
</script>

<style scoped lang="scss">
.headers{
  z-index: 10;
  height: 60px;
  line-height: 60px;
  background: #af3a31;
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  h5 {
    color: #fff;
    text-align: center;
    font-size: 22px;
    line-height: 60px;
  }
  span{
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 20px;
    font-size: 16px;
  }
}
</style>
