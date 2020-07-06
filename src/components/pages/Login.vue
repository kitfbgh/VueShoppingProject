<template>
  <div id="login">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal" style="color:#FFD2D2;">請先登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        v-model="user.username"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        v-model="user.password"
        placeholder="Password"
        required
      />
      <div class="checkbox mb-3">
        <label style="color:#FFD2D2;">
          <input type="checkbox" value="remember-me"/> 記住我
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted" >&copy; 2017-2020</p>
    </form>

    <UserFooter id="footer"> </UserFooter>
  </div>
</template>

<script>
import UserFooter from "@/components/User/UserFooter";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    UserFooter
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.APIPATH}/admin/signin`;
      vm.$http.post(api, vm.user).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/admin/productslist");
        }
      });
    },
   },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  min-height:2000px;
}

#login {
  margin:0px;
  padding:0px;
  width: 100%;
  background-image: url('https://images4.alphacoders.com/773/773947.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
#footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  margin: auto;
}

.form-signin {
  position: relative;
  top: 50%;
  transform: translateY(50%);
  width: 100%;
  max-width: 330px;
  padding: 10px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
