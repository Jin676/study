<template>
	<view class="page">
		<view class="banner"><image src="@/static/contact/banner.jpg" mode="widthFix"></image></view>
		<view class="connect-wrap">
			<view class="connect-item">
				<view class="left">
					<text class="tpf-iconfont ico">{{'\ue677'}}</text>
					<text>15523362830</text>
				</view>
				<text class="right-txt" @tap="callPhone">拨打电话</text>
			</view>
			
			<view class="connect-item">
				<view class="left">
					<text class="tpf-iconfont icon-87 ico"></text>
					<text>510974211</text>
				</view>
			</view>
			
			<view class="connect-item">
				<view class="left">
					<text class="tpf-iconfont icon-youxiang ico"></text>
					<text>510974211@qq.com</text>
				</view>
			</view>
			
			<view class="connect-item">
				<view class="left">
					<text class="tpf-iconfont icon-dianhua ico"></text>
					<text>重庆观音桥</text>
				</view>
				<text class="right-txt">地图</text>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			
		}
	},
	methods:{
		callPhone(){
			uni.makePhoneCall({
				phoneNumber:"15523362830"
			})
		}
	}
}
</script>

<style lang="scss">
.page{
	background-color: $tpf-bg-color-white-smoke;
	height: 100vh;
}
.banner{
	width: 750rpx;
	image{
		width: 750rpx;
	}
}
.connect-wrap{
	padding: 20rpx;
}
.connect-item{
	@include tpframe-flex;
	background-color: #FFFFFF;
	padding:30rpx 10px;
	margin-bottom: 20rpx;
	.left{
		@include tpframe-flex;
		.ico{
			margin-right:10rpx;
			font-size:46rpx;
		}
	}
}
</style>
