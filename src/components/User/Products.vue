<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-3 col-lg-2">
          <div class="list-group">
            <a
              class="list-group-item list-group-item-action"
              :class="{'active':category==='All'}"
              @click.prevent="changeCategory('All')"
            >全部商品</a>

            <a
              class="list-group-item list-group-item-action"
              :class="{'active':category===item}"
              @click.prevent="changeCategory(item)"
              v-for="(item, index) in filterCategory"
              :key="index"
            >{{item}}</a>
          </div>
        </div>
        <div class="col-md-9 col-lg-10 mt-4 mt-md-0">
          <div class="row">
            <div class="col-md-6 col-lg-4 mb-4" v-for="(item) in filterProducts" :key="item.id">
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
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">{{item.origin_price|currency}}</div>
                    <del class="h6" v-if="item.price">原價 {{item.origin_price|currency}}</del>
                    <div class="h5" v-if="item.price">優惠價 {{item.price|currency}}</div>
                  </div>
                </div>
                <div class="card-footer d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm ml-auto"
                    @click="addtoCart(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="item.id ===itemId"></i>
                    加到購物車
                  </button>
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
export default {
  data() {
    return {
      isLoading: false,
      products: [],
      itemId: "",
      category: "All",
      categoryItem: []
    };
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
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const productItem = {
        product_id: id,
        qty
      };
      vm.$http.post(api, { data: productItem }).then(res => {
        if (res.data.success) {
          vm.$bus.$emit("upDataCart");
          vm.$bus.$emit("message:push", res.data.message, "success");
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
    },
    changeCategory(item) {
      const vm = this;
      vm.category = item;
    }
  },
  computed: {
    filterProducts() {
      const vm = this;
      if (vm.category === "All") {
        return vm.products;
      } else {
        return vm.products.filter(function(item) {
          return item.category === vm.category;
        });
      }
    },
    filterCategory() {
      const vm = this;
      vm.products.forEach(item => {
        vm.categoryItem.push(item.category);
      });
      return vm.categoryItem.filter(function(item, index, arr) {
        return arr.indexOf(item) === index;
      });
    }
  },
  created() {
    const vm = this;
    vm.getProducts();
    vm.$bus.$on("goAllProducts", category => {
      vm.category = category;
    });
  }
};
</script>
