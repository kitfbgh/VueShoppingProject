<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <img class="img-fluid" :src="product.imageUrl" style="border-radius:10px" />
        </div>
        <div class="col-md-6 card-body" v-if="product.title">
          <h2 class="card-title">{{product.title}}</h2>
          <hr />
          <blockquote class="blockquote mt-3">
            <p class="mb-0">{{ product.content }}</p>
            <footer class="blockquote-footer text-right">{{ product.description }}</footer>
          </blockquote>
          <hr />
          <div class="text-right h5 mb-3">
            優惠價
            <span class="text-danger h4">{{product.price | currency}}</span>
          </div>
          <select class="form-control" v-model="product.num">
            <option :value="num" v-for="(num) in 10" :key="num">{{num}} {{product.unit}}</option>
          </select>
          <div class="mt-3 text-right">
            <span class="text-secondary h6 mr-3">小計 {{product.price * product.num | currency}}</span>
            <button type="button" class="btn btn-outline-primary" @click.prevent="addToCart">
              <i class="fas fa-cart-plus"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-between mb-3">
        <div class="h4">您可能會喜歡的</div>
        <router-link to="/products" class="btn btn-outline-secondary">返回商品列表</router-link>
      </div>

      <div
        class="row"
        :class="{
          'd-none': filterProduct.length==0,
          'single-product':filterProduct.length==1,
          'multiple-product':filterProduct.length>1 && filterProduct.length <= 4,
          'more-product' : filterProduct.length>4
          }"
      >
        <div class="col-sm-6 col-md-3 mb-4" v-for="(item) in filterProduct" :key="item.id">
          <div class="card shadow-sm" style="border-radius:10px">
            <a class="pic" @click="getProduct(item.id)">
              <div
                :style="{backgroundImage :`url(${item.imageUrl})`}"
                style=" height: 150px; background-size: cover; background-position: center"
                class="pic1"
              ></div>
            </a>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
              <h5 class="card-title">{{item.title}}</h5>
            </div>
            <div class="card-footer d-flex">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm ml-auto"
                @click.prevent="getProduct(item.id)"
              >了解更多</button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="product-wrap mx-auto"
        :class="{'d-none': filterProduct.length==0,'multiple-swiper':filterProduct.length>1 && filterProduct.length<=4 , 'single-swiper':filterProduct.length==1}"
      >
        <div class="swiper-container row">
          <div class="swiper-wrapper">
            <div class="swiper-slide p-2" v-for="(item) in filterProduct" :key="item.id">
              <div class="card shadow-sm" style="border-radius:10px">
                <a class="pic" @click="getProduct(item.id)">
                  <div
                    :style="{backgroundImage :`url(${item.imageUrl})`}"
                    style=" height: 150px; background-size: cover; background-position: center"
                    class="pic1"
                  ></div>
                </a>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                  <h5 class="card-title">{{item.title}}</h5>
                </div>
                <div class="card-footer d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm ml-auto"
                    @click.prevent="getProduct(item.id)"
                  >了解更多</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button swiper-button-left fas fa-angle-double-left fa-2x"></div>
        <div class="swiper-button swiper-button-right fas fa-angle-double-right fa-2x"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";

export default {
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      observer: true,
      loop: true,
      observeParents: true,
      slidesPerView: 1,
      breakpoints: {
        540: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 4
        }
      },
      navigation: {
        nextEl: ".swiper-button-right",
        prevEl: ".swiper-button-left"
      }
    });
  },
  data() {
    return {
      isLoading: false,
      productId: "",
      product: {},
      products: []
    };
  },
  methods: {
    getProductId(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.$http.get(api).then(res => {
        vm.product = res.data.product;
        vm.product.num = 1;
        vm.isLoading = false;
      });
    },
    addToCart() {
      const vm = this;
      vm.isLoading = true;
      const productItem = {
        product_id: vm.productId,
        qty: vm.product.num
      };
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.post(api, { data: productItem }).then(res => {
        vm.$bus.$emit("upDataCart");
        vm.$bus.$emit("message:push", res.data.message, "success");
        vm.isLoading = false;
      });
    },
    getProducts() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(res => {
        vm.products = res.data.products;
      });
    },
    getProduct(id) {
      const vm = this;
      vm.$router.push(`/product/${id}`);
      vm.productId = id;
      vm.getProductId(id);
    }
  },
  computed: {
    filterProduct() {
      const vm = this;
      return vm.products.filter(item => {
        if (item.id !== vm.product.id) {
          return item.category === vm.product.category;
        }
      });
    }
  },
  created() {
    const vm = this;
    vm.productId = vm.$route.params.productId;
    vm.getProductId(vm.productId);
    vm.getProducts();
  }
};
</script>
<style lang="scss" scope>

</style>