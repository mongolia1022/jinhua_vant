// pages/products/products.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    tabActive: 0,
    show: false,
    selectNum:'',
    columns: ['2', '4', '6', '8', '10'],
    proClass: [
      { proClassName: '分类1' },
      { proClassName: '分类2' },
      { proClassName: '分类3' },
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
  /*tab*/
  onChange(event) {
    //底部导航
    console.log(event.detail);
    if (event.detail == 2) {
      wx.navigateTo({ url: '../test/test' })
    }
  },

  /*弹出*/
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

            data.proClass.push(i, className[i].FullName);
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