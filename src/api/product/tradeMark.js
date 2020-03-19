import request from '@/utils/request'

const api_name = '/admin/product/baseTrademark'

export default {

  /* 
  查找品牌完整列表
  */
  getList() {
    return request({
      url: `${api_name}/getTrademarkList`,
      method: 'get'
    })
  },

  /* 
  获取品牌分页列表
  */
  getPageList(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get'
    })
  },
  
  /* 
  获取指定ID对应的品牌
  */
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  save(tradeMark) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: tradeMark
    })
  },

  /* 
  更新品牌
  */
  updateById(tradeMark) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: tradeMark
    })
  },

  /* 
  删除品牌
  */
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  }
}
