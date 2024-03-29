// pages/edit_address/edit_address.js
var areaList = require('area.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    checked: false,
    setArea:'选择省/市/区',
    areaList: areaList.default
  },
  /*开关*/
  onChange({ detail }) { 
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  onConfirm(e) {
    console.log(e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name)
    this.setData({ show: false });
    this.setData({ setArea: e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name });
  },
  onCancel() {
    wx.showToast({
      title: `取消`,
      icon: 'none'
    });
    this.setData({ show: false });
  },
  /*弹出*/
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
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