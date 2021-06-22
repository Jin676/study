<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			let app = this.globalData;
			app.$Helper = this.$Helper;
			app.$Request = this.$Request;
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
