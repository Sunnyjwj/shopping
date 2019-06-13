<<<<<<< HEAD
import { get, post, put, deleteOne } from '../utils/request'
=======
import { get, post, put, deleted } from '../utils/request'
>>>>>>> 商品分类管理

/**
 * 获取商品信息
 * @param {*} params
 */
export function getProducts(params) {
  return get('/api/v1/admin/products', params)
}

<<<<<<< HEAD
export function getInfoOfproduct(id) {
  return get(`/api/v1/admin/products/:id`)
}

export function addProduct(params) {
  return post(`/api/v1/admin/products`, params)
}

export function putProduct(id, params) {
  return put(`/api/v1/admin/products/${id}`, params)
}
export function delProduct(id) {
  return deleteOne(`/api/v1/admin/products/${id}`)
}
=======
// 删除商品信息
export function delProducts(id) {
  return deleted(`/api/v1/admin/products/${id}`)
}

// 修改商品信息
export function editProducts(id, params) {
  return put(`/api/v1/admin/products/${id}`, params)
}
// 通过id获取详情
export function getInfoOfProduct(id) {
  return get(`/api/v1/admin/products/${id}`)
}

// 新增商品信息
export function addProducts(params) {
  return post('/api/v1/admin/products', params)
}

>>>>>>> 商品分类管理
