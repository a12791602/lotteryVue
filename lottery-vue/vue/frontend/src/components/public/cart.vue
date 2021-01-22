<template lang="jade">
.cart
  .cart-num(v-show='selected.length > 0')
    div
    div
      span(:class="{'active': index === lists}", v-for="(unit,index) in ['元','角','分']", :key='index', @click='moneyC(index)') {{unit}}
  .basket
    .basket-left(:class="{'active':selected.length > 0}", @click='addbasket')
      i.iconfont.icon-plus-add
      div
        p 共{{selected.length}}注，{{totalMoney * unit | keepTwoNum}}元
        p
          span {{cart}}
      .ball-container
        .ball(transition='drop', v-for='ball in balls', v-show='ball.show', :key='ball.id')
          .inner
    .basket-right(@click='basketTo')
      i.iconfont.icon-liwu
        span.badge {{badge > 0 ? badge : ''}}
        | 号码篮
</template>
<script>
export default {
  data() {
    return {
      value: 1, //倍数
      badge: 1, //购物篮数
      lists: 0,
      allmoney: 2, //共多少钱
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ]
    };
  },
  props: {
    cart: {
      type: String
    },
    selected: {
      type: Array
    }
  },
  watch: {},
  computed: {
    totalMoney() {
      let sum = 0;
      sum = this.allmoney * this.selected.length * this.value;
      return sum;
    },
    unit() {
      //1=1元, 2=1角, 3=1分, 4=1厘
      return 10 / Math.pow(10, this.lists + 1);
    }
  },
  methods: {
    moneyC(index) {
      this.lists = index;
    },
    addbasket() {
      if (this.selected.length) {
        this.badge++;
      }
    },
    basketTo() {
      //购物篮不为空时，点击跳转
      if (this.badge) {
        //    		 this.$router.push({path:"/carts?a=123"});
      }
    }
  },
  // 保留二个小数,四舍五入
  filters: {
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/scss/main.scss";
.cart {
  position: fixed;
  z-index: 21;
  bottom: 0;
  width: 100%;
  & .cart-num {
    @extend %flex;
    @extend %aitems;
    @extend %sbetween;
    height: 50px;
    background: #fff;
    padding: 0px 16px;
    > div {
      @extend %flex;
      @extend %aitems;
      & span {
        font-size: 18px;
      }
    }
    > div:nth-child(2) {
      & span {
        @extend %faj;
        border: 1px solid #d2d2d2;
        background: #fff;
        width: 28px;
        height: 28px;
        font-size: 16px;
        border-radius: 2px;
      }
      & span.active {
        background: #dc3b40;
        color: #fff;
      }
    }
  }
  & .basket {
    @extend %flex;
    height: 50px;
    background: #000;
    color: #fff;
    & .basket-left {
      padding-left: 16px;
      width: 70%;
      @extend %flex;
      @extend %aitems;
      background: #fb6a6f;
      & i {
        font-size: 22px;
        margin-right: 10px;
      }
      > div {
        & p:nth-child(1) {
          font-size: 16px;
          margin: 0px;
        }
        & p:nth-child(2) {
          margin: 0px;
          width: 186px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          & span {
            margin-right: 4px;
          }
        }
      }
    }
    & .basket-left.active {
      background: #dc3b40;
    }
    & .basket-right {
      position: relative;
      @extend %faj;
      width: 30%;
      background: #a4a4a4;
      font-size: 18px;
      & i {
        color: #fff !important;
        font-size: 22px;
        margin-right: 10px;
      }
      & .badge {
        @extend %faj;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #f56c6c;
        color: #fff;
        position: absolute;
        top: 2px;
        left: 24px;
      }
    }
    & .basket-right.active {
      background: #000;
    }
  }
}
.ball-container {
  & .ball {
    position: fixed;
    right: 100px;
    bottom: 22px;
    z-index: 200;
    & .drop-transition {
      transition: all 0.4s;
      & .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #f56c6c;
        transition: all 0.4s;
      }
    }
  }
}
</style>