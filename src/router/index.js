import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Discover from '../components/Discover.vue'
import ParkDetails from '../views/ParkDetails.vue'
import NotFound from '../views/NotFound.vue'
import Openings from '../views/Openings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/discover',
    name: 'Discover',
    component: Discover
  },
  {
    path:'/park/:code',
    name: 'ParkDetails',
    component: ParkDetails,
    props:true
  },
  {
    path:'/openings/:ID',
    name: 'OpeningsDisplay',
    component: Openings,
    props:true
  },
  // 404 path
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
