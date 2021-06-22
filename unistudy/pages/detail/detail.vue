<template>
	<view>
		<StatusBar/>
		<!-- #ifdef MP-WEIXIN -->
		<titleBar></titleBar>
		<!-- #endif -->
		<swiper class="swiperWrapper" @change="change"  :indicator-dots="true"  :interval="3000" :duration="1000">
		  	<swiper-item @click="handeleImg" class="swiper-item" v-for="(item,index) in urls" :key="index">
						<image :src="item" mode=""></image>	
						<text>{{swiperId+1}}/{{urls.length}}</text>
				</swiper-item>
		</swiper>
		
		<!-- 测试 -->
		<view class="iconfont">
			&#xe61f;&#xe600;
		</view>
		<u-icon name="arrow-left"></u-icon>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperId:0,
				urls:[
					"../../static/image/banner/64959a5dd9251bb6c48542777646d1bf.webp",
					"../../static/image/banner/d7d2c04b2af805e8677fc511ee68ad0b.webp",
					"../../static/image/banner/d443466bc518a93dbb80e2c55219b372.webp",
					"../../static/image/banner/ef168423820248cf61e4dfe91ebcd611.webp"
					]
			};
		},
		methods:{
			change(a){
					this.swiperId = a.detail.current
			},
			handeleImg(){
				console.log(this.urls)
				uni.previewImage({
				            urls:this.urls,
										current:this.swiperId,
										indicator:"number",
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
			}
		}
	}
</script>

<style lang="scss">
 .swiperWrapper{
	 width: 750rpx;
	 .swiper-item{
			 position: relative;
			 image{
				 width: 100%;
				 height: 100%;
			 }
			 text{
				 position: absolute;
				 right: 10rpx;
				 bottom: 10rpx;
				 z-index: 9999;
				 background-color: #fff;
				 color: #333;
				 border-radius: 8rpx;
			 }
	 }
 }
</style>
