<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mt-5">
      <div v-if="cart.final_total">
        <div class="row justify-content-center">
          <div class="col-md-9">
            <div class="container row justify-content-around">
              <div class="col-md-3 p-2 rounded-pill alert-success text-center">1.填寫訂購資料</div>
              <div class="col-md-3 p-2 rounded-pill alert-secondary text-center my-3 my-md-0">2.金流付款</div>
              <div class="col-md-3 p-2 rounded-pill alert-secondary text-center">3.訂單完成</div>
            </div>
          </div>
          <div class="col-md-6 mt-5">
            <table class="table">
              <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
                <th>總價格</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click.prevent="delCart(item)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <!-- <div class="text-success" v-if="item.coupon">
                                已套用優惠券
                    </div>-->
                  </td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle">{{ item.product.price |currency }}</td>
                  <td class="align-middle">{{ item.product.price * item.qty|currency}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-right">總計</td>
                  <td class="text-right">{{ cart.total|currency }}</td>
                </tr>
                <tr v-if="cart.final_total!==cart.total">
                  <td colspan="4" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success">{{ cart.final_total|currency }}</td>
                </tr>
              </tfoot>
            </table>
            <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" v-model="coupons.code" placeholder="請輸入優惠碼" />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  @click.prevent="useCoupons"
                  type="button"
                >套用優惠碼</button>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 row justify-content-center">
          <form class="col-md-6" @submit.prevent="creatOrder">
            <div class="form-group">
              <label for="userEmail">
                Email
                <span class="text-danger">*必填</span>
              </label>
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
              <label for="username">
                收件人姓名
                <span class="text-danger">*必填</span>
              </label>
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
              <label for="usertel">
                收件人電話
                <span class="text-danger">*必填</span>
              </label>
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
              <label for="useraddress">
                收件人地址
                <span class="text-danger">*必填</span>
              </label>
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
      </div>
      <div v-if="cart.final_total==0">
        <div class="d-flex justify-content-center align-items-center" style="height:350px">
          <div>
            <div class="h3">您的購物車內還沒有任何商品</div>
            <button class="btn btn-outline-primary" @click.prevent="goShop">點擊此處去購物</button>
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
      cart: {
        carts: {}
      },
      coupons: {
        code: ""
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      isLoading: false
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(res => {
        console.log(res.data);
        vm.cart = res.data.data;
        vm.isLoading = false;
      });
    },
    useCoupons() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      vm.$http.post(api, { data: vm.coupons }).then(res => {
        console.log(res.data);
        vm.getOrder();
        vm.coupons.code = "";
      });
    },
    creatOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      vm.$validator.validate().then(res => {
        if (res) {
          vm.$http.post(api, { data: vm.form }).then(res => {
            console.log(res.data);
            vm.$bus.$emit("upDataCart");
            vm.$router.push(`/checkout/${res.data.orderId}`);
          });
        }
      });
    },
    delCart(item) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${item.id}`;
      vm.$http.delete(api).then(res => {
        vm.getOrder();
        vm.$bus.$emit("upDataCart");
        vm.$bus.$emit("message:push", `商品已刪除`, "danger");
      });
    },
    goShop() {
      const vm = this;
      vm.$router.push(`/products`);
    }
  },
  created() {
    const vm = this;
    vm.getOrder();
  }
};
</script>