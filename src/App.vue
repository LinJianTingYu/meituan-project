<template>
  <div id="app">
    <div class="app-content" ref="appContent">
      <div class="goods-show">
        <app-header :poiInfo="poiInfo" @changeShow="changeShow" @showSearch="showSearch"></app-header>

        <app-nav></app-nav>

        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      
        <!-- 公告详情 -->
        <transition name="fade">
          <div class="bulletin-detail" v-if="isShow">
            <div class="detail-wrapper">
              <!-- 相关内容器 -->
              <div class="main-wrapper">
                <div class="head_pic"><img :src="head_pic_url"></div>
                <h3 class="name">{{poiInfo.name}}</h3>

                <!-- 星级评价 -->
                <div class="scroe">
                  <app-star v-bind:scroe="poiInfo.wm_poi_score"  :scroeItem="true"></app-star>
                </div>

                <p class="tip">
                  {{poiInfo.min_price_tip}}<i>|</i>{{poiInfo.shipping_fee_tip}}<i>|</i>{{poiInfo.delivery_time_tip}}
                </p>
                <p class="time">
                  配送时间：{{poiInfo.shipping_time}}
                </p>

                <div class="discounts">
                  <p v-for="discounts2 in poiInfo.discounts2">
                    <img :src="discounts2.icon_url">
                    <span>{{discounts2.info}}</span>
                  </p>
                </div>
              </div>

              <!-- 关闭内容容器 -->
              <div class="close-wrapper">
                <span class="icon-close" @click="closeBulletin"></span>
              </div>
            </div>
            </div>
        </transition>
      </div>

      <div class="goods-search">
        <goods-search @closeSearch="closeSearch"></goods-search>
      </div>
    </div>
    
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
	import Header from './components/Header/Header'
	import Nav from './components/Nav/Nav'
  import AppStar from "./components/Header/AppStar"
  import GoodsSearch from "./components/goodssearch/GoodsSearch"
	export default {
	  name: 'App',
      data(){
        return {
            poiInfo:{},
            isShow:false,
            // goods:[]
        }
      },
	  components:{
	  	"app-header":Header,
	  	"app-nav":Nav,
      "app-star":AppStar,
      "goods-search":GoodsSearch
	  },

    methods:{
      changeShow(bool){

        this.isShow=true;
      },

      closeBulletin(){
        console.log(1);
        this.isShow=false;
      },

      showSearch(){
         this.$refs.appContent.style.left="-100vw";
         this.$refs.appContent.style.transition="left 500ms"
      },
      closeSearch(){
        this.$refs.appContent.style.left=0;
        this.$refs.appContent.style.transition="left 500ms"
      }
    },

    computed:{
      head_pic_url(){
        return this.poiInfo.pic_url
      },

      poi_back_pic_url(){
        return this.poiInfo.poi_back_pic_url
      }
    },

    created(){
      fetch("https://www.easy-mock.com/mock/5bac714eb328c27d98eb13d5/example/goods").then((res)=>{
          return res.json()
      }).then((data)=>{
          if (data.code==0) {
            this.poiInfo=data.data.poi_info;
            let goods=data.data.food_spu_tags;
            goods.forEach(function(ele,index){
              if (ele.name.length>7) {
                ele.name=ele.name.slice(0,7)+"...";
              }
            });
            this.$store.commit("setFoods",goods);
          }
      })
    }
	}
</script>

<style>
  @import url(../src/common/css/icon.css);
  @import url(../static/css/reset.css);
  #app{
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    position: relative;
  }
  .goods-show{
    width: 100vw;
  }
  .goods-search {}
  .app-content{
    width: 200vh;
    position: absolute;
/*    left: -100vw;*/
    height: 100vh;
  }
  
  .bulletin-detail{
    z-index: 4;
    font-size: 10px;
    position: absolute;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(122,125,125,.6);
    width: 100vw;
  }
  .detail-wrapper{
    position: relative;
    width: 90%;
    margin: 5vh auto 0;
    text-align: center;
  }
  .main-wrapper{
    height: 85vh;
    box-sizing: border-box;
    background: url("http://p1.meituan.net/aichequan/dfd39d77d47dfd6df4e1c07ab2e87458193641.png") no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 30px 20px;
     /*   height: 500px;*/
  }
  .head_pic  img{
    width: 60px;
    height: 60px;
    border-radius: 10px;

  }
  .main-wrapper .name{
    margin-top:20px;
    font-weight: bold;
    font-size: 14px;
  }
  .tip{
    color: rgba(220,220,220);
    padding: 10px 0;
  }
  .tip i{
    display: inline-block;
    padding: 0 10px;
  }
  .time{
    color: rgba(220,220,220);
    padding: 0px 0 20px;
    border-bottom:1px solid rgba(220,220,220);
  }

  .discounts p{
      margin-top: 20px;
      line-height: 15px;
    }
  .discounts img{
    display: inline-block;
        width: 15px;
        height: 15px;
  }
  .discounts span{
    text-indent: 5px;
    display: inline-block;
    height: 15px;
    vertical-align: top;
    font-size: 10px;
    color: white;
  }
  .close-wrapper{
      width: 100%;
      line-height: 10vh;
  }
  .icon-close{
    font-size: 14px;
    display: inline-block;
    background: gray;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    line-height: 40px;
  }
  .scroe{
    margin: 5px 0;
  }


  /*定义动画*/
  .fade-enter-active,.fade-leave-active{
    transition: 2s all;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
  .fade-enter-to, .fade-leave  {
    opacity: 1;
  }
</style>
