<template lang="jade">
#app
  router-view
</template>

<script>
export default {
  name: "App",  
};
</script>

<style>
body,
html,
#app,
.login {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #efeef4;
  font-family: "微软雅黑";
}
*,
body,
html,
ul,
ol,
dl {
  padding: 0px;
  margin: 0px;
  list-style: none;
}
p {
  margin: 0;
}
input{
  height: 24px;
  line-height: 24px;
}

</style>
