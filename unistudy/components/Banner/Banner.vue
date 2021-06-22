<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/image/banner/d443466bc518a93dbb80e2c55219b372.webp" mode="widthFix"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/image/banner/64959a5dd9251bb6c48542777646d1bf.webp" mode="widthFix"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/image/banner/d7d2c04b2af805e8677fc511ee68ad0b.webp" mode="widthFix"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/image/banner/ef168423820248cf61e4dfe91ebcd611.webp" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name:"Banner",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.swiper-item{
		image{
			width: 100%;
			height: 100%;
		}
		}
</style>
