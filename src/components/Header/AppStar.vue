<template>
	<div class="star">
		<span v-for="(itemClass,index) in itemClasses" class="star-item" :class="itemClass"></span>
		<span class="scroe-item" v-if="scroeItem">{{scroe}}</span>
	</div>
</template>

<script type="text/javascript">
    
    // 星星长度
	const starLength=5
    const star24_on="on"
    const star24_off="off"
    const star24_half="half"

	export default {
		props:["scroe","scroeItem"],
		computed:{
			itemClasses(){
				let result=[];
				let scroeInteger=Math.floor(this.scroe);
				for (var i = scroeInteger - 1; i >= 0; i--) {
					result.push(star24_on);
				}
				if (this.scroe%1!=0) {
					result.push(star24_half);
				}
				while(result.length<5){
					result.push(star24_off);
				}
				return result
			}
		}
	}
</script>

<style type="text/css" scoped>
    .star{
    	
		line-height: 25px;
		height: 25px;
    }
    .star-item{
    	display: inline-block;
    	width: 15px;
    	height: 15px;
    }
	.star .on{
        background: url("../../assets/img/star24_on@2x.png") no-repeat center center;
        background-size: 80% 80%; 
	}
	.star .off{
        background: url("../../assets/img/star24_off@2x.png") no-repeat center center;
        background-size: 80% 80%; 
	}
	.star .half{
        background: url("../../assets/img/star24_half@2x.png") no-repeat center center;
        background-size: 80% 80%; 
	}
	.scroe-item{
		color: #ffbb22;
		position: relative;
		top: -2px;
		display: inline-block;
	}
</style>