<template>
	<div class="goods-search-wrapper" ref="goodsSearchWrapper">
		<div class="serach-header">
			<span class="back-icon icon-arrow_lift" @click="closeSearch"></span>
			<input type="text" name="" class="search-box" placeholder="请输入商品名字" v-model="goodsName">
			<span class="search-btn">搜索</span>
		</div>
		<div class="hot-search-wrapper" v-show="!goodsList">
			<p class="text">热门搜索</p>
			<div class="hot-search-item" @click="addGoodsName($event)">
				<span>麦辣鸡翅2块</span>
				<span>金馒头</span>
				<span>巨无霸</span>
				<span>热朱古力</span>
				<span>原味那么大鸡排</span>
				<span>金柠鲜萃茶 热</span>
			</div>
		</div>
		<div class="goods-list" v-show="goodsList" ref="goodsList">
			<ul class="goods-list-wrapper" v-show="!noFind">
				<li v-for="(food,index) in searchGoods" class="food-items" @click="showGoodsDetails(food)">
					<div class="icon" :style="head_bg(food.picture)"></div>
					<div class="content">
                       <h3>{{food.name}}</h3>
                       <p class="desc" v-if="food.description">{{food.description}}</p>
                       <div class="extra">
                       	   <span class="saled">{{food.month_saled_content}}</span>
                       	   <span class="praise">{{food.praise_content}}</span>
                       </div>
                       <img class="product" v-if="food.product_label_picture" :src="food.product_label_picture">
                       <p class="price">
                       	    <span class="text">￥{{food.min_price}}</span>
                       	    <span class="unit">/{{food.unit}}</span>
                       </p>
					</div>

                    <div class="cartcontrol-wrapper">
                   	    <cart-control :food="food"></cart-control>
                    </div>
				</li>
			</ul>

            <goods-details :goodsItem="goodsItem" v-if="showDetails" @closeGoodsDetails="closeGoodsDetails"></goods-details>
			<div class="noFind" v-show="noFind">
				很抱歉没有找到你想要的商品
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import CartControl from "../goods/CartControl"
	import GoodsDetails from '../goodsdetails/GoodsDetails'
	import BScroll from "better-scroll"
	export default {
		components:{
			"cart-control":CartControl,
			"goods-details":GoodsDetails
		},
		data(){
			return {
				goodsName:"",
				goods:[],
				searchGoods:[],
				goodsList:false,
				noFind:false,
				showDetails:false,
				goodsItem:null
			}
		},
		computed:{
			// getfoods(){
			// 	return this.$store.state.foods;
			// }
		},
		methods:{
			head_bg(url){
                return "background-image:url('"+url+"')"
            },

            // g关闭整个搜索页面时
			closeSearch(){
				this.$emit("closeSearch")
				this.goodsName=""
			},
            
            //打开展示单个商品页面
			showGoodsDetails(food){
				this.goodsItem=food;
				this.showDetails=true;
			},
			 //关闭展示单个商品页面
			closeGoodsDetails(){
				this.showDetails=false;
			},

			addGoodsName($event){
				this.goodsName=$event.target.innerText;
			}
		},

		created(){
			// console.log(this.$store.state.foods)
			this.$nextTick(()=>{
				this.scroll=new BScroll(this.$refs.goodsList,{
						click:true
					})

			    // this.goods=this.$store.state.foods;
			})
		},
		watch:{

			//监听搜索框内内容的改变时时更新商品搜索结果
			goodsName:function(val){
				//输入的内容为空时
				if (!val) {
					this.$refs.goodsSearchWrapper.style["z-index"]=2;
					this.searchGoods=[];
					this.goodsList=false;
					this.noFind=false;
					return
				}else{

					//输入的内容不为空时将找到的商品存入数组中
				    let newArray=[];
					this.goodsList=true;
					this.goods=this.$store.state.foods;
					this.goods.forEach((item)=>{
				        item.spus.forEach((goodsItem)=>{
				        	if(goodsItem.name.indexOf(val)>-1){
				        		newArray.push(goodsItem)
				        	}
				        })
					})

					// 输入的内容没有找到对应得商品时
					if (!newArray.length) {
					    this.$refs.goodsSearchWrapper.style["z-index"]=2;
						this.noFind=true;
						return
					}else{	
						this.noFind=false;
					    this.searchGoods=newArray;
					    this.$refs.goodsSearchWrapper.style["z-index"]=0;
					}
				}

				
			},

			// getfoods:function(val){
   //              this.goods=val;
			// }


		}
	}
