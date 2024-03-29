// pages/products/products.js
Page({
  /*页面跳转*/
  toProDetails: function (options) {
    wx.navigateTo({ url: '../pro_details/pro_details' })
  },

  /**
   * 页面的初始数据
   */
  data: {
    tabActive: 0,
    show: false,
    showBrand: false,
    _num: 0,  
    barndName:'全部品牌',
    selectNum:'',
    columns: ['2', '4', '6', '8', '10'],
    animateShow:false,
    proClass: [
      { proClassName: '饼干类别' },
      { proClassName: '蛋卷类别' },
      { proClassName: '糕点类别' },
      { proClassName: '膨化类别' },
      { proClassName: '糖果类别' },
      { proClassName: '巧克力类' },
      { proClassName: '干果豆类' },
      { proClassName: '果脯蜜饯' },
      { proClassName: '海苔紫菜' },
      { proClassName: '肉脯类别' },
      { proClassName: '饮料牛奶' },
      { proClassName: '冲调饮品' },
      { proClassName: '果冻布丁' },
      { proClassName: '粉面类别' },
      { proClassName: '赠品类别' },
      { proClassName: '调味品类' },
      { proClassName: '节日礼品' },
      { proClassName: '进口酒类' },
    ],

    //底部导航
    active: 1,
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
    }
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

  /*弹出二级分类*/
  toShowBrand: function () {
　　this.setData({
    showBrand: !this.data.showBrand
　　})
  },

  /*选择二级分类*/
  clickNum: function (e) {
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    console.log(viewText)
    console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num,
      showBrand: false,
      barndName: viewText
    })
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
    /*
    wx.showToast({
      title: `当前值：${value}, 当前索引：${index}`,
      icon: 'none'
    });
    */
    this.setData({ show: false });
    this.setData({ selectNum: value });
    this.setData({ animateShow: true });
  },
  onCancel() {
    wx.showToast({
      title: `取消`,
      icon: 'none'
    });
    this.setData({ show: false });
  },
  
  /*获取产品一级分类*/
  getClassName() {
    var data = this.data;
    wx.request({
      url: 'https://www.jhjksp.com/index/cat_list_one',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var className = res.data.body.list;
        for (var i = 0, len = className.length; i < len; i++) {
          if (className[i].leveal == '1') {
            console.log(className[i].FullName);//遍历输出
            var newarray = [{
              proClassName: className[i].FullName
            }];

          }
        }
      },
      fail(err) {
        console.log('aaa')
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.getClassName()
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