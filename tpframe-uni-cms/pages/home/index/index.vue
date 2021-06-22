<template>
	<view class="page">
		<view class="banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" :indicator-color="'#FFF'" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) of banner" :key="item.id">
					<view class="swiper-item uni-bg-red"><image class="banner-item" mode="widthFix" :src="item.pic"></image></view>
				</swiper-item>
			</swiper>
		</view>
		<!-- nav -->
		<view class="nav-wrap">
			<view class="nav-item" v-for="(item,index) of navs" :key="item.img" @tap="navTap(item)">
				<image class="nav-ico" :src="item.img"></image><text class="nav-txt">{{item.title}}</text>
			</view>
		</view>
		
		<view class="index-block">
			<view class="block-title">
				<text class="title-l" v-if="list[0]">{{list[0].title || ''}}</text>
				<view class="title-r" @tap="jumpUrl(list[0]['more_url']+'?cid='+list[0]['category_id'])"></view>
			</view>
			<view class="index-content" v-if="list[0]">
				<view class="case-item" v-for="(item,index) of list[0].data" :key="item.id" @tap="jumpUrl(list[0]['base_url']+'?id='+item.id)">
					<image class="case-thumb" :src="item.thumb"></image>
					<text class="case-tit">{{item.title}}</text>
				</view>
			</view>
		</view>
		
		<view class="index-block">
			<view class="block-title">
				<text class="title-l" v-if="list[1]">{{list[1].title}}</text>
				<view class="title-r" @tap="jumpUrl(list[1]['more_url']+'?cid='+list[1]['category_id'])"></view>
			</view>
			<view class="index-content" v-if="list[1]">
				<view class="news-item" v-for="(item,index) of list[1].data" :key="item.id" @tap="jumpUrl(list[1]['base_url']+'?id='+item.id)">
					<view class="news-thumb"><image :src="item.thumb"></image></view>
					<view class="news-info">
						<text class="news-title">{{item.title}}</text>
						<view class="news-more">
							<text class="news-datetime">{{item.updatetime}}</text>
							<text class="news-view">{{item.view}}</text>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="index-block">
			<view class="block-title">
				<text class="title-l" v-if="list[2]">{{list[2].title}}</text>
				<view class="title-r" @tap="jumpUrl(list[2]['more_url']+'?cid='+list[2]['category_id'])"></view>
			</view>
			<view class="index-content">
				<view class="video-item" v-if="list[2]">
					<video id="myVideo" :src="list[2].data[0].data.video_source" enable-danmu danmu-btn controls></video>
				</view>
			</view>
		</view>
		
		<view class="index-block">
			<view class="block-title">
				<text class="title-l" v-if="list[3]">{{list[3].title}}</text>
				<view class="title-r" @tap="jumpUrl(list[3]['more_url']+'?cid='+list[3]['category_id'])"></view>
			</view>	
			<scroll-view scroll-x >
				<view class="photo-wrap" v-if="list[3]">
					<view class="photo-item" v-for="(item,index) of list[3].data" :key="item.id" @tap="jumpUrl(list[3]['base_url']+'?id='+item.id)">
						<image :src="item.thumb"></image>
						<text class="photo-tit">{{item.title}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script src="./index.js"></script>

<style lang="scss" src="./index.scss"></style>
