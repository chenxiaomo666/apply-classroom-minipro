// pages/roomDayInfo/roomDayInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  applyInfo(e){
    var that = this;
    var recordID = e.currentTarget.dataset.recordid;
    wx.navigateTo({
      url: '/pages/roomApplyInfo/roomApplyInfo?recordID='+recordID+'&delayDay='+that.data.delayDay+'&roomID='+that.data.roomID+'&roomName='+that.data.roomName,
    })
  },

  flush(){
    var that = this;
    wx.request({
      url: app.globalData.serveHost + '/cxm/room/daily',
      method: "GET",
      data: {
        delay_day: that.data.delayDay,
        room_id: that.data.roomID,
        room_name: that.data.roomName
      },
      success(res){
        // console.log(res.data);
        that.setData({
          delayDay: that.data.delayDay,
          roomID: that.data.roomID,
          roomName: that.data.roomName,
          date: res.data.result.date,
          weekday: res.data.result.weekday,
          record_list: res.data.result.record_list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var delayDay = options.delayDay;
    var roomID = options.roomID;
    var roomName = options.roomName;
    wx.request({
      url: app.globalData.serveHost + '/cxm/room/daily',
      method: "GET",
      data: {
        delay_day: delayDay,
        room_id: roomID,
        room_name: roomName
      },
      success(res){
        // console.log(res.data);
        that.setData({
          delayDay: delayDay,
          roomID: roomID,
          roomName: roomName,
          date: res.data.result.date,
          weekday: res.data.result.weekday,
          record_list: res.data.result.record_list
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
    var that = this;
    if(that.data.delayDay != null){
      that.flush();
    }
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