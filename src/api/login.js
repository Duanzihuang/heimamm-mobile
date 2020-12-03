import request from '@/utils/request'

/**
 * 获取验证码
 * @param {*} data
 */
export const getAuCode = data => {
  return request({
    url: '/au/code',
    method: 'POST',
    data
  })
}

/**
 * 获取验证码
 * @param {*} data
 */
export const auLogin = data => {
  return request({
    url: '/au/login',
    method: 'POST',
    data
  })
}
