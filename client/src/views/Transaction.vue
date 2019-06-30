<template>
  <div>
    <div class="container is-fluid" style="margin-bottom:50px; height:500px; overflow-y: scroll">
      <div class="notification" style="height:auto">
        <section>
          <div v-if="transactions.length===0" style="">
              <p><strong>There isn't transaction history available</strong></p>
              <p><strong>Make a transaction first..</strong></p>
            </div>
          <TransactionCard v-for="(transaction, i) in transactions" :key="i" :transaction="transaction"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TransactionCard from '@/components/TransactionCard.vue'

export default {
  components: {
    TransactionCard
  },
  name: 'transaction',
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['transactions'])
  }
}
</script>

<style>

</style>
