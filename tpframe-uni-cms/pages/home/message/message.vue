<template>
	<view class="page">
		<view class="banner"><image src="@/static/message/banner.jpg" mode="widthFix"></image></view>
		<view class="form-container">
			<form @submit="formSubmit">
				<view class="form-item">
					<text class="from-label">姓名</text>
					<view class="form-r"><input class="uni-input" name="name" placeholder="请输入姓名" /></view>
				</view>
				<view class="form-item">
					<text class="from-label">电话</text>
					<view class="form-r"><input class="uni-input" name="phone" placeholder="请输入电话" /></view>
				</view>
				<view class="form-item">
					<text class="from-label">行业</text>
					<view class="form-r">
						<picker @change="bindPickerChange" name="type" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				<view class="form-item form-item-radio">
					<text class="from-label">年限</text>
					<view class="form-r">
						<radio-group class="list-radio-container" name="year" @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd list-radio" v-for="(item, index) in years" :key="item.value">
								<view><radio :value="item.value" :checked="index === current" /></view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="form-item form-item-radio">
					<text class="from-label">功能</text>
					<view class="form-r">
						<checkbox-group class="list-radio-container" name="platform" @change="checkboxChange">
							<label class="uni-list-cell uni-list-cell-pd list-radio" v-for="item in platform" :key="item.value">
								<view><checkbox :value="item.value" :checked="item.checked" /></view>
								<view>{{item.name}}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="form-item form-item-radio">
					<text class="from-label">留言</text>
					<view class="form-r">
						<textarea name="message" class="textarea" id="" rows="10" placeholder="想说的..."></textarea> 	
					</view>
				</view>
				<button form-type="submit" type="primary" class="form-btn">提交留言</button>
			</form>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			array: ['金融', '计算机', '医疗','门户','超市','KTV'],
			index:0,
			current:0,
			years: [{
					value: '1',
					name: '一年'
				},
				{
					value: '2',
					name: '两年'
				},
				{
					value: '3',
					name: '三年'
				},
				{
					value: '4',
					name: '三年以上'
				}
			],
			platform:[
				{
						value: '1',
						name: 'H5'
					},
					{
						value: '2',
						name: '公众号'
					},
					{
						value: '3',
						name: '小程序'
					},
					{
						value: '4',
						name: 'app'
					}
			]
		}
	},
	methods:{
		formSubmit(e){
			console.log("表单数据:",e.detail.value);
			let form = e.detail.value;
			// 验证
			if(form.name.trim().length==0){
				uni.showToast({
					title:"姓名不能为空",
					icon:"none"
				});
				return false;
			}
			
			if(form.phone.trim().length==0){
				uni.showToast({
					title:"电话不正确",
					icon:"none"
				});
				return false;
			}
			
			// 后台api提交
		},
		bindPickerChange(e){
			console.log(e.detail.value);
			this.index=e.detail.value;
		},
		radioChange(e){
			console.log(e);
		},
		checkboxChange(e){
			console.log(e);
		}
	}
}
</script>

<style lang="scss">
.page{
	background-color: $tpf-bg-color-white-smoke;
}
.banner{
	width: 750rpx;
	image{
		width: 750rpx;
	}
}
.form-container{
	background-color: #FFFFFF;
	margin-top: 10rpx;
}
.form-item{
	@include tpframe-flex;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	border-bottom: 2rpx $tpf-border-color-white-smoke solid;
	.from-label{
		width: 180rpx;
		text-align: right;
		padding-right:20rpx;
	}
	.form-r{
		flex: 1;
	}
}
.list-radio{
	display: flex;
	flex-direction: row;
	margin-right:20rpx;
	margin-bottom: 20rpx;
}
.list-radio-container{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.form-item-radio{
	align-items: flex-start;
}
.textarea{
	width:540rpx;
	height:180rpx;
	padding: 10rpx;
	border:1px $tpf-border-color-white-smoke solid;
}
.form-btn{
	width: 710rpx;
	margin: 20rpx auto;
}
</style>
