// pages/sell/sell.js
const app = getApp()
let productService = require('../../service/product')

Page({
    data: {
        theme: app.globalData.theme,
        _id: null,
        username: '',
        phone: '',
        adress: '',
        sellerIs:true,
        loginBtnTxt:"提交",
        loginBtnBgBgColor:"#ff9900",
        btnLoading:false,
        disabled:false,
        openid:'',
    },
    bindKeyUsername: function(e){
        this.setData({
            username: e.detail.value
        })
    },
    bindKeyPhone: function(e){
        this.setData({
            phone: e.detail.value
        })
    },
    bindKeyAddress: function(e){
        this.setData({
            address: e.detail.value
        })
    },

    submitFun: function () {
      var that=this
        if(this.data.sellerIs){
          productService.sellerAdd({ username: this.data.username, phone: this.data.phone, address: this.data.address, openid: this.data.openid}).then(data => {
                if(data.code == 20008){
                  wx.showToast({
                    title: '提交成功',
                    duration: 500
                  });
                  // 等待半秒，toast消失后返回上一页
                  setTimeout(function () {
                    wx.navigateBack();
                  }, 500);
                    /*wx.navigateTo({
                      url: "/pages/sellerList/index?openid=" + that.data.openid
                    })*/
                }
            })
        }else{
          productService.sellerEdit({ seller_id: this.data._id, username: this.data.username, phone: this.data.phone, address: this.data.address, openid: this.data.openid}).then(data =>{
                if(data.code == 20009){
                  wx.showToast({
                    title: '提交成功',
                    duration: 500
                  });
                  // 等待半秒，toast消失后返回上一页
                  setTimeout(function () {
                    wx.navigateBack();
                  }, 500);
                   /* wx.navigateTo({
                      url: "/pages/sellerList/index?openid=" + that.data.openid
                    })*/
                }
            })
        }
    },
    onLoad: function (options) {
      var that = this;
      wx.getStorage({
        key: 'auth',
        success: function (res) {
          that.setData({
            openid: res.data,
          });
        },
      });
        if(options.id){
            this.setData({
                username: options.username,
                phone: options.phone,
                address: options.address,
                _id: options.id,
                sellerIs: false,
            })
        }
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }


});