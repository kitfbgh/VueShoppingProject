<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <banner></banner>
    <section class="container mt-4 text-center">
      <h3>客人總是在詢問</h3>
      <h3>這麼好吃的秘訣是什麼</h3>
      <div class="row mt-4">
        <div class="col-md-4 d-flex align-items-center flex-column">
          <div class="box box-1 mb-4"></div>
          <h3>優良原料</h3>
          <p>
            我們堅持的是原物料的品質
            <br />嚴選雞蛋配上傳統麵粉
            <br />保持一貫的好味道
          </p>
        </div>
        <div class="col-md-4 d-flex align-items-center flex-column">
          <div class="box box-2 mb-4"></div>
          <h3>手工現做</h3>
          <p>
            我們的餅乾是經由甜點師傅
            <br />每天新鮮現做
            <br />保證一定的品質
          </p>
        </div>
        <div class="col-md-4 d-flex align-items-center flex-column">
          <div class="box box-3 mb-4"></div>
          <h3>新奇創意</h3>
          <p>
            有別於一般的餅乾
            <br />我們發揮更多的創意於餅乾的調味
            <br />創造出味蕾的饗宴
          </p>
        </div>
      </div>
    </section>
    <section class="container mt-4">
      <div class="product-wrap mx-auto">
        <div class="swiper-container swiper-product row">
          <div class="swiper-wrapper">
            <div class="swiper-slide p-2" v-for="(item) in products" :key="item.id">
              <div class="card shadow-sm" style="border-radius:10px">
                <!-- <router-link :to="{path : `/product/${item.id}` }" class="pic">
                  <div
                    :style="{backgroundImage :`url(${item.imageUrl})`}"
                    style=" height: 150px; background-size: cover; background-position: center"
                    class="pic1"
                  ></div>
                </router-link>-->
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
    </section>
  </div>
</template>
<script>
import banner from "./Banner";
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  mounted() {
    var mySwiper = new Swiper(".swiper-product", {
      observer: true,
      observeParents: true,
      loop: true,
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
      products: [],
      productId: ""
    };
  },
  components: {
    banner
  },
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(res => {
        vm.products = res.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      vm.$router.push(`/product/${id}`);
    }
  },
  created() {
    const vm = this;
    vm.getProducts();
  }
};
</script>
<style lang="scss" scoped>
.box {
  height: 200px;
  width: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
.box-1 {
  background-image: url(https://images.unsplash.com/photo-1568121581570-a30e94219113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
}
.box-2 {
  background-image: url(https://images.unsplash.com/flagged/photo-1561668038-2742fcef75d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
}
.box-3 {
  background-image: url(https://images.pexels.com/photos/1740893/pexels-photo-1740893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);
}
</style>