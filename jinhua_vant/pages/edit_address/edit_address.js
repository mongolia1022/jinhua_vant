// pages/edit_address/edit_address.js
const util = require('../../utils/util.js');
var areaList = require('area.js')
Page({
    isEdit:false,
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
if(this.isEdit){
//更新

}else {
  //新增
    var params = {
        btypeid: util.getMid(),
        name: this.data.concatMember,
        phone: this.data.phone,
        address: this.data.setArea + this.data.address
    }
    util.post('/index/user_address_add', params, {'content-type': 'application/x-www-form-urlencoded'}).then(data => {
        if (data == '添加失败') {
            wx.showToast({
                title: data,
                icon: 'fail',
                duration: 1000,
                success: function () {
                    wx.redirectTo({
                        url: '/pages/my_address/my_address'
                    })
                }
            });

            return;
        }

        wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 2000,
            success: function () {
                wx.redirectTo({
                    url: '/pages/my_address/my_address'
                })
            }
        });
    });
}
    },

    user_address_info: function(id){
        util.get('/index/user_address_info?id='+id).then(data=>{
            var area=data.address.match(/.+?(省|市|自治区|自治州|县|区)/g);
            console.log(area);
            this.setData({setArea:area,address:data.address.replace(/.+?(省|市|自治区|自治州|县|区)/g,''),concatMember:data.name,phone:data.phone})
        });
    }

})