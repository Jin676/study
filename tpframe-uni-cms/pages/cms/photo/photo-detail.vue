<template>
	<view class="page">
		<view class="tpf-list">
			<view class="tpf-item" v-for="(item,index) of list" :key="index" @tap="previewImage(index)"><image class="thumb" :src="item.thumb" mode="widthFix"></image><text class="title">{{item.desc}}</text></view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			list:[],
			id:0,
			photos:[]
		}
	},
	onLoad(option) {
		this.id = option.id || 0;
		this.getList();
	},
	methods:{
		getList(){
			this.$Request.requestAll("/program_posts/getDetail/",{id:this.id}).then(res=>{
				this.list = res.data[0].posts_images;
				this.list.forEach(item=>{
					this.photos.push(item.url);
				})
				console.log(this.photos);
			});
		},
		previewImage(index){
			uni.previewImage({
				urls:this.photos,
				current:index
			})
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
