<template>
  <div class='one'>
    <div class="banner">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in banners" :key="index">
          <div class="item">
            <img :src="'./../../../static/banner'+ item +'.jpg'" alt="">
          </div>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev iconfont icon-left" slot="button-prev"></div>
        <div class="swiper-button-next iconfont icon-you" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
    </div>
    <ul class="lotterys" v-if="loginStatus">
      <router-link tag="li" v-for="(item, index) in hotLotterys" :key="index" :to="{path: '/lotteryBet', query:{id: item.id, name: item.name, group: item.groupId}}">
        <span><i :class="['iconfont', 'icon-' + item.groupId]"></i></span>
        <h5>{{item.name}}</h5>
      </router-link>
      <router-link tag="li" class="lottery-list" to="/lotteryList/all">
        <i class="iconfont icon-jia"></i>
        <h5>更多彩种</h5>
      </router-link>
    </ul>
    <ul class="lotterys" v-else>
      <li v-for="(item, index) in lotterys" :key="index">
        <span><i :class="['iconfont', item.icon]"></i></span>
        <h5>{{item.name}}</h5>
      </li>
      <router-link tag="li" class="lottery-list" to="/lotteryList/all">
        <i class="iconfont icon-jia"></i>
        <h5>更多彩种</h5>
      </router-link>
    </ul>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { getIndexInfo } from './../../api'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'one',
  data () {
    return {
      swiperOption: {
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: true,
        loop: true,
        freeMode: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      lotterys: [
        { name: '宏發快3', icon: 'icon-k3' },
        { name: '宏發时时彩', icon: 'icon-ssc' },
        { name: '北京赛车', icon: 'icon-pk10' },
        { name: '上海快3', icon: 'icon-k3' },
        { name: '江苏快3', icon: 'icon-k3' },
        { name: '广西快3', icon: 'icon-k3' },
        { name: '河北快3', icon: 'icon-k3' },
        { name: '湖北快3', icon: 'icon-k3' },
        { name: '安徽快3', icon: 'icon-k3' },
        { name: '甘肃快3', icon: 'icon-k3' },
        { name: '北京快3', icon: 'icon-k3' },
        { name: '重庆时时彩', icon: 'icon-ssc' }
      ],
      hotLotterys: '',
      banners: [1, 2, 3],
      noticeList: ''
    }
  },
  created () {
    this.getIndexInfo()
  },
  computed: {
    loginStatus () {
      return this.$store.state.loginStatus
    }
  },
  methods: {
    async getIndexInfo () {
      let res = await getIndexInfo()
      let data = res.data.data
      this.hotLotterys = data.hotLotterys
      this.noticeList = data.noticeList
    }
  },
  activated () {
    // console.log('go')
  },
  deactivated () {
    // console.log('leave')
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
.one {
  .headers {
    text-align: center;
  }
  .banner{
    height: 150px;
    overflow: hidden;
    /deep/ .swiper-container, .item, img{
      height: 100%;
      width: 100%;
    }
    >>> .swiper-container, .item, img{
      height: 100%;
      width: 100%;
    }
    >>> .swiper-container{
      .swiper-button-next, .swiper-button-prev {
        background-image: none;
        font-size: 20px;
      }
    }
    /deep/ .swiper-container .swiper-pagination{
      span {
        background: red;
      }
    }
  }
  .lotterys{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    border-bottom: 1px solid #DFE4ED;
    li {
      width: 33.33%;
      border-top: 1px solid #DFE4ED;
      border-left: 1px solid #DFE4ED;
      padding: 10px 0;
      i{
        font-size: 56px;
      }
      .icon-ssc{
        color: #F4A721;
      }
      .icon-k3{
        color: #C6312A;
      }
      .icon-pk10{
        color: #2FBBF2;
      }
      h5{
        font-size: 14px;
        margin-top: 5px;
      }
      &.lottery-list{
        i {
          color: #fa7e00;
        }
      }
    }
  }
}
</style>
