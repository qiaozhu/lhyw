import config from './config';
let XHR = {
  async http(opts) {
    // 默认值
    let options = {
      method: 'GET',
      loading: false,
      data: {},
      header: {}
    }
    Object.assign(options, opts);

    if (!options.url) {
      wx.showToast({
        title: '接口路径错误',
        icon: 'error',
        duration: 2000
      });
      return
    }
    return await new Promise((resolve, reject) => {
      if (options.loading) {
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
      }
      // 带上token信息和时间戳
      options.data.Authentication = wx.getStorageSync('Authentication');
      options.data.timestamp = +new Date();

      wx.request({
        url: options.url,
        method: options.method,
        data: options.data,
        header: options.header,
        success(response) {
          if (response.statusCode && response.statusCode == 200) {
            resolve(response.data);
          } else {
            wx.showToast({
              title: '服务器异常:' + response.statusCode,
              icon: 'none',
              duration: 2000
            });
            reject(response);
          }
        },
        fail(err) {
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          });
          reject(err);
        },
        complete() {
          if (options.loading) {
            wx.hideLoading();
          }
        }
      });
    });
  }
}
export default XHR
