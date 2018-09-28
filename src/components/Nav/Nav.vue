<template>
	<div class="nav">
	    <router-link class="nav-item" to="/goods">
	    	商品
	    </router-link>

	    <router-link class="nav-item" to="/ratings">
	    	评价({{sellerRatings.comment_num}})
	    </router-link>

	    <router-link class="nav-item" to="/seller">
	    	卖家
	    </router-link>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
               sellerRatings:{}
			}
		},
		created(){
			fetch("https://www.easy-mock.com/mock/5bac714eb328c27d98eb13d5/example/ratings").then((res)=>{
				return res.json()
			}).then((data)=>{
				this.sellerRatings=data.data;
			})
		}
	}
</script>

<style type="text/css" scoped>
	.nav{
		display: flex;
		width: 100vw;
		height: 30px;
		line-height: 30px;
		text-align: center;
		z-index: 2;
		position: relative;
		border-bottom: 1px solid #e4e4e4;
		background: white;
	}
	.nav-item{
		flex: 1;
		font-size: 13px;
		color: #666;
		position: relative;
	}
	.nav .active{
		color: #ffbb22;
	}
	.nav .active:after{
		content:"";
		width: 20px;
		height: 2px;
		background:#ffbb22;
		position: absolute;
		display: inline-block;
		left: 50%;
		bottom: 0;
		margin-left: -10px;
	}
</style>