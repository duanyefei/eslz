// components/SearchBar/SearchBar.js
Component({
		/**
		 * 组件的属性列表
		 */
		properties: {
				keyword: {
						type: String,
						value: ''
				},
				theme: {
						type: Object,
						value: {}
				}
		},

		/**
		 * 组件的初始数据
		 */
		data: {},

		/**
		 * 组件的方法列表
		 */
		methods: {
				onScan(e) {
						wx.scanCode({
								fail: (res) => {
										console.log(res)
										wx.showModal({
												title: '提示',
												content: '扫描失败,请重试',
												showCancel:false,
												success: function (res) {
														if (res.confirm) {
																console.log('用户点击确定')
														} else if (res.cancel) {
																console.log('用户点击取消')
														}
												}
										})
								},
								success: (res) => {
										let key = res.result;
										wx.navigateTo({
												url: `/pages/product/product?keyword=${key}`,
										})
										console.log(res.result)
								}
						})
				}
		}
})
