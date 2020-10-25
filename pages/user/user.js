
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    ischange: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../userupdate/userupdate'
    })
  },
  onLoad: function () {
    this.getUserInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    var that = this;
    var userID = wx.getStorageSync('user_id');
    if (userID != '') {
      wx.request({
        url: app.globalData.serveHost + '/cxm/user/record',
        method: "GET",
        data: {
          user_id: userID
        },
        success(res) {
          that.setData({
            userID: userID,
            userInfo: res.data.result.user_info,
            applying: res.data.result.applying,
            applyed: res.data.result.applyed,
            applyFail: res.data.result.apply_fail,
            needDispose: res.data.result.need_dispose,
            optionRoomList: res.data.result.option_room_list,
            allApplyed: res.data.result.all_applyed
          })
        }
      })
    }
  },
  
  tipsInfo: function (e) {
    wx.showToast({
      title: '功能尚未开发,敬请期待(ㄒoㄒ)',
      icon: "none",   //success,loading,none
      duration: 800,
    })
  },

  // * 生命周期函数--监听页面显示
  onShow: function () {
    if (app.globalData.Flag) {
      app.globalData.Flag = false;
      this.getUserInfo();   //调用接口获取数据
    }
  },
})


