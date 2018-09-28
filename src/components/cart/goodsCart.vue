<template>

    <div class="cart-box">
    	<div>
    		<cart-details :poiInfo="poiInfo" v-if="showGoodsList" :selectFoods="this.selectFoods"></cart-details>
			<div class="cart-wrapper">

				<!-- 有商品时状态 -->
				<div class="cart-goods"  v-if="selectFoods.length">
					<span class="cart-icon" @click="showGoods=!showGoods"><i class="icon-shopping_cart"></i><span class="goods-num">{{totalCount}}</span></span>
					<div class="content">
						<p class="result">￥{{totalPrice}}</p>
						<p class="shipping_fee">另需{{poiInfo.shipping_fee_tip}}</p>
					</div>
					<button class="account-btn">去结算</button>
				</div>

				<!-- 无商品时状态 -->
				<div class="cart-nothing" v-else>
					<span class="cart-icon"><i class="icon-shopping_cart"></i></span>
					<span class="shipping_fee">另需{{poiInfo.shipping_fee_tip}}</span>
					<span class="min_price_tip fr">{{poiInfo.min_price_tip}}</span>
				</div>
			</div>
    	</div>
    <!-- 	<div class="shopCart-mask" v-if="showGoodsList">111</div> -->
	</div>
</template>

<script type="text/javascript">
	import cartDetails from "../cart/cartDetails"
	export default {
		props:["selectFoods"],
		data(){
			return {
				poiInfo:{},
                showGoods:false,
                Goods:[1]

			}
		},
		components:{
			"cart-details":cartDetails,
		},
		methods:{
			
		},
		computed:{
			// 购物车商品的数量
			totalCount(){
				let num=0;
				this.selectFoods.forEach((selectFood)=>{
					num+=selectFood.count;
				});
				return num
			},
			// 购物车内总价格
			totalPrice(){
				let sunPrice=0;
				this.selectFoods.forEach((selectFood)=>{
					sunPrice+=selectFood.min_price*selectFood.count
				});
				return sunPrice
			},
            

            //要弹出购物车内商品列表必须满足车内有商品切点击了购物车图标
			showGoodsList(){
				let num=0;
				this.selectFoods.forEach((selectFood)=>{
					num+=selectFood.count;
				});
				if (num&&this.showGoods) {
                    return true
				}

				//如果购物车内无商品，这将点击状态清楚
				this.showGoods=false;
			}

		},
		created(){
	        fetch("https://www.easy-mock.com/mock/5bac714eb328c27d98eb13d5/example/goods").then((res)=>{
		          return res.json()
		      }).then((data)=>{
		          if (data.code==0) {
		            this.poiInfo=data.data.poi_info;
			          }
			      })
			    }
			}
</script>

<style type="text/css" scoped>
    .cart-box{
    	width: 100vw;
        left: 0;
        right: 0;
		position: fixed;
		bottom: 0px;
    }
	.cart-wrapper{
		width: 100%;
		height: 40px;
		background: rgb(30,30,30);
		color: lightgray;
		line-height: 40px;
		font-size: 12px;
		padding: 0 10px;
		box-sizing: border-box;
	}

    /*公共样式*/
    .cart-icon{
    	display: inline-block;
		width: 45px;
		height: 45px;
		border-radius: 45px;
		text-align: center;
		line-height: 45px;
		position: relative;
		top: -25px;
	}
	.icon-shopping_cart{
		font-size: 24px;
		position: relative;
		top: 6px;
	}

	/*购物车无商品时样式*/
	.cart-nothing{
		height: 40px;
	}
	.cart-nothing .cart-icon{
		background: rgb(80,80,80);
	}
	.cart-nothing .shipping_fee{
		display: inline-block;
		margin-left: 10px;
		color: rgb(148,148,148);
		position: absolute;
	}
	.cart-nothing .min_price_tip{
		padding:0 5px;
		display: inline-block;
		/*color: rgb(148,148,148);*/
		color: white;
	}

	/*购物车有商品时样式*/
	.cart-goods{height: 40px;
		position: relative;
		z-index: 2;
	}
	.goods-num{
		position: absolute;
		top: 0px;
		right: 0px;
		display: inline-block;
		background: red;
		width: 15px;
		height: 15px;
		color: white;
		line-height: 15px;
		border-radius: 15px;
	}
	.cart-goods .cart-icon{
		background: rgba(255,201,86);
	}
	.cart-goods .icon-shopping_cart{
		color: black;
	}
	.content{
		display: inline-block;
	}
	.result{
		font-size: 16px;
		line-height: 25px;
		font-weight: bold;
       /* height: 15px;*/
	}
	.content .shipping_fee{
       /* height: 20px;*/

		color: rgb(148,148,148);
       font-size: 0.8em;
       height: 15px;
       line-height: 10px;
	}
	.account-btn{
		background: rgba(255,201,86);
		color: black;
		position: absolute;
		right: -10px;
		height: 40px;
		padding: 0 20px;
		font-weight: bold;
	   outline: none;
	}


</style>