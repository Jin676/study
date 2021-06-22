<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<navigator open-type="reLaunch"  url="../menu/menu" hover-class="navigator-hover">
		 <button type="default">跳转到新页面</button>
		 </navigator>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync()
			console.log(res)
			uniCloud.callFunction({
				name:"myfun",
				success:(res)=>{
						console.log(res)
				}
			})
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
