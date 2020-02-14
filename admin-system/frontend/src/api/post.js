import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/posts',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/posts/${id}`,
    method: 'delete'
  })
}
