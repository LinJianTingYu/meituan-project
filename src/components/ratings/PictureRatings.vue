<template>
	<div class="all-ratings-wrapper">
		<div class="all-ratings-list">
			<div class="all-ratings-item"  v-for="comments in sellerRatings">
				<div class="user-pic" :style="{'background-image':'url('+comments.user_pic_url+')'}"></div>
				<div class="comments-content">
					<p class="user">
						<span class="user-name">{{comments.user_name}}</span>
						<span class="comment-time">{{changeTime(comments.comment_time)}}</span>
					</p>
					<div class="star-wrapper">
						<span>评分</span>
						<div class="score">
							<app-star :scroe="comments.order_comment_score" :scroeItem="false"></app-star>
						</div>
					</div>
					<div class="user-comment">{{comments.comment}}</div>
					<div class="comment_pics" v-if="comments.comment_pics.length">
						<img :src="comments.comment_pics[0].url">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import AppStar from "../Header/AppStar"
	export default {
		components:{
			"app-star":AppStar,
		},
		data(){
			return {
                sellerRatings:{}
			}
		},
		methods:{
			changeTime(time){
				let fullDate=""
                let date=new Date(time);
                let year=date.getFullYear();
                let day=date.getDate();
                let month=date.getMonth()+1;
                fullDate+=year+"."+month+"."+day
                return fullDate
			}
		},
		computed:{
			// commentPics(){
			// 	this.sellerRatings.filter((sellerRating)=>{
			// 		return sellerRating.comment_pics.length>0
			// 	})
			// }
		},
		created(){
			fetch("https://www.easy-mock.com/mock/5bac714eb328c27d98eb13d5/example/ratings").then((res)=>{
				return res.json()
			}).then((data)=>{
				let newData=data.data.comments.filter((sellerRating)=>{
					return sellerRating.comment_pics.length>0
				})
				this.sellerRatings=newData;
			})
		}
	}
</script>

<style type="text/css">
	.all-ratings-wrapper{
		/*padding: 10px;*/
		width: 100%;
	}
	.all-ratings-item{
		display: flex;
		padding:10px 0 15px;
		border-bottom:1px solid #e4e4e4;
	}
	.user-pic{
		position: relative;
		margin-right: 10px;
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
	.star-wrapper{
		color: gray;
		font-size: 13px;
		margin:5px 0;
	}
	.star-wrapper>span{
		position: relative;
		top: -1px;
		height: 25px;
		line-height: 25px;
		display: inline-block;
	}
	.star-wrapper .score{
		display: inline-block;
	}


	.user-comment{
		line-height: 18px;
		font-size: 13px;
		font-weight: bold;
	}

	.comment_pics{
		padding-top: 10px;
	}
	.comment_pics img{
		width: 100px;
		height: 100px;
	}
</style>