// pages/submit_order/submit_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedInvoice: false,
    checkedWechatPay: false,
    isShowInvoice: false,
    isShowWechatPay: false,
    invoice_price:'3000元'
  },
  onChangeInvoice({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checkedInvoice: detail });
    if (detail == true) {
      this.setData({ isShowInvoice: true });
    }
    if (detail == false) {
      this.setData({ isShowInvoice: false });
    }
  },
  onChangeWechatPay({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checkedWechatPay: detail });
    if (detail == true) {
      this.setData({ isShowWechatPay: true });
    }
    if (detail == false) {
      this.setData({ isShowWechatPay: false });
    }
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