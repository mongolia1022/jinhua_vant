// pages/home/home.js
const util = require('../../utils/util.js');
Page({
  /*页面跳转*/
  toDiscount: function (options){
    wx.navigateTo({ url: '../discount/discount' })
  },

  idxEntrance: function (options) {
    wx.navigateTo({ url: '../products2/products2' })
  },

  ProDetailsActive: function (options) {
    wx.navigateTo({ url: '../pro_details_active/pro_details_active' })
  },


  /**
   * 页面的初始数据
   */
  data: {
    slider: [
      { picUrl: 'https://www.jhjksp.com/img/banner.jpg' },
      { picUrl: 'https://www.jhjksp.com/img/banner.jpg' },
      { picUrl: 'https://www.jhjksp.com/img/banner.jpg' },
    ],
    quick_entrance: [],//一级分类
    swiperCurrent: 0,
    Height: "",    //这是swiper要动态设置的高度属性
    listData: [], //倒计时
      promotion_goods:[],//促销商品
      meiritehui_goods:[],//每日特惠
      shoucang_goods:[],//收藏
      yingji_goods:[],//应季

    //底部导航
    active: 0,
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
      wx.navigateTo({ url: '../products2/products2' })
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

  //banner
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px"
    //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH//设置高度
    })
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
    this.cat_list_one();
    //type:1买赠；2.满减；3：买促；4.每日特惠；5.应季商品；6.收藏商品）
    this.get_goods(4,d=>this.setData({meiritehui_goods: d}));
      this.get_goods(3,d=>this.setData({promotion_goods: d}));
      this.get_goods(6,d=>this.setData({shoucang_goods: d}));
      this.get_goods(5,d=>this.setData({yingji_goods: d}));
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

  },

  //一级分类
  cat_list_one() {
      util.get('/index/cat_list_one?par_id=00000').then(data=>{
          var list = data.body.list.filter(item => item.leveal == 1);
          Array.from(list, c => c.icon = `${getApp().globalData.url}/img/et${c.typeId}.jpg`);
          var quick_entrance=[];
          var size=10;
          var page =parseInt(list.length / size)+(list.length%size==0?0:1);
          for(var i=1;i<=page;i++){
              quick_entrance.push(list.slice((i - 1) * size, i * size));
          }
          this.setData({quick_entrance: quick_entrance});
      });
  },

    //促销商品
    get_goods(type,fn){
        util.get('/index/get_goods_promotion?type='+type).then(data=>fn(data));
    }
})