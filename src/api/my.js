import request from '@/utils/request'

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/au/info'
  })
}

// 文件上传
export const uploadFile = file => {
  const formData = new FormData()
  formData.append('files', file)

  return request({
    url: '/upload',
    method: 'POST',
    needToken: true,
    data: formData
  })
}

export const editUserInfo = data => {
  return request({
    url: '/au/edit',
    method: 'POST',
    data
  })
}
