
Page({
	data: {
		orderid: '',
    openid:'',
    da: '',
	},
	//onLoad: function (options) {
  onLoad: function (options) {
    var that = this;
    console.log(123456); console.log(options); console.log(123456);
    that.setData({
      orderid: options.orderid,
      openid: options.openid,
      da: options.da,
    })
		/*var orderId = '1111111111111111';//options.orderId;
		var totalFee = '36';//options.totalFee;
		this.setData({
			orderId: orderId,
			totalFee: totalFee
		})*/
	},
  pay:function(){
    var that=this;
    
    console.log(that.data);
    wx.request({
      url: 'https://api.nb82.com/SecondHand/Wx/wxpay',
      data: {
        orderid: that.data.orderid,
        openid: that.data.openid,
        da: that.data.da,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
      // header: {}, // 设置请求的 header    
      success: function (res1) {
        console.log(res1);
        wx.requestPayment({
          'timeStamp': res1.data.data.timeStamp,
          'nonceStr': res1.data.data.nonceStr,
          'package': res1.data.data.package,
          'signType': 'MD5',
          'paySign': res1.data.data.paySign,
          'success': function (res) {
            console.log(res);
            wx.redirectTo({
              url: '/pages/index/index',
            })
          },
          'fail': function (res) {

          }
        })
        /*that.setData({
          fh: res1.data.datas.prepay_id
        })*/
        
      }
    });
  }
})