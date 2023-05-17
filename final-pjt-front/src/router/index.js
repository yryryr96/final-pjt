import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '@/views/SignUpView.vue'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/signup',
    name : 'SignUpView',
    component : SignUpView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
