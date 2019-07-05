<template>
  <div>
    <div v-if="calculateTotal" class="container is-fluid" style="display: flex; flex-direction: column">
      <div style="display: flex; justify-content: center; margin-top:20px">
          <div class="notification columns is-multiline is-vcentered" style="width:80%; height:400px; overflow-y: scroll">
              <div v-if="carts.length===0" style="margin-left:43%">
                <p><strong>Your cart empty</strong></p>
                <p><strong>Add some items first..</strong></p>
              </div>
              <CartCard v-for="(cart, index) in carts" :key="index" :cart="cart" v-on:calculate="reCalculate"/>
          </div>
      </div>

      <div class="container" style="width: 80%; margin-top:50px">
        <div class="notification" style="display: flex; flex-direction: column; align-items: center; justify-content:space-between; height:300px;">
          <p>Total Price: <strong>{{total | currency}}</strong></p>

          <b-field label="Phone Number" label-position="on-border">
            <b-input v-model="phoneNumber" type="text" style="width:200px"></b-input>
          </b-field>
          
          <b-field label="Delivery Location" label-position="on-border">
            <b-input v-model="delivLocation" maxlength="200" type="textarea" style="width:500px"></b-input>
          </b-field>

        </div>
        <a @click="createTransaction" class="button is-danger is-rounded" style="">Check Out</a>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from '@/components/CartCard.vue'
import { mapState } from 'vuex'
import axios from '@/api/axios.js'

export default {
  name: 'cart',
  components : {
    CartCard
  },
  data() {
    return {
      items: [],
      total: 0,
      phoneNumber: '',
      delivLocation: ''
    }
  },
  methods: {
    reCalculate() {
      let total = 0
      this.carts.forEach(cart => {
        let item = {
          name: cart.productId.name,
          price: cart.productId.price,
          image: cart.productId.image,
          qty: cart.qty
        }
        this.items.push(item)
        total += cart.productId.price * cart.qty
      })
      this.total = total
    },

    createTransaction() {
      let regex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g
      
      if (this.carts.length === 0) {
        this.$toast.open({
          message: "Cart empty, can't make transaction",
          type: 'is-danger'
        })
      } else if (this.phoneNumber === '' || this.delivLocation === '') {
        this.$toast.open({
          message: "Fill the form first",
          type: 'is-danger'
        })
      } else if (this.phoneNumber.match(regex) === null) {
        this.$toast.open({
          message: "Enter a valid phone number",
          type: 'is-danger'
        })
      } else {
        let newTransaction = {
          items: this.items,
          totalPrice: this.total,
          phoneNumber: this.phoneNumber,
          delivLocation: this.delivLocation
        }
        axios.post('/transactions', newTransaction, { headers: { token: localStorage.token } })
          .then(({data}) => {
            console.log(data)
            this.$toast.open({
              message: "Success checking out, Check your transactions",
              type: 'is-success'
            })
            this.$store.dispatch('fetchUserTransactions')
            this.$store.dispatch('fetchCarts')
            this.$router.push('/transactions')
          })
          .catch(err => {
            console.log(err.response.data)
          })
      }
    }
  },
  computed: {
    ...mapState(['carts']),
    
    calculateTotal() {
      let total = 0
      this.carts.forEach(cart => {
        let item = {
          name: cart.productId.name,
          price: cart.productId.price,
          image: cart.productId.image,
          qty: cart.qty
        }
        this.items.push(item)
        total += cart.productId.price * cart.qty
      })
      this.total = total
      console.log(this.items)
      return true
    }
  }

}
</script>

<style>

</style>
