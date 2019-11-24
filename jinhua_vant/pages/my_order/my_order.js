// pages/products/products.js
Page({

  /*页面跳转*/
  toSubmitOrder: function (options) {
    wx.navigateTo({ url: '../submit_order/submit_order' })
  },

  /**
   * 页面的初始数据
   */
  data: {
    tabActive: 0,
    show: false, 
    proClass: [
      { proClassName: '全部',type:0 },
      { proClassName: '待付款',type:1 },
      { proClassName: '代收款',type:2 },
      { proClassName: '已完成',type:3 },
      { proClassName: '已取消',type:4 },
    ],

    //底部导航
    active: 2,
    nav_ico1: {
      normal: 'https://www.jhjksp.com/img/nav1.png',
      active: 'https://www.jhjksp.com/img/nav1_2.png'
    },
    nav_ico2: {
      normal: 'https://www.jhjksp.com/img/nav2.png',
      active: 'https://www.jhjksp.com/img/nav2_2.png'
    },
    nav_ico3: {
      normal: 'https://www.jhjksp.com/img/nav3.png',
      active: 'https://www.jhjksp.com/img/nav3_2.png'
    },
    nav_ico4: {
      normal: 'https://www.jhjksp.com/img/nav4.png',
      active: 'https://www.jhjksp.com/img/nav4_2.png'
    },
    nav_ico5: {
      normal: 'https://www.jhjksp.com/img/nav5.png',
      active: 'https://www.jhjksp.com/img/nav5_2.png'
    },
      ordersData:[]//订单列表
  },
  /*底部导航*/
  onChange(event) {
    console.log(event.detail);
    if (event.detail == 0) {
      wx.navigateTo({ url: '../home/home' })
    }
    if (event.detail == 1) {
      wx.navigateTo({ url: '../products/products' })
    }
    if (event.detail == 2) {
      wx.navigateTo({ url: '../my_order/my_order' })
    }
    if (event.detail == 3) {
      wx.navigateTo({ url: '../cart/cart' })
    }
    if (event.detail == 4) {
      wx.navigateTo({ url: '../mine/mine' })
    }
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.user_order_list(options.btypeid);
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

    user_order_list(btypeid,page=10){
        util.get(`/user_order_list?btypeid=${btypeid}&page=${page}`).then(data=>{
            var list = data.body.list||[];
            this.setData({ordersData: list});
        });
    }
})