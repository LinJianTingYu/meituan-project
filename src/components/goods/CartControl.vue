<template>
	<div class="cartcontrol">
		<transition name="fade">
			<div class="cart-decrease icon-remove_circle_outline" @click.stop="decreaseCart" v-show="food.count"></div>
		</transition>
		<div class="cart-count" v-show="food.count">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop="increaseCart">
			<i class="bg"></i>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Vue from "vue"
	export default{
		props:["food"],
		computed:{
			
		},
        methods:{
        	//减少商品个数
            decreaseCart(){
            	if (this.food.count==0) {
            		return
            	}
            	this.food.count--
            	this.$store.commit("resetFoods",this.food);
            },

        	//增加商品个数
            increaseCart(){
            	if (!this.food.count) {
            		Vue.set(this.food,"count",1);//向数据对象里面设值

            	}else{
            		this.food.count++
            	}
            	this.$store.commit("resetFoods",this.food);
            }
        }
	}
</script>

<style type="text/css" scoped>
     .cartcontrol{
     	font-size:0; 
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

	/*添加商品时的动画*/
	.fade-enter-active,.fade-leave-active{
        transition: all 500ms;
	}

	.fade-enter,.fade-leave-to{
		transform: translate(20px,0) rotate(180deg);
	}
</style>