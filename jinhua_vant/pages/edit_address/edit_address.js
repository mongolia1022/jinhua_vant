// pages/edit_address/edit_address.js
const util = require('../../utils/util.js');
var areaList = require('area.js')
Page({
    isEdit:false,
    id:null,
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    checked: false,
    setArea:'选择省/市/区',
    areaList: areaList.default,
      concatMember:"",
      phone:"",
  },
  /*开关*/
  onChange(e) {
    console.log(e.target.dataset.name)
    this.setData({[e.target.dataset.name]:e.detail});
    // // 需要手动对 checked 状态进行更新
    // this.setData({ checked: e.detail });
  },
  onConfirm(e) {
    // console.log(e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name)
    this.setData({ show: false });
    this.setData({ setArea: e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name });
  },
  onCancel() {
    wx.showToast({
      title: `取消`,
      icon: 'none'
    });
    this.setData({ show: false });
  },
  /*弹出*/
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (options.id) {
          this.user_address_info(options.id);
          this.isEdit=true;
      }
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
    //保存地址
    user_address_add: function () {
        var url = this.isEdit ? "/index/user_address_edit" : "/index/user_address_add";

        //新增
        var params = {
            btypeid: util.getMid(),
            name: this.data.concatMember,
            phone: this.data.phone,
            address: this.data.setArea + this.data.address,
            is_top: this.data.checked ? 1 : 0
        }
        if (this.isEdit) {
            params.id=this.id;
        }
        util.post(url, params, {'content-type': 'application/x-www-form-urlencoded'}).then(data => {
            if (data == '添加失败') {
                wx.showToast({
                    title: '操作失败',
                    icon: 'none',
                    duration: 2000,
                });

                return;
            }

            wx.showToast({
                title: '操作成功',
                icon: 'success',
                complete: function () {
                    setTimeout(function() {
                        wx.navigateTo({
                            url: '/pages/my_address/my_address',
                        })
                    }, 1000);
                }
            });
        });
    },

    user_address_info: function(id){
        util.get('/index/user_address_info?id='+id).then(data=>{
            this.id=data.id;
            var area=data.address.match(/.+?(省|市|自治区|自治州|县|区)/g);
            this.setData({setArea:area.join(""),address:data.address.replace(/.+?(省|市|自治区|自治州|县|区)/g,''),concatMember:data.name,phone:data.phone})
        });
    },

//删除
    user_address_del: function () {
        util.post("/index/user_address_edit?id="+this.id).then(data => {
            if (data == '删除失败') {
                wx.showToast({
                    title: '删除失败',
                    icon: 'none',
                    duration: 1000,
                });

                return;
            }

            wx.showToast({
                title: '删除成功',
                icon: 'success',
                complete: function () {
                    setTimeout(function() {
                        wx.navigateTo({
                            url: '/pages/my_address/my_address',
                        })
                    }, 1000);
                }
            });
        });
    }
})