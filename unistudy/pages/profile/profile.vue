<template>
	<view class="">
		
			
		</view>
</template>

<script>
export default {
	data() {
		return {
			key:"TPRBZ-RBDRD-2Y54B-HAO2Q-N5RSO-JBBWU",
			city:"xxxxxxxx",
			
		};
	},
	methods: {
	
		
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		//将规则添加到uForm表格身上,设置规则
		this.$refs.uForm.setRules(this.rules);
	},
	onLoad() {
		uni.getLocation({
		    type: 'gcj02',
		    success: function (res) {
		        console.log('当前位置的经度：' + res.longitude);
		        console.log('当前位置的纬度：' + res.latitude);
		    }
		});
	}
};
</script>

<style lang="scss">
	.u-form-item--left__content__label{
		line-height: 0;
	}
</style>
