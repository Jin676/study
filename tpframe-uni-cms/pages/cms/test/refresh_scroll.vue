<template>
	<view class="page">
		<scroll-view scroll-y="true" class="news-list" @scrolltolower="scrolltolower" lower-threshold="10"
		refresher-enabled
		:refresher-triggered="trigger"
		:refresher-default-style="'none'"
		@refresherrefresh="refresherrefresh"
		>
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
			trigger:false
		}
	},
	async onLoad() {
		const newList = news.getNewsList();
		this.list = await newList;
	},
	methods:{
		scrolltolower(){
			this.page++;
			console.log(this.page);
			if(this.page>=6) return false;
			const newList = news.getNewsList();
			let listnew= newList;
			this.list.push(...listnew);
		},
		refresherrefresh(){
			// 如果上一次下拉没完成，不进行刷新操作
			if(this._refresh) return false;
			
			//下拉被触发
			this._refresh = true;
			this.trigger = true;
			console.log("下拉刷新");
			const newList = news.getNewsList();
			let listnew= newList;
			this.list = listnew;
			setTimeout(()=>{
				this._refresh = false;
				this.trigger = false;
			},1000);
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
