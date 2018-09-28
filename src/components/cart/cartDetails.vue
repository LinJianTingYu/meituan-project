<template>
	<div class="cart-details-wrapper" v-show="selectFoods.length">
	    <div class="cart-details">
	    	<h3 class="text"  v-for="discounts2 in poiInfo.discounts2">{{discounts2.info}}</h3>
			<p class="operate-cart">
				<span class="cart-num fl">1号口袋</span>
				<span class="empty-cart fr" @click="emptyAll">清空购物车</span>
			</p>
			<div class="goods-list">
				<div class="goods-message" v-for="selectFood in selectFoods">
					<div class="goods-message-head">
						<p class="name">{{selectFood.name}}</p>

					    <p class="unit" v-if="selectFood.description">{{selectFood.description}}</p>
					    <p class="unit" v-else>{{selectFood.unit}}</p>
					</div>
					<div class="price">￥{{selectFood.min_price}}</div>
					<div class="cartcontrol-wrapper">
						<div class="cartcontrol">
							<div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart(selectFood)" ></div>
							<div class="cart-count">{{selectFood.count}}</div>
							<div class="cart-add icon-add_circle" @click="increaseCart(selectFood)">
								<i class="bg"></i>
							</div>
					    </div>
					</div>
				</div>
			</div>
	    </div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:["poiInfo","selectFoods"],
		created(){
		},
		methods:{

			//购物车内减少商品个数
			decreaseCart(selectFood){
				selectFood.count--
			},

			//购物车内增加商品个数
			increaseCart(selectFood){
				selectFood.count++
			},

			// 清空购物车
			emptyAll(){
				this.selectFoods.forEach((selectFood)=>{
					selectFood.count=0;
				})
			}
		}
	}
</script>

<style type="text/css" scoped>
@import url(../../common/css/icon.css);
    .cart-details-wrapper{
    	height: 100vh;
    	background: rgba(0,0,0,.5);
    }
	.cart-details{
		position: absolute;
		width: 100%;
		bottom: 40px;
    	z-index: 2;
	}
	h3{
		line-height: 25px;
		font-size: 12px;
		text-align: center;
		background: rgba(243,225,194);
		color: rgba(133,120,91);
	}
	.operate-cart{
		height: 30px;
		font-size: 12px;
		background: rgba(243,243,243);
		line-height: 30px;
		padding-right: 10px;
		font-weight: bold;
		border-left: 5px lightgreen solid;
	}
	.operate-cart .cart-num{
		padding-left: 5px;
	}
	.operate-cart .empty-cart{
		font-size: 10px;
		padding-left: 20px;
		background: url("../../assets/img/ash_bin.png") no-repeat left center;
		background-size: 15px 15px;
	}

	.goods-list{
		max-height: 240px;
		overflow: scroll;
	}
	.goods-message{
		position: relative;
		padding: 5px 10px;
		background: white;
		display: flex;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid rgb(233,233,233);
	}
	.goods-message-head{
		flex: 2;
	}
	.goods-message-head .name{
		height: 30px;
		line-height: 30px;
		font-size: 13px;
		font-weight: bold;
        -webkit-line-clamp: 1;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	}
	.goods-message-head .unit{
		line-height: 13px;
		font-size: 10px;
		color: gray;

        -webkit-line-clamp: 1;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	}
	.price{
		flex: 2;
		font-size: 10px;
	}
	.changhe-num{
		text-align: center;
		flex: 3;
	}
	.changhe-num .goods-num{
		display: inline-block;

        height: 50px;
	}
	.changhe-num span {
		vertical-align: center;
		display: inline-block;
		font-size: 20px;
		color: gray;
	}

    .cartcontrol{
     	font-size:0; 
     }
    .cartcontrol-wrapper{
    	height: 20px;
    	line-height: 20px;
    	position: absolute;
    	right: 10px;
    	top:20px;
    }
	.cart-decrease{
        display: inline-block;
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: #b4b4b4;
	}
	.cart-count{
		display: inline-block;
		width: 20px;
		line-height: 20px;
		font-size: 12px;
		text-align: center;
		vertical-align: top;
	}
	.cart-add{
		display: inline-block;
		width: 20px;
		height: 20px;
		font-size: 20px;
		color: #ffd161;
		position: relative;
	}
	
	.bg{
		display: inline-block;
		background: black;
		z-index: -1;
		width: 10px;
		height: 10px;
		position: absolute;
		right: 5px;
		top: 5px;
	}
</style>