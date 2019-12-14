// pages/cart/cart.js
const util = require('../../utils/util.js');
Page({
  /*页面跳转*/
  toSubmitOrder: function (options) {
    wx.navigateTo({ url: '../submit_order/submit_order' })
  },
  /**
   * 页面的初始数据
   */
  data: {
    selectNum: '200',
    columns: ['202', '204', '206', '208', '210'],
    result: [],
    checked: false,
    //底部导航
    active: 3,
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
      goods:[],
      totalAmount:0,
      totalCount:0,
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

  /*弹出数量*/
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  /*选项*/
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    wx.showToast({
      title: `当前值：${value}, 当前索引：${index}`,
      icon: 'none'
    });
    this.setData({ show: false });
    this.setData({ selectNum: value });
  },
  onCancel() {
    wx.showToast({
      title: `取消`,
      icon: 'none'
    });
    this.setData({ show: false });
  },

  /*复选框*/
  onSelect(event) {
    this.setData({
      result: event.detail
    });
  },
  onSelectAll(event) {
    this.setData({
      checked: event.detail,
      result: ['a'],
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var cartList = wx.getStorageSync("cartList")||[];
      this.loadGoods(cartList);
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
        return util.get(`/index/goods_info?ptypeId=${pid}`);
    },

    //计算商品
    loadGoods(cartList) {
        var totalAmount=0;
        var goods=[];
        var totalCount=0;
        cartList.map(cartItem=>{
            totalCount+=cartItem.count;
            this.setData({totalCount:totalCount});

            this.goods_info(cartItem.id).then(data=>{
                console.log("then");
                data=data.body.ent;
                goods.push({id:data.typeId,good:data,count:cartItem.count});

                totalAmount+=cartItem.count*data.PreBuyPrice1;
                this.setData({goods: goods});
                this.setData({totalAmount:totalAmount});
            });
        });

    }
})