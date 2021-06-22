<template>
	<view>
		<u-navbar :is-back="false" title="自定义title" :background="background" title-color="#FFFFFF" :border-bottom="false">
		</u-navbar>
		<!-- <view class="u-page">
			<u-image class="bg" width="750rpx" height="246rpx" src="@/static/images/bg_home@2x.png"></u-image>
			<view class="u-content">
				<view class="swiper-box">
					<u-swiper :list="banners" height="300" bg-color=""></u-swiper>
				</view>

				<u-sticky :offset-top="offsetTop" h5-nav-height="44">
					<view class="tab-bar" id="tabBar">
						<u-tabs :list="tabs" :is-scroll="true" :current="currentTab" @change="changeTab"
							:active-color="vuex_selected_color" height="150" font-size="24"></u-tabs>
					</view>
				</u-sticky>
			</view>
		</view> -->
		</view>
</template>

<script>
	export default {
		data() {
			return {
				// 自定义顶部导航-渐变色
				background: {
					backgroundImage: 'linear-gradient(90deg, rgb(255, 0, 69), rgb(255, 106, 95))'
				},
				banners: [{
					id: 1,
					image: '../../../../static/images/bg_banner@2x.png'
				}, {
					id: 2,
					image: '../../../../static/images/bg_banner1@2x.png'
				}],
				offsetTop: 0,

				tabs: [],
				currentTab: 0,
				tabBarTop: 0,
			}
		},
		onShow() {
			this.setOffestTop()
		},
		mounted() {
			uni.createSelectorQuery().in(this).select('#tabBar').boundingClientRect(res => {
				this.tabBarTop = res.top
			}).exec()
		},
		methods: {
			// 适配吸顶tab高度
			setOffestTop() {
				let systemInfo = uni.getSystemInfoSync()
				let topPx = systemInfo.statusBarHeight + 44 // 顶部状态栏+沉浸式自定义顶部导航
				this.offsetTop = topPx / (uni.upx2px(topPx) / topPx) // px转rpx
			},
			// 切换类目tab
			changeTab(index) {
				this.currentTab = index
				this.isMore = true
				uni.createSelectorQuery().selectViewport().scrollOffset(res => {
					if (res.scrollTop > this.tabBarTop) {
						uni.pageScrollTo({
							scrollTop: this.tabBarTop,
							duration: 0
						})
					}
				}).exec()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.u-page {
		>.u-content {
			position: relative;
			margin-top: -246rpx;
			padding: 54rpx 30rpx;
		}
	}

	.swiper-box {
		height: 300rpx;
	}

	.tab-bar {
		height: 150rpx;
	}
</style>
