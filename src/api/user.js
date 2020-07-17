import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'iview-admin/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'iview-admin/get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'iview-admin/logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'iview-admin/message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'iview-admin/message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'iview-admin/message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'iview-admin/message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'iview-admin/message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'iview-admin/message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
