<template>
  <div class="container fluid column is-one-fifth" style="cursor: default">
    <div class="card animated bounceInUp slow" >
      <div class="card-content" style="height:300px;display:flex; flex-direction: column; justify-content: center">
        <p class>
          <img :src="product.image" style="max-height:120px">
        </p>
        <p class style="">{{product.name}}</p>
        <div style="display: flex; justify-content:space-between">
          <p>Price:</p>
          <strong>{{product.price | currency}}</strong>
        </div>
        <div style="display: flex; justify-content:space-between">
          <p>Stock:</p>
          <strong>{{product.stock}} pcs</strong>
        </div>
      </div>
        <small>Updated: {{product.updatedAt | moment("from", "now")}}</small>
      <footer class="card-footer">
        <p class="card-footer-item">
          <a @click="filter" style="text-decoration:none; color: orange">{{product.category}}</a>
        </p>
        <p class="card-footer-item">
          <a @click="openDetail" class="button is-info is-outlined">Detail</a>
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  name: "productCard",
  methods: {
    openDetail () {
      this.$store.dispatch('fetchProduct', this.product.slug)
      this.$router.push(`/detail/${this.product.slug}`)
      window.scrollTo(0,0);
    },
    filter() {
      this.$store.commit('filterProducts', this.product.category)
    }
  }
};
</script>

<style>

</style>
