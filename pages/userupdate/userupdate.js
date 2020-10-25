
// 引入发送请求的方法；
import { request } from "../../request/index.js";

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischarge: false,
    isDisabled: false
    // name:'',
    // phone:'',
    // student_id:'',
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
  studentInput(e) {
    this.setData({
      student_id: e.detail.value
    })
  },


  observers: {
    'name'(data) {
      this.data.ischarge = false
      console.log("数据变动了！")
    },
    'phone'(data) {
      this.data.ischarge = false
      console.log("数据变动了！")
    }
  },

  ischargeValue(e) {
    var that = this;
    // 先判断数据是否有变化
    if (that.data.name == null || that.data.student_id == null || that.data.phone == null) {
      // 数据没变
      this.data.ischarge = false
      // console.log(this.data.ischarge)
    }

  },
  // 【逻辑思路记录】：
  // 【问题描述】：
  // 在信息修改界面，需要将数据库中，即原本数据（userInfo）中数值附值到页面中，此时界面默认有值，但若无人为操作（修改数据），其监听到的值默认为空值！
  // 【解决思路】：
  // 在submit函数中，默认为空，则将原本数据（userInfo）附值；
  submit() {
    var that = this;
    that.ischargeValue();

    if (this.data.name == '' || this.data.student_id == '' || this.data.phone == '') {
      this.data.isDisabled = false
      wx.showToast({
        title: '不可为空！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
      return
    }

    // 依次将没变化的数据赋予原本值；(小程序中 单项数据流)
    if (that.data.name == null) {
      that.data.name = that.data.userInfo.name
    }
    if (that.data.student_id == null) {
      that.data.student_id = that.data.userInfo.student_id
    }
    if (that.data.phone == null) {
      that.data.phone = that.data.userInfo.phone
    }
    // console.log(that.data);
    // console.log(that.data.userInfo);

    wx.request({
      url: app.globalData.serveHost + '/cxm/user/upsert',
      method: "POST",
      data: {
        // 传入的参数；
        // data: that.data.userInfo,
        name: that.data.name,
        student_id: that.data.student_id,   //学号
        phone: that.data.phone,    // 电话

        openid: that.data.userInfo.openid,
        nickname: that.data.userInfo.nickname,
        head_img: that.data.userInfo.head_img,
        sex: that.data.userInfo.sex,
        user_id: that.data.userInfo.user_id
      },
      success(res) {
        // console.log(res.data);
        if (res.data.code == 200) {
          // 如果数据没变
          if (that.data.ischarge) {
            that.data.ischarge = false
            wx.showToast({
              title: '请先修改数据！',
              icon: "none",   //success,loading,none
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '修改成功！',
              icon: "none",   //success,loading,none
              duration: 2000,
            })
          }
          wx.setStorage({
            data: res.data.user_id,
            key: 'user_id',
          })
          // 从新刷新 我的 tab页 
          app.globalData.Flag = true;
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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