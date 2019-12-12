// pages/my_address/my_address.js
const util = require('../../utils/util.js');
Page({

  toEditAddress: function (options) {
    wx.navigateTo({ url: '../edit_address/edit_address' })
  },
  /**
   * 页面的初始数据
   */
  data: {
      addressList:[]
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
      var mid=util.getMid();
      if(!mid){
          return;
      }

      this.user_address_list(mid);
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

  },
    user_address_list:function(mid){
        util.get('/index/user_address_list?btypeid='+mid).then(data=>{
            this.setData({addressList: data});
        });
    }
})