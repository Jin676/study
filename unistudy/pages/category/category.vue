<template>
	<view>
		<u-search></u-search>
		<view class="categoryWrapper">
			<!-- left列表 -->
			<view class="category-left-wrapper">
				<scroll-view scroll-y="true" class="category-left-scroll" enable-flex>
					<view class="category-left-item" @click="navId = index" :class="{active:navId===index}"
						v-for="(item,index) in category" :key="index">
						<view class="category-left-content">
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<!-- right列表 -->
			<view class="category-right-wrapper">
					<u-grid :col="3">
							<u-grid-item style="text-align: center;" v-for="(item,index) in goods" :key="index">
								<navigator 	:url="`../goods-list/goods-list?navId=${navId}&${item.name}`">	
								<u-icon name="photo" :size="46"></u-icon>
								<view class="grid-text">{{item.name}}</view>
								</navigator>
							</u-grid-item>
						</u-grid>
			</view>
		</view>
	</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				category:[
				{name:"折扣"},	{name:"半价"},	{name:"评分"},	{name:"美食"},{name:"足球"},{name:"折扣"},	{name:"半价"},	{name:"评分"},	{name:"美食"},{name:"足球"}
					],
				goods:[
					{name:"休闲零食"},{name:"浆果系列"},{name:"米面主食"},{name:"果汁饮料"},
				],	
				navId: 0
			};
		}
	}
</script>

<style lang="scss" scoped>
	.categoryWrapper {
		display: flex;
		/* #ifdef H5*/
		height: calc(100vh - 188rpx - 64rpx); 
		/* #endif */
		/* #ifdef APP-PLUS*/
		height:calc(100vh - 188rpx - 64rpx); 
		/* #endif */
		.category-left-wrapper {
			width: 162rpx;
			text-align: center;
			font-size: 26rpx;
			border-right: 2rpx solid #eee;

			.category-left-scroll {
				height: 600rpx;
			}

			.category-left-item {
				position: relative;
				margin-top: 40rpx;

				&.active {
					color: #ab2b2b;
					font-weight: bold;

					&:before {
						position: absolute;
						left: 0;
						content: "";
						width: 5rpx;
						height: 37.6rpx;
						background: #ab2b2b;
					}
				}

				.category-left-content {}
			}
		}
		.category-right-wrapper{
			box-sizing: border-box;
			width: 100%;
			
		}
	}
	.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}
</style>
