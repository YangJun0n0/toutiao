import request from '@/utils/request'
/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 所有的频道
 */
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
