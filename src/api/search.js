import request from '@/utils/request'
/**
 * 搜索建议
 * @param {*} q 搜索的关键词
 * @returns
 */
export const getSuggestionsAPI = (q) => {
  // eslint-disable-next-line no-undef
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getrResultsAPI = (page, per_page /* eslint-disable-line */, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
