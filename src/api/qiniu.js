import axios from '@/libs/api.request'

const qiniu = '/ying/qiniu'

export const getUptoken = () => {
  return axios.request({
    method: 'get',
    url: qiniu + '/upToken'
  })
}
export const getList = async (params = {}) => {
  const { data } = await getUptoken()
  return axios.request({
    method: 'get',
    headers: {
      Authorization: 'Qiniu ' + data,
      'Content-Type': 'application/x-www-form-urlencoded',
      host: 'rsf.qbox.me',
      'Accept-Encoding': 'gzip'
    },
    url: '/pqiniu/list',
    params
  })
}
// 获取指定前缀的文件列表
export const getListPrefix = (params) => {
  return axios.request({
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: qiniu + '/listPrefix',
    params
  })
}
// 删除空间中的文件
export const qiniuDelete = key => {
  return axios.request({
    method: 'get',
    url: qiniu + '/delete',
    params: { key }
  })
}

// 获取文件信息
export const qiniuStat = key => {
  return axios.request({
    method: 'get',
    url: qiniu + '/stat',
    params: { key }
  })
}
