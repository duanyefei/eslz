var config = require('../../config')
var util = require('../../utils/util.js')
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
      loginBtnTxt:"发布",
      loginBtnBgBgColor:"#ff9900",
      btnLoading:false,
      disabled:false,
    region: ['浙江省', '宁波市', '高新区'],
      type: [],
      items: [
          { name: '1', value: '认证' },
          { name: '0', value: '不认证' },
      ],
      customItem: '全部',
      title:'',
      description:'',
      name:'',
      mobile:'',
      price:'',
      secondprice:'',
      first_category_id :'',
      is_verify:'',
      serverpay:'',
    openid: '',
      upImgArr:[],
      images:[],
    _id:null,
    upFilesBtn:true,
    upFilesProgress:false,
    maxUploadLen:6,
  },
  bindRegionChange: function (e) {

    this.setData({
      region: e.detail.value
    })
  },
    bindRegionChange1: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            type: e.detail.value
        })
    },
    bindKeyTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
    bindKeyDescription: function (e) {
        this.setData({
            description: e.detail.value
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
    bindKeyPrice: function (e) {
        this.setData({
            price: e.detail.value
        })
    },
    bindKeySecondprice: function (e) {
        this.setData({
            secondprice: e.detail.value
        })
        if(this.data.is_verify==1){
            this.setData({
                serverpay:this.data.secondprice * 0.18.toFixed(2)
            })
        }
    },
    getDate:function(e){
        this.setData({
            first_category_id: e.detail.id
        })
    },
    radioChange:function(e){
      this.setData({
          is_verify:e.detail.value
      });
      if(this.data.is_verify==1){
          this.setData({
              serverpay:this.data.secondprice * 0.18.toFixed(2)
          })
      }

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'auth',
      success: function (res) {
        that.setData({
          openid: res.data,
        });
      },
    });
      this.data.items[1].checked="true"
      this.setData({
          items: this.data.items
      })
      productService.getTypeList().then(data => {
          if(data.status == true){
              for(let i=0; i<data.respond.menu.length; i++){
                  this.data.type.push({id:data.respond.menu[i].id, text:data.respond.menu[i].name});
              }
              this.setData({
                  type:this.data.type
              })
          }
      });


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
        _this.setData({
            images:_this.data.images
        })

        let postData = {
            name: this.data.title,
            description: this.data.description,
            seller_name: this.data.name,
            seller_phone: this.data.mobile,
            market_price: this.data.price,
            second_price: this.data.secondprice,
            first_category_id: this.data.first_category_id,
            is_verify: this.data.is_verify,
            server_fee: this.data.serverpay,
          openid: this.data.openid,
            images: _this.data.images
        }

      productService.fbcs(postData).then(data => {
        if (data.code == 20006) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2500,
          });
          // 等待半秒，toast消失后返回上一页
          setTimeout(function () {
            wx.navigateBack();
          }, 500);
        } else if (data.code == 202020) {
          wx.navigateTo({
            url: `/pages/payment/payment?da=` + data.data + `&openid=` + _this.data.openid + `&orderid=` + data.respond
          })
        } else {
          wx.showToast({
            title: data.message,
            duration: 2500,
          });
        }
      })


        /*wx.navigateBack({
            delta: 1
        })*/

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