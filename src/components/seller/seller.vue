<template>
	<div class="seller-wrapper">
        <div class="seller-message">
			<div class="seller-header">
				<!-- 商家信息 -->
				<div class="seller-message-header">
					<span class="address">{{seller.address}}</span>
					<span class="phone fr" @click="showPhoneNum"></span>
				</div>
		        
		        <!-- 商家图片展示 -->
		        <div class="seller-slider" ref="sellerSlider">
		        	<ul class="sellerPic-wrapper">
		        		<li v-for="sellerPic in seller.poi_env.thumbnails_url_list" class="sellerPic-item">
		        			<img :src="sellerPic" alt="">
		        		</li>
		        	</ul>
		        </div>

		        <!-- 商家食品安全档案 -->
		        <div class="seller-food-safe">
		        	<span>查看食品安全档案</span>
		        	<span class="icon-keyboard_arrow_right fr seller-food-safe-btn"></span>
		        </div>
			</div>

			<!-- 配送服务 -->
			<div class="delivery-wrapper">
				<p class="delivery-tip">
				<!-- 	<span class="delivery-tip-icon"></span> -->
					<span>配送服务:{{seller.app_delivery_tip}}</span>
				</p>
				<p class="delivery-time">
				<!-- 	<span class="delivery-time-icon"></span> -->
					<span>配送时间:{{seller.shipping_time}}</span>
				</p>
			</div>

			<div class="seller-wrapper-footer">
				<div class="seller-service-wrapper">
					<span class="seller-service">商家服务</span>
					<span class="seller-invoice" v-for="invoice in seller.poi_service" :style="'background-image:url('+invoice.icon+')'">{{invoice.content}}</span>
				</div>
				<div class="discounts">
					<p v-for="discount in seller.discounts2"  :style="'background-image:url('+discount.icon_url+')'">
						{{discount.info}}
					</p>
				</div>
			</div>

			<div class="telephone-warraper">
				<div class="telphone-mask" v-if="telephoneWarraper"></div>
				<transition name="telephoneFade">
					<div class="telephone-content" v-if="telephoneWarraper">
						<p class="call-btn">拨打电话</p>
						<p class="phone-num">18208185403</p>
						<p class="cancel-btn" @click="closePhoneNum">取消</p>
					</div>
				</transition>
			</div>
        </div>
	</div>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll'
	export default {
		data(){
			return {
				seller:{},
				telephoneWarraper:false
			}
		},
		methods:{
			showPhoneNum(){
                this.telephoneWarraper=true;
			},
			closePhoneNum(){
				this.telephoneWarraper=false;
			}
		},
		created(){
			fetch("https://www.easy-mock.com/mock/5bac714eb328c27d98eb13d5/example/seller").then((res)=>{
				return res.json();
			}).then((data)=>{
				// console.log(data.data);
				this.seller=data.data;

	            this.$nextTick(()=>{
	              if (!this.scroll) {
		              	this.scroll=new BScroll(this.$refs.sellerSlider,{
		                	scrollX:true,
		                	click:true
		              });
	              }else{
	              	this.scroll.refresh();
	              }
	            });
			});
		}
	}
</script>

<style type="text/css" scoped>
    .seller-wrapper{
    	/*padding: 0 10px;*/
	    position: absolute;
	    top: 192px;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: rgb(245,245,245);
	    width: 100vw;
    }
    .split{
    	height: 10px;
    	background: rgb(245,245,245);
    }
	.seller-message{
		/*padding:0 10px;*/
		font-weight: bold;
		font-size: 12px;
	}
	.seller-header{

		margin-top: 10px;
		background: white;
	}
	.seller-message-header{
		border-bottom: 1px solid rgb(245,245,245);
		padding: 10px 10px;
		height: 30px;
		line-height: 30px;
	}
	.address{
		line-height: 20px;
		height: 20px;
		display: inline-block;
		background: url('../../assets/img/商家页面/address.png') no-repeat;
		background-size: 20px 20px;
		padding-left: 25px;
	}
	.phone{
		background: url('../../assets/img/商家页面/phone.png') no-repeat;
		background-size: 20px 20px;
		background-position: 0 center;
		display: inline-block;
		width: 20px;
		height: 30px;
	}

	.seller-food-safe{
		background: url('../../assets/img/商家页面/safety.png') no-repeat;
		padding-left: 25px;
		background-size: 20px 20px;
		background-position: 0 center;
		height: 30px;
		line-height: 30px;
		margin: 5px 10px;
	}
	.seller-food-safe-btn{
		height: 30px;
		line-height: 30px;
		font-size: 14px;
	}
    

    .seller-slider{
    	padding:0 10px;
    	width: 100%;
    	overflow: hidden;
    	box-sizing: border-box;
    } 

    .sellerPic-wrapper{
    	width: 590px;
    	margin: 10px 0;
    	height: 82px;
    }


	.sellerPic-item{
		display: inline-block;
		float: left;
		padding-left: 10px;
	}
	.sellerPic-item:first-child{
		padding-left: 0;
	}
	.sellerPic-item img{
		width: 90px;
		height: 80px;
	}

    .delivery-wrapper{
    	margin: 10px 0;
    	background: white;
    	padding: 0 10px;
    }
    .delivery-tip{
    	background: url("../../assets/img/商家页面/delivery.png") no-repeat 0px center;
    	background-size: 15px 15px;
        height: 30px;
        line-height: 30px;
		border-bottom: 1px solid rgb(245,245,245);
		padding: 5px 0 5px 25px;
    }
    .delivery-time{
    	background: url("../../assets/img/商家页面/time.png") no-repeat 0px center;
    	background-size: 15px 15px;
		padding: 5px 0 5px 25px;
        height: 30px;
        line-height: 30px;
    }

    .seller-wrapper-footer{
    	background: white;
    }
    .seller-service-wrapper{
    	padding: 10px 10px;
		border-bottom: 1px solid rgb(245,245,245);
    }
    .seller-service{
    	background: url("../../assets/img/商家页面/server.png") no-repeat 0px center;
    	background-size: 15px 15px;
    	padding-left: 20px;
    	display: inline-block;
    	line-height: 30px;
    }
    .seller-invoice{
    	display: inline-block;
    	background-repeat: no-repeat;
    	background-position: 0px center;
    	background-size: 15px 15px; 
    	padding-left: 20px;
    	line-height: 30px;
    	margin-left: 20px;
    }
 
    .discounts{
    	padding: 0 10px;
    }
    .discounts p{
    	background-size: 15px 15px;
    	background-repeat: no-repeat;
    	background-position: 0 center;
		padding: 5px 0 5px 25px;
    	line-height: 20px;
    	margin:0;
    }


    .telephone-warraper{
    	
    }
    .telphone-mask{position: fixed;
    	z-index: 3;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	top: 0;
    	width: 100%;
    	height: 100%;
    	background: rgba(210,210,210,.7);
    }
    .telephone-content{
    	z-index: 4;
    	position: absolute;
    	bottom: 0;
    	background: white;
    	width: 100%;
    }
    .telephone-content p{
    	padding:20px 10px;
    	text-align: center;
    	font-size: 14px;
    }
    .call-btn{
    	color: rgba(50,50,50,.7);
    }
    .phone-num{
    	border-top: 1px solid rgba(210,210,210,.7);
    	font-size: 16px;
    	color: rgb(50,50,50);
    }
    .cancel-btn{
    	color: rgb(50,50,50);
    	border-top: 5px solid rgba(210,210,210,.7);
    }


    /*动画*/
    .telephoneFade-enter-active,.telephoneFade-leave-active{
    	transition: all 500ms;
    }
    .telephoneFade-enter,.telephoneFade-leave-to{
    	bottom:-150px;
    }
   /* .telephoneFade-enter-to,.telephoneFade-leave{
    	bottom:50px;
    }*/
</style>