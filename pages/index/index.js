//index.js
//获取应用实例
const app = getApp()
let settingService = require('../../service/setting')
let productService = require('../../service/product')

Page({
  data: {
    username: '授权头像昵称',
    userimg: '/img/tx.png',
    openid: ''
  },
  getUserInfo: function (e) {
    var that = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userimg: e.detail.userInfo.avatarUrl,
      username: e.detail.userInfo.nickName,
      hasUserInfo: true
    })
  },
	    onLogoTap: function () {
				wx.navigateTo({
						url: `/pages/publish/publish`
				})
		},
        onRegistTap: function () {
			wx.navigateTo({
					url: `/pages/regist/index`
			})
		},
		onGoodsTap: function () {
			wx.navigateTo({
					url: `/pages/goods/goods`
			})
		},
        onSellerListTap: function () {
            wx.navigateTo({
              url: `/pages/sellerList/index?openid=` + this.data.openid
            })
        },
        onSetTap: function () {
			wx.navigateTo({
				url: `/pages/set/index`
			})
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

  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'username',
      success: function (res) {
        that.setData({ username: res.data });
      }
    })
    wx.getStorage({
      key: 'userimg',
      success: function (res) {
        that.setData({ userimg: res.data });
      }
    })
    wx.getStorage({
      key: 'auth',
      success: function (res) {
        console.log(res.data);
        that.setData({
          openid: res.data,
        });
        wx.request({//请求供应数据
          url: 'https://api.nb82.com/SecondHand/Wx/userinfo',
          data: {
            openid: res.data
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function (ff) {
            console.log(ff.data);
            that.setData({
              is_cart: 0,
            });
            if (ff.data.status == 1) {
            } else {
              wx.navigateTo({
                url: `/pages/regist/index`
              })
            }
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      },
    });
  },

})
