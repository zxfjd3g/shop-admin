/* 
平台属性与品牌属性的接口请求函数
*/
import request from '@/utils/request'

export default {

  /* 
  根据分类id获取属性列表
  */
  getAttrInfoList(category1Id, category2Id, category3Id) {
    return request({
      url: '/admin/product/attrInfoList/' + category1Id + '/' + category2Id + '/' + category3Id,
      method: 'get'
    })
  },

  /* 
  根据属性id获取属性值列表
  */
  getAttrValueList(attrId) {
    return request({
      url: '/admin/product/getAttrValueList/' + attrId,
      method: 'get'
    })
  },

  /* 
  保存属性
  */
  saveAttrInfo(attrInfo) {
    return request({
      url: '/admin/product/saveAttrInfo',
      method: 'post',
      data: attrInfo
    })
  }
}
