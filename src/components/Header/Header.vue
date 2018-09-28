<template>
	<div class="header">
		<!-- 顶部通栏 -->
		<div class="top-wrapper">
			<div class="back-wrapper" @click="HaHa()">
				<span class="icon-arrow_lift"></span>
			</div>
			<form class="search-wrapper">
				<span class="search-icon"></span>
				<input type="text" name="" placeholder="搜索店内商品" class="" @focus="showSearch">
			</form>
			<div class="more-wrapper">
				<a href="#" class="spelling-bt">拼单</a>
				<div class="more-bt" @click="showMoreList=!showMoreList">
					<a class="s-radius"></a>
					<a class="s-radius"></a>
					<a class="s-radius"></a>
				</div>
				<ul class="more-list" v-if="showMoreList">
					<li>分享商家</li>
					<li>消息中心</li>
					<li>我的购物车</li>
				</ul>
			</div>
		</div>


		<!-- 中部通栏 -->
		<div class="middle-wrapper">
			<div class="mdn-icon fl"><img :src="head_pic_url"></div>
			<div class="name-wrapper fl"><span>{{poiInfo.name}}</span></div>
			<div class="collect-wrapper fr">
				<div class="collect-icon"></div>
				<p class="collect-text">收藏</p>
			</div>
		</div>

		<!-- 底部通栏 -->
		<div class="bottom-wrapper" v-for="discounts2 in poiInfo.discounts2">
			<span class="first-icon fl"><img :src="discounts2.icon_url"></span>
			<span class="favourable-message fl">{{discounts2.info}}</span>
			<div class="activity fr" @click="showBulletin">1个活动 <span class="icon-keyboard_arrow_right"></span></div>
		</div>
        
        
		
	</div>
</template>

<script type="text/javascript">
	export default {
		components:{
		},
		props:["poiInfo"],
		data(){
            return {
            	// isShow:false
            	showMoreList:false
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
		methods:{
			showBulletin(){
                this.$emit("changeShow");
                // console.log(this.isShow);
			},
			showSearch(){
				this.$emit("showSearch");
			},
            HaHa(){
            	confirm("回不去了，没数据，巧妇难为无米之炊")
            }
		}
	}
</script>

<style type="text/css" scoped>
	@import url(../../common/css/icon.css);
	.header{
		width: 100vw;
		z-index:1;
		position: relative;
		color: white;
		text-align: center;
		background: url("http://p0.meituan.net/xianfu/19c002c5963a289206e756092995a2fe230070.jpg") no-repeat;
		background-size: 100% 135%;
		background-position: center -8px;
		height: 161px;
		overflow: hidden;
	}
	.top-wrapper{
		line-height: 30px;
		height: 30px;
		margin-top: 10px;
		position: relative;
	}
	.back-wrapper,.search-wrapper,.more-wrapper{
		display: inline-block;
	}
	.more-list{
		position: absolute;
		right: 10px;
		width: 120px;
		background: white;
		border-radius: 5px;
		color: black;
		font-size: 14px;
	}
	.more-list li{
		line-height: 30px;
		padding:5px 10px;
	}
	.back-wrapper{
		color: white;
		vertical-align: center;
		width: 30px;
		position: absolute;
		z-index: 2;

	}
	.search-wrapper{
		box-sizing: border-box;
		left: -10px;
		width: 100%;
		height:30px;
		padding:0 100px 0 50px;
		vertical-align: center;
		position: relative;
	}
	.search-wrapper input{
		width: 100%;
		height: 30px;
		box-sizing: border-box;
		padding:5px 30px;
		border-radius: 30px;
		border: 1px solid gray;
		outline: none;
		vertical-align: top;
		background: rgba(211,211,211,1);
	}
    .search-wrapper span{
	    background: url("../../assets/img/search.png") no-repeat;
	    background-size: cover; 
	    display: inline-block;
	    width: 16px;
	    height: 16px;
	    position: absolute;
	    top: 7px;
	    left:60px;
    }
	.more-wrapper{
		width: 100px;
		position: absolute;
		right: 0;
		top: 0;
	}
	.spelling-bt{
		font-size: 12px;
		color: white;
		display: inline-block;
		padding: 3px;
		border: 1px solid white;
		line-height: 15px;
		border-radius: 5px;
	}
	.more-bt{
		display: inline-block;
	}
	.s-radius{
		float: left;
		margin-left: 1px;
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 5px;
		border: 1px solid white;
		color: white;
	}
    
    .middle-wrapper{
    	padding:20px 10px 10px;
    	line-height: 50px;
    	overflow: hidden;
    }
    .mdn-icon{
		height: 60px;
    }
	.mdn-icon img{
		display: inline-block;
		width: 60px;
		height: 60px;
		border-radius: 10px;
	}
	.name-wrapper{
		padding-left: 10px;
		line-height: 60px;
		color: white;
	}

	.collect-wrapper{
		color: white;
	}
	.collect-icon{
		height: 30px;
		background: url('../../assets/img/star.png') no-repeat;
		background-size: 90% 70%;
		background-position: center 9px;

	}
	.collect-text{
        font-size: 12px;
		height: 30px;
		line-height: 20px;
	}


	.bottom-wrapper{
		box-sizing: border-box;
		font-size: 12px;
		padding:0 10px;
		width: 100%;
		display: inline-block;
		height: 20px;
		margin-bottom: 5px;
	}
	.first-icon{
		display: inline-block;
		width: 20px;
		height: 20px;
	}
	.first-icon img{
		width: 20px;
		height: 20px;
	}
	.favourable-message{
		vertical-align: top;
		margin-left: 5px;
        line-height: 20px;
        font-size: 10px;
		display: inline-block;
	} 
	.activity{
		display: inline-block;
		line-height: 20px;
		font-size: 10px;
	}


	

</style>