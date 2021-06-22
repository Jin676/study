<template>
	<view class="page">
		<view class="tpf-list">
			<navigator :url="'/pages/cms/case/case-detail?id='+item.id" class="tpf-item" v-for="(item,index) of list" :key="index">
				<image class="thumb" :src="item.thumb" mode="widthFix"></image><text class="title">{{item.title}}</text>
			</navigator>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			list:[],
			cid:0,
		}
	},
	onLoad(option) {
		this.cid = option.cid || 0;
		this.getList();
	},
	methods:{
		getList(){
			this.$Request.requestAll("/program_posts/getList/",{category_id:this.cid,limit:10,page:1}).then(res=>{
				this.list = res.data.data;
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
.tpf-list{
	@include tpframe-flex;
}
.tpf-item{
	width: 350rpx;
	text-align: center;
	margin-bottom: 10rpx;
	.title{
		font-size:$tpf-font-size-base;
		line-height: 100%;
	}
	.thumb{
		width: 350rpx;
		display:flex
	}
}
</style>
