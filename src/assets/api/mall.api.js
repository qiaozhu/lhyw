import baseapi from './base.api'
export default {
  ...baseapi,
  selectCarGroup: baseapi.domain + '/Group/selectCarGroup'
}
