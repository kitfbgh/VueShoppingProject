<template>
  <div class="sticky-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div class="container">
        <router-link to="/" class>
          <img src="@/images/logo2.png" alt height="40" />
          <h1 class="sr-only">Backery</h1>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/products">商品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/coupons">優惠券</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
h1 {
  overflow: hidden;
  white-space: nowrap;
}
</style>