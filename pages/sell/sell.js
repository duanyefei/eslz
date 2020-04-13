// pages/origin/origin.js
const app = getApp()
let settingService = require('../../service/setting')
let productService = require('../../service/product')

Page({
		data: {
				originList: [{'origin_id': '', 'origin_name': '全部'}],
				activeIndex: 0,
				assortmentList: [],
				// originImgs: {
				// 		'日本': '/img/country/flag@jpn.png',
				// 		'美国': '/img/country/flag@usa.png',
				// 		'澳大利亚': '/img/country/flag@aus.png'
				// },
				product_current_page: 1,
				limit: 10,
				product_total_page: 0,
				theme: app.globalData.theme,
				scrollHeight: 800
		},

		onOriginTap: function (e) {
				let index = e.currentTarget.dataset.index;
				let origin = this.data.originList[index];
				this.setData({
						activeIndex: index,
						product_current_page:1
				});
				let origin_id = origin.origin_id;
				let origin_name = origin.origin_name;
				console.log(origin_id);
				this.getAssortmentList(origin_id, origin_name)
		},

		onProductTap: function (e) {
				let index = e.currentTarget.dataset.index;
				// console.log(e.currentTarget.dataset)
				let productId = this.data.assortmentList[0].list[index].id;
				console.log(productId);
				wx.navigateTo({
						url: `/pages/detail/detail?productId=` + productId
				})
		},

		getAssortmentList: function (origin_id, origin_name) {
				this.showLoading();
				let assortmentList = this.data.assortmentList;
				productService.getListByOrigin(this.data.product_current_page, this.data.limit, origin_id).then(data => {
						assortmentList[0] = {
								assortment: origin_name,
								list: data.data.list
						};
						let product_total_page = Math.ceil(data.data.dataCount / this.data.limit);
						console.log(data);
						if (data.data.list.length === 0) {
								wx.showToast({
										title: '没有数据',
										icon: 'none',
										duration: 1000
								})
						}
						this.setData({
								product_total_page: product_total_page,
								assortmentList: assortmentList
						});
						this.hideLoading()
				});

		},

		onLoad: function (options) {
				this.showLoading();
				productService.getOriginList().then(data => {
						if (data.code === 200) {
								for (let i = 0; i < data.data.length; i++) {
										this.data.originList.push(data.data[i]);
								}
								this.setData({
										originList: this.data.originList
								});
								//首次加载获取全部列表
								this.getAssortmentList('', '全部');
								this.hideLoading();
						}
				});
				settingService.getAppTheme().then(data => {
						this.setData({
								theme: data
						})
				});
				this.computeScrollViewHeight();
		},

		//页面显示加载动画
		showLoading: function () {
				wx.showNavigationBarLoading();
				wx.showLoading({title: '加载中'});
		},

		//页面隐藏加载动画
		hideLoading: function () {
				wx.hideNavigationBarLoading();
				wx.hideLoading();
		},

		//上拉加载分页数据
		loadMoreProduct: function () {
				let page = this.data.product_current_page;
				if (page <= this.data.product_total_page) {
						page++;
						console.log(page);
						let index = this.data.activeIndex;
						let origin = this.data.originList[index];

						this.showLoading();
						let assortmentList = this.data.assortmentList;
						productService.getListByOrigin(page, this.data.limit, origin.origin_id).then(data => {
								for (let i = 0; i < data.data.list.length; i++) {
										assortmentList[0].list.push(data.data.list[i])
								}
								this.setData({
										product_current_page: page,
										assortmentList: assortmentList
								});
								this.hideLoading();
						});
				} else {
						wx.showToast({
								title: '没有更多数据~',
								icon: 'none',
								duration: 1000
						})
				}
		},

		//计算 scroll-view 的高度
		computeScrollViewHeight() {
				let _this = this;
				//获取系统信息
				wx.getSystemInfo({
						success: function (res) {
								let windowWidth = res.windowWidth;
								let windowHeight = res.windowHeight;
								//小程序滚动条必须指定高度,动态计算产品滚动条的高度（不同屏幕适配）,1px= (屏幕宽度/750) rpx
								let scrollHeight = windowHeight - ( 88*(windowWidth / 750));
								_this.setData({
										scrollHeight: scrollHeight,
								})
						}
				});
		}

});