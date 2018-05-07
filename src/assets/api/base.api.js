// 公用部分api

import config from '@/assets/js/config'
let api = {};
// api.uploadImg = config.uploadurl;
const baseurl = config.baseurl;
api.baseurl = baseurl;

console.log(baseurl)
/*----------公共接口----------*/

//文件上传 DELETE
api.upload = baseurl + '/common/upload';

//是否设置了支付密码
api.isSetting = baseurl + '/account/passwordIsSetting';

//查询余额 GET
api.balanceSearch = baseurl + '/company/balance';

//获得企业信息
api.company = baseurl + '/company/companyDetail';

//获取验证码 POST
api.send = baseurl + '/common/message/send';

//验证码校验 POST
api.valid = baseurl + '/common/message/valid';

//获取全部字典数据
api.getSysDictByTypeList = baseurl + '/common/getSysDictByTypeList'

// 获取指定字典数据 参数key
api.getSysDict = baseurl + '/common/getSysDict'

//关注公司
api.followCompany = baseurl + "/relationship/createFocus"

// 查询省市区数据
api.address = baseurl + '/common/address'

export default api
