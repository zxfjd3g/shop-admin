import request from '@/utils/request'

export default {

  /* 
  获取商品SKU分页列表
  */
  getPageList(page, limit) {
    return request({
      url: `/admin/product/list/${page}/${limit}`,
      method: 'get'
    })
  },

  /* 
  保存Sku
  */
  saveSkuInfo(skuInfo) {
    return request({
      url: '/admin/product/saveSkuInfo',
      method: 'post',
      data: skuInfo
    })
  },

  /* 
  对商品上架
  */
  onSale(skuId) {
    return request({
      url: `/admin/product/onSale/${skuId}`,
      method: 'get'
    })
  },

  /* 
  对商品下架
  */
  cancelSale(skuId) {
    return request({
      url: `/admin/product/cancelSale/${skuId}`,
      method: 'get'
    })
  },

  /* 
  根据id删除一个SKU
  */
  deleteById (id) {
    return request({
      url: `/admin/product/deleteSku/${id}`,
      method: 'delete'
    })
  },

  /* 
  根据id获取SKU
  */
  getById (id) {
    return request({
      url: `/admin/product/getSkuById/${id}`,
      method: 'get'
    })
  },

  /* 
  根据id获取SKU
  */
  update (sku) {
    return request({
      url: `/admin/product/updateSkuInfo`,
      method: 'post',
      data: sku
    })
  },
}
