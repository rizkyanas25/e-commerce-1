<template>
  <div id="app">
    <Navbar/>
    <router-view style="margin-top:30px"/>
    <Foot/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foot from '@/components/Footer'
import axios from 'axios'

export default {
  components: {
    Navbar,
    Foot
  },
  created() {

    this.$store.commit('isLoggedIn')
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchProduct', this.$route.params.slug)
    this.$store.dispatch('fetchCarts')
    this.$store.dispatch('fetchUserTransactions')


  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
