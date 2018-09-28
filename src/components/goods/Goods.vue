<template>
	<div class="goods">
		<!-- 分类列表 -->
		<div class="menu-wrapper" ref="menuScroll">
			<ul>
				<li class="menu-item" :class="{'current':currentIndex===0}" @click="skipItem(0)">
					<p class="text">
						<img v-bind:src="contanier.tag_icon">
						<span>{{contanier.tag_name}}</span>
					</p>
				</li>
				<li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index+1}"  @click="skipItem(index+1)">
					<p class="text">
						<img v-bind:src="item.icon" v-if="item.icon">
						<span>{{item.name}}</span>
					</p>
					<span class="goods-num" v-show="selectItems(item.spus)">{{selectItems(item.spus)}}</span>
				</li>
			</ul>
		</div>

		<!-- 商品列表 -->
		<div class="goods-wrapper" ref="foodScroll">
			<ul>
				<!-- 专场 -->
                <li class="container-list  food-list-hook">
                	<div v-for="(item,index) in contanier.operation_source_list">
                		<img :src="item.pic_url">
                	</div>
                </li>

				<!-- 具体分类 -->
				<li v-for="(item,index) in goods" class="food-list food-list-hook">
					<h3>{{item.name}}</h3>
					<!-- 具体商品列表 -->
					<ul>
						<li v-for="(food,index) in item.spus" class="food-items" @click="showGoodsDetails(food)">
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
				</li> 
			</ul>

		    <transition name="goodsDetailsFade">
		    	<goods-details v-if="showGoodsItem" :goodsItem="goodsItem" @closeGoodsDetails="showGoodsItem=!showGoodsItem"></goods-details>
		    </transition>
		</div>


		<goods-cart :selectFoods="selectFoods"></goods-cart>
	</div>
</template>

<script type="text/javascript">
	import goodsCart from "../cart/goodsCart"
	import CartControl from "../goods/CartControl"
	import GoodsItem from "../goodsdetails/GoodsDetails.vue"
	import BScroll from "better-scroll"
	export default {
		components:{
			"goods-cart":goodsCart,
			"cart-control":CartControl,
			"goods-details":GoodsItem
		},
		data(){
			return {
				contanier:{},
				goods:[],
				listHeight:[],
				scrollHeight:0,
				goodsItem:null,
				showGoodsItem:false,
				menuScroll:{},
				foodScroll:{}
			}
		},
		computed:{
            // 滑动之那一个区间
            currentIndex(){
            	for (var i = 0; i < this.listHeight.length; i++) {
            		let height1=this.listHeight[i];
            		let height2=this.listHeight[i+1];
            		if (this.scrollHeight>=height1&&this.scrollHeight<height2) {
            			return i
            		}
            	}
            	return 0
            },

            // 收集用户添加至购物车的商品
            selectFoods(){
            	let foods=[];
            	this.goods.forEach((myFoods)=>{
            		
            		myFoods.spus.forEach((myFood)=>{
            			if (myFood.count>0) {
            				foods.push(myFood);
            			}
            		})
            	})
            	return foods
            },
		},

		methods:{
			showGoodsDetails(food){
				this.goodsItem=food;
				this.showGoodsItem=true;
			},

            head_bg(url){
                return "background-image:url('"+url+"')"
            },

            calculateHeight(){
            	let foodList=this.$refs.foodScroll.getElementsByClassName("food-list-hook");
            	let height=0;
            	this.listHeight.push(height);
            	for (var i = 0; i < foodList.length; i++) {
            		height+=foodList[i].clientHeight;
            		this.listHeight.push(height);
            	}
            },
            
            //通过下标实现点击左侧，滚动右侧
            skipItem(index){

            	// 要滚到的右边元素
            	let foodList=this.$refs.foodScroll.getElementsByClassName("food-list-hook");
            	let ele=foodList[index];
                
                //滚动到对应元素俺的位置
                this.foodScroll.scrollToElement(ele,300)
            },

            //加入购物车商品大类数量
            selectItems(spus){
            	let items=0;
            	spus.forEach((myFoods)=>{
            		if (myFoods.count>0) {
                       items+=myFoods.count;
            		}
            	})
            	return items
            },

            //滚动效果
            init_scroll(){

            	this.foodScroll=new BScroll(this.$refs.foodScroll,{
                	click:true,
                	scrollY:true,
                	probeType:3    //探针的效果，时时获取滚动高度
                });

                this.menuScroll=new BScroll(this.$refs.menuScroll,{
                	click:true,
                	scrollY:true,
                	probeType:3    //探针的效果，时时获取滚动高度
                });
                
                //foddScroll监听事件
                this.foodScroll.on("scroll",(pos)=>{
                    this.scrollHeight=Math.abs(Math.round(pos.y));
                })
            }
		},

		created(){
			fetch("https://www.easy-mock.com/mock/5bac714eb328c27d98eb13d5/example/goods").then((res)=>{
				return res.json();
			}).then((data)=>{
				if (data.code==0) {
					this.contanier=data.data.container_operation_source;
                    this.goods=this.$store.state.foods;
				}


                // DOM已经更新才执行
                this.$nextTick(()=>{

                	// 计算分类的区间高度
	                this.calculateHeight();
                     
                    //监听滚动位置
                    this.init_scroll();

                    //根据滚动位置，确认下标，与左侧对应
                     

                    //通过下标，实现点击左侧，确定右侧位置

                    //执行滚动
	               
                })
			});
		}
	}
</script>

<style type="text/css" scoped>
    .goods{
    	font-size: 13px;
    	display: flex;
    	position: absolute;
    	z-index: 2;
    	top: 192px;
    	bottom: 40px;
    	left: 0;
    	right: 0;
    	width: 100vw;
    }
	.menu-wrapper{
        width:85px;
        overflow: hidden;
	}
	.goods-wrapper{
		flex: 1;
		overflow: hidden;
	}
    
    .menu-item:first-child{
    	margin-top: -1px;
    }
	.menu-item{
		font-size: 12px;
		position: relative;
		padding: 10px 15px;
		background: rgba(240,240,240,.6);
		border-bottom: 1px solid rgba(150,150,150,.1);
	}
    .text{
		line-height: 20px;
    }
	.text img{
		width: 20px;
		height: 20px;
	}
	.text span{
		display: inline-block;
		vertical-align: top;
	}

    
    .container-list img{
    	width: 100%;
		border-radius: 10px;
    }
    .container-list{
		padding: 10px;
    }
	.container-list>div:first-child{
		margin-bottom: 10px;
	}

	.food-list{
		padding: 10px;
		border-top: 1px solid lightgray;
	}
	.food-list>h3{
		font-size: 12px;
		height: 14px;
		line-height: 14px;
		font-weight: bold;
	}
	.food-list>h3:before{
		content: "";
		display: inline-block;
		margin-right: 5px;
		height: 10px;
		width: 2px;
		background: orange;
	}
    .food-items{
    	display: flex;
    	margin:5px 0;
    	position: relative;
    }
    .cartcontrol-wrapper{
    	position: absolute;
    	right: 0;
    	bottom: 0;
    }
	.food-items .icon{
		display: inline-block;
		margin-right: 10px;
		width: 60px;
		height: 60px;
		background-size:100% 100%; 
		margin-top: 15px;
		/*position: absolute;*/
	}
    .content{
    	flex: 1;
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
    .icon-add_circle{
    	position: absolute;
    	right: 0;
    }
    /*当前选中*/
    .menu-item.current{
    	background: white;
    	font-weight: bold;
    	margin-top: -1px;
    }
    .menu-item:first-child.current{
    	margin-top: 1px;
    }

    .goods-num{
	    position: absolute;
	    top: 2px;
	    right: 2px;
	    display: inline-block;
	    background: red;
	    width: 15px;
	    height: 15px;
	    color: white;
	    font-size: 12px;
	    line-height: 15px;
	    border-radius: 15px;
	    text-align: center;
	}

	.goodsDetailsFade-enter-active,.goodsDetailsFade-leave-active{
		transition: all 1s;
	}
	.goodsDetailsFade-enter,.goodsDetailsFade-leave-to{
		opacity: 0;
	}
	.goodsDetailsFade-enter-to,.goodsDetailsFade-leave{
		opacity: 1;
	}
</style>