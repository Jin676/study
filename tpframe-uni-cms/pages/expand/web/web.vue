<template>
	<web-view :src="url" :webview-styles="{progress:'#333333'}"></web-view>
</template>

<script>
export default{
	data(){
		return {
			url:""
		}
	},
	onLoad(option) {
		this.url = option.url || '';
		uni.setNavigationBarTitle({
			title:"更改标题名称"
		})
	}
}
</script>

<style lang="scss">
</style>
