// pages/bindInfo/bindInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  submit(){
    var that = this;
    if(that.data.name == null){
      wx.showToast({
      title: '姓名未填写！',
      icon: "none",   //success,loading,none
      duration: 2000,
    })
    }else if(that.data.phone == null){
      wx.showToast({
        title: '电话未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      console.log(that.data.openid);
      wx.request({
        url: app.globalData.serveHost + '/cxm/user/upsert',
        method:"POST",
        data: {
          name: that.data.name,
          openid: that.data.openid,
          nickname: that.data.userInfo.nickName,
          head_img: that.data.userInfo.avatarUrl,
          sex: that.data.userInfo.gender,
          phone: that.data.phone,
          },
        success(res){
          if(res.data.code==200){
            wx.setStorage({
              data: res.data.user_id,
              key: 'user_id',
            })
            wx.navigateTo({
              url: '/pages/classroomIndex/classroomIndex'
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = JSON.parse(options.userInfo);
    var openid = options.openid;
    var isChange = options.isChange;
    this.setData({
      userInfo : userInfo,
      openid : openid,
      isChange: isChange,
      headImg: userInfo.head_img,
      imgChange: 0
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

  }
})