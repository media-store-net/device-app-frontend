import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerLogin from '../pages/CustomerLogin'
import CustomerView from '../pages/CustomerView'
import AdminLogin from '../pages/AdminLogin'
import Devices from '../pages/Devices'
import Files from '../pages/Files'
import User from '../pages/User'
import Logs from '../pages/Logs'

Vue.use(VueRouter)

/**
 * @description Array for the Routes
 *
 * @type {Object[]}
 */
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
    path: '/logs',
    name: 'logs',
    component: Logs
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

/**
 * @description VueRouter Instance
 *
 * @type {VueRouter}
 */
const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
