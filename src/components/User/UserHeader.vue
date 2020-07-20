<template>
  <div class="sticky-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div class="container">
        <router-link to="/" class>
          <img src="@/images/logo2.png" alt="首頁" height="40" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/products">商品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/coupons">優惠券</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" href="#" to="/contact_us">聯絡我們</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  
}

$(function() {
    $('.nav-link').on('click', function() {
      $('.navbar-toggler').click();
    });
  });
</script>