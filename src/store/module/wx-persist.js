import { getAccessToken } from '@/api/wx'

export default {
  state: {
    accessToken: '',
    env: 'development-zgtnu'
  },
  mutations: {
    setAccessToken (state, token) {
      state.accessToken = token
    },
    setEnv (state, env) {
      state.env = env
    }
  },
  actions: {
    getAccessTokenFromApi ({ commit }) {
      getAccessToken().then(res => {
        commit('setAccessToken', res.data.access_token)
      })
    }
  }
}
