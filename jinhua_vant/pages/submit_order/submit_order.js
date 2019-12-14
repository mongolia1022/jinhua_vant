// pages/submit_order/submit_order.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedInvoice: false,
    checkedWechatPay: false,
    isShowInvoice: false,
    isShowWechatPay: false,
    invoice_price:'3000元',
      goods:[],
      totalAmount:0,
      totalCount:0,
      remark:"",
      minAmount:1
  },
  onChangeInvoice({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checkedInvoice: detail });
    if (detail == true) {
      this.setData({ isShowInvoice: true });
    }
    if (detail == false) {
      this.setData({ isShowInvoice: false });
    }
  },
  onChangeWechatPay({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checkedWechatPay: detail });
    if (detail == true) {
      this.setData({ isShowWechatPay: true });
    }
    if (detail == false) {
      this.setData({ isShowWechatPay: false });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var mid=util.getMid();
      if(!mid){
          return;
      }

    console.log(options.goods)
      var cartList=JSON.parse(options.goods);
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

    },
    goods_info(pid){
        return util.get(`/index/goods_info?ptypeId=${pid}`);
    },

    submitOrder() {
        if (this.data.totalAmount < this.data.minAmount) {
            wx.showToast({
                title: `最低下单金额${this.minAmount}元`,
            });

          return;
        }

        var param = {
            btypeid:util.getMid(),
            totalmoney:this.data.totalAmount,
            comment:this.data.remark,
            totalqty:this.data.totalCount,
            goods:[]
        };

        this.data.goods.map(good=>{
            param.goods.push({
                ptypeid:good.id,
                qty:good.good.Qty,
                price:good.good.PreBuyPrice1,
                total:good.good.PreBuyPrice1*good.count
            })
        });

        util.post("/index/add_order",param).then(data => {
            if (data == '提交失败') {
                wx.showToast({
                    title: '删除失败',
                    icon: 'none',
                    duration: 1000,
                });

                return;
            }
            //清空购物车
            wx.setStorageSync("cartList",[]);

            wx.showToast({
                title: '订单创建成功',
                icon: 'success',
                complete: function () {
                    setTimeout(function() {
                        // wx.navigateTo({
                        //     url: '/pages/my_address/my_address',
                        // })

                        //todo 跳转到支付
                    }, 1000);
                }
            });
        });
    },
    onChange(e) {
        this.setData({[e.target.dataset.name]:e.detail});
    },
})