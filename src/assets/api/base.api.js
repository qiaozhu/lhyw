import config from '@/utils/config'
const domain = config.domain;
/*----------公共接口----------*/
export default {
  domain: domain,
  queryWXuserOpenid: domain + '/WXClass/queryWXuserOpenid',
}
