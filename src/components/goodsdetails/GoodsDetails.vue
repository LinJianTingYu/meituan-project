<template>
	<div class="food-detail">

		<!-- 商品头部 -->
		<div class="food-detail-header">
			<span class="icon-close close-icon fl" @click="closeGoodsDetails"></span>
			<img src="../../assets/img/more.png" alt="" class="fr more-btn">
			<img src="../../assets/img/share.png" alt="" class="fr share-btn">
		</div>


		<div class="food-detail-wrapper">
			<div class="food-wrapper">
				<div class="food-detail-content">
					<div class="img-wrapper">
						<img :src="goodsItem.picture">
					</div>

					<div class="content">
	                    <h3>{{goodsItem.name}}</h3>
	                    <p class="desc" v-if="goodsItem.description">{{goodsItem.description}}</p>
	                   <div class="extra">
	                   	   <span class="saled">{{goodsItem.month_saled_content}}</span>
	                   	   <span class="praise">{{goodsItem.praise_content}}</span>
	                   </div>
	                   <img class="product" v-if="goodsItem.product_label_picture" :src="goodsItem.product_label_picture">
	                   <p class="price">
	                   	    <span class="text">￥{{goodsItem.min_price}}</span>
	                   	    <span class="unit">/{{goodsItem.unit}}</span>
	                   </p>
	                   <div class="cart-control">
		                   	<cart-control :food="goodsItem"></cart-control>
	                   </div>
					</div>
				</div>
		    </div>

	        <!-- 分割线 -->
			<div class="split"></div>
	        
	        <!-- 外卖评价 -->
			<div class="rating-wrapper">
				<!-- 评价头部 -->
				<div class="rating-title">
					<div class="rating-title-left">
						<span class="title">{{goodsItem.rating.title}}</span>
					    <span class="like_ratio_desc">( {{goodsItem.rating.like_ratio_desc}} </span>
					    <span class="like_ratio">{{goodsItem.rating.like_ratio}}</span> )
					</div>

			    	<div class="rating-title-right fr">
			    		<span>{{goodsItem.rating.snd_title}}</span>
			    		<span class="icon-keyboard_arrow_right"></span>
			    	</div>
				</div>

				<div class="all-ratings-list">
					<div class="all-ratings-item"  v-for="comments in goodsItem.rating.comment_list">
						<div class="user-pic" :style="{'background-image':'url('+userIcon(comments)+')'}"></div>
						<div class="comments-content">
							<p class="user">
								<span class="user-name">{{comments.user_name}}</span>
								<span class="comment-time">{{comments.comment_time}}</span>
							</p>
							<div class="user-comment">{{comments.comment_content}}</div>
				        </div>
				    </div>
			    </div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import CartControl from "../goods/CartControl"
	export default {
		props:["goodsItem"],
		components:{
			"cart-control":CartControl,
		},
		data(){
			return{
                 
			}
		},
		computed:{
		},
		methods:{
            closeGoodsDetails(){
            	this.$emit("closeGoodsDetails")
            },

            userIcon(comments){
            	if (!comments.user_icon) {
            			comments.user_icon="http://p0.meituan.net/aichequan/8632d93a19c8883727301f82cc88501d4301.png"
            	}
            	return comments.user_icon
            }
		},
        cretead(){
        	console.log(this.goodsItem);
        }
	}
</script>

<style type="text/css" scoped>
	.food-detail{
		position: fixed;
		z-index: 10;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		height: 100vh;
		background: white;
		overflow: scroll;
	}
	.food-detail-header{
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		height: 50px;
		line-height: 30px;
		position: fixed;
		z-index: 2;
		top: 0;
		background: white;
	}
	.food-detail-wrapper{
		position: absolute;
		top: 50px;
		z-index: 1;
	}
	.close-icon{
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: white;
		display: inline-block;
	}
	.food-detail-header img{
		width: 30px;
		height: 30px;
		display: inline-block;
	}
	.share-btn{
		margin-right: 10px;
	}
    

    .food-wrapper{
    	padding:0 10px;
    }
    .food-wrapper .img-wrapper {

    	text-align: center;
    }
	.food-wrapper .img-wrapper img{
		width: 100%;
		height: 300px;
	}
	.content{
		position: relative;
	}
	.content h3{
		font-weight: bold;
		font-size: 16px;
		margin:8px 0;
	}
	.content .desc,.content .extra{
       /*超出显省略号*/
/*		-webkit-line-clamp:1;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		overflow: hidden;*/
        line-height: 18px;
		color:gray;
		font-size: 14px;
		margin:10px 0;
	}
	.product{
		display: inline-block;
		margin:5px 0;
		width: 80px;
		height: 20px;
	}
	.price{
		margin:10px 0;
	}
    .price .text{
    	color: red;
    	font-weight: bold;
    	font-size: 16px;
    }
    .price .unit{
    	color:gray;
    	font-size: 12px;
    }
    .icon-add_circle{
    	position: absolute;
    	right: 0;
    }
    .cart-control{
    	position: absolute;
    	right: 0;
    	bottom: -3px;
    }

    .split{
    	height: 15px;
    	background: rgb(244,244,244);
    }

     
    .rating-wrapper{
    	padding: 10px;
    	font-size: 14px;
    }
    .rating-title{
    	font-weight: bold;
    	margin:10px 0;
    }
    .rating-title>div{
    	display: inline-block;
    }
    .like_ratio{
    	color: red;
    }

    .rating-title-right{
    	color: gray;
    }


    .all-ratings-item{
		display: flex;
		padding:10px 0 15px;
		border-bottom:1px solid #e4e4e4;
		width: 100%;
	}
	.all-ratings-item:last-child{
		border-bottom:none;
	}
	.user-pic{
		position: relative;
		margin-right: 10px;
		/*    */
		width: 35px;
		height: 35px;
		display: inline-block;
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 35px 35px;
		border-radius: 35px;
	}
	.comments-content{
		flex: 1;
	}
	.user{
		margin: 0;
		line-height: 20px;
		height: 20px;
	}
	.user-name{
        display: inline-block;
        float: left;
		font-size: 14px;
	}
	.comment-time{
        display: inline-block;
        float: right;
		font-size: 12px;
	}

	.user-comment{
		line-height: 18px;
		font-size: 13px;
		font-weight: bold;
	}

</style>