<template>
  <b-message type="is-success animated fadeIn slower">
    <div style="display: flex; justify-content: space-between">
      <div>
        <p>
          Transaction ID:
          <strong>{{transaction._id}}</strong>
        </p>
        <p>Delivery Address: <strong>{{transaction.delivLocation}}</strong></p>
        <p>Recipient: <strong>{{transaction.userId.name}}</strong> </p>
        <p>Registered Number: <strong>{{transaction.phoneNumber}}</strong></p>
        <small>Ordered At: <strong>{{transaction.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</strong></small>
      </div>
      <div style="text-align: right">
        <p>Total Price: <strong>{{transaction.totalPrice | currency}}</strong></p>

        <div v-if="role === 'customer'">
          <b-button @click="update" v-if="transaction.status === 'waiting'" type="is-danger is-large">Pay</b-button>
          <b-button v-if="transaction.status === 'verify'" disabled type="is-warning is-large">Verifying</b-button>
          <b-button v-if="transaction.status === 'verified'" disabled type="is-info is-large">Being Sent</b-button>
          <b-button @click="update" v-if="transaction.status === 'sent'" type="is-success is-large">Received</b-button>
          <b-button v-if="transaction.status === 'closed'" disabled type="is-success is-large">Closed</b-button>
        </div>

        <div v-if="role === 'admin'">
          <b-button v-if="transaction.status === 'waiting'" disabled type="is-danger is-large">Payment Undone</b-button>
          <b-button @click="update" v-if="transaction.status === 'verify'" type="is-warning is-large">Verified</b-button>
          <b-button @click="update" v-if="transaction.status === 'verified'" type="is-info is-large">Send</b-button>
          <b-button v-if="transaction.status === 'sent'" disabled type="is-success is-large">On Delivery</b-button>
          <b-button v-if="transaction.status === 'closed'" disabled type="is-success is-large">Closed</b-button>

        </div>
        
      <p v-if="transaction.status === 'closed'">Closed at: <strong>{{transaction.updatedAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</strong></p>

      </div>
    </div>
    <div
      style="display:flex; align-items: flex-end; justify-content: flex-start; margin-top:20px; width:1000px; overflow-x: scroll;"
    >
      <div
        v-for="(item, i) in transaction.items"
        :key="i"
        :item="item"
        style="text-align:center; margin-right:20px"
        class="animated slideInLeft slow"
      >
        <img :src="item.image" alt srcset style="width:200px" />
        <p>
          <strong>{{item.qty}}x</strong>
          {{item.name}}
        </p>
        <p>@ {{item.price | currency}}</p>
      </div>
    </div>
  </b-message>
</template>

<script>
import {mapState} from 'vuex'
import axios from '@/api/axios.js'

export default {
  name: 'transactionCard',
  props: ['transaction'],
  data() {
    return {
      
    }
  },
  methods: {
    update() {
      if (this.role === 'customer') {
        console.log(localStorage.token)
        axios.patch(`/transactions/${this.transaction._id}`, null, { headers: { token: localStorage.token } })
          .then(({data}) => {
            console.log(data)
            this.$store.dispatch('fetchUserTransactions')
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.role === 'admin') {
        console.log(localStorage.token)
        axios.patch(`/transactions/${this.transaction._id}/admin`, null, { headers: { token: localStorage.token } })
          .then(({data}) => {
            console.log(data)
            this.$store.dispatch('fetchUserTransactions')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    ...mapState(['role'])
  }
};
</script>

<style>
</style>
