// pages/roomApplyInfo/roomApplyInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false
  },

  reasonInput(e) {
    this.setData({
      reason: e.detail.value
    })
  },

  submit(){
    var that = this;
    if(that.data.reason == null){
      wx.showToast({
      title: '申请理由未填写！',
      icon: "none",   //success,loading,none
      duration: 2000,
    })
    }else if(that.data.isSubmit == false){
      wx.request({
        url: app.globalData.serveHost + '/cxm/apply/room',
        method: "POST",
        data: {
          reason: that.data.reason,
          user_id: wx.getStorageSync('user_id'),
          record_id: that.data.recordID
        },
        success(res){
          if(res.data.code==200){
            wx.showToast({
              title: '申请已提交！',
              icon: "success",   //success,loading,none
              duration: 2000,
            })
            that.setData({
              isSubmit: true
            })
            // console.log(that.data.delayDay,that.data.roomID,that.data.roomName);
            // wx.navigateTo({
            //   url: '/pages/roomDayInfo/roomDayInfo?delayDay='+that.data.delayDay+'&roomID='+that.data.roomID+'&roomName='+that.data.roomName,
            // })
          }else{
            wx.showToast({
              title: '出错了！',
              icon: "none",   //success,loading,none
              duration: 2000,
            })
          }
        }
      })
    }else if(that.data.isSubmit == true){
      wx.showToast({
        title: '您已提交！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var recordID = options.recordID;
    wx.request({
      url: app.globalData.serveHost + '/cxm/record/query',
      method: "GET",
      data: {
        record_id: recordID
      },
      success(res){
        that.setData({
          recordID: recordID,
          record: res.data.record,
          disposeBy: res.data.dispose_by,
          date: res.data.date,
          weekday: res.data.weekday,
          delayDay: options.delayDay,
          roomID: options.roomID,
          roomName: options.roomName
        })
      }
    })
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