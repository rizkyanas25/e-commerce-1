<template>
  <ProductForm :product="product"/>
</template>

<script>
import ProductForm from '@/components/ProductForm.vue'
import {mapState} from 'vuex'

export default {
  components: {
    ProductForm
  },
  data() {
    return {
      
    };
  },
  methods: {
  },
  computed: {
    ...mapState(['product'])
  }
};
</script>

<style>
</style>
