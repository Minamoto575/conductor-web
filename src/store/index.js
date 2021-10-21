import { createStore } from 'vuex'
import Cookies from 'js-cookie'

const JSESSIONID = "JSESSIONID"

export default createStore({
  state: {
    JSESSIONID: Cookies.get(JSESSIONID) ? Cookies.get(JSESSIONID) : ""
  },
  mutations: {
  },
  actions: {
    setJSESSIONID(state,user){
      state.JSESSIONID = user.JSESSIONID
      Cookies.set(JSESSIONID,user.JSESSIONID)
    },
    getJSESSIONID(){
      return Cookies.get(JSESSIONID)
    }
  },
  modules: {
  }
})
