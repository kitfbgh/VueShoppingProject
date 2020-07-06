<template>
  <div>
    <footer class="footer text-center mt-5 py-4 bg-primary">
      <ul class="list-inline mb-0">
        <li class="list-inline-item h3">
          <a href class="text-white">
            <i class="fab fa-facebook-square"></i>
          </a>
        </li>
        <li class="list-inline-item h3">
          <a href class="text-white">
            <i class="fab fa-instagram"></i>
          </a>
        </li>
        <li class="list-inline-item h3">
          <router-link to="/login" class="text-white">
            <i class="fas fa-user-cog">後臺登入</i>
          </router-link>
        </li>
      </ul>
      <p class="text-white mb-0">資料、圖片來源皆來自網路，僅用來做為學習用途。</p>
    </footer>
  </div>
</template>