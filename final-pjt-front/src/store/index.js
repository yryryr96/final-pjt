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
      state.popular_movies = movies
    },
    SET_TOP_RATED_MOVIE(state,movies){
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
          const movies = []
          for(let i=0;i<20;i++){
            movies.push(res.data[i])
          }
          context.commit('GET_MOVIES',movies)
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
      const top_rated_movies = [];
    
      const requests = [];
      for (let i = 1; i <= 2; i++) {
        const request = axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${i}&api_key=${process.env.VUE_APP_API_KEY}`
        });
    
        requests.push(request);
      }
    
      axios.all(requests)
        .then(axios.spread((...responses) => {
          responses.forEach((response) => {
            top_rated_movies.push(...response.data.results);
          });
    
          context.commit('SET_TOP_RATED_MOVIE', top_rated_movies);
        }))
        .catch((error) => {
          console.log(error);
        });
    },
    getPopularMovies(context) {
      const popular_movies = [];
    
      const requests = [];
      for (let i = 1; i <= 2; i++) {
        const request = axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${i}&sort_by=popularity.desc&api_key=${process.env.VUE_APP_API_KEY}`
        });
    
        requests.push(request);
      }
    
      axios.all(requests)
        .then(axios.spread((...responses) => {
          responses.forEach((response) => {
            popular_movies.push(...response.data.results);
          });
    
          context.commit('SET_POPULAR_MOVIE', popular_movies);
        }))
        .catch((error) => {
          console.log(error);
        });
    }
  },
  modules: {
  }
})
