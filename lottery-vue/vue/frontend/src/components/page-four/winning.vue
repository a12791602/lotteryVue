<template lang="jade">
.winning
	ul(v-show='showFlag')
		li(v-for='(item,index) in winpool', :key='index', v-show='index <12')
			.winning-left
				img(:src='"@/assets/img/one/"+item.paths+".jpg"')
				.winning-xq
					p
						span {{item.name}}
						span 在  {{item.lotterylist}}
					p
						span 喜中 ￥ {{item.money | keepTwoNum}}
			.winning-right
			.winning-right2
			// .winning-right3
			// pop(:pop='selectedFood', @sonclick='haashow', ref='pop')
</template>
<script>
import pop from "./pop";
import index from "vue";
export default {
  data() {
    return {
      b: 0,
      winpool: [],
      showFlag: true,
      a: 0,
      x: 0,
      arr1: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ],
      arr2: ['宏發快3', '宏發pk10', '宏發時時彩', '广西快3', '新疆时时彩', '北京快3', '重庆时时彩', '河北快3', '北京赛车', '安徽快3', '甘肃快3', '安徽快3', '江苏快3', '湖北快3'],
    };
  },
  //可以倒计时，或做秒钟
  created() {
    var arr2 = ['宏發快3', '宏發pk10', '宏發時時彩', '广西快3', '新疆时时彩', '北京快3', '重庆时时彩', '河北快3', '北京赛车', '安徽快3', '甘肃快3', '安徽快3', '江苏快3', '湖北快3'];
    for (let i = 0; i < 12; i++) {
      this.newReward();
    }
    var countdown = () => {
      this.winpool.reverse();
      this.newReward();
      this.winpool.shift();
      this.winpool.reverse();
      setTimeout(countdown, 1400);
    };
    setTimeout(countdown, 1400);
  },
  methods: {
    newReward() {
      let a = {
        name: this.randomWord(true, 4, 7),
        money: 0,
        lotterylist: this.arr2[Math.round(Math.random() * (this.arr2.length - 1))],
        paths: Math.floor(Math.random() * (32) + 1)
      };
      let racial = Math.round(Math.random() * (100 - 1)) + 1;
      if (racial < 65) {
        a.money = (Math.floor(Math.random() * (40000) + 200)) / 100;
      } else {
        a.money = (Math.floor(Math.random() * (200000) + 200)) / 100;
      }
      this.winpool.push(a);
    },
    randomWord(randomFlag, min, max) {
      var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
          'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      str += arr[Math.round(Math.random() * (arr.length - 10) + 9)];
      for (var i = 0; i < range; i++) {
        str += '*';
      }
      str += arr[Math.round(Math.random() * (arr.length - 1))];
      return str;
    },
    selectFood(item, event) {
      this.showFlag = false;
      this.selectedFood = item;
      this.$refs.pop.show();
    },
    haashow(isshow) {
      this.showFlag = !isshow.showF;
    }
  },
  filters: {
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  components: {
    pop
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-four/winning.scss";
</style>
