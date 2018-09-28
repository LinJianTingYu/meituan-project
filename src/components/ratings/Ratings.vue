<template>
	<div class="ratings-wrapper" ref="ratingsWrapper">
		<div>
			<div class="ratings-header">
				<div class="seller-score-wrapper">
					<p class="seller-score">{{sellerRatings.comment_score}}</p>
					<p class="text">商家评分</p>
				</div>
				<div class="seller-score-message">
					<div>
						<span>口味</span>
						<!-- 星级评价 -->
	                    <div class="scroe">
	                    	<app-star :scroe="sellerRatings.quality_score"  :scroeItem="true"></app-star>
	                    </div>
				    </div>
					<div>
						<span>包装</span>
						<!-- 星级评价 -->
	                    <div class="scroe">
	                    	<app-star v-bind:scroe="sellerRatings.pack_score" :scroeItem="true"></app-star>
	                    </div>
					</div>
				</div>
				<div class="seller-delivery-wrapper">
					<p class="seller-delivery-score">{{sellerRatings.delivery_score}}</p>
					<p>配送评分</p>
				</div>
			</div>
			<div class="ratings-class">
				<div :class="{'active':selectType==0}" @click="goPath(0)" class="ratings-class-item" >
					
					{{sellerRatings.tab[0].comment_score_title}}
				</div>

				<div :class="{'active':selectType==1}" @click="goPath(1)" class="ratings-class-item" >
					{{sellerRatings.tab[1].comment_score_title}}
				</div>

				<div :class="{'active':selectType==2}" @click="goPath(2)" class="ratings-class-item" >
					{{sellerRatings.tab[2].comment_score_title}}
				</div>
			</div>
			<div class="ratings-labels">
				<div class="ratings-labels-item" v-for="sellerRatingslabel in sellerRatings.labels">
					{{sellerRatingslabel.content}}
					{{sellerRatingslabel.label_count}}
				</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script type="text/javascript">
	import AppStar from "../Header/AppStar"
	import BScroll from 'better-scroll'
	import Vue from "vue"
	export default {
		data(){
			return {
               sellerRatings:{
               	  "tab":[{},{},{}]
               },
               selectType:0,
               pathes:["/AllRatings","/PictureRatings","/Scroe"]
			}
		},
		components:{
			"app-star":AppStar,
		},
		computed:{
			// one(){
			// 	return this.sellerRatings.tab[0].comment_score_title
			// },
			// two(){
			// 	return this.sellerRatings.tab[1].comment_score_title
			// },
			// three(){
			// 	return this.sellerRatings.tab[2].comment_score_title
			// }
		},
		methods:{

			// d点击跳转路由
            goPath(sellerRating){
            	if (sellerRating==0) {
            		this.selectType=0,
            		this.$router.replace("/ratings/AllRatings")
            	}else if(sellerRating==1){
            		this.selectType=1,
            		this.$router.replace("/ratings/PictureRatings")
            	}else{
            		this.selectType=2,
            		this.$router.replace("/ratings/Scroe")
            	}
            }
		},
		created(){
			fetch("https://www.easy-mock.com/mock/5bac714eb328c27d98eb13d5/example/ratings").then((res)=>{
				return res.json()
			}).then((data)=>{
				this.sellerRatings=data.data;

				this.$nextTick(()=>{
	              if (!this.scroll) {
		              	this.scroll=new BScroll(this.$refs.ratingsWrapper,{
		                	click:true
		              });
	              }else{
	              	this.scroll.refresh();
	              }
	            });
			})
		}
	}
</script>

<style type="text/css" scoped>
	.ratings-wrapper{
		padding:0 10px;
		position: absolute;
		top: 193px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		width: 100vw;
		box-sizing: border-box;
	}
    .ratings-header{
		width: 100%;
		display: flex;
		padding: 10px 0;
     	box-sizing: border-box;
     	height: 70px;
	}
	.seller-score-wrapper{
		flex: 2;
		text-align: center;
	}
	.seller-score-wrapper > p{
		font-size: 12px;
		height: 20px;
		line-height: 25px;
	}
	.seller-score-wrapper .seller-score{
		height: 25px;
		font-size: 20px;
		color: #ffbb22;
	}
	.seller-score-message{
		flex: 6;
		font-size: 10px;
	}
	.seller-score-message>div{
		height: 25px;
		line-height: 25px;
		margin-left: 10px;
	}
	.seller-score-message>div .scroe,.seller-score-message>div span{
		display: inline-block;
		line-height: 25px;
		height: 25px;
	}
	.seller-score-message>div .scroe{
		position: relative;
		top: 2px;
	}


	.seller-delivery-wrapper{
		flex: 2;
		border-left: 1px solid gray;
	}
	.seller-delivery-wrapper>p{
        line-height: 25px;
        color: gray;
		font-size: 12px;
       text-align: center;
       margin: 0;
	}
	.seller-delivery-wrapper .seller-delivery-score{
		font-size: 20px;
	}


	.ratings-class{
		display: flex;
        border-radius: 5px;
		border: 1px solid #ffbb22;
	}
	.ratings-class-item{
		text-align: center;
		flex: 1;
		padding: 8px 0;
		font-size: 14px;
		font-weight: bold;
		color: #ffbb22;
		border-left: 1px solid #ffbb22;

	}
	.ratings-class-item:first-child{
        border-left: none;

	}
/*	.ratings-class-item:last-child{
		background: url("../../assets/img/第四次直播/评价页面/icon_sub_tab_dp_normal@2x.png") no-repeat 5px center;
		background-size: 15px 15px;
	}*/


	.ratings-labels{
		padding: 10px 0;
	}
	.ratings-labels-item{
		display: inline-block;
		font-size: 12px;
		padding: 5px;
		border-radius: 5px;
		background: rgb(240,240,240);
		color: rgb(100,100,100);
		margin-right: 5px;
	}

	.active{
		background: #ffbb22;
		color: black;
	}
</style>