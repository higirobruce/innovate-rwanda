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
        <h2 class="text-center mb-4">Reset password</h2>
        <div
          v-if="!loading && changed"
          class="my-3 alert alert-success"
          role="alert"
        >
          You have reset your password successfully. You can <router-link :to="'/login'">login</router-link> now
        </div>
        <div
          v-if="!loading && error"
          class="my-3 alert alert-danger"
          role="alert"
        >
          Sorry, we could not change you password right now. try again
        </div>
        <div class="register-form" v-if="!loading && !changed">
          <form @submit="resetPassword">
            <div class="row mt-4">
              <div class="col-12">
                <div class="form-group">
                  <input
                    v-model.trim="$v.user.newPassword.$model"
                    type="password"
                    name="password"
                    class="form-control custom-input"
                    placeholder="New password"
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model.trim="$v.user.confirmPassword.$model"
                    type="password"
                    name="password"
                    class="form-control custom-input"
                    placeholder="Retype password"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                :disabled="$v.$invalid"
                @click="resetPassword"
                class="btn font-weight-bold btn-primary btn-lg btn-block shadow"
              >
                Reset
              </button>
            </div>
            <div>
              <Loading v-if="loading && !changed" />
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

import { required, minLength, sameAs } from "vuelidate/lib/validators";
import Loading from "@/components/Loading";
export default {
  name: "reset-password",
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      changed: false,
      error: false,
      token: "",
      user: {
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  created() {
    this.token = this.$route.params.token;
      localStorage.removeItem("profile");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("company");
  },
  methods: {
    resetPassword(evt) {
      evt.preventDefault();
      this.loading = true;
      this.changed = false;
      this.error = false;
      delete this.user.confirmPassword;
      AxiosHelper.put(`reset-password/${this.token}`, this.user)
        .then(() => {
          this.loading = false;
          this.changed = true;
        })
        .catch(() => {
          this.changed = false;
          this.loading = false;
          this.error = true;
        });
    },
  },
  validations: {
    user: {
      newPassword: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        sameAsPassword: sameAs("newPassword"),
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