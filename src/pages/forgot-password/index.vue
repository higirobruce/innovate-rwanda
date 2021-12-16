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
        <h2 class="text-center mb-4">Forgot password?</h2>
        <div
          v-if="!loading && requested"
          class="my-3 alert alert-success"
          role="alert"
        >
          We have send your email to reset password!
        </div>
        <div
          v-if="!loading && error"
          class="my-3 alert alert-danger"
          role="alert"
        >
          Sorry, we could not find your account at this moment!
        </div>
        <div class="register-form" v-if="!loading  && !requested">
          <form @submit="forgotPassword">
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model.trim="$v.user.email.$model"
                    type="email"
                    name="email"
                    class="form-control custom-input"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                :disabled="$v.$invalid"
                @click="forgotPassword"
                class="btn font-weight-bold btn-primary btn-lg btn-block shadow"
              >
                Submit
              </button>
            </div>
            <div>
              <Loading v-if="loading && !requested" />
            </div>
          </form>
          <div class="clear"></div>
          <div class="py-3 text-center">
            <router-link :to="'/login'">Login</router-link>
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

import { email } from "vuelidate/lib/validators";
import Loading from "@/components/Loading";
export default {
  name: "login",
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      requested: false,
      error: false,
      user: {
        email: "",
      },
    };
  },
  mounted() {},
  methods: {
    forgotPassword(evt) {
      evt.preventDefault();
      this.loading = true;
      this.requested = false;
      this.error = false;
      AxiosHelper.put("forgot-password", {
        email: this.user.email
      })
        .then(() => {
          this.loading = false;
          this.requested = true;
        })
        .catch(() => {
          this.requested = false;
          this.loading = false;
          this.error = true;
        });
    },
  },
  validations: {
    user: {
      email: {
        email,
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