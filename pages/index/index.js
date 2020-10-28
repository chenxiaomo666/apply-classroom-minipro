//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserInfo(e){
    // console.log(e.detail.userInfo);
    var that = this;
    wx.login({
      success(res) {
        var code = res.code;
        wx.request({
          url: app.globalData.serveHost + '/cxm/user/query',
          data: {
            js_code: code,
            grant_type: "authorization_code"
          },
          method: "GET",
          success(res) {
            console.log(res.data)

            var isBind = res.data.is_bind;
            if(isBind){
              wx.setStorage({
                data: res.data.user_id,
                key: 'user_id',
              })
              wx.navigateTo({
                url: '/pages/classroomIndex/classroomIndex'
              })
            }
            else{
              var userInfo = e.detail.userInfo;
              var nickName = userInfo.nickName;
              var headImg = userInfo.avatarUrl;
              var sex = userInfo.gender;
              wx.navigateTo({
                url: '/pages/bindInfo/bindInfo?nickName='+nickName+'&openid='+res.data.open_id+'&headImg='+headImg+'&sex='+sex, // 进去绑定信息页面
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserInfo();
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
    // this.getUserInfo();
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