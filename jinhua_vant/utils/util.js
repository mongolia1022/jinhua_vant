const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isHttpSuccess(status) {
    return status >= 200 && status < 300 || status === 304;
}

function post(url, data={},header={ 'content-type': 'application/json' }) {
    const app = getApp()
    const publicParams = {}
    const datas = Object.assign(publicParams,data)

    const promise = new Promise(function (resolve, reject, defaults) {
        console.log(`${url}-requestData:%o`,datas)
        wx.request({
            url: app.globalData.url + url,
            data: datas,
            method: "POST",
            header: header,
            success: (r) => {
                const isSuccess = isHttpSuccess(r.statusCode);
                if (isSuccess) {
                    console.log(`${url}-responseData:%o`,r.data);
                    resolve(r.data);
                } else {
                    console.log(`${url}-error:${r}`);
                    reject({
                        msg: `error:${r.statusCode}`,
                        detail: r
                    });
                }
            },
            fail: (e)=>{
                console.log(`${url}-exception:%o`,e)
                reject({
                    msg: 'exception',
                    detail: e
                });
            },
            complete: defaults,
        })
    });
    return promise;
}

function get(url,header={ 'content-type': 'application/json'}){
    const app = getApp()

    const promise = new Promise(function (resolve, reject, defaults) {
        console.log(`${url}-request`)
        wx.request({
            url: app.globalData.url + url,
            method: "GET",
            header: header,
            success: (r) => {
                const isSuccess = isHttpSuccess(r.statusCode);
                if (isSuccess) {
                    console.log(`${url}-responseData:%o`,r.data);
                    resolve(r.data);
                } else {
                    console.log(`${url}-error:%o`,r);
                    reject({
                        msg: `error:${r.statusCode}`,
                        detail: r
                    });
                }
            },
            fail: (e)=>{
                console.log(`${url}-exception:${e}`)
                reject({
                    msg: 'exception',
                    detail: e
                });
            },
            complete: defaults,
        })
    });
    return promise;
}

function gotoLogin(){
    wx.navigateTo({url: '/pages/login/login'})
}

function getMid() {
    var userInfo = wx.getStorageSync("userInfo");
    if (!userInfo) {
        gotoLogin();
        return null;
    }

    var timestamp = Date.parse(new Date());
    var expiration = wx.getStorageSync("login_expire");
    if (expiration < timestamp) {
        gotoLogin();
        return null;
    }

    var mid = userInfo.typeId;
    return mid;
}

module.exports = {
  formatTime: formatTime, post:post,get:get,getMid:getMid
}
