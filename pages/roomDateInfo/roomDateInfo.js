// pages/roomDateInfo/roomDateInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  dayInfo(e){
    console.log(e);
    var delayDay = e.currentTarget.dataset.delayday;
    console.log(delayDay);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var roomID = options.roomID;
    var roomName = options.roomName;
    var that = this;
    wx.request({
      url: app.globalData.serveHost + '/cxm/tendate/list',
      method: "GET",
      success(res){
        that.setData({
          date_list : res.data.result.date_list,
          roomID: roomID,
          roomName: roomName
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