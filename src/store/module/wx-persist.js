import { getAccessToken } from '@/api/wx'

export default {
  state: {
    accessToken: ''
  },
  mutations: {
    setAccessToken (state, token) {
      state.accessToken = token
    }
  },
  actions: {
    getAccessTokenFromApi ({ commit }) {
      debugger
      getAccessToken().then(res => {
        commit('setAccessToken', res.data.access_token)
      })
    }
  }
}
