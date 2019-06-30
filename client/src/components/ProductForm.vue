<template>
  <div v-if="check" class="container is-fluid">
    <div class="notification columns" style="height:370px">
      <div class="container" style="display: flex; flex-direction:column; justify-content: center; margin-top:20px">

        <b-field label="Product Name" label-position="on-border">
          <b-input v-model="name" type="text" style="width:500px"></b-input>
        </b-field>

        <b-field label="Product Category" label-position="on-border">
          <b-select v-model="category" placeholder="Select One">
            <option
              v-for="(option, i) in options"
              :value="option"
              :key="i"
              style="width:200px;"
            >{{ option }}</option>
          </b-select>
        </b-field>

        <b-field label="Product Price" label-position="on-border" style="width:200px">
          <input v-model="price" class="input" type="number" value="1" min="1"/>
        </b-field>

        <b-field label="Product Stock" label-position="on-border" style="width:100px">
          <input v-model="stock" class="input" type="number" value="1" min="1"/>
        </b-field>
        
        <b-field label="Product Description" label-position="on-border">
          <b-input v-model="description" maxlength="200" type="textarea" style="width:500px"></b-input>
        </b-field>
      </div>

      <picture-input 
        ref="pictureInput" 
        @change="onChange" 
        width="400" 
        height="300" 
        margin="0" 
        accept="image/jpeg,image/png" 
        size="10" 
        buttonClass="btn"
        :customStrings="{
          upload: '<h1>Bummer!</h1>',
          drag: message
        }">
      </picture-input>

      <div class="container" style="width:250px; display:flex; justify-content: center; align-items: center">
        <b-button v-if="edit === false" @click="addProduct" size="is-large is-primary">Add Product</b-button>
        <b-button v-if="edit === true" @click="updateProduct" size="is-large is-primary">Update Product</b-button>

      </div>

    </div>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import axios from '@/api/axios.js'

export default {
  props: ['product'],
  components: {
    PictureInput
  },
  data() {
    return {
      options: ["SD", "HG", "RG", "MG", "PG"],
      name: "",
      description: "",
      category: "",
      image: [],
      price: 1,
      stock: 1,
      message: ''
    };
  },
  methods: {
    addProduct() {
      if (
        this.name === '' ||
        this.description === '' ||
        this.category === ''||
        this.$refs.pictureInput.file === undefined
      ) {
        this.$toast.open({
          type: 'is-danger',
          message: `Fill all fields before adding item`
        })
      } else {
        let newProduct = new FormData();
        newProduct.append('name', this.name)
        newProduct.append('description', this.description)
        newProduct.append('category', this.category)
        newProduct.append('image', this.$refs.pictureInput.file)
        newProduct.append('price', this.price)
        newProduct.append('stock', this.stock)
        axios.post('/products', newProduct, {headers: {token: localStorage.token}})
          .then(({data}) => {
            this.$store.dispatch('fetchProducts')
            this.$router.push('/')
            this.$toast.open({
              type: 'is-success',
              message: `Product added`
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    deleteDropFile(index) {
      this.image.splice(index, 1)
    },

    updateProduct() {
      if (this.product) {}
      let updateProduct = new FormData();
      updateProduct.append('name', this.name)
      updateProduct.append('description', this.description)
      updateProduct.append('category', this.category)
      if (this.$refs.pictureInput.file) updateProduct.append('image', this.$refs.pictureInput.file)
      else updateProduct.append('image', this.image)
      updateProduct.append('price', this.price)
      updateProduct.append('stock', this.stock)
      axios.patch(`/products/${this.product._id}`, updateProduct, {headers: {token: localStorage.token}})
        .then(({data}) => {
          console.log(data)
          this.$store.dispatch('fetchProducts')
          this.$router.push('/')
          this.$toast.open({
            type: 'is-success',
            message: `Product updated`
          })
        })
        .catch(err => {
          console.log(err)
        })
    },

    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  },
  computed: {
    edit() {
      if (this.product !== undefined) {
        return true
      }
      else {
        return false
      }
    },

    check() {
      if (this.product !== undefined) {
        this.name = this.product.name
        this.description = this.product.description
        this.category = this.product.category        
        this.image = this.product.image
        this.price = this.product.price
        this.stock = this.product.stock
        this.message = 'Change Product Image'
        return true
      } else {
        this.message = 'Choose Product Image'
        return true
      }
    }

  }
};
</script>

<style>
</style>
