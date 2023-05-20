import Vue from 'vue'
import Vuex from 'vuex'
import axios from'axios'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[
    createPersistedState()
  ],
  state: {
    users : [],
    movies : [],
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
    },
    GET_MOVIES(state,movies){
      state.movies = movies
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
    getMovies(context) {
      const token = localStorage.getItem('token')
      axios({
          method :'get',
          url : `${process.env.VUE_APP_SERVER_URL}/movies`,
          headers : {
              Authorization : `Bearer ${token}`
          }
      }).then((res)=>{
          const movies = []
          for(let i=0;i<20;i++){
            movies.push(res.data[i])
          }
          context.commit('GET_MOVIES',movies)
          console.log('good')
          // this.movies = res.data
      })
    }
  },
  modules: {
  }
})
