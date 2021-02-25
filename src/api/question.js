import request from '@/utils/request'

// 模拟面试筛选条件
export const interviewFilters = () => {
  return request({
    url: '/interview/filters'
  })
}

// 获取模拟面试题接口
export const interviewQuestions = params => {
  return request({
    url: '/interview/questions',
    params,
    needToken: true
  })
}

// 提交答案
export const questionSubmit = data => {
  return request({
    url: '/questions/submit',
    method: 'POST',
    data,
    needToken: true
  })
}

// 面试题详情
export const question = id => {
  return request({
    url: `/questions/${id}`,
    needToken: true
  })
}
