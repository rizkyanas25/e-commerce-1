import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    _id: '',
    name: '',
    role: '',
    products: [],
    product: {},
    carts: [],
    transactions: []
  },
  mutations: {
    isLoggedIn (state) {
      if (localStorage.token) {
        state.isLogin = true,
        state.name = localStorage.name
        state.role = localStorage.role
        state._id = localStorage._id
      } else {
        state.isLogin = false
      }
    },
    setProducts (state, products) {
      state.products = products
    },
    setProduct (state, product) {
      state.product = product
    },
    setCarts (state, carts) {
      state.carts = carts
    },
    setTransactions (state, transactions) {
      state.transactions = transactions
    },
    filterProducts (state, category) {
      
      let filtered = state.products.filter(product => {
        return product.category === category
      })
      state.products = filtered
    }
  },
  actions: {
    fetchProducts (context) {
      axios.get('/products')
        .then(({data}) => {
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err.response.data.msg)
          if (err.response.data.msg === 'Session Expired') {
            Swal.fire({text: err.response.data.msg})
            localStorage.clear()
            context.commit('isLoggedIn')
          }
        })
    },
    fetchProduct (context, slug) {
      axios.get(`/products/${slug}`)
        .then(({data}) => {
          context.commit('setProduct', data)
        })
        .catch(err => {
          console.log(err.response.data.msg)
          if (err.response.data.msg === 'Session Expired') {
            Swal.fire({text: err.response.data.msg})
            localStorage.clear()
            context.commit('isLoggedIn')
          }
        })
    },
    fetchCarts (context) {
      if (localStorage.token && localStorage.role === 'customer') {
        axios.get(`/carts`,{ headers: { token: localStorage.token } })
          .then(({data}) => {
            context.commit('setCarts', data)
          })
          .catch(err => {
            console.log(err.response.data.msg)
          })
      }
    },
    fetchUserTransactions (context) {
      if (localStorage.token && localStorage.role === 'customer') {
        axios.get(`/transactions/${localStorage._id}`,{ headers: { token: localStorage.token } })
          .then(({data}) => {
            console.log(data)
            context.commit('setTransactions', data)
          })
          .catch(err => {
            console.log(err.response.data.msg)
          })
      } else if (localStorage.token && localStorage.role === 'admin') {
        axios.get(`/transactions`,{ headers: { token: localStorage.token } })
          .then(({data}) => {
            console.log(data)
            context.commit('setTransactions', data)
          })
          .catch(err => {
            console.log(err.response.data.msg)
          })
      }
    }
  }
})
