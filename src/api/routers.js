import axios from '@/libs/api.request'

export const getRouterReq = (access) => {
  return axios.request({
    url: 'iview-admin/get_router',
    params: {
      access
    },
    method: 'get'
  })
}
