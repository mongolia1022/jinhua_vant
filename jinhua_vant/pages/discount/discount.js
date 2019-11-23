// pages/discount/discount.js
Page({

  /*页面跳转*/
  toProDetailsActive: function (options) {
    wx.navigateTo({ url: '../pro_details_active/pro_details_active' })
  },
  /**
   * 页面的初始数据
   */
  data: {
    listData: [], //倒计时
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //倒计时
    let list = [
      {
        id: 1,
        memberNickname: '列表1',
        remainTime: 86400000
      }
    ];
    this.setData({
      listData: list
    });
    this.setCountDown();
  },

  /*倒计时*/
  setCountDown: function () {
    let time = 100;
    let { listData } = this.data;
    let list = listData.map((v, i) => {
      if (v.remainTime <= 0) {
        v.remainTime = 0;
      }
      let formatTime = this.getFormat(v.remainTime);
      v.remainTime -= time;
      v.countDown = `${formatTime.hh}:${formatTime.mm}:${formatTime.ss}.${parseInt(formatTime.ms / time)}`;
      v.countDownhh = `${formatTime.hh}`;
      v.countDownmm = `${formatTime.mm}`;
      v.countDownss = `${formatTime.ss}`;
      return v;
    })
    this.setData({
      listData: list
    });
    setTimeout(this.setCountDown, time);
  },

  /**
   * 格式化时间
   */
  getFormat: function (msec) {
    let ss = parseInt(msec / 1000);
    let ms = parseInt(msec % 1000);
    let mm = 0;
    let hh = 0;
    if (ss > 60) {
      mm = parseInt(ss / 60);
      ss = parseInt(ss % 60);
      if (mm > 60) {
        hh = parseInt(mm / 60);
        mm = parseInt(mm % 60);
      }
    }
    ss = ss > 9 ? ss : `0${ss}`;
    mm = mm > 9 ? mm : `0${mm}`;
    hh = hh > 9 ? hh : `0${hh}`;
    return { ms, ss, mm, hh };
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