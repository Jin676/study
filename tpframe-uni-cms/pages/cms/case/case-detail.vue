<template>
	<view class="page">
		<view class="content">
			<view class="item" v-for="(item,index) of list" :key="index"><image class="photo" :src="item" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			list:[],
			id:0,
		}
	},
	onLoad(option) {
		this.id = option.id || 0;
		this.getList();
	},
	methods:{
		getList(){
			this.$Request.requestAll("/program_posts/getCaseDetail/",{id:this.id}).then(res=>{
				this.list = res.data;
			});
		}
	}
}
</script>

<style lang="scss">
.page{
	width: 750rpx;
	@include tpframe-padding(20rpx,20rpx,20rpx,20rpx);
}
.content{
	.photo{
		width: 710rpx;
	}
}
</style>
