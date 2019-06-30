<template>
  <div class="container fluid column is-four-fifths" style="cursor: default">
    <div class="card animated fadeInUp">
      <div class="card-content">
        <div style="display: flex">
          <p class>
            <img :src="cart.productId.image" height="250px" width="250px" alt>
          </p>
          <div style="">
            <div class="notification" style="display: flex; flex-direction: column; text-align:left; justify-content:space-between; height: 250px">
              <p class>Product: <strong>{{cart.productId.name}}</strong></p>
              <p>Category: <strong>{{cart.productId.category}}</strong></p>
              <p>Price: <strong>{{cart.productId.price * cart.qty | currency}}</strong></p>
              <div style="display: flex; align-items: center; justify-content: space-between; width:100px">
              <p>Qty: <strong>{{cart.qty}}</strong></p>
              <!-- <input v-model="cart.qty" class="input is-warning" type="number"  min="1" style="width:50px"> -->
              </div>
              <br>
              <a @click="deleteCart" class="button is-danger is-outlined" style="width:100px">Delete</a>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios.js'
export default {
  props: ['cart'],
  name: "cartCard",
  data() {
    return {
      
    }
  },
  methods: {
    deleteCart() {
      this.$snackbar.open({
        duration: 3000,
        message:
          `Delete items from cart?`,
        type: "is-danger",
        position: "is-top",
        actionText: "Yes!",
        queue: false,
        onAction: () => {
          axios.delete(`/carts/${this.cart._id}`, { headers: { token: localStorage.token } })
          .then(({data}) => {
            console.log(data)
            this.$toast.open({
              type: 'is-success',
              message: `Items deleted from cart`
            })
            this.$store.dispatch('fetchCarts')
            this.$store.dispatch('fetchProducts')
            $emit('calculate')
          })
          .catch(err => {
            console.log(err.response.data)
          })  
        }
      })
    }

  }
};
</script>

<style>
</style>
