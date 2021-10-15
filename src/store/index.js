import { createStore } from 'vuex'

export default createStore({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
  },
  actions: {
    setToken(state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
    }
  },
  modules: {
  }
})
