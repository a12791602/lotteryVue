<template>
  <div class="loading">
    <div class="loading_wrap"></div>
    <div class="overly"></div>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style scoped lang="scss">
.loading {
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .loading_wrap{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width:30px;
    height:30px;
    background:#3498db;
    border-radius:50px;
    animation: loading 1.5s infinite linear;
    &:before{
      position:absolute;
      width:50px;
      height:50px;
      border-top:10px solid #9b59b6;
      border-bottom:10px solid #9b59b6;
      border-left:10px solid transparent;
      border-right:10px solid transparent;
      border-radius:50px;
      content:'';
      top:-20px;
      left:-20px;
      animation: loading_after 1.5s infinite linear;
    }
  }
  @-webkit-keyframes loading {
    0% {-webkit-transform: rotate(0deg);}
    50% {-webkit-transform: rotate(180deg);background:#2ecc71;}
    100% {-webkit-transform: rotate(360deg);}
  }
  @-webkit-keyframes loading_after {
    0% {border-top:10px solid #9b59b6;border-bottom:10px solid #9b59b6;}
    50% {border-top:10px solid #3498db;border-bottom:10px solid #3498db;}
    100% {border-top:10px solid #9b59b6;border-bottom:10px solid #9b59b6;}
  }
}
</style>
