const app = getApp()

Page({
  /*页面跳转*/
  toProDetails: function (options) {
    wx.navigateTo({ url: '../pro_details/pro_details' })
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [
      {
        text: '分类'
      },
      {
        text: '分类'
      },
      {
        text: '分类'
      },
      {
        text: '分类'
      },
      {
        text: '分类'
      },
      {
        text: '分类'
      },
      {
        text: '分类'
      },
      {
        text: '分类'
      },
      {
        text: '分类'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,

    //选择品牌分类
    _num: 0,
    barndName: '全部品牌',

    //选择数量
    showBrand: false,
    selectNum: '',
    columns: ['2', '4', '6', '8', '10'],
    animateShow: false,

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



  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  }
})