import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'

Vue.use(Router)

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  // linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
