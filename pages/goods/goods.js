// pages/goods/goods.js
const app = getApp()
let productService = require('../../service/product')

Page({
    data: {
        theme: app.globalData.theme,
        page:1, //当前页
        pageSize: 5,
        hasMoreData: true,
        limit:6,             //每页产品请求数量
        list: []
    },

    getInfo: function () {

        productService.getGoodsList(this.data.page, this.data.limit).then(data => {
            var contentlistTem = this.data.list;
            if (this.data.page == 1) {
                contentlistTem = []
            }
            var contentlist = data.respond.products;
            if (contentlist.length < this.data.pageSize) {
                this.setData({
                    list: contentlistTem.concat(contentlist),
                    hasMoreData: false
                })
            } else {
                this.setData({
                    list: contentlistTem.concat(contentlist),
                    hasMoreData: true,
                    page: this.data.page + 1
                })
            }



        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.getInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.data.page = 1;
        this.getInfo();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.hasMoreData) {
            this.getInfo();
        } else {
            wx.showToast({
                title: '没有更多数据',
            })
        }
    },

});