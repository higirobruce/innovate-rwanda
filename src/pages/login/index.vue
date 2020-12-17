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
        <div
          v-if="!logging && !success && unauthorized"
          class="my-3 alert alert-danger"
          role="alert"
        >
          Invalid email or password
        </div>
        <div class="register-form">
          <form @submit="login">
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model.trim="$v.user.email.$model"
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
                    v-model.trim="$v.user.password.$model"
                    class="form-control custom-input"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                :disabled="$v.$invalid"
                class="btn font-weight-bold btn-primary btn-lg btn-block shadow"
              >
                Login
              </button>
            </div>
            <div>
              <Loading v-if="logging && !success" />
            </div>
          </form>
          <div class="clear"></div>
          <div class="py-3 text-center">
            <router-link :to="'/forgot-password'">Forgot password?</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import dotenv from "dotenv";
dotenv.config();

import { required, email, minLength } from "vuelidate/lib/validators";
import Loading from "@/components/Loading";
export default {
  name: "login",
  components: {
    Loading,
  },
  data() {
    return {
      logging: false,
      success: false,
      errorMessage: "",
      unauthorized: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    login(evt) {
      evt.preventDefault();
      localStorage.removeItem("profile");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("company");
      this.logging = true;
      this.success = false;
      AxiosHelper.post("login", this.user)
        .then((response) => {
          this.logging = false;
          this.success = true;
          localStorage.setItem("profile", JSON.stringify(response.data.user));
          localStorage.setItem(
            "company",
            JSON.stringify(response.data.company)
          );
          localStorage.setItem("isAuth", true);
          localStorage.setItem("token", response.data.token);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.log("error", error);
          this.errorMessage = "Something went wrong";
          this.unauthorized = true;
          this.logging = false;
        });
    },
  },
  validations: {
    user: {
      email: {
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
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
  color: #00aeef;
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