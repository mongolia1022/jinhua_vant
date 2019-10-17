// pages/test3/test3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.jhjksp.com/index/cat_list_one',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var arr = res.data.body.list;
        for (var i = 0, len = arr.length; i < len; i++) {
          if (arr[i].leveal=='1'){
            console.log(arr[i].FullName);//遍历输出
          }
        }
      },
      fail (err) {
        console.log('aaa')
      },
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