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

// 获取面经详情
export const shareInfo = id => {
  return request({
    url: `/articles/share/${id}`,
    needToken: false
  })
}

// 获取面经详情评论列表
export const articlesComments = (id, params) => {
  return request({
    url: `/articles/comments/${id}`,
    params,
    needToken: false
  })
}

// 发表文章评论及回复评论
export const addArticlesComments = data => {
  return request({
    url: '/articles/comments',
    method: 'POST',
    data,
    needToken: true
  })
}

// 收藏文章
export const collect = data => {
  return request({
    url: '/articles/collect',
    method: 'POST',
    data,
    needToken: true
  })
}

// 点赞文章
export const star = data => {
  return request({
    url: '/articles/star',
    method: 'POST',
    data,
    needToken: true
  })
}

// 面经评论点赞
export const commentsStar = data => {
  return request({
    url: '/article-comments/star',
    method: 'POST',
    data,
    needToken: true
  })
}
