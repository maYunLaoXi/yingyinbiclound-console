import { getParams } from '@/libs/util'
const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    avator: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL0msB8jbgywsOpnhwpBBiaibGriciam9qibUZpFe3zAibXcGAmMhstwOXLzcoxGHKtBkIJqCwfm66v1rzA/132'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  if (req.password !== 'yingyinbi') return
  return { token: USER_MAP[req.userName].token }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
