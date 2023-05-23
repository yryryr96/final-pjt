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
    user : null,
    token : null,
    top_rated_movies : null,
    popular_movies : null
  },
  getters: {
    getTopRatedMovies : state => state.top_rated_movies,
    getPopularMovies : state => state.popular_movies,
  },
  mutations: {
    SET_POPULAR_MOVIE(state,movies){
      console.log(movies)
      state.popular_movies = movies
    },
    SET_TOP_RATED_MOVIE(state,movies){
      console.log(movies)
      state.top_rated_movies = movies
    },
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
    },
    SET_USER(state,Me){
      state.user = Me.user
    },
    LOGOUT(state){
      state.token = null
    }
  },
  actions: {
    setUser(context,Me){
      context.commit('SET_USER',Me)
    },
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
          url : `${process.env.VUE_APP_SERVER_URL}/movies/`,
          
      }).then((res)=>{
          context.commit('GET_MOVIES',res.data)
          console.log('good')
          // this.movies = res.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    getArticles(context) {
      const token = localStorage.getItem('token')
      axios({
        method: 'get',
        url : `${process.env.VUE_APP_SERVER_URL}/movies/articles/`,
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
      .catch((err) => {
        console.log(err)
      })
    },
    getTopRatedMovies(context) {
        axios({
          mothod : 'get',
          url : `${process.env.VUE_APP_SERVER_URL}/movies/`,
          headers : {
            Authorization : this.state.token
          }
        }).then((res)=>{
          console.log('hi')
          // console.log(res)
          const top_movies = res.data.filter(movie=>{
            return movie.vote_average >= 8.0
          })
          context.commit('SET_TOP_RATED_MOVIE',top_movies)
        })
    },
    getPopularMovies(context) {
      axios({
        method : 'get',
        url : `${process.env.VUE_APP_SERVER_URL}/movies/`,
        headers : {
          Authorization : this.state.token
        }
      }).then((res)=>{
        console.log('pop')
        // console.log(res)
        const popular_movies = res.data.filter(movie=>{
          return movie.popularity >= 400 
        })
        context.commit('SET_POPULAR_MOVIE',popular_movies)
      })
    },
    logout(context){
      context.commit('LOGOUT')
    }
  },
  modules: {
  }
})
