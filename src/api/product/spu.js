import request from '@/utils/request'

const api_name = '/admin/product'

export default {

  /* 
  获取商品SPU分页列表
  */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },

  /* 
  根据三级分类id获取属性列表
  */
  getSpuList(category3Id) {
    return request({
      url: `${api_name}/spuList/${category3Id}`,
      method: 'get'
    })
  },

  /* 
  保存SPU
  */
  saveSpuInfo(spuInfo) {
    return request({
      url: `${api_name}/saveSpuInfo`,
      method: 'post',
      data: spuInfo
    })
  },

  /* 
  获取基本销售属性列表
  */
  getBaseSaleAttrList() {
    return request({
      url: `${api_name}/baseSaleAttrList`,
      method: 'get'
    })
  },

  /* 
  根据spuId获取销售属性列表
  */
  getSpuSaleAttrList(spuId) {
    return request({
      url: `${api_name}/spuSaleAttrList/${spuId}`,
      method: 'get'
    })
  },

  /* 
  根据spuId获取图片列表
  */
  getSpuImageList(spuId) {
    return request({
      url: `${api_name}/spuImageList/${spuId}`,
      method: 'get'
    })
  },
  /* 
  根据spuId获取图片列表
  */
  deleteById(spuId) {
    return request({
      url: `${api_name}/deleteSku/${spuId}`,
      method: 'delete'
    })
  }
}
