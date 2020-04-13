// pages/sell/sell.js
const app = getApp()
let productService = require('../../service/product')

Page({
    data: {
        theme: app.globalData.theme,
        sell_current_page:1, //当前页
        limit:50  ,             //每页产品请求数量
        list: [],
      openid:'',
    },
  onLoad: function (options) {
        this.showLoading();
        this.onShow();
    this.setData({
      openid: options.openid
    })
    productService.getSellList(this.data.sell_current_page, this.data.limit, options.openid).then(data => {
            console.log(data);
            this.setData({
                list: data.respond
            });
            this.hideLoading();
        });

    },
  onShow: function () {
    productService.getSellList(this.data.sell_current_page, this.data.limit, this.data.openid).then(data => {
      console.log(data);
      this.setData({
        list: data.respond
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