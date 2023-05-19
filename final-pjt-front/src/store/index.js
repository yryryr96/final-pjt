import Vue from 'vue'
import Vuex from 'vuex'
import axios from'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    users : [],
    token : null,
  },
  getters: {
  },
  mutations: {
    GET_USERS(state,users){
      state.users = users
    },
    SET_TOKEN(state,token){
      state.token = token
    }
  },
  actions: {
    getUsers(context,users) {
      context.commit('GET_USERS',users)
    },
    setToken(context){
      const token = localStorage.getItem('token')
      context.commit('SET_TOKEN',token)
    },
  },
  modules: {
  }
})
