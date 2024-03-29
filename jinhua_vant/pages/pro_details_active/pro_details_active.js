// pages/pro_details/pro_details_active.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //banner
    slider: [
      { picUrl: 'https://www.jhjksp.com/img/pro_pic.jpg' },
      { picUrl: 'https://www.jhjksp.com/img/pro_pic.jpg' },
      { picUrl: 'https://www.jhjksp.com/img/pro_pic.jpg' },
    ],
    swiperCurrent: 0,
    Height: "",    //这是swiper要动态设置的高度属性

    //倒计时
    listData: [], 

    //弹出层
    show: false,

    //选择规格
    specs: '500g*15包/箱',
    columns: ['500g*15包/箱', '600g*15包/箱', '700g*15包/箱', '800g*15包/箱', '900g*15包/箱']
  },
  /*banner*/
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px"//等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH//设置高度
    })
  },

  /*弹出层 */
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  /*选择规格*/
  onChange(event) {
    const { picker, value, index } = event.detail;
    wx.showToast({
      title: `当前值：${value}, 当前索引：${index}`,
      icon: 'none'
    });
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    wx.showToast({
      title: `当前值：${value}, 当前索引：${index}`,
      icon: 'none'
    });
    this.setData({ show: false });
    this.setData({ specs: value });

  },
  onCancel() {
    wx.showToast({
      title: `取消`,
      icon: 'none'
    });
    this.setData({ show: false });
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