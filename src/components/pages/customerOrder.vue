<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            :style="{backgroundImage:`url(${item.imageUrl})`}"
            style="height: 150px; background-size: cover; background-position: center"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- 前者只顯示原價  後者顯示原價+優惠價-->
              <div class="h5" v-if="!item.price">原價 {{item.origin_price}} 元</div>
              <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">原價 {{product.origin_price}} 元</div>
              <del class="h6" v-if="product.price">原價 {{product.origin_price}} 元</del>
              <div class="h5" v-if="product.price">現在只要 {{product.price}} 元</div>
            </div>
            <select class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">{{num}}{{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <span class="h6 text-secondary mr-3" v-if="!product.price">
              小計
              <strong>{{product.origin_price*product.num }}</strong> 元
            </span>
            <span class="h6 text-secondary mr-3" v-if="product.price">
              小計
              <strong>{{product.price*product.num}}</strong> 元
            </span>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id,product.num)"
            >加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row my-5 justify-content-center">
      <table class="table col-8">
        <thead>
          <tr>
            <th></th>
            <th width="250">品名</th>
            <th>數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in cart.carts" :key="item.id">
            <td class="align-middle">
              <button class="btn btn-outline-danger" @click="delCart(item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{item.product.title}}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
            <td class="align-middle text-right" v-if="item.product.price">{{item.total}}</td>
            <!-- <td class="align-middle" v-if="!item.product.price">{{item.product.origin_price * item.qty}}</td> -->
          </tr>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{cart.total}}</td>
          </tr>
          <tr v-if="cart.final_total!==cart.total">
            <td colspan="3" class="text-right text-success">優惠價</td>
            <td class="text-right text-success">{{cart.final_total}}</td>
          </tr>
        </tbody>
      </table>
      <div class="input-group input-group-sm mb-3 px-0 col-8">
        <input type="text" class="form-control" v-model="coupon_code" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" @click="addCouponCode()">輸入優惠券</button>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="creatOrder">
        <div class="form-group">
          <label for="userEmail">Email</label>
          <input
            :class="{'is-invalid':errors.has('email')}"
            type="email"
            v-model="form.user.email"
            class="form-control"
            name="email"
            id="userEmail"
            v-validate="'required|email'"
            placeholder="請輸入 Email"
          />
          <span class="text-danger" v-if="errors.has('email')">必須輸入Email</span>
        </div>
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            :class="{'is-invalid':errors.has('name')}"
            v-validate="'required'"
            v-model="form.user.name"
            placeholder="輸入姓名"
          />
          <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
        </div>
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            name="tel"
            :class="{'is-invalid':errors.has('tel')}"
            v-validate="'required|digits:10'"
            v-model="form.user.tel"
            placeholder="請輸入電話"
          />
          <span class="text-danger" v-if="errors.has('tel')">必須輸入10位數電話號碼</span>
        </div>
        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            :class="{'is-invalid':errors.has('address')}"
            v-validate="'required'"
            v-model="form.user.address"
            placeholder="請輸入地址"
          />
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    <!-- <Pagination :childPagination="Pagination" @childChangePage="getProducts" /> -->
  </div>
</template>
<script>
import $ from "jquery";
import Pagination from "../Pagination";
export default {
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      loadingItem: "",
      Pagination: {},
      cart: [],
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  components: {
    Pagination
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.Pagination = response.data.pagination;
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.loadingItem = id;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.product = response.data.product;
        vm.product.num = 1;
        $("#productModal").modal("show");
        vm.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response.data);
        vm.loadingItem = "";
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data.data);
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
    delCart(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        console.log(response.data.data);
        // vm.cart = response.data.data;
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const couponCode1 = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(api, { data: couponCode1 }).then(response => {
        console.log(response.data);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    creatOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: order }).then(response => {
            console.log(response.data);
            // vm.cart = response.data.data;
            vm.getCart();
            vm.$router.push(`/CustomerCheckout/${response.data.orderId}`)
          });
        } else {
          console.log("欄位不完整");
        }
      });
    }
  },

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>