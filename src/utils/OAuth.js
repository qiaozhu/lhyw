import config from './config';
let OAuth = {
  // 微信登录 获取临时登录凭证code
  getAuthCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          if (res.code) {
            resolve(res.code)
          }
        }
      })
    })
  },
  // 根据临时登录凭证code 获取用户信息
  async getUserInfo() {
    const authcode = await this.getAuthCode();
    return new Promise((resolve, reject) => {
      // 获取用户信息
      wx.getUserInfo({
        withCredentials: true, //请求返回敏感数据
        success: rtn => {
          resolve({ ...rtn,
            jscode: authcode
          })
        }
      })
    })
  },
  // 获取登录凭证包含其他铭感数据
  async reqLoginAll() {
    const userData = await this.getUserInfo();
    return await new Promise((resolve, reject) => {
      // 将code 和 用户数据 发送到后台
      // 后台根据Appid密匙 和 res.code换取 openId, sessionKey, unionId
      let url = '';
      if (config) {}
      wx.request({
        url: `${config.baseurl}/WXAuthor/analysis`,
        data: userData,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (response) {
          wx.setStorageSync('userInfo', response.data.data);
          wx.setStorageSync('Authentication', response.data.data.Authentication);
          resolve(response.data.data.Authentication)
        },
        fail: function (err) {
          reject(err)
        }
      })
    });
  },
  // 获取登录凭证
  async reqLogin() {
    const userData = await this.getUserInfo();
    return await new Promise((resolve, reject) => {
      // 将code 和 用户数据 发送到后台
      // 后台根据Appid密匙 和 res.code换取 openId, sessionKey, unionId
      wx.request({
        url: `${config.baseurl}/WXAuthor/getAuthentication`,
        data: userData,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (response) {
          wx.setStorageSync('Authentication', response.data.data.Authentication);
          resolve(response.data.data.Authentication)
        },
        fail: function (err) {
          reject(err)
        }
      })
    });
  },
  // 校验Authentication是否存在
  checkToken() {
    try {
      // 先读取本地 如果有直接返回 否则发送请求获取
      var udata = wx.getStorageSync('Authentication');
      if (udata) {
        return udata;
      } else {
        return this.reqLogin();
      }
    } catch (e) {
      return this.reqLogin();
    }
  }
}
export default OAuth
