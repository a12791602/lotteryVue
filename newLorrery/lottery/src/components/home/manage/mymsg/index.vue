<template>
  <div class="mymsg">
    <headers class="headers">
      <div slot="headerTitle">
        <button v-for="(list, index) in titleLists" :key="index" :class="{active: list.title === currentTitle}" @click="toggleCom(list)">{{list.name}}</button>
      </div>
    </headers>
    <component :is="currentTitle" :noticeLists="noticeLists"></component>
  </div>
</template>

<script>
import notice from './notice'
import letter from './letter'
import { userNoticeList } from '@/api'
import headers from '@/components/public/headers.vue'
export default {
  name: 'mymsg',
  data () {
    return {
      currentTitle: this.$route.params.id,
      titleLists: [
        { name: '公告', title: 'notice', params: { type: 1, limit: 10 } },
        { name: '私信', title: 'letter', params: { type: 2, limit: 100 } }
      ],
      noticeLists: ''
    }
  },
  computed: {
    currentParams () {
      return this.titleLists.find(v => v.title === this.currentTitle).params
    }
  },
  created () {
    this.getUserNoticeList()
  },
  methods: {
    toggleCom (list) {
      this.currentTitle = list.title
      this.$router.push(`/mymsg/${this.currentTitle}`)
      this.getUserNoticeList()
    },
    async getUserNoticeList () {
      let data = await userNoticeList({start: 0, ...this.currentParams})
      this.noticeLists = data.data.data.list
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.noticeLists = ''
    next()
    this.currentTitle = this.$route.params.id
    this.getUserNoticeList()
  },
  components: {
    headers,
    notice,
    letter
  }
}
</script>

<style scoped lang="scss">
.mymsg{
  .headers{
    display: flex;
    align-items: center;
    justify-content: center;
    >>> div{
      height: 40px;
      line-height: 40px;
      border: 1px solid #fff;
      width: 120px;
      border-radius: 4px;
      overflow: hidden;
      button{
        vertical-align: top;
        height: 100%;
        background: transparent;
        text-align: center;
        display: inline-block;
        width: 50%;
        color: #fff;
        transition: all 0.2s ease-in;
        &.active{
          background: #fff;
          color: #dc3b40;
        }
      }
    }
  }
}
</style>
