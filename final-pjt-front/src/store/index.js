import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const SERVER_URL = 'http://127.0.0.1:8000'
export default new Vuex.Store({
  plugins : [
    createPersistedState()
  ],
  state: {
    token : null
  },
  getters: {
  },
  mutations: {
    SIGN_UP(state,token){
      state.token = token
    }
  },
  actions: {
    signUp(context,payload){
      
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2
      console.log(username)
      console.log(password1)
      axios({
        method : 'post',
        url : `${SERVER_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res)=>{
        console.log('then')
        console.log(res)
        context.commit('SIGN_UP',res.data.key)
      }).catch((err)=>console.log(err))
    }
  },
  modules: {
  }
})
