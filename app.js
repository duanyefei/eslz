//app.js
let config = require('config')

App({
    globalData: {
        userInfo: null,
        tabBar: config.tabBar,
        theme: config.defaultTheme,
        companyToken: '',
    },
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        var that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId

                if (res.code) {
                    var l = 'https://api.nb82.com/SecondHand/Wx/wxopen?code=' + res.code;
                    wx.request({
                        url: l,
                        data: {},
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function (res1) {
                            console.log(res1)
                            wx.setStorage({
                                key: 'auth',
                                data: res1.data.data.openid,
                            });
                          /*wx.getUserInfo({
                           success: function (res) {
                           console.log(111)
                           console.log(res.userInfo.nickName)
                           wx.setStorage({
                           key: 'username',
                           data: res.userInfo.nickName,
                           });
                           console.log(222)
                           console.log(res.userInfo.avatarUrl)
                           wx.setStorage({
                           key: 'userimg',
                           data: res.userInfo.avatarUrl,
                           });
                           },
                           })*/
                        }
                    });
                } else {

                }
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            wx.setStorage({
                                key: 'username',
                                data: res.userInfo.nickName,
                            });
                            console.log(222)
                            console.log(res.userInfo.avatarUrl)
                            wx.setStorage({
                                key: 'userimg',
                                data: res.userInfo.avatarUrl,
                            });
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    }
})