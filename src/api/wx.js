import axios from '@/libs/api.request'
import { appid, secret } from '../../account/index'
import store from '@/store'

const env = 'development-zgtnu'

export const getAccessToken = () => {
  return axios.request({
    method: 'get',
    url: '/tencent/cgi-bin/token',
    params: {
      grant_type: 'client_credential',
      appid,
      secret
    }
  })
}

// databaseQuery
export const databaseQuery = query => {
  if (!query) return Promise.reject(query)
  return axios.request({
    method: 'POST',
    url: '/tencent/tcb/databasequery',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      access_token: store.state.wxPersist.accessToken
    },
    data: {
      env,
      query
    }
  })
}
