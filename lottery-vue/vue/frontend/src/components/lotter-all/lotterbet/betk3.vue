<template>
  <div class="betk3">
    <ul class="betk3-top">
      <li>
        <i class="iconfont icon-left" @click="banckto"></i>
      </li>
      <li>
        <p class="wangfa">玩<br/>法</p>
        <div class="menu" @click="showa = false,show = !show">{{title}}
          <i class="iconfont" :class="show ? 'icon-up' : 'icon-down'"></i>
        </div>
        <div class="menu-list" v-show="show" @click="show = false">
          <div class="menu-listShow">
            <ul class="menu-list-top">
              <li v-for="(into,index) in poptitle" :key="index" v-if="isdfk3(index)" :class="{'active': index === navlist}" @click="k3Tab($event,index,into)">
                <div class="title"> {{into.title}}</div>
                <div class="xq">赔率 {{into.rate | keepTwoNum}}</div>
                <div class="img">
                  <span class="img1 Dice Dice1"></span>
                  <span class="img2 Dice Dice1"></span>
                  <span class="img3 Dice Dice1"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class="betk3list">
        <span @click="getLotteryList">{{listname}}</span>
        <i class="iconfont" :class="showa ? 'icon-up' : 'icon-down' " @click="getLotteryList"></i>
        <div class="betk3listRight" v-show="showa">
          <ul>
            <li v-for="(listk3,index) in LotteryList" :key="index" @click="listnames($event,index,listk3)">
              <a>{{listk3.name}}</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div v-show="lookAllUl" class="lookAllDiv">
      <p class="lookAllDivTitle">
        <i class="iconfont icon-left" @click="lookAllDivTitle"></i>
        <b class="cont">查看更多</b>
        <span></span>
      </p>
      <div class="lookAllUlBox">
        <ul class="lookAllUl">
          <li>
            <p>期号</p>
            <p>开奖号码</p>
            <p>和值</p>
            <p>大小</p>
            <p>单双 </p>
          </li>
          <li v-for="(item,index) in getPastOpens" :key="index">
            <p v-if="$route.query.id === 'bjk3'">{{item.seasonId}}
              <i class="iconfont icon-plus-minus"></i>
            </p>
            <p v-else>{{item.seasonId.substring(4).split("-").join("")*1}}
              <i class="iconfont icon-plus-minus"></i>
            </p>
            <p>
              <a><span class="Dice" :class="'Dice'+item.n1"></span></a>
              <a><span class="Dice" :class="'Dice'+item.n2"></span></a>
              <a><span class="Dice" :class="'Dice'+item.n3"></span></a>
            </p>
            <p>{{item.n1+item.n2+item.n3}}</p>
            <p>
              <span :class="item.n1+item.n2+item.n3 &lt; 11 ? 'goodidea' : 'goodluck'">
                {{item.n1+item.n2+item.n3 &lt; 11 ? '小' : '大'}}</span>
            </p>
            <p>
              <span :class="(item.n1+item.n2+item.n3)%2 === 0 ? 'goodidea' : 'goodluck'">{{(item.n1+item.n2+item.n3)%2 === 0 ? '双' : '单'}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="betk3-content">
      <div>
        <div class="betk3-content-top">
          <div class="content-left" @click="countNums">
            <p v-if="$route.query.id === 'bjk3'">{{lastSeasonId}}期开奖号码</p>
            <p v-if="$route.query.id !== 'bjk3'">{{lastSeasonId !== '' ? lastSeasonId.slice(4)*1 : lastSeasonIds}}期开奖号码
            </p>
            <div v-if="shownum === false" class="contnet-left-num">
              <p class="Dice" :class="'Dice'+n1"></p>
              <p class="Dice" :class="'Dice'+n2"></p>
              <p class="Dice" :class="'Dice'+n3"></p>
              <i class="iconfont" :class="betk3ContentTopPop ? 'icon-up' : 'icon-down'"></i>
            </div>
            <div v-if="shownum === true && isGetItem === true" class="contnet-left-num">
              <div class="num">
                <div class="span">
                  <transition name="down-up-translate-fade">
                    <div class="Dice" :class="'Dice'+i"></div>
                  </transition>
                </div>
                <div class="span">
                  <transition name="down-up-translate-fade">
                    <div class="Dice" :class="'Dice'+j"></div>
                  </transition>
                </div>
                <div class="span">
                  <transition name="down-up-translate-fade">
                    <div class="Dice" :class="'Dice'+k"></div>
                  </transition>
                </div>
              </div>
              <i class="iconfont" :class="betk3ContentTopPop ? 'icon-up' : 'icon-down'"></i>
            </div>
          </div>
          <div class="content-right" @click="tolooksucc">
            <div>
              <p class="seasonId" v-if="$route.query.id === 'bjk3'">{{seasonId}}期投注截止</p>
              <p class="seasonId" v-if="$route.query.id !== 'bjk3'">{{seasonId !== '' ? seasonId : Number(lastSeasonIds)+1}}期投注截止
              </p>
              <div class="time">
                <p>{{countDown !== '' ? countDown : "00:00:00"}}</p>
              </div>
            </div>
            <i class="iconfont icon-sanjiaoleft"></i>
          </div>
        </div>
        <div class="betk3-content-top-pop" v-show="betk3ContentTopPop" @click="betk3ContentTopPop = false">
          <ul class="look">
            <li>
              <p>期号</p>
              <p>开奖号码</p>
              <p>和值</p>
              <p>大小</p>
              <p>单双</p>
            </li>
            <li v-for="(item,index) in getPastOpens" :key="index" v-if="index &lt; 10">
              <p v-if="$route.query.id === 'bjk3'">{{item.seasonId}}
                <i class="iconfont icon-plus-minus"></i>
              </p>
              <p v-else>{{item.seasonId.substring(4).split("-").join("")*1}}
                <i class="iconfont icon-plus-minus"></i>
              </p>
              <p>
                <a><span class="Dice" :class="'Dice'+item.n1"></span></a>
                <a><span class="Dice" :class="'Dice'+item.n2"></span></a>
                <a><span class="Dice" :class="'Dice'+item.n3"></span></a>
              </p>
              <p>{{item.n1+item.n2+item.n3}}</p>
              <p>
                <span :class="item.n1+item.n2+item.n3 < 11 ? 'goodidea' : 'goodluck'">{{item.n1+item.n2+item.n3 &lt; 11 ? '小' : '大'}}</span>
              </p>
              <p>
                <span :class="(item.n1+item.n2+item.n3)%2 === 0 ? 'goodidea' : 'goodluck'">{{(item.n1+item.n2+item.n3)%2 === 0 ? '双' : '单'}}</span>
              </p>
            </li>
          </ul>
          <p class="lookAll">
            <button @click="lookAll">查看更多</button>
            <button @click="lookAllTo">往期开奖</button>
          </p>
        </div>
        <div class="betk3-content-foot">
          <p v-for="(item,index) in poptitle" :key="index" v-show="index === navlist">{{$route.query.id=="dfk3"?item.remark:item.remark+"(不含豹子号)"}} 
            <span v-show="index !== 3">赔率
              <span class="k3remark">{{ item.rate | keepTwoNum}}</span> 倍。</span>
            <!-- <span class="k3remark">{{ item.displayBonus | keepTwoNum}}</span> 倍。</span> -->
            <!-- 单挑一骰-->
            <ul v-show="index === 0" class="yishai">
              <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in yishai" :key="index" @click="k3option($event,index,k3item)">
                <h2></h2>
              </li>
            </ul>
            <!-- 二同号-->
            <ul v-show="index === 1" class="ertonghao">
              <li>
                <ul>
                  <li v-for="(ertongh,index) in ertonghao" :key="index" @click="ertonghaoto($event,index,ertongh)">
                    <span :class="ertongh.selected ? 'active' : ''">{{ertongh.title}}</span>
                  </li>
                </ul>
              </li>
            </ul>
            <!-- 二不同-->
            <ul v-show="index === 2" class="erbutong">
              <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in erbutong" :key="index" @click="k3option($event,index,k3item)">
                <h2></h2>
              </li>
            </ul>
            <!-- 和值-->
            <ul v-show="index === 3" class="hezhi">
              <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in k3options" :key="index" v-if="isdfk3Cen(index)" @click="hezhidaxiaodanshuang($event,index,k3item)">
                <h2>{{k3item.title}}</h2>
                <span v-if="k3item.title==='大' ||k3item.title==='小' || k3item.title==='单' || k3item.title==='双'">赔 {{k3item.rate | keepThreeNum}}</span>
                <span v-else>赔 {{k3item.rate | keepTwoNum}}</span>
              </li>
            </ul>
            <!-- 三连号-->
            <ul v-show="index === 4" class="sanlianhao">
              <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in sanlianhao" :key="index" @click="k3option($event,index,k3item)">
                <h2>
                  <a></a>
                  <a></a>
                  <a></a>
                </h2>
              </li>
            </ul>
            <!-- 三同号-->
            <ul v-show="index === 5" class="santonghao">
              <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in santonghao" :key="index" @click="santonghaoto($event,index,k3item)">
                <h2 v-if="index&lt;6">
                  <a></a>
                  <a></a>
                  <a></a>
                </h2>
                <h2 v-if="index === 6">{{k3item.title}}</h2>
              </li>
            </ul>
            <!-- 三不同-->
            <ul v-show="index === 6" class="sanbutong">
              <li :class="k3item.selected ? 'active' : ''" v-for="(k3item,index) in sanbutong" :key="index" @click="k3option($event,index,k3item)">
                <h2></h2>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
    <div class="betk3-footer">
      <div v-show="zhu &gt; 0" class="betk3-footer-top">
        <div class="betk3-footer-tops">
          <p>当前选号</p>
          <span>{{con}}</span>
        </div>
        <div class="betk3-footer-buttoms">
          <p>每注金额</p>
          <input type="number" v-model="money" onfocus="this.select()" />
          <span v-if="money === '' ">请输入要投注的金额</span>
          <span v-else>单注最高可中
            <p>{{navlist === 3 ? parseInt(rates*1000)*money/1000 : parseInt(displayBonus*100)*money/100 | keepThreeNum}}</p>元</span>
        </div>
      </div>
      <div class="betk3-footer-buttom">
        <div class="betk3-footer-buttom-left">
          <button @click="iscreat">清空</button>
          <p>
            <span v-if="zhu &gt; 0">共{{zhu}}注,</span>
            <span v-if="money !== '' ">共{{zhu*money}}元</span>
          </p>
        </div>
        <div v-show="betnot" @click="betC" class="betk3-footer-buttom-right">马上投注</div>
      </div>
    </div>
    <div v-show="betGoshow" class="betcBox">
      <ul v-show="betGoshow" class="betc">
        <li>投注确认</li>
        <li>
          <p>
            <span>{{$route.query.name}} ：</span>{{seasonId}}期</p>
          <p>
            <span>投注金额：</span>
            <b>{{money*zhu}}元</b>
          </p>
          <p>
            <span>投注内容：</span>
            <span class="popcon">{{con}}</span>
          </p>
        </li>
        <li>
          <button @click="betCancel">取消</button>
          <button @click="betGo">确定</button>
        </li>
      </ul>
    </div>
    <div v-show="betsuccess" class="betcBox">
      <ul v-show="betsuccess" class="betc">
        <li>温馨提示！</li>
        <li>
          <p>
            <b>投注成功,</b>您可以在我的账户查看注单详情</p>
        </li>
        <li>
          <button @click="looksucc">查看注单</button>
          <button @click="betsucc">继续投注</button>
        </li>
      </ul>
    </div>
    <bets ref="pop"></bets>
  </div>
</template>
<script>
import bets from '../../page-five/money/bets.vue';
export default {
  data() {
    return {
      i: 1, //动画
      j: 1,
      k: 1,
      shwoBet: false,
      shownum: false,
      interval: null, //动画
      lookAllUl: false,
      issantonghao: false,
      show: false, //头部中间
      showa: false, //头部右
      showan: 0, //头部右数字
      money: "", //投注金额
      amount: 0, //总金额
      rates: 0,
      bet: false, //投注弹窗
      zhu: 0,
      zhu1: 0,
      zhu2: 0,
      navs: 0,
      navlist: 3,
      timer: "",
      title: "和值",
      listname: this.$route.query.name.substring(0, 2),
      lotteryId: "dfk3",
      playId: "k3_star3_and", //玩法术
      playId1: "", //玩法术
      playId2: "", //玩法术
      n1: 1,
      n2: 1,
      n3: 1,
      cacheTime: 600000,
      getPastOpens: null, //获取过去开奖号码10个
      getPastOpenB: null, //获取过去开奖号码第一个
      LotteryList: "",
      groupId: "",
      seasonId: "", //截取后的期号
      seasonId2: "", //当前期号
      seasonId3: "", //当前期号-1
      lastSeasonId: "",
      lastSeasonIds: "",
      isGetItem: false,
      betsuccess: false,
      betGoshow: false,
      betk3ContentTopPop: false,
      getLotteryPlayBetRates:null,
      today: "",
      countDown: "",
      peilv: [], //当前赔率
      peilv1: [], //当前赔率
      d: [], //选中的号码的下标
      d1: [], //选中的号码的下标
      d2: [], //选中的号码的下标
      dd: [], //选中的号码的下标
      dd1: [], //选中的号码的下标
      dd2: [], //选中的号码的下标
      hezhiitem: [], //和值时选中的号码的下标
      historyNum: 0,
      con: "",
      con1: "",
      con2: "",
      cons: "",
      startyet: false,
      playBonus: "", //玩法树
      displayBonus: "", //当前玩法的赔率
      bonusArray: [], //大小单双赔率
      timer2: "",
      betnot: true,
      countNum: 10,
      //头部菜单
      poptitle:[
        {title:"单挑一骰",rate:"0.00", id:"k3_star1", remark: "选择1个或者多个骰号，如果开奖号码中包含该号（顺序不限）即中奖" },
        {title:"二同号",rate:"0.00", id:"k3_star2_same", remark: "选择1对相同号码和1个不同号码进行单选或者多选投注，选号与开奖号相同（顺序不限）即中奖" },
        {title:"二不同",rate:"0.00", id:"k3_star2_same_not", remark: "对所有2不同号进行单选或多选，选号与开奖号中任意2个号码相同即中奖" },
        {title:"和值",rate:"0.00", id:"k3_star3_and", remark: "猜3个开奖号相加的和,3-10为小,11-18为大" },
        {title:"三连号",rate:"0.00", id:"k3_star3_link", remark: "对所有3个相连的号码（123，234，345，456)进行单选或多选投注，选号与开奖号相同（顺序不限）即中奖" },
        {title:"三同号",rate:"0.00", id:"k3_star3_same", remark: "对豹子号（111，222，333，444，555，666）进行单选或通选投注，选号与开奖号相同即中奖" },
        {title:"三不同",rate:"0.00", id:"k3_star3_same_not", remark: "对所有3不同号进行单选或多选，选号与开奖号相同（顺序不限）即中奖" },
      ],
      // 单挑一骰
      yishai: [
        { title: "1", rate: "63.72", selected: false },
        { title: "2", rate: "63.72", selected: false },
        { title: "3", rate: "63.72", selected: false },
        { title: "4", rate: "63.72", selected: false },
        { title: "5", rate: "63.72", selected: false },
        { title: "6", rate: "63.72", selected: false }
      ],
      // 二同号
      ertonghao: [
        { title: "112", rate: "63.72", selected: false },
        { title: "221", rate: "63.72", selected: false },
        { title: "331", rate: "63.72", selected: false },
        { title: "113", rate: "63.72", selected: false },
        { title: "223", rate: "63.72", selected: false },
        { title: "332", rate: "63.72", selected: false },
        { title: "114", rate: "63.72", selected: false },
        { title: "224", rate: "63.72", selected: false },
        { title: "334", rate: "63.72", selected: false },
        { title: "115", rate: "63.72", selected: false },
        { title: "225", rate: "63.72", selected: false },
        { title: "335", rate: "63.72", selected: false },
        { title: "116", rate: "63.72", selected: false },
        { title: "226", rate: "63.72", selected: false },
        { title: "336", rate: "63.72", selected: false },
        { title: "全选-11", rate: "63.72", selected: false },
        { title: "全选-22", rate: "63.72", selected: false },
        { title: "全选-33", rate: "63.72", selected: false },
        { title: "441", rate: "63.72", selected: false },
        { title: "551", rate: "63.72", selected: false },
        { title: "661", rate: "63.72", selected: false },
        { title: "442", rate: "63.72", selected: false },
        { title: "552", rate: "63.72", selected: false },
        { title: "662", rate: "63.72", selected: false },
        { title: "443", rate: "63.72", selected: false },
        { title: "553", rate: "63.72", selected: false },
        { title: "663", rate: "63.72", selected: false },
        { title: "445", rate: "63.72", selected: false },
        { title: "554", rate: "63.72", selected: false },
        { title: "664", rate: "63.72", selected: false },
        { title: "446", rate: "63.72", selected: false },
        { title: "556", rate: "63.72", selected: false },
        { title: "665", rate: "63.72", selected: false },
        { title: "全选-44", rate: "63.72", selected: false },
        { title: "全选-55", rate: "63.72", selected: false },
        { title: "全选-66", rate: "63.72", selected: false }
      ],
      // 二不同
      erbutong: [
        { title: "1", rate: "63.72", selected: false },
        { title: "2", rate: "63.72", selected: false },
        { title: "3", rate: "63.72", selected: false },
        { title: "4", rate: "63.72", selected: false },
        { title: "5", rate: "63.72", selected: false },
        { title: "6", rate: "63.72", selected: false }
      ],
      // 和值
      k3options: [
        { title: "大", rate: "0.00", selected: false },
        { title: "小", rate: "0.00", selected: false },
        { title: "单", rate: "0.00", selected: false },
        { title: "双", rate: "0.00", selected: false },
        { title: "03", rate: "0.00", selected: false },
        { title: "04", rate: "0.00", selected: false },
        { title: "05", rate: "0.00", selected: false },
        { title: "06", rate: "0.00", selected: false },
        { title: "07", rate: "0.00", selected: false },
        { title: "08", rate: "0.00", selected: false },
        { title: "09", rate: "0.00", selected: false },
        { title: "10", rate: "0.00", selected: false },
        { title: "11", rate: "0.00", selected: false },
        { title: "12", rate: "0.00", selected: false },
        { title: "13", rate: "0.00", selected: false },
        { title: "14", rate: "0.00", selected: false },
        { title: "15", rate: "0.00", selected: false },
        { title: "16", rate: "0.00", selected: false },
        { title: "17", rate: "0.00", selected: false },
        { title: "18", rate: "0.00", selected: false }
      ],
      // 三连号
      sanlianhao: [
        { title: "123", rate: "63.72", selected: false },
        { title: "234", rate: "63.72", selected: false },
        { title: "345", rate: "63.72", selected: false },
        { title: "456", rate: "63.72", selected: false }
      ],
      // 三同号
      santonghao: [
        { title: "111", rate: "63.72", selected: false },
        { title: "222", rate: "63.72", selected: false },
        { title: "333", rate: "63.72", selected: false },
        { title: "444", rate: "63.72", selected: false },
        { title: "555", rate: "63.72", selected: false },
        { title: "666", rate: "63.72", selected: false },
        { title: "通选", rate: "63.72", selected: false }
      ],
      // 三不同
      sanbutong: [
        { title: "1", rate: "63.72", selected: false },
        { title: "2", rate: "63.72", selected: false },
        { title: "3", rate: "63.72", selected: false },
        { title: "4", rate: "63.72", selected: false },
        { title: "5", rate: "63.72", selected: false },
        { title: "6", rate: "63.72", selected: false }
      ]
    };
  },
  watch: {
    money(newVal) {
      if (this.money === "") {
        setTimeout(() => {
          if (this.money === "") {
            this.money = "";
          }
        }, 1000);
      } else {
        this.money = parseInt(newVal);
      }
    }
  },
  created() {
    this.noGetItem();
    this.endCount();
  },
  mounted() {
    document.addEventListener("visibilitychange",this.listen);
    this.endCount();
    this.geteServerTime(); //获取彩種當前獎期時間
    this.getPlayTreeBetRate();
    this.getLotteryPlayBetRate();
  },
  beforeDestroy() {
    this.endCount();
    this.iscreat();
    document.removeEventListener("visibilitychange",this.listen);
  },
  methods: {
    listen() {
      if(document.hidden === false){
        this.geteServerTime();
      }
    },
    //没打接口前
    noGetItem() {
      if (this.startyet == false) {
        this.start();
        this.isGetItem = true;
        this.shownum = true;
        let myDate = new Date();
        let getMonth = myDate.getMonth() + 1;
        let getDate = myDate.getDate();
        let getHours = myDate.getHours() * 60;
        let getMinutes = myDate.getMinutes();
        let getHM = getHours + getMinutes;
        if (getHM < 1000) {
          getHM = "0" + getHM;
        }
        this.lastSeasonIds = getMonth + getDate.toString() + getHM;
      } else {
        this.end();
        this.isGetItem = false;
        this.shownum = false;
      }
    },
    //非宏发快3，不显示三同号玩法
    isdfk3(index) {
      if (this.$route.query.id === "dfk3") {
        return index != -1;
      }else{
        return index != 5;
      }
    },
    //非宏发快3，不显示3,18
    isdfk3Cen(index) {
      if (this.$route.query.id === "dfk3") {
        return index != -1;
      } else {
      }
      return index != 4 && index != 19;
    },
    //返回到上一次进来的页面
    banckto() {
      this.$router.push(this.$store.state.historyNum);
    },
    //查看20条记录
    lookAll() {
      this.countNum = 20;
      this.betk3ContentTopPop = !this.betk3ContentTopPop;
      this.lookAllUl = !this.lookAllUl;
      this.getPastOp();
    },
    //往期开奖
    lookAllTo() {
      this.$router.push({ path: "second/past", query: { id: this.$route.query.id, name: this.$route.query.name, group: this.$route.query.group } });
    },
    lookAllDivTitle() {
      this.lookAllUl = !this.lookAllUl;
    },
    //筛子动画
    start() {
      var _this = this;
      this.startyet = true;
      _this.i = 1;
      _this.j = 1;
      _this.k = 1;
      this.interval = setInterval(function() {
        _this.i = _this.i % 3 + 1;
        _this.j = _this.j % 3 + 1;
        _this.k = _this.k % 3 + 1;
      }, 88);
    },
    end() {
      var _this = this;
      clearInterval(_this.interval);
    },
    endCount() {
      if (this.timer) {
        for (let i = 0; i <= this.timer; i++) {
          clearInterval(i);
        }
      }
      if (this.timer2) {
        for (let i= 0;i <=this.timer2;i++) {
          clearTimeout(i);
        }
      }
    },
    //获取彩種當前獎期時間
    geteServerTime() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getCurrentSaleTime", {
          params: { lotteryId: this.$route.query.id }
        })
        .then(res => {
          if (res.data.code === 1) {
            if (this.$route.query.id === "bjk3") {
              this.seasonId2 = res.data.data.seasonId;
              this.seasonId3 = this.seasonId2 - 1;
              this.seasonId = this.seasonId2 * 1;
              this.lastSeasonId = res.data.data.lastSeasonId;
            } else {
              this.seasonId2 = res.data.data.seasonId;
              this.seasonId3 = this.seasonId2 - 1;
              this.seasonId = this.seasonId2.slice(4) * 1;
              this.lastSeasonId = res.data.data.lastSeasonId;
            }
            this.today = res.data.data.restSeconds;
            this.setTimeMode();
            this.initSetTimeout();
            this.getPastOp();
          } 
        })
        .catch(error => {
          console.log("获取彩種當前獎期時間No");
        });
    },
    //時間格式轉換
    setTimeMode() {
      var hours = Math.floor((this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
      var minutes = Math.floor((this.today % (1 * 60 * 60)) / (1 * 60));
      var seconds = Math.floor((this.today % (1 * 60)) / 1);
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.countDown = hours + ":" + minutes + ":" + seconds;
    },
    //倒计时
    initSetTimeout() {
      if (this.startyet == false) {
        this.start();
      }
      this.shownum = true;
      this.endCount();
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        if (this.today < 1) {
          this.endCount();
          this.timesUp();
        }
        if ( this.getPastOpenB && this.getPastOpenB[0].lotteryId != this.$route.query.id ) {
          this.endCount();
        }
        if ( this.getPastOpenB && this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 48) {
          this.getPastOp();
        } else if (this.getPastOpenB &&  this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 47 ) {
          this.getPastOp();
        } else if ( this.getPastOpenB && this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 46 ) {
          this.getPastOp();
        } else if ( this.getPastOpenB && this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 45) {
          this.getPastOp();
        }else if(this.getPastOpenB && this.getPastOpenB[0].seasonId === this.lastSeasonId){
          this.end();
          this.startyet = false;
          this.shownum = false;
        }
        this.setTimeMode();
      }, 1000);
    },
    //時間到彈窗
    timesUp() {
      this.$pop.show({
        error: "",
        title: "温馨提示",
        content: "",
        content1: String(this.seasonId * 1),
        content2: String(Number(this.seasonId + 1)),
        number: 3
      });
      this.geteServerTime();
    },
    countNums(){
      this.showa = false;
      this.betk3ContentTopPop = !this.betk3ContentTopPop;
      this.countNum = 10;
      this.getPastOp();
    },
    //获取过去开奖号码10个
    getPastOp() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.query.id, count: this.countNum }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          this.getPastOpenB = res.data.data;
          this.n1 = this.getPastOpens[0].n1;
          this.n2 = this.getPastOpens[0].n2;
          this.n3 = this.getPastOpens[0].n3;
          if (Number(res.data.data[0].seasonId) !== Number(this.lastSeasonId)) {
            if (res.data.data[0].lotteryId === this.$route.query.id) {
              this.reGetPastOp();
            }
          } else {
            clearTimeout(this.timer2);
            this.end();
            this.startyet = false;
            this.shownum = false;
          }
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    },
    reGetPastOp() {
      for (let i = 0; i <= this.timer2; i++) {
        clearTimeout(i);
      }
      this.timer2 = this.setTimeout(() => {
        this.getPastOp();
      }, 12000);
    },
    //右上获取彩种
    getLotteryList() {
      this.$loading.show({number:"a"});
      this.show = false;
      this.showa = !this.showa;
      this.betk3ContentTopPop = false;
      this.countNum = 10;
      if (localStorage.getItem("lotteryListk3") !== null) {
        this.$loading.hide();
        this.LotteryList = JSON.parse(localStorage.getItem("lotteryListk3"));
        this.groupId = this.LotteryList[0].groupId;
        for (let i = 0; i < this.LotteryList.length; i++) {
          if (this.LotteryList[i].id === this.$route.query.id) {
            this.listname = this.LotteryList[i].name.substring(0, 2);
          }
        }
      } else {
        this.$axios
          .get(this.$store.state.url + "api/lottery/getLotteryList",{params:{type:'k3'}})
          .then(res => {
            this.$loading.hide();
            localStorage.setItem("lotteryListk3", JSON.stringify(res.data.data));
            this.LotteryList = res.data.data;
            this.groupId = this.LotteryList[0].groupId;
            for (let i = 0; i < this.LotteryList.length; i++) {
              if (this.LotteryList[i].id === this.$route.query.id) {
                this.listname = this.LotteryList[i].name.substring(0, 2);
              }
            }
          })
          .catch(error => {
            console.log("右上彩种No");
          });
      }
    },
    //头部右->菜单点击
    listnames(e, index, into) {
      this.countNum = 10;
      this.listname = into.name.substring(0, 2);
      this.lotteryId = into.id;
      this.showan = index;
      this.showa = !this.showa;
      this.$router.push({ query: { id: into.id, name: into.name, group: this.groupId }});
      if (this.$route.query.id !== "dfk3" && this.navlist === 5) {
        this.navlist = 3;
        this.title = "和值";
        this.playId = 'k3_star3_and';
      }
      this.geteServerTime(); //获取彩種當前獎期時間
      this.iscreat(); //清空
      if(this.navlist === 3){
        this.getPlayTreeBetRate();
      }
    },
    //头部菜单项
    k3Tab(e, index, into) {
      this.iscreat();
      this.title = into.title;
      this.navlist = index;
      this.show = !this.show;
      this.playId = into.id;
      this.getPlayTreeBetRate();
    },
    //二同複選xx
    onClickStan1(e) {
      //同時被選取時 清空
      if (
        this.ertonghao[0].selected === true &&
        this.ertonghao[3].selected === true &&
        this.ertonghao[6].selected === true &&
        this.ertonghao[9].selected === true &&
        this.ertonghao[12].selected === true
      ) {
        for (let i = 0; i < 15; i = i + 3) {
          this.ertonghaoto(e, i, this.ertonghao[i]);
        }
      } else {
        //有缺項時 該列全選
        for (let i = 0; i < 15; i = i + 3) {
          if (this.ertonghao[i].selected === false) {
            this.ertonghaoto(e, i, this.ertonghao[i]);
          }
        }
      }
    },
    onClickStan2(e) {
      //同時被選取時 清空
      if (
        this.ertonghao[1].selected === true &&
        this.ertonghao[4].selected === true &&
        this.ertonghao[7].selected === true &&
        this.ertonghao[10].selected === true &&
        this.ertonghao[13].selected === true
      ) {
        for (let i = 1; i < 16; i = i + 3) {
          this.ertonghaoto(e, i, this.ertonghao[i]);
        }
      } else {
        //有缺項時 該列全選
        for (let i = 1; i < 16; i = i + 3) {
          if (this.ertonghao[i].selected === false) {
            this.ertonghaoto(e, i, this.ertonghao[i]);
          }
        }
      }
    },
    onClickStan3(e) {
      //同時被選取時 清空
      if (
        this.ertonghao[2].selected === true &&
        this.ertonghao[5].selected === true &&
        this.ertonghao[8].selected === true &&
        this.ertonghao[11].selected === true &&
        this.ertonghao[14].selected === true
      ) {
        for (let i = 2; i < 17; i = i + 3) {
          this.ertonghaoto(e, i, this.ertonghao[i]);
        }
      } else {
        //有缺項時 該列全選
        for (let i = 2; i < 17; i = i + 3) {
          if (this.ertonghao[i].selected === false) {
            this.ertonghaoto(e, i, this.ertonghao[i]);
          }
        }
      }
    },
    onClickStan4(e) {
      //同時被選取時 清空
      if (
        this.ertonghao[18].selected === true &&
        this.ertonghao[21].selected === true &&
        this.ertonghao[24].selected === true &&
        this.ertonghao[27].selected === true &&
        this.ertonghao[30].selected === true
      ) {
        for (let i = 18; i < 33; i = i + 3) {
          this.ertonghaoto(e, i, this.ertonghao[i]);
        }
      } else {
        //有缺項時 該列全選
        for (let i = 18; i < 33; i = i + 3) {
          if (this.ertonghao[i].selected === false) {
            this.ertonghaoto(e, i, this.ertonghao[i]);
          }
        }
      }
    },
    onClickStan5(e) {
      //同時被選取時 清空
      if (
        this.ertonghao[19].selected === true &&
        this.ertonghao[22].selected === true &&
        this.ertonghao[25].selected === true &&
        this.ertonghao[28].selected === true &&
        this.ertonghao[31].selected === true
      ) {
        for (let i = 19; i < 34; i = i + 3) {
          this.ertonghaoto(e, i, this.ertonghao[i]);
        }
      } else {
        //有缺項時 該列全選
        for (let i = 19; i < 34; i = i + 3) {
          if (this.ertonghao[i].selected === false) {
            this.ertonghaoto(e, i, this.ertonghao[i]);
          }
        }
      }
    },
    onClickStan6(e) {
      //同時被選取時 清空
      if (
        this.ertonghao[20].selected === true &&
        this.ertonghao[23].selected === true &&
        this.ertonghao[26].selected === true &&
        this.ertonghao[29].selected === true &&
        this.ertonghao[32].selected === true
      ) {
        for (let i = 20; i < 35; i = i + 3) {
          this.ertonghaoto(e, i, this.ertonghao[i]);
        }
      } else {
        //有缺項時 該列全選
        for (let i = 20; i < 35; i = i + 3) {
          if (this.ertonghao[i].selected === false) {
            this.ertonghaoto(e, i, this.ertonghao[i]);
          }
        }
      }
    },
    //二同号
    ertonghaoto(e, index, k3item) {
      k3item.selected = !k3item.selected;
      //取余==0
      if (
        k3item.selected === true &&
        index !== 15 &&
        index !== 16 &&
        index !== 17 &&
        index !== 33 &&
        index !== 34 &&
        index !== 35
      ) {
        this.d[index] = k3item.title;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu++;
      } else if (
        k3item.selected === false &&
        index !== 15 &&
        index !== 16 &&
        index !== 17 &&
        index !== 33 &&
        index !== 34 &&
        index !== 35
      ) {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu--;
      }
      if (index === 15) {
        k3item.selected = !k3item.selected;
        this.onClickStan1(e);
      }
      if (index === 16) {
        k3item.selected = !k3item.selected;
        this.onClickStan2(e);
      }
      if (index === 17) {
        k3item.selected = !k3item.selected;
        this.onClickStan3(e);
      }
      if (index === 33) {
        k3item.selected = !k3item.selected;
        this.onClickStan4(e);
      }
      if (index === 34) {
        k3item.selected = !k3item.selected;
        this.onClickStan5(e);
      }
      if (index === 35) {
        k3item.selected = !k3item.selected;
        this.onClickStan6(e);
      }
    },
    //三同号
    santonghaoto(e, index, k3item) {
      k3item.selected = !k3item.selected;
      if (k3item.selected === true && index < 6) {
        this.d[index] = k3item.title;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu++;
      } else if (k3item.selected === false && index < 6) {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu--;
      }
      //全、反选
      if (k3item.selected === true && index === 6) {
        for (let i = 0; i < this.santonghao.length - 1; i++) {
          this.santonghao[i].selected = true;
          this.d[i] = this.santonghao[i].title;
          this.dd = this.d.filter(function(n) {
            return n;
          });
          this.con = this.dd.join(",");
          this.zhu = 6;
        }
      } else if (k3item.selected === false && index === 6) {
        for (let i = 0; i < this.santonghao.length - 1; i++) {
          this.santonghao[i].selected = false;
          this.d.splice(i, 1, "");
          this.dd = this.d.filter(function(n) {
            return n;
          });
          this.con = this.dd.join(",");
          this.zhu = 0;
        }
      }
    },
    //和值-大小单双 +
    hezhidaxiaodanshuang(e, index, k3item) {
      k3item.selected = !k3item.selected;
      if (k3item.selected === true) {
        if (index <= 3) {
          this.playId1 = "k3_star3_big_odd";
          this.d1[index] = k3item.title;
          this.dd = this.d1.filter(function(n) {
            return n;
          });
          this.con1 = this.dd.join(",");
          this.zhu1++;
        } else if (index > 3) {
          this.playId2 = "k3_star3_and";
          this.d2[index] = k3item.title;
          this.dd = this.d2.filter(function(n) {
            return n;
          });
          this.con2 = this.dd.join(",");
          this.zhu2++;
        }
        this.d[index] = k3item.title;
        this.peilv[index] = k3item.rate;
        this.peilv1 = this.peilv.filter(function(n) {
          return n;
        });
        this.rates = Math.max(...this.peilv1);
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu = this.zhu1 + this.zhu2;
      } else if (k3item.selected === false) {
        if (index <= 3) {
          this.playId1 = "k3_star3_big_odd";
          this.d1.splice(index, 1, "");
          this.dd = this.d1.filter(function(n) {
            return n;
          });
          this.con1 = this.dd.join(",");
          this.zhu1--;
        } else if (index > 3) {
          this.playId2 = "k3_star3_and";
          this.d2.splice(index, 1, "");
          this.dd = this.d2.filter(function(n) {
            return n;
          });
          this.con2 = this.dd.join(",");
          this.zhu2--;
        }
        this.d.splice(index, 1, "");
        this.peilv.splice(index, 1, "");
        this.peilv1 = this.peilv.filter(function(n) {
          return n;
        });
        this.rates = Math.max(...this.peilv1);
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu = this.zhu1 + this.zhu2;
      }
    },
    //头部菜单项--赔率
    getLotteryPlayBetRate(){
      this.$axios.get(this.$store.state.url + "api/lottery/getLotteryPlayBetRate",{params: {lotteryId: this.$route.query.id}}).then(res =>{
        this.getLotteryPlayBetRates = res.data.data
        this.poptitle[0].rate = res.data.data["单挑一骰"];
        this.poptitle[1].rate = res.data.data["二同号"];
        this.poptitle[2].rate = res.data.data["二不同"];
        this.poptitle[3].rate = res.data.data["和值"];
        this.poptitle[4].rate = res.data.data["三连号"];
        this.poptitle[5].rate = res.data.data["三同号"];
        this.poptitle[6].rate = res.data.data["三不同"];
      })
    },
    //大小单双，赔率显示
    getPlayTreeBetRate() {
      this.$axios.get(this.$store.state.url + "api/lottery/getPlayTreeBetRate", {params: { lotteryId: this.$route.query.id, playId: this.playId }}).then(res => {
        this.displayBonus = res.data.data.displayBonus;
        if(this.navlist === 3){
          this.bonusArray = res.data.data.bonusArray;
          this.k3options[0].rate = this.bonusArray["大"];
          this.k3options[1].rate = this.bonusArray["小"];
          this.k3options[2].rate = this.bonusArray["单"];
          this.k3options[3].rate = this.bonusArray["双"];
          this.k3options[4].rate = this.bonusArray["03"];
          this.k3options[5].rate = this.bonusArray["04"];
          this.k3options[6].rate = this.bonusArray["05"];
          this.k3options[7].rate = this.bonusArray["06"];
          this.k3options[8].rate = this.bonusArray["07"];
          this.k3options[9].rate = this.bonusArray["08"];
          this.k3options[10].rate = this.bonusArray["09"];
          this.k3options[11].rate = this.bonusArray["10"];
          this.k3options[12].rate = this.bonusArray["11"];
          this.k3options[13].rate = this.bonusArray["12"];
          this.k3options[14].rate = this.bonusArray["13"];
          this.k3options[15].rate = this.bonusArray["14"];
          this.k3options[16].rate = this.bonusArray["15"];
          this.k3options[17].rate = this.bonusArray["16"];
          this.k3options[18].rate = this.bonusArray["17"];
          this.k3options[19].rate = this.bonusArray["18"];
        }
      });
    },
    //中间->投注选号
    k3option(e, index, k3item) {
      k3item.selected = !k3item.selected;
      if (k3item.selected === true) {
        this.d[index] = k3item.title;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu++;
        //二不同时 +
        if (this.playId === "k3_star2_same_not") {
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          let abc = "";
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          abc = arr.join(",");
          this.con = abc;
          this.zhu = arr.length;
        }
        //三不同时 +
        if (this.playId === "k3_star3_same_not") {
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          let abc = "";
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          abc = arr.join(",");
          this.con = abc;
          this.zhu = arr.length;
        }
      } else if (k3item.selected === false) {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.con = this.dd.join(",");
        this.zhu--;
        //二不同时 -
        if (this.playId === "k3_star2_same_not") {
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          let abc = "";
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          abc = arr.join(",");
          this.con = abc;
          this.zhu = arr.length;
        }
        //三不同时 -
        if (this.playId === "k3_star3_same_not") {
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          let abc = "";
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          abc = arr.join(",");
          this.con = abc;
          this.zhu = arr.length;
        }
      }
    },
    //清空
    iscreat() {
      // 单挑一骰
      for (let i = 0; i < this.yishai.length; i++) {
        this.yishai[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = 1;
      }
      // 二同号
      for (let i = 0; i < this.ertonghao.length; i++) {
        this.ertonghao[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = "";
      }
      // 二不同
      for (let i = 0; i < this.erbutong.length; i++) {
        this.erbutong[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = "";
      }
      // 和值
      for (let i = 0; i < this.k3options.length; i++) {
        this.k3options[i].selected = false;
        this.d = [];
        this.d1 = [];
        this.d2 = [];
        this.con = "";
        this.con1 = "";
        this.con2 = "";
        this.zhu = 0;
        this.zhu1 = 0;
        this.zhu2 = 0;
        this.money = "";
        this.playId1 = "";
        this.playId2 = "";
        this.peilv=[];
        this.peilv1 = 0;
        this.rates = 0;
      }
      // 三连号
      for (let i = 0; i < this.sanlianhao.length; i++) {
        this.sanlianhao[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = "";
      }
      // 三同号
      for (let i = 0; i < this.santonghao.length; i++) {
        this.santonghao[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = "";
      }
      this.issantonghao = false;
      // 三不同
      for (let i = 0; i < this.sanbutong.length; i++) {
        this.sanbutong[i].selected = false;
        this.d = [];
        this.con = "";
        this.zhu = 0;
        this.money = "";
      }
    },
    //弹窗显示？
    betCancel() {
      this.betGoshow = !this.betGoshow;
    },
    //投注按钮判断
    betC() {
      if (this.zhu === 0) {
        this.$pop.show({
          error: "",
          title: "温馨提示",
          content: "请至少选择一注号码投注!",
          content1: "",
          content2: "",
          number: 2
        });
      } else if (this.money === "") {
        this.$pop.show({
          error: "",
          title: "温馨提示",
          content: "请填写您要投注的金额!",
          content1: "",
          content2: "",
          number: 2
        });
      } else if (this.zhu > 0 && this.money !== "") {
        this.betGoshow = !this.betGoshow;
      }
    },
    //投注
    betGo() {
      this.$loading.show({number:"a"});
      this.betGoshow = false;
      this.betnot = false;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      if (
        this.playId1 === "k3_star3_big_odd" ||
        this.playId2 === "k3_star3_and" ||
        this.playId === "k3_star3_and"
      ) {
        if (this.playId1 === "k3_star3_big_odd" && this.con1 !== "") {
          let formData = new FormData();
          formData.append("order[0].content", this.con1);
          formData.append("order[0].betCount", this.zhu1);
          formData.append("order[0].price", this.money);
          formData.append("order[0].unit", 1);
          formData.append("order[0].playId", this.playId1);
          formData.append("count", this.zhu1);
          formData.append("traceOrders[0].price", this.money);
          formData.append("traceOrders[0].seasonId", this.seasonId2);
          formData.append("bounsType", 0);
          formData.append("traceWinStop", 0);
          formData.append("isTrace", 0);
          formData.append("lotteryId", this.$route.query.id);
          formData.append("amount", this.money * this.zhu1);
          this.$axios
            .post(this.$store.state.url + "api/lottery/bet", formData, config)
            .then(res => {
              if (res.data.message === "success") {
                this.$loading.hide();
                if (this.con1 !== "" && this.con2 === "") {
                  this.betnot = true;
                  this.betsuccess = !this.betsuccess;
                  this.iscreat();
                }
              } else {
                this.betnot = true;
                this.iscreat();
              }
            })
            .catch(error => {
              console.log("大小单双投注No");
              this.$pop.show({
                error: "",
                title: "温馨提示",
                content: "投注失败,请检查您的网络！",
                content1: "",
                content2: "",
                number: 1
              });
              this.iscreat();
              this.betnot = true;
            });
        }
        if (this.playId2 === "k3_star3_and" && this.con2 !== "") {
          let formData = new FormData();
          formData.append("order[0].content", this.con2);
          formData.append("order[0].betCount", this.zhu2);
          formData.append("order[0].price", this.money);
          formData.append("order[0].unit", 1);
          formData.append("order[0].playId", this.playId2);
          formData.append("count", this.zhu2);
          formData.append("traceOrders[0].price", this.money);
          formData.append("traceOrders[0].seasonId", this.seasonId2);
          formData.append("bounsType", 0);
          formData.append("traceWinStop", 0);
          formData.append("isTrace", 0);
          formData.append("lotteryId", this.$route.query.id);
          formData.append("amount", this.money * this.zhu1);
          this.iscreat();
          this.$axios
            .post(this.$store.state.url + "api/lottery/bet", formData, config)
            .then(res => {
              if (this.zhu1 < 1) {
                if (res.data.message === "success") {
                  this.$loading.hide();
                  this.betnot = true;
                  this.betsuccess = !this.betsuccess;
                  this.iscreat();
                }
              }
            })
            .catch(error => {
              console.log("和值投注No");
              this.iscreat();
              this.$pop.show({
                error: "",
                title: "温馨提示",
                content: "投注失败,请检查您的网络！",
                content1: "",
                content2: "",
                number: 1
              });
              this.betnot = true;
            });
        }
      } else if (
        this.playId1 !== "k3_star3_big_odd" &&
        this.playId2 !== "k3_star3_and" &&
        this.playId !== "k3_star3_and"
      ) {
        // default
        let formData = new FormData();
        formData.append("order[0].content", this.con);
        formData.append("order[0].betCount", this.zhu);
        formData.append("order[0].price", this.money);
        formData.append("order[0].unit", 1);
        formData.append("order[0].playId", this.playId);
        formData.append("count", this.zhu);
        formData.append("traceOrders[0].price", this.money);
        formData.append("traceOrders[0].seasonId", this.seasonId2);
        formData.append("bounsType", 0);
        formData.append("traceWinStop", 0);
        formData.append("isTrace", 0);
        formData.append("lotteryId", this.$route.query.id);
        formData.append("amount", this.money * this.zhu);
        this.iscreat();
        this.$axios
          .post(this.$store.state.url + "api/lottery/bet", formData, config)
          .then(res => {
            if (res.data.message === "success") {
              this.$loading.hide();
              this.betnot = true;
                this.betsuccess = !this.betsuccess;
                this.iscreat();
            }
          })
          .catch(error => {
            console.log("投注No");
            this.iscreat();
            this.$pop.show({
              error: "",
              title: "温馨提示",
              content: "投注失败,请检查您的网络！",
              content1: "",
              content2: "",
              number: 1
            });
            this.betnot = true;
          });
      }
    },
    //查看注单
    looksucc() {
      this.$router.push({ path: "/bet" });
      this.betsuccess = !this.betsuccess;
    },
    tolooksucc() {
      this.looks = !this.looks;
      this.$refs.pop.banckto();
      this.$refs.pop.getTradeList();
    },
    //继续投注
    betsucc() {
      this.betsuccess = !this.betsuccess;
      this.iscreat();
    },
    //排列组合
    groupSplit(arr, size) {
      let maxSize = arr.length,
        groupArr = [];
      if (size >= 1 && size <= maxSize) {
        getArr(arr, 0, []);
      }

      function each(arr, index, fn) {
        for (let i = index; i < maxSize; i++) {
          fn(arr[i], i, arr);
        }
      }

      function getArr(arr, _size, _arr, index) {
        if (_size === size) {
          return;
        }
        let len = _size + 1;
        each(arr, index || 0, function(val, i, arr) {
          _arr.splice(_size, 1, val);
          if (_size === size - 1) {
            groupArr.push(_arr.slice());
          }
          getArr(arr, len, _arr, i + 1);
        });
      }

      return groupArr;
    }
  },
  components:{
    bets
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  // 保留兩个小数,不四舍五入
  filters: {
    keepTwoNum(value) {
      value = parseInt(value * 100) / 100;
      return value;
    },
    keepThreeNum(value) {
      value = parseInt(value * 1000) / 1000;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betk3.scss";
@import "../../../assets/scss/popcorn.scss";
</style>
<style>
.down-up-translate-fade-enter-active,
.down-up-translate-fade-leave-active {
  transition: all 0.1s;
  -webkit-transition: all 0.1s;
  -moz-transition: all 0.1s;
  -o-transition: all 0.1s;
}

.down-up-translate-fade-enter,
.down-up-translate-fade-leave-active {
  opacity: 1;
}

.down-up-translate-fade-leave-active {
  transform: translateY(-48px);
  -webkit-transform: translateY(-48px);
  -moz-transform: translateY(-48px);
  -o-transform: translateY(-48px);
}
</style>
