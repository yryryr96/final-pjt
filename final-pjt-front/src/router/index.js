import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '@/views/ArticleView.vue'
import SignUpView from '@/views/SignUpView.vue'
import MovieView from '@/views/MovieView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import LoginView from '@/views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path:'/article',
    name : 'ArticleView',
    component : ArticleView
  },
  {
    path : '/',
    name : 'SignUpView',
    component : SignUpView
  },
  {
    path : '/movies',
    name : 'MovieView',
    component : MovieView
  },
  {
    path : '/detail/:movie_id',
    name : 'MovieDetailView',
    component : MovieDetailView
  },
  {
    path: '/login',
    name : 'LoginView',
    component : LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if (to.name === from.name){
    next(false)
  } else{
    next()
  }
})

export default router
