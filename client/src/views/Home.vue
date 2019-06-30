<template>
  <div class="home">
    <router-view/>
    <div class="container is-fluid">
      <div class="notification columns is-multiline is-vcentered" style="overflow-y:scroll; height:550px">
          <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import {mapState} from 'vuex'
export default {
  name: "home",
  components: {
    ProductCard
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['products'])
  }
};
</script>
