<template>
  <div class="letter">
    <ul>
      <li v-for="(list, index) in noticeLists" :key="index">
        <p>{{list.title}} <span>{{list.createTime}}</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'letter',
  props: ['noticeLists']
}
</script>

<style scoped lang="scss">
.letter{
  ul {
    li {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
