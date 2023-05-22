import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '@/views/ArticleView.vue'
import SignUpView from '@/views/SignUpView.vue'
import MovieView from '@/views/MovieView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import ArticleCreateView from '@/views/ArticleCreateView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ArticleUpdateView from '@/views/ArticleUpdateView.vue'

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
  },
  {
    path : '/articles/detail/:article_id',
    name : 'ArticleDetailView',
    component : ArticleDetailView
  },
  {
    path : '/articles/create',
    name : 'ArticleCreateView',
    component : ArticleCreateView
  },
  {
    path : '/profile/:username',
    name : 'ProfileView',
    component : ProfileView
  },
  {
    path : 'articles/update/:article_id',
    name : 'ArticleUpdateView',
    component : ArticleUpdateView
  },
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
