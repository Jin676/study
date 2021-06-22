<template>
	<view class="page">
		<scroll-view scroll-y="true" class="news-list" @scrolltolower="scrolltolower" lower-threshold="10">
			<view class="news-item" v-for="(item,index) of list" :key="index"
			@touchstart="touchstart"
			@touchmove="touchmove"
			@touchcancel="touchcancel"
			@touchend="touchend"
			:style="{transform:'translate(0,'+translateY+'px)'}"
			>
				<view class="news-base">
					<image class="thumb" :src="item.thumb"></image>
					<view class="title">{{item.title}}</view>
				</view>
				<view class="news-more">
					<text class="source">{{item.source}}</text>
					<text class="comment_number">{{item.comment_number}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import news from '@/data/test/load_more.js';
export default{
	data(){
		return {
			list:[],
			page:1,
			_refresh:false,
			trigger:false,
			startY:0,
			translateY:0
		}
	},
	async onLoad() {
		const newList = news.getNewsList();
		this.list = await newList;
	},
	methods:{
		touchstart(e){
			console.log("touchstart:::",e);
		},
		touchmove(e){
			if(this.translateY == 100){
				uni.startPullDownRefresh({
					success(e){
						console.log("success",e);
					},
					fail(err){
						console.log("faile",err);
					}
				});
				return;
			} 
			console.log("touchmove:::",e);
			if(this.startY==0)  this.startY = e.changedTouches[0].pageY;
			
			let endY = e.changedTouches[0].pageY;
			
			this.translateY = this.translateY>100?100:endY -  this.startY;
			
		},
		touchcancel(e){
			console.log("touchcancel:::",e);
		},
		touchend(e){
			console.log("touchend:::",e);
		},
		scrolltolower(){
			this.page++;
			console.log(this.page);
			if(this.page>=6) return false;
			const newList = news.getNewsList();
			let listnew= newList;
			this.list.push(...listnew);
		}
		
	}
}
</script>

<style lang="scss">
.news-item{
	padding: 10rpx;
	border-bottom: 1px #e8e8e8 solid;
}
.news-base{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.thumb{
	width: 300rpx;
	height: 200rpx;
}
.title{
	flex: 1;
	font-size: 32rpx;
	padding-left: 10rpx;
}
.news-more{
	display: flex;
	flex-direction: row;
	font-size: 28rpx;
	color: #666;
	margin-top: 10rpx;
}
.comment_number{
	margin-left: 20rpx;
}
.news-list{
	position: fixed;
	top: var(--window-top);
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
