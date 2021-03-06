// pages/admin/admin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFind: false
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

  roomInput(e){
    this.setData({
      roomName: e.detail.value
    })
  },

  classAdd(){
    var that = this;
    if(that.data.roomName==null){
      wx.showToast({
        title: '教室名称为空！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      wx.request({
        url: app.globalData.serveHost + '/cxm/room/add',
        method: "POST",
        data: {
          room_name: that.data.roomName
        },
        success(res){
          if(res.data.is_ok==true){
            wx.showToast({
              title: '添加成功！',
              icon: "success",   //success,loading,none
              duration: 2000,
            })
            that.flush();
          }else{
            wx.showToast({
              title: '添加失败！',
              icon: "none",   //success,loading,none
              duration: 2000,
            })
          }
        }
      })
    }
  },

  roomDel(e){
    var that = this;
    var roomID = e.currentTarget.dataset.roomid;

    wx.showModal({
      title: '确认删除？',
      content: '该操作不可逆，确认删除吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.globalData.serveHost + '/cxm/room/del',
            method: "POST",
            data: {
              room_id: roomID
            },
            success(res){
              wx.showToast({
                title: '删除成功！',
                icon: "none",   //success,loading,none
                duration: 2000,
              })
              that.flush();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  userFind(){
    var that = this;
    wx.request({
      url: app.globalData.serveHost + '/cxm/user/condition/query',
      method: "GET",
      data: {
        name: that.data.name,
        phone: that.data.phone
      },
      success(res){
        if(res.data.is_find==true){
          that.setData({
            isFind: res.data.is_find,
            userFind: res.data.user_find
          })
        }else{
          that.setData({
            isFind: false,
            userFind: null
          })
          wx.showToast({
            title: '找不到人~',
            icon: "none",   //success,loading,none
            duration: 2000,
          })
        }
      }
    })
  },

  adminAdd(){
    var that = this;
    if(that.data.isFind==false){
      wx.showToast({
        title: '请先查询~',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      wx.request({
        url: app.globalData.serveHost + '/cxm/admin/add',
        method: "POST",
        data: {
          user_id: that.data.userFind.user_id
        },
        success(res){
          if(res.data.is_ok==true){
            wx.showToast({
              title: '添加成功！',
              icon: "success",   //success,loading,none
              duration: 2000,
            })
          }else{
            wx.showToast({
              title: '添加失败！',
              icon: "none",   //success,loading,none
              duration: 2000,
            })
          }
        }
      })
    }
  },

  flush(){
    var that = this;
    var userID = wx.getStorageSync('user_id');
    if(userID != ''){
      wx.request({
        url: app.globalData.serveHost + '/cxm/user/record',
        method: "GET",
        data: {
          user_id: userID
        },
        success(res){
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

  agree(e){
    var that = this;
    var recordID = e.currentTarget.dataset.recordid;
    var userID = this.data.userID;
    wx.request({
      url: app.globalData.serveHost + '/cxm/record/agree',
      method: "POST",
      data: {
        record_id: recordID,
        user_id: userID
      },
      success(res){
        if(res.data.code == 200){
          wx.showToast({
            title: '已同意！',
            icon: "success",   //success,loading,none
            duration: 2000,
          })
        }
        that.flush();
      }
    })
  },

  disagree(e){
    var that = this;
    var recordID = e.currentTarget.dataset.recordid;
    var userID = this.data.userID;
    wx.request({
      url: app.globalData.serveHost + '/cxm/record/disagree',
      method: "POST",
      data: {
        record_id: recordID,
        user_id: userID
      },
      success(res){
        if(res.data.code == 200){
          wx.showToast({
            title: '已拒绝！',
            icon: "success",   //success,loading,none
            duration: 2000,
          })
        }
        that.flush();
      }
    })
  },

  getUserInfo(e){
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
              wx.request({
                url: app.globalData.serveHost + '/cxm/user/record',
                method: "GET",
                data: {
                  user_id: res.data.user_id
                },
                success(res){
                  that.setData({
                    userID: res.data.user_id,
                    userInfo: res.data.result.user_info,
                    applying: res.data.result.applying,
                    applyed: res.data.result.applyed,
                    applyFail: res.data.result.apply_fail,
                    needDispose: res.data.result.need_dispose,
                    allApplyed: res.data.result.all_applyed
                  })
                }
              })
            }
            else{
              var userInfo = e.detail.userInfo;
              var nickName = userInfo.nickName;
              var headImg = userInfo.avatarUrl;
              var sex = userInfo.gender;
              console.log(e.detail.userInfo);
              console.log(userInfoStr);
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
    var that = this;
    var userID = wx.getStorageSync('user_id');
    if(userID != ''){
      wx.request({
        url: app.globalData.serveHost + '/cxm/user/record',
        method: "GET",
        data: {
          user_id: userID
        },
        success(res){
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
    var userID = wx.getStorageSync('user_id');
    if(userID != ''){
      wx.request({
        url: app.globalData.serveHost + '/cxm/user/record',
        method: "GET",
        data: {
          user_id: userID
        },
        success(res){
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
    var that = this;
    var userID = wx.getStorageSync('user_id');
    if(userID != ''){
      wx.request({
        url: app.globalData.serveHost + '/cxm/user/record',
        method: "GET",
        data: {
          user_id: userID
        },
        success(res){
          that.setData({
            userID: userID,
            userInfo: res.data.result.user_info,
            applying: res.data.result.applying,
            applyed: res.data.result.applyed,
            applyFail: res.data.result.apply_fail,
            needDispose: res.data.result.need_dispose,
            allApplyed: res.data.result.all_applyed
          })
        }
      })
    }
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