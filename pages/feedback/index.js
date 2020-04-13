var util = require("../../utils/util.js");
var upFiles = require('../../utils/upFiles.js');
let productService = require('../../service/product')
let config = require('../../config.js')

Page({
  data:{
    loginBtnTxt:"反馈",
    loginBtnBgBgColor:"#ff9900",
    btnLoading:false,
    disabled:false,
    content: '',
    openid: '',
    inputPassword: '',
    upFilesBtn:true,
    upFilesProgress:false,
    maxUploadLen:6,
    upImgArr:[],
    images:[]
  },

    bindKeyContent:function(e){
      this.setData({
          content: e.detail.value
      })
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

    subFormData: function(){
        let _this = this;
        let upImgArr = _this.data.upImgArr;
        for(let i=0; i<upImgArr.length; i++){
            wx.uploadFile({
                url: `https://api.nb82.com/SecondHand/Wx/get_img`, //里面填写你的上传图片服务器API接口的路径
                filePath: upImgArr[i].path,//要上传文件资源的路径 String类型
                name: 'src',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
                header: {
                    "Content-Type": "multipart/form-data"//记得设置
                },
                success: function(res) {
                    _this.data.images.push(JSON.parse(res.data).data)
                },

            });
        }
        console.log(_this.data.images)

        _this.setData({
            images:_this.data.images
        })

        productService.postFeedback({content: this.data.content, images: _this.data.images,openid: _this.data.openid,}).then(data => {
            if(data.code == 20006){
                wx.showToast({
                    title: '反馈成功',
                    icon: 'success',
                    duration: 2500,
                });
            }
        })


        wx.navigateBack({
            delta: 1
        })

    },




    /**
     * 页面的初始数据
     */

    // 预览图片
    previewImg: function (e) {
        let imgsrc = e.currentTarget.dataset.presrc;
        let _this = this;
        let arr = _this.data.upImgArr;
        let preArr = [];
        arr.map(function(v,i){
            preArr.push(v.path)
        })
        //   console.log(preArr)
        wx.previewImage({
            current: imgsrc,
            urls: preArr
        })
    },
    // 删除上传图片 或者视频
    delFile:function(e){
        let _this = this;
        wx.showModal({
            title: '提示',
            content: '您确认删除嘛？',
            success: function (res) {
                if (res.confirm) {
                    let delNum = e.currentTarget.dataset.index;
                    let delType = e.currentTarget.dataset.type;
                    let upImgArr = _this.data.upImgArr;
                    let upVideoArr = _this.data.upVideoArr;
                    if (delType == 'image') {
                        upImgArr.splice(delNum, 1)
                        _this.setData({
                            upImgArr: upImgArr,
                        })
                    } else if (delType == 'video') {
                        upVideoArr.splice(delNum, 1)
                        _this.setData({
                            upVideoArr: upVideoArr,
                        })
                    }
                    let upFilesArr = upFiles.getPathArr(_this);
                    if (upFilesArr.length < _this.data.maxUploadLen) {
                        _this.setData({
                            upFilesBtn: true,
                        })
                    }
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


    },
    // 选择图片或者视频
    uploadFiles: function (e) {
        var _this = this;
        wx.showActionSheet({
            itemList: ['选择图片'],
            success: function (res) {
                //   console.log(res.tapIndex)
                let xindex = res.tapIndex;
                if (xindex == 0){
                    upFiles.chooseImage(_this, _this.data.maxUploadLen)
                }

            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },









})