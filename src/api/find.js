import request from '@/utils/request'

// 面试技巧列表
export const getTechnicList = params => {
  return request({
    url: '/articles/technic',
    params
  })
}

// 面经列表
export const getArticlesShare = params => {
  return request({
    url: '/articles/share',
    params
  })
}

// 获取历年工资数据
export const chartDataHot = () => {
  return request({
    url: '/chart-data/hot',
    needToken: false
  })
}

// 面经关键字搜索
export const shareTopSearch = () => {
  return request({
    url: '/articles/shareTopSearch',
    needToken: false
  })
}
