var util = require("../../utils/util.js");

Page({
  data:{
    loginBtnTxt:"修改",
    loginBtnBgBgColor:"#ff9900",
    btnLoading:false,
    disabled:false,
    inputUserName: '',
    inputPassword: '',
    openid: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getStorage({
      key: 'auth',
      success: function (res) {
        that.setData({
          openid: res.data,
        });
      },
    });
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  formSubmit:function(e){
    //var param = e.detail.value;
    //this.mysubmit(param);
    var that = this;
    var password = e.detail.value.password;
    var repassword = e.detail.value.repassword;
    wx.request({
      url: 'https://api.nb82.com/SecondHand/Wx/modify_pass',
      data: {
        re_new_password: repassword,
        new_password: password,
        openid: that.data.openid,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (ff) {
        console.log(ff)
        if (ff.data.status == false) {
          wx.showToast({
            title: ff.data.message,
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '修改成功',
            duration: 500
          });
          // 等待半秒，toast消失后返回上一页
          setTimeout(function () {
            wx.navigateBack();
          }, 500);
        }
      }
    })
  },
  mysubmit:function (param){
    var flag = this.checkUserName(param)&&this.checkPassword(param)
    if(flag){
        this.setLoginData1();
        this.checkUserInfo(param);
    } 
  },
  setLoginData1:function(){
    this.setData({
      loginBtnTxt:"登录中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor:"#999",
      btnLoading:!this.data.btnLoading
    });
  },
  setLoginData2:function(){
    this.setData({
      loginBtnTxt:"登录",
      disabled: !this.data.disabled,
      loginBtnBgBgColor:"#ff9900",
      btnLoading:!this.data.btnLoading
    });
  },
  checkUserName:function(param){
    var email = util.regexConfig().email; 
    var phone = util.regexConfig().phone;
    var inputUserName = param.username.trim();
    if(email.test(inputUserName)||phone.test(inputUserName)){
      return true;
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的邮箱或者手机号码'
      });
      return false;
    }
  },
  checkPassword:function(param){
    var userName = param.username.trim();
    var password = param.password.trim();
    if(password.length<=0){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入密码'
      });
      return false;
    }else{
      return true;
    }
  },
  checkUserInfo:function(param){
    var username = param.username.trim();
    var password = param.password.trim();
    var that = this;
    if((username=='admin@163.com'||username=='18500334462')&&password=='000000'){
        setTimeout(function(){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1500
          });
          that.setLoginData2();
          that.redirectTo(param);
        },2000);
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '用户名或密码有误，请重新输入'
      });
      this.setLoginData2();
    }
  },
  redirectTo:function(param){
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param='+ param//参数只能是字符串形式，不能为json对象
    })
  }

})