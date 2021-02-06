import axios from '@/libs/api.request'
import { appid, secret } from '../../account/index'
import store from '@/store'

export const wxEnv = () => {
  return store.state.wxPersist.env
}

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
    params: {
      access_token: store.state.wxPersist.accessToken
    },
    data: {
      env: wxEnv(),
      query
    }
  })
}

// update collection doucment
export const updateDb = (query = '') => {
  return axios.request({
    method: 'POST',
    url: '/tencent/tcb/databaseupdate',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      access_token: store.state.wxPersist.accessToken
    },
    data: {
      env: wxEnv(),
      query: query.replace(/\./g, '#')
    }
  })
}
// invokeCloudFunction调用云函数
export const invokeCloudFunction = params => {
  const { name, data } = params
  return axios.request({
    method: 'post',
    url: '/tencent/tcb/invokecloudfunction',
    params: {
      access_token: store.state.wxPersist.accessToken,
      env: wxEnv(),
      name
    },
    data
  })
}
