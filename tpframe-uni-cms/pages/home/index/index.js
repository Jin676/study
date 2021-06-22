export default {
	data() {
		return {
			indicatorDots:true,
			autoplay:true,
			interval:3000,
			duration:400,
			navs:[],
			banner:[],
			list:[]
		}
	},
	onLoad() {
		let number = this.$Helper.random(10,100);
		this.$Request.requestAll("/program_column/getNav/").then(res=>{
			this.navs = res.data.data;
		}).catch(err=>{
			console.log("err:::",err);
		});
		
		this.getBanner();
		this.getList();
	},
	methods: {
		jumpUrl(url){
			uni.navigateTo({
				url
			});
		},
		openLayer(){
			this.$refs.bottom.open();
		},
		getBanner(){
			this.$Request.requestAll("/program_slide/getList/",{sign:"index_banner",limit:10}).then(res=>{
				this.banner = res.data.data;
			})
		},
		getList(){
			this.$Request.requestAll("/program_config/getModule/").then(res=>{
				this.list = res.data;
				console.log(res.data);
			})
		},
		tapEvent(e){
			let action={
				callMe(){
					uni.makePhoneCall({
						phoneNumber:"15555555555"
					})
				}
			}
			if(action[e]) action[e]();
		},
		navTap(obj){
			
			if(obj.bindtap && obj.bindtap.length>0){
				this.tapEvent(obj.bindtap);
			}else if(obj.to_tabbar==1){
				uni.switchTab({
					url:obj.url
				});
			}else{
				uni.navigateTo({
					url:obj.url
				})
			}
		}
	}
}