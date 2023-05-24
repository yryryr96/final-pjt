import Vue from 'vue'
import Vuex from 'vuex'
import axios from'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router/index.js'
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
    popular_movies : null,
    recommended_movies : null
  },
  getters: {
    getTopRatedMovies : state => state.top_rated_movies,
    getPopularMovies : state => state.popular_movies,
    getRecommendedMovies : state => state.recommended_movies,
  },
  mutations: {
    SET_POPULAR_MOVIE(state,movies){
      // console.log(movies)
      state.popular_movies = movies
      // location.reload()
    },
    SET_TOP_RATED_MOVIE(state,movies){
      // console.log(movies)
      state.top_rated_movies = movies
    },
    SET_RECOMMENDED_MOVIES(state,movies){
      state.recommended_movies = movies
      console.log(state.recommended_movies)
      
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
      state.recommended_movies = null
      state.user=null
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
    getRecommendedMovies(context) {
      console.log('getRecommendedMovies start')
      const recommended_movies = [];
      const user = this.state.user
      const requests = [];
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/movies/`
      }).then((res)=>{
        for (const request of res.data) {
          const genres = request.genres.map(obj => obj.id)
          for (const genre of user.like_genres) {
            if (genres.includes(genre)) {
              recommended_movies.push(request)
              break
            }
          }
        }
        console.log('getRecommendedMovies then')
        recommended_movies.sort((a, b)=> b.vote_average - a.vote_average)
        console.log(recommended_movies)

        let cnt80 = 0
        let cnt90 = 0
        let cnt00 = 0
        let cnt10 = 0
        let cnt20 = 0
        const result = []
        for (const movie of recommended_movies) {
          const year = movie.release_date.slice(0, 3)
          // console.log(year)
          if (year === '198' && cnt80 < 5) {
            result.push(movie)
            cnt80 += 1
          } else if (year === '199' && cnt90 < 5) {
            result.push(movie)
            cnt90 += 1
          } else if (year === '200' && cnt00 < 5) {
            result.push(movie)
            cnt00 += 1
          } else if (year === '201' && cnt10 < 5) {
            result.push(movie)
            cnt10 += 1
          } else if (year === '202' && cnt20 < 5) {
            result.push(movie)
            cnt20 += 1
          }
        }
        console.log(result)
        context.commit('SET_RECOMMENDED_MOVIES', result)

      }).catch((err)=>{
        console.log('getRecommendedMovies catch')
        console.log(err)
      })
    },
    logout(context){
      context.commit('LOGOUT')
    }
  },
  modules: {
  }
})
