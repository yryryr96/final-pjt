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
    articles : [],
    token : null,
    VUE_APP_SERVER_URL : 'http://127.0.0.1:8000',
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
    },
    GET_ARTICLES(state,articles){
      state.articles = articles
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
      console.log('getMovies token')
      console.log(token)
      axios({
          method :'get',
          url : `${this.state.VUE_APP_SERVER_URL}/movies/`,
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
      }).catch((err)=>{
        console.log('getMovies error')
      })
    },
    getArticles(context) {
      const token = localStorage.getItem('token')
      axios({
        method: 'get',
        url : `${this.state.VUE_APP_SERVER_URL}/movies/articles/`,
        headers: {
          Authorization : `Bearer ${token}`
        }
      })
      .then((res) => {
        const articles = res.data
        console.log(res.data)
        context.commit('GET_ARTICLES', articles)
        console.log('getArticles actions')
      })
    }
  },
  modules: {
  }
})
