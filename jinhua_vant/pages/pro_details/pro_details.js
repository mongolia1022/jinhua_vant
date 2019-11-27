// pages/pro_details/pro_details.js
Page({
 
  toHome: function (options) {
    wx.navigateTo({ url: '../home/home' })
  },

  toCart: function (options) {
    wx.navigateTo({ url: '../cart/cart' })
  },

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

    //弹出层
    show: false,

    //选择规格
    columns: ['500g*15包/箱', '600g*15包/箱', '700g*15包/箱', '800g*15包/箱', '900g*15包/箱'],
      productData:{}
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
      this.goods_info(options.pid);
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

  },
    goods_info(pid){
        util.get(`/goods_info?ptypeId=${pid}`).then(data=>{
            var productData = data;
            this.setData({productData: productData});
        });
    }
})