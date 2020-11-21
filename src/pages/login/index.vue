<template>
  <div class="wrap-login-page">
    <div class="container">
      <div class="wrap-login">
        <div class="login-logo">
          <router-link :to="'/'">
            <img
              src="@/assets/images/logo_fullcolored.svg"
              alt="Innovate Rwanda"
            />
          </router-link>
        </div>
        <h2 class="text-center mb-4">Login</h2>
        <div class="register-form">
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control custom-input"
                  placeholder="Email"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <input
                  type="password"
                  class="form-control custom-input"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              class="btn font-weight-bold btn-primary btn-lg btn-block shadow"
            >
              Login
            </button>
          </div>
          <div class="clear"></div>
          <div class="py-3 text-center">
            <router-link :to="'/'">Forget password?</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "why-rwanda",
  components: {},
};
</script>

<style scoped>
.wrap-login-page {
  background: #f0f2f8;
  width: 100%;
  height: 100vh;
}
.wrap-login {
  margin: 71px auto;
  display: block;
  max-width: 425px;
}
.wrap-login h2 {
  color: #1b2958;
  font-size: 32px;
  margin: 30px 0;
  padding: 20px 0;
  font-weight: bold;
}
.wrap-login button {
  padding: auto 40px;
  max-width: 220px;
  margin: 20px auto;
  display: block;
}
.wrap-login a {
  color: #00AEEF;
}
.login-logo {
  margin: 0 auto;
  display: block;
  max-width: 250px;
}
.login-logo img {
  width: 100%;
  display: block;
}
</style>