import { get, put } from '../utils/request'

export function getUsers(params) {
  return get('/api/v1/admin/users', params)
}

export function deleteUser() {
  return delete '/api/v1/admin/users/'
}

export function infoUser(id) {
  return get(`/api/v1/admin/users/${id}`)
}

export function addressUser(id) {
  return get(`/api/v1/admin/addresses/${id}`)
}

export function resetPwd(id, params) {
  return put(`/api/v1/admin/users/reset_pwd/${id}`, params)
}

export function resetUser(id, params) {
  return put(`/api/v1/admin/users/${id}`, params)
}
