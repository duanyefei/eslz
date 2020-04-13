const app = getApp()
var upFiles = require('../../utils/upFiles.js')
let productService = require('../../service/product')

Page({
  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },
  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '宁波市', '高新区'],
    customItem: '全部',
    name:'',
      mobile: '',
    identity:'',
    zhifubao:'',
    hold_ID_front_image:'',
    ID_front_image:'',
    addressIs:true,
    _id:null,
      upFilesBtn:true,
      upFilesBtn1:true,
      upFilesProgress:false,
      maxUploadLen:1,
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
    // 上传文件
    subFormData:function(){
        let _this = this;
        let upData = {};
        let upImgArr = _this.data.upImgArr;
        let upVideoArr = _this.data.upVideoArr;
        _this.setData({
            upFilesProgress:true,
        })
        upData['url'] = config.service.upFiles;
        upFiles.upFilesFun(_this, upData,function(res){
            if (res.index < upImgArr.length){
                upImgArr[res.index]['progress'] = res.progress

                _this.setData({
                    upImgArr: upImgArr,
                })
            }else{
                let i = res.index - upImgArr.length;
                upVideoArr[i]['progress'] = res.progress
                _this.setData({
                    upVideoArr: upVideoArr,
                })
            }
            //   console.log(res)
        }, function (arr) {
            // success
            console.log(arr)
        })
    },






  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindKeyName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
    bindKeyMobile: function (e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    bindKeyIdentity: function (e) {
    this.setData({
      identity: e.detail.value
    })
  },
    bindKeyZhifubao: function (e) {
    this.setData({
      zhifubao: e.detail.value
    })
  },

  submitFun: function () {
      let _this = this;
      let upImgArr = _this.data.upImgArr;
      console.log(upImgArr);
      wx.uploadFile({
          url: `https://api.nb82.com/SecondHand/Wx/get_img`, //里面填写你的上传图片服务器API接口的路径
          filePath: upImgArr[0].path,//要上传文件资源的路径 String类型
          name: 'src',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
          header: {
              "Content-Type": "multipart/form-data"//记得设置
          },

      });
      _this.setData({
          "hold_ID_front_image": upImgArr[0].path,
          "ID_front_image": upImgArr[0].path
      });
      console.log(this.data.mobile)
      productService.postRealname({realname: this.data.name, phone: this.data.mobile, ID_card:this.data.identity, alipay_account: this.data.zhifubao, hold_ID_front_image:this.data.hold_ID_front_image, ID_front_image:this.data.ID_front_image}).then(data => {
          console.log(data)
          // if(data.code == 20008){
              wx.navigateTo({
                  url: "/pages/set/index"
              })
          // }
      });



      wx.navigateBack({
          delta: 1
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
})