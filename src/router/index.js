import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerLogin from '../pages/CustomerLogin'
import AdminLogin from '../pages/AdminLogin'
import Devices from '../pages/Devices'
import Files from '../pages/Files'
import User from '../pages/User'
import CustomerView from '../pages/CustomerView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/customer-login'
  },
  {
    path: '/customer-login',
    name: 'customer-login',
    component: CustomerLogin
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: AdminLogin,
  },
  {
    path: '/devices',
    name: 'devices',
    component: Devices,
  },
  {
    path: '/files',
    name: 'files',
    component: Files
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/customer-view',
    name: 'customer-view',
    component: CustomerView,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
