import config from './config';
let XHR = {
    async http(params = {}, loading = false) {
        if (!params.url) {
            wx.showToast({
                title: '接口路径错误',
                icon: 'error',
                duration: 2000
            });
            return
        }
        return await new Promise((resolve, reject) => {
            if (loading) {
                wx.showLoading({
                    mask: true,
                    title: '加载中'
                })
            }

            params.url = config.baseurl + params.url;
            params.timestamp = +new Date();
            wx.request({
                url: params.url,
                method: params.method || 'GET',
                data: params.data || {},
                header: {
                    'content-type': 'application/json',
                    'dataType': 'json',
                    'responseType': 'text',
                    Authentication: wx.getStorageSync('Authentication'),
                    ...params.header
                },
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
                    if (loading) {
                        wx.hideLoading();
                    }
                }
            });
        });
    }
}
export default XHR
