import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import order from './views/order'
import upload from './views/upload'
import routeGaurd from './routeGaurd'
import routeGaurd2 from './routeGaurd2'
import routeGaurdUp from './routeGaurdUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: routeGaurd2
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      beforeEnter: routeGaurd
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload,
      beforeEnter: routeGaurdUp
    }
  ]
})
