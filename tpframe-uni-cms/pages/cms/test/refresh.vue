<template>
	<view class="page">
		<view class="news-item" v-for="(item,index) of list" :key="index">
			<view class="news-base">
				<image class="thumb" :src="item.thumb"></image>
				<view class="title">{{item.title}}</view>
			</view>
			<view class="news-more">
				<text class="source">{{item.source}}</text>
				<text class="comment_number">{{item.comment_number}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import news from '@/data/test/load_more.js';
export default{
	data(){
		return {
			list:[],
			page:1,
		}
	},
	async onLoad() {
		const newList = news.getNewsList();
		this.list = await newList;
	},
	onReachBottom(){
		this.page++;
		console.log(this.page);
		if(this.page>=5) return false;
		const newList = news.getNewsList();
		let listnew= newList;
		this.list.push(...listnew);
	},
	onPullDownRefresh(e){
		console.log("下位刷新");
		
		/* 重新加载页面，重新拉取数据 */
		
		const newList = news.getNewsList();
		let listnew= newList;
		this.list = listnew;
		
		setTimeout(()=>{
			uni.stopPullDownRefresh();
		},500)
		
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
</style>
