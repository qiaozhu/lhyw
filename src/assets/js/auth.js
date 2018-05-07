import wepy from 'wepy'
let auth = {
    // 微信登录 获取临时登录凭证code
    async getAuthCode() {
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
    // 解密用户数据
    async decryptUserInfo() {
        const userData = await this.getUserInfo();
        return new Promise((resolve, reject) => {
            // 将code 和 用户数据 发送到后台
            // 后台根据Appid密匙 和 res.code换取 openId, sessionKey, unionId
            wepy.request({
                url: '/WXAuthor/analysis',
                data: userData,
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
            }).then((response) => {
                resolve(response)
            })
        });
    }
}
export default auth
