<template>
	<view class="page">
		<view class="header">
			<view class="headerimg"><image src="@/static/user/header.jpg" mode=""></image></view>
			<text class="nickname">tpframe</text>
		</view>
		
		<view class="cells">
			<navigator url="/pages/expand/web/web?url=https://www.tpframe.com" class="cell"><text class="title">关于我们</text></navigator>
			<view class="cell"><text class="title">客服帮助</text></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
.header{
	@include tpframe-flex(column);
	background-color:$tpf-bg-color-deep-sky-blue;
	@include tpframe-padding(50rpx,0,80rpx,0);
}
.headerimg{
	width: 120rpx;
	height: 120rpx;
	border-radius: 50px;
	image{
		@include tpframe-container-size(120rpx,120rpx);
		border-radius: 50px;
	}
}
.nickname{
	color: #FFF;
	font-size:$tpf-font-size-base*1.2;
	margin-top: 20rpx;
}
.cells{
	
}
.cell{
	@include tpframe-flex;
	height: 90rpx;
	padding-left: 20rpx;
	border-bottom: 2rpx $tpf-border-color-white-smoke solid;
}
</style>
