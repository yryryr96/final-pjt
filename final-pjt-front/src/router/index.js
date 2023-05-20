import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '@/views/ArticleView.vue'
import SignUpView from '@/views/SignUpView.vue'
import MovieView from '@/views/MovieView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path:'/articles',
    name : 'ArticleView',
    component : ArticleView
  },
  {
    path : '/signup',
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
    path : '/articles/detail/:article_id',
    name : 'ArticleDetailView',
    component : ArticleDetailView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
