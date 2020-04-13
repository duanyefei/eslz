// pages/goods/goods.js
const app = getApp()
let productService = require('../../service/product')

Page({
    data: {
        theme: app.globalData.theme,
        goods_current_page:0, //当前页
        limit:50  ,             //每页产品请求数量
        list: []
    },
    onLoad: function () {
        this.showLoading();
        productService.getGoodsList(this.data.goods_current_page, this.data.limit).then(data => {
            console.log(data);
            this.setData({
                list: data.respond.products
            });
            this.hideLoading();
        });
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
});