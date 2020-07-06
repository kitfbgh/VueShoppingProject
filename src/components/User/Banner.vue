<template>
  <div>
    <div class="swiper-container swiper-banner">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide banner1"></div>
        <div class="swiper-slide banner2"></div>
        <div class="swiper-slide banner3"></div>
      </div>
      <!-- If we need pagination -->
      <!-- <div class="swiper-pagination"></div> -->

      <!-- If we need navigation buttons -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->

    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
     direction: 'horizontal',
        loop: true,
        effect:'fade',
        speed : 1500,
        autoplay: {
            delay: 3000,
          },
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
    
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },        
    });
  }
};
</script>