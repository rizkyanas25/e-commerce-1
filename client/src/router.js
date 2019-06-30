import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import Cart from './views/Cart.vue'
import Transaction from './views/Transaction.vue'
import NewProduct from './views/NewProduct.vue'
import EditProduct from './views/EditProduct.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/detail/:slug',
          component: Detail
        },
      ]
    },
    {
      path: '/carts',
      name: 'cart',
      component: Cart,
      beforeEnter: (to, from, next) => {
        if (!localStorage.token) next('/')
        else next()
      }
    },
    {
      path: '/transactions',
      name: 'transaction',
      component: Transaction,
      beforeEnter: (to, from, next) => {
        if (!localStorage.token) next('/')
        else next()
      }
    },
    {
      path: '/new-product',
      name: 'new-product',
      component: NewProduct,
      beforeEnter: (to, from, next) => {
        if (localStorage.role === 'admin') next()
        else next('/')
      }
    },
    {
      path: '/edit-product/:slug',
      name: 'edit-product',
      component: EditProduct,
      beforeEnter: (to, from, next) => {
        if (localStorage.role === 'admin') next()
        else next('/')
      }
    }
  ]
})