</script>

<style type="text/css" scoped>
    .goods-search-wrapper{
    	font-size: 15px;
		/*background: white;*/
	    position: absolute;
	    top: 0;
	    width: 100vw;
	    height: 100vh;
	    bottom: 0;
	    left: 100vw;
	    background:rgb(240,240,240);
	    z-index: 2;

    }
    .serach-header{
		color: gray;
		padding: 10px 20px;
		line-height: 30px;
		height: 30px;
		text-align: center;
		display: flex;
		border-bottom: 1px solid rgb(230,230,230);
        background: rgb(250,250,250);
	}
	.back-icon{
		line-height: 30px;
		
		padding-right:20px; 
	}
	.search-box{
		box-sizing: border-box;
		width: 75vw;
		padding:5px 10px;
		background:rgb(230,230,230);
		border: 1px solid rgb(222,222,222);
		border-radius:3px;
		vertical-align: center;
		display: inline-block;
	}
	.search-btn{
		width: 40px;
		vertical-align: center;
		display: inline-block;
		margin-left: 5px;
	}
	.hot-search-wrapper{
		/*padding: 0 20px;*/
        background: rgb(250,250,250);
	}
	.hot-search-wrapper .text{
		color: gray;
		line-height: 40px;
		border-bottom: 1px solid rgb(230,230,230);
		margin: 0 20px;
	}
	.hot-search-item{
		background: white;
		padding: 10px;
	}
	.hot-search-item span{
		display: inline-block;
        padding:10px;
		text-align: center;
		background: rgb(230,230,230);
		margin: 10px;
		font-size: 13px;
		border-radius:3px;
	}



    .goods-list{
    	width: 100%;
        position: absolute;
        top: 51px;
        bottom: 0px;
        background: rgb(250,250,250);
        overflow: hidden;
    }
	.food-items{
    	display: flex;
    	padding: 10px 10px;
    	position: relative;
    	border-bottom: 1px solid rgb(230,230,230);
    }
    .cartcontrol-wrapper{
    	position: absolute;
    	right: 0;
    	bottom: 0;
    }
	.food-items .icon{
		display: inline-block;
		width: 80px;
		height: 80px;
		background-size:100% 100%; 
		box-shadow: 1px 1px 1px rgb(230,230,230),-1px -1px 1px rgb(230,230,230);
	}
    .content{
    	flex: 1;
    	margin-left: 10px;
    }
	.content h3{
		font-weight: bold;
		font-size: 14px;
		margin:8px 0;
	}
	.content .desc,.content .extra{
       /*超出显省略号*/
		-webkit-line-clamp:1;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		overflow: hidden;
        line-height: 13px;
		color:gray;
		font-size: 10px;
		margin:5px 0;
	}
	.product{
		display: inline-block;
		margin:5px 0;
		width: 80px;
		height: 20px;
	}
    .price .text{
    	color: red;
    	font-weight: bold;
    	font-size: 14px;
    }
    .price .unit{
    	color:gray;
    }

    .cartcontrol-wrapper{
    	position: absolute;
    	bottom: 10px;
    	right: 10px;
    }

    .noFind{
    	text-align: center;
    	line-height: 50px;
    	font-size: 20px;
    	color: red;
    }
</style>