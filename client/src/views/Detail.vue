<template>
  <div v-if="check" class="animated slideInDown fast">
    <div class="container is-fluid" style="margin-bottom:50px">
      <div class="notification">
        <div class="card">
          <div class="card-content">
            <div style="display: flex">
              <p class>
                <img :src="product.image" height="250px" width="250px" alt />
              </p>
              <div style>
                <div
                  class="notification"
                  style="display: flex; flex-direction: column; text-align:left; justify-content:space-between; height: 250px"
                >
                  <p class>
                    Product:
                    <strong>{{product.name}}</strong>
                  </p>
                  <content
                    style="word-wrap: break-word; width:500px"
                  >Decription: {{product.description}}</content>
                  <p>
                    Category:
                    <strong>{{product.category}}</strong>
                  </p>
                  <p>
                    Price:
                    <strong>{{product.price | currency}}</strong>
                  </p>
                  <p>
                    Stock:
                    <strong>{{product.stock}}</strong>
                  </p>
                  <p>
                    Updated:
                    <strong>{{product.updatedAt | moment("from", "now")}}</strong>
                  </p>
                </div>
                <div></div>
              </div>
              <div
                style="display: flex; align-items: center; justify-content: space-around; width:300px"
              >
                <div v-if="role !== 'admin' && product.stock !== 0" style="display:flex; align-items: center">
                  <p>Qty:</p>
                  <input
                    v-model="qty"
                    class="input is-warning"
                    type="number"
                    min="1"
                    v-bind:max="max"
                    style="width:50px; margin-left:10px"
                  />
                </div>
                <br />
                <a
                  v-if="role !== 'admin' && product.stock !== 0"
                  @click="addToCart"
                  class="button is-warning"
                  style="width:100px"
                >Add To Cart</a>
                <p v-if="role !== 'admin' && product.stock === 0"><strong>Stock Empty</strong></p>
                <div
                  v-if="role === 'admin'"
                  style="display: flex; flex-direction: column; align-items: center; justify-content: space-around; height:200px"
                >
                  <a @click="update" class="button is-warning" style="width:150px">Update Product</a>
                  <a @click="deleteProduct" class="button is-danger" style="width:150px">Delete Product</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      qty: 1,
      max: 0
    };
  },
  methods: {
    addToCart() {
      if (this.$store.state.isLogin) {
        let newCart = {
          productId: this.product._id,
          qty: this.qty
        }
        axios.post('/carts', newCart, { headers: { token: localStorage.token } })
        .then(({data}) => {
          console.log(data)
          this.$toast.open({
            message: `Added to cart`,
            type: 'is-warning'
          })
          this.qty = 1
          this.$store.dispatch('fetchProduct', this.product.slug)
          this.$store.dispatch('fetchCarts')
          this.$router.push('/carts')
        })
        .catch(err => {
          console.log(err.response.data)
        })
      } else {
        const Toast = this.$swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000
        });
        this.$toast.open({
          type: "is-danger",
          message: "You need to login first"
        });
      }
    },
    update() {
      this.$router.push(`/edit-product/${this.product.slug}`);
    },
    deleteProduct() {
      this.$snackbar.open({
        duration: 3000,
        message:
          `Delete  ${this.product.name} ?`,
        type: "is-danger",
        position: "is-top",
        actionText: "Yes, delete it",
        queue: false,
        onAction: () => {
          axios
            .delete(`/products/${this.product._id}`, { headers: { token: localStorage.token } })
            .then(({ data }) => {
              console.log(data)
              this.$store.dispatch('fetchProducts')
              this.$router.push('/')
              this.$toast.open({
                message: "Product deleted",
                type: 'is-success'
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  },

  computed: {
    ...mapState(["product", "role"]),
    check() {
      this.max = this.product.stock
      return true
    }
  },

  watch: {
    "$route.params"(to, from) {
      console.log("masuk");
      axios
        .get(`/${this.$route.params.slug}`, {
          headers: { token: localStorage.token }
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
