<template>
  <nav class="navbar is-light">
    <div class="navbar-brand">
      <div class="navbar-item" @click="toHome" style="cursor: pointer; font-size:40px; font-family: Plavsky !important;">
        <img class="logo" src="https://cdn.frankerfacez.com/emoticon/139615/4" alt="logo">
        Gundamku
      </div>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">

      </div>
    </div>
    
    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <a @click="toHome" :class="allClass" >
          All Products
        </a>
        <a v-if="customer" @click="toCart" :class="cartsClass" >
          My Cart
        </a>
        <a @click="toTrans" :class="transClass" >
          Transactions
        </a>
        
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" style="margin-right:20px">
          <div v-if="isLogin" class="navbar-item" style="cursor: default">
            <p style="margin-right:10px">Hello, {{name}}</p>
            <i v-if="role !== 'admin'" class="fas fa-shopping-cart"></i>
            <i v-if="role === 'admin'" class="fas fa-user-astronaut"></i>
            <i v-if="role=== 'customer' && carts.length !== 0" class="fas fa-exclamation animated infinite bounce" style="color:red; position:absolute; margin-left:200px; margin-top:-5px"></i>
          </div>
          <div class="navbar-dropdown is-boxed">

            <p v-if="role === 'customer'" style="margin-right:-10px; margin-bottom:10px">My Cart:</p>
            <hr v-if="role === 'customer'" class="navbar-divider">

            <a v-if="role === 'customer'" @click="toCart" class="navbar-item" style="display:flex; flex-direction: column; align-items:center; justify-content: center"> 
              <div v-if="carts.length === 0" style="margin-left:30px">
                <p><strong>Your cart empty</strong></p>
                <p><strong>Add some items first..</strong></p>
              </div>

              <ul v-if="carts.length !== 0" style="height:150px; overflow-y: scroll; margin-right: -60px">
                <li v-for="(cart, i) in carts" :key="i" :cart="cart" style="width:150px; text-align:left; white-space: normal !important">
                  <div style="display: flex; flex-direction: column; align-items:center; height:auto">
                    <strong> x {{cart.qty}}</strong>
                    <img :src="cart.productId.image" style="height:50%">
                    <small>{{cart.productId.name}}</small>
                  </div>
                </li> 
              </ul> 
              
                
            </a>

            <a v-if="role === 'admin'" @click="toNew" class="button is-success">Add New Product</a>

            <hr class="navbar-divider">

            <a @click="logout" class="button is-danger">
              Logout
            </a>
          </div>
        </div>
        <div v-if="isLogin === false" style="display:flex">
          <div id="register" class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-item" style="cursor: default">
              <a class="button is-warning" style="cursor: default">
                  <span class="icon">
                    <img src="https://cdn3.iconfinder.com/data/icons/gundam-glyph/48/Cartoons__Anime_Gundam_Artboard_2-128.png" alt="">
                  </span>
                  <span>
                    Register
                  </span>
                </a>
            </div>
            <div class="navbar-dropdown is-boxed" style="width:300px; margin-left:-80px">
              <div class="container" style="width:80%; margin-top:10px">
              <b-field
                  label="Name"
                  :label-position="'on-border'"
                  :type="{ 'is-danger': nameHasError }"
                  :message="[
                    { 'Name must inserted': nameEmpty },
                  ]">
                  <b-input v-model="newUser.name" placeholder=''></b-input>
              </b-field>
              <b-field
                  label="Email"
                  :label-position="'on-border'"
                  :type="{ 'is-danger': emailHasError }"
                  :message="[
                    { 'Email must inserted': emailEmpty },
                    { 'Email is not available': emailNotAvail },
                  ]">
                  <b-input v-model="newUser.email" placeholder=''></b-input>
              </b-field>
              <b-field
                  label="Password"
                  :label-position="'on-border'"
                  :type="{ 'is-danger': passwordHasError }"
                  :message="[
                    { 'Password is too short': passwordHasError },
                    { 'Password must have at least 8 characters': passwordHasError }
                  ]">
                  <b-input v-model="newUser.password" type="text" placeholder=""></b-input>
              </b-field>
                
                <a @click="register" class="button is-warning">
                  Register
                </a>
              </div>
            </div>
          </div>

          <div id="login" class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-item" style="cursor: default">
              <a class="button is-info" style="cursor: default">
                  <span class="icon">
                    <img src="https://cdn3.iconfinder.com/data/icons/gundam-glyph/48/Cartoons__Anime_Gundam_Artboard_38-128.png" alt="">
                  </span>
                  <span>
                    <span>
                      Login
                    </span>
                  </span> 
                </a>
            </div>
            <div class="navbar-dropdown is-boxed" style="width:300px; margin-left:-200px">
              <div class="container" style="width:80%; margin-top:10px">
              <b-field
                  label="Email"
                  :label-position="'on-border'"
                  :type="{ 'is-danger': emailLoginHasError }"
                  :message="[
                    { 'Insert an email': emailLoginEmpty},
                    { 'Invalid email': emailLoginInvalid }
                  ]">
                  <b-input v-model="loginUser.email" placeholder=''></b-input>
              </b-field>
              <b-field
                  label="Password"
                  :label-position="'on-border'"
                  :type="{ 'is-danger': passwordLoginHasError }"
                  :message="[
                      { 'Insert a password': passwordLoginEmpty },
                      { 'Invalid Password': passwordLoginInvalid }
                  ]">
                  <b-input v-model="loginUser.password" type="password" placeholder=""></b-input>
              </b-field>
                
                <a @click="login" class="button is-info">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
  </nav>
</template>

<script>
import axios from '@/api/axios.js'
import { mapState } from 'vuex'
import { setTimeout } from 'timers';

export default {
  name: 'Navbar',
  data() {
    return {
      nameHasError: false,
      nameEmpty: false,
      emailHasError: false,
      emailEmpty: false,
      emailNotAvail: false,
      passwordHasError: false,

      emailLoginHasError: false,
      emailLoginEmpty: false,
      emailLoginInvalid: false,

      passwordLoginHasError: false,     
      passwordLoginEmpty: false,
      passwordLoginInvalid: false, 

      loginUser: {
        email: '',
        password: ''
      },
      newUser: {
        name: '',
        email: '',
        password: ''
      },

      allClass: 'navbar-item',
      cartsClass: 'navbar-item',
      transClass: 'navbar-item',

      toast: this.$swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000
      })
    }
  },
  methods: {
    errorRegisterNameEmpty() {
      this.nameHasError = true
      this.nameEmpty = true
      setTimeout(() => {
        this.nameHasError = false
        this.nameEmpty = false
      }, 2000)
    },

    errorRegisterEmailEmpty() {
      this.emailHasError = true
      this.emailEmpty = true
      setTimeout(() => {
        this.emailHasError = false
        this.emailEmpty = false
      }, 2000)
    },

    errorRegisterPasswordEmpty() {
      this.passwordHasError = true
      setTimeout(() => {
        this.passwordHasError = false
      }, 2000)
    },

    loginFirst() {
      this.$toast.open({
        type: 'is-danger',
        message: 'You need to login first'
      })
    },

    login() {
      if (this.loginUser.email === '') {
        this.emailLoginHasError = true
        this.emailLoginEmpty = true
        setTimeout(() => {
          this.emailLoginHasError = false
          this.emailLoginEmpty = false
        }, 2000)
      }
      if (this.loginUser.password === '') {
        this.passwordLoginHasError = true
        this.passwordLoginEmpty = true
        setTimeout(() => {
          this.passwordLoginHasError = false
          this.passwordLoginEmpty = false
        }, 2000)
      }
      else {
        this.emailLoginHasError = false
        this.emailLoginEmpty = false
        this.emailLoginInvalid = false

        this.passwordLoginHasError = false     
        this.passwordLoginEmpty = false
        this.passwordLoginInvalid = false 

        axios.post('/login', {
          email: this.loginUser.email,
          password: this.loginUser.password
        })
          .then(({data}) => {
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            localStorage.setItem('role', data.role)
            localStorage.setItem('_id', data._id)
            this.$store.commit('isLoggedIn')
            this.$toast.open({
              type: 'is-success',
              message: `Welcome, ${data.name}`
            })
            this.loginUser.email = ''
            this.loginUser.password = ''
            this.$store.dispatch('fetchProducts')
            this.$store.dispatch('fetchCarts')
            this.$store.dispatch('fetchUserTrancastions')
          })
          .catch(err => {
            console.log(err.response.data.msg)
            this.$toast.open({
                message: `${err.response.data.msg}`,
                type: 'is-danger'
            })
          })
      }
    },

    register() {
      if (this.newUser.name === '') {
        this.errorRegisterNameEmpty()
      }
      if (this.newUser.email === '') {
        this.errorRegisterEmailEmpty()
        
      }
      if (this.newUser.password === '') {
        this.errorRegisterPasswordEmpty()
      }
      else if (this.newUser.name !== '' && this.newUser.email !== '' && this.newUser.password !== '') {
        console.log(this.newUser)
        this.emailHasError = false
        this.emailEmpty = false
        this.emailNotAvail = false
        this.passwordHasError = false
        axios.post('/register', {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password
        })
          .then(({data}) => {
            console.log(data)
            this.$toast.open({
              type: 'is-success',
              message: `Registered, plese login first`
            })
            this.newUser.name = ''
            this.newUser.email = ''
            this.newUser.password = ''
          })  
          .catch(err => {
            console.log(err.response.data.msg)
            this.$toast.open({
                message: `${err.response.data.msg}`,
                type: 'is-danger'
            })
          })
      }
    },

    logout() {
      this.$snackbar.open({
      duration: 3000,
      message:
        `Wanna log out ?`,
      type: "is-danger",
      position: "is-top",
      actionText: "Yes, gotta go",
      queue: false,
      onAction: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('role')
        localStorage.removeItem('_id')
        this.$store.commit('isLoggedIn')
        this.$store.commit('setTransactions', [])
        this.$router.push('/')
        this.$toast.open({
            message: `See u soon, ${this.$store.state.name}`
        })
        }
      })
    },
    
    toHome() {
      this.allClass = 'navbar-item is-active'
      this.cartsClass = 'navbar-item'
      this.transClass = 'navbar-item'
      this.$store.dispatch('fetchProducts')
      this.$router.push('/')
    },

    toCart() {
      if(this.isLogin) {
        this.allClass = 'navbar-item'
        this.cartsClass = 'navbar-item is-active'
        this.transClass = 'navbar-item'
        this.$store.dispatch('fetchCarts')
        this.$router.push('/carts')
      } else {
        this.loginFirst()
      }
    },

    toTrans() {
      if(this.isLogin) {
        this.allClass = 'navbar-item'
        this.cartsClass = 'navbar-item'
        this.transClass = 'navbar-item is-active'
        this.$store.dispatch('fetchUserTransactions')
        this.$router.push('/transactions')
      } else {
        this.loginFirst()
      }
    },

    toNew() {
      this.$router.push('/new-product')
    },

  },

  computed: {
    ...mapState(['isLogin', 'role', 'name', 'carts']),
    customer() {
      if (this.isLogin === true) {
        if (this.role === 'customer') return true
        else if (this.role === 'admin') return false
      } else if (this.isLogin === false) return true
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Plavsky'; 
  src: url('../assets/fonts/Plavsky Condensed Bold Italic.otf'); 
}

.navbar-item img.logo {
  max-width: 5rem;
  max-height: 4rem;
}
</style>
