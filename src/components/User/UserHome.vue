<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <banner></banner>
    <section class="container mt-4 text-center">
      <h3>客人總是在詢問</h3>
      <h3>帥氣穿搭的秘訣是什麼</h3>
      <div class="row mt-4">
        <div class="col-md-4 d-flex align-items-center flex-column">
          <div class="box box-1 mb-4"></div>
          <h3>優良原料</h3>
          <p>
            選擇我們品牌的優質服裝
            <br />嚴選皮革配上傳統染料
            <br />保持一貫的好風格
          </p>
        </div>
        <div class="col-md-4 d-flex align-items-center flex-column">
          <div class="box box-2 mb-4"></div>
          <h3>手工設計</h3>
          <p>
            我們的服裝是經由服裝設計師親自設計
            <br />保證一定的品質
          </p>
        </div>
        <div class="col-md-4 d-flex align-items-center flex-column">
          <div class="box box-3 mb-4"></div>
          <h3>新奇創意</h3>
          <p>
            有別於一般的服裝
            <br />我們發揮更多的創意於服裝的特色
            <br />創造出視覺的饗宴
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
let vm = null;
export default {
  mounted() {
    var mySwiper = new Swiper(".swiper-product", {
      observer: true,
      loop:true,
      observeParents: true,
      slidesPerView: 1,
      centeredSlides : true,
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
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(res => {
        vm.products = res.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      vm.$router.push(`/product/${id}`);
    }
  },
  created() {
    vm = this;
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
  background-image: url(https://cdn.pixabay.com/photo/2017/03/19/15/14/the-work-2156788_1280.jpg);
}
.box-2 {
  background-image: url(https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935_1280.jpg);
}
.box-3 {
  background-image: url(https://cdn.pixabay.com/photo/2015/03/26/09/41/tie-690084_1280.jpg);
}
</style>