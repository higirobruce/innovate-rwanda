<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Settings</h2>
        <MenuSettings active="reset" />
      </div>
      <div class="dash-container">
        <div class="wrap-dash-box">
          <h2 class="font-weight-light text-blue-dark h3">Reset password</h2>
          <div>
            <form @submit="resetPassword">
              <h4 class="mt-3">New password</h4>
              <div
                :class="`${
                  $v.user.password.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
                <input
                  type="password"
                  v-model="user.password"
                  required
                  class="form-control custom-input"
                  placeholder="Company name"
                />
              </div>
              <h4 class="mt-3">Retype new password</h4>
              <div
                :class="`${
                  $v.user.confirmPassword.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
                <input
                  type="password"
                  v-model="user.confirmPassword"
                  required
                  class="form-control custom-input"
                  placeholder="Company name"
                />
              </div>
              <div>
                <button
                  type="button"
                  :disabled="$v.$invalid"
                  class="btn btn-success-outline"
                  @click.prevent="resetPassword"
                >
                  Change password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import MenuSettings from "@/components/MenuSettings";
import AxiosHelper from "@/helpers/AxiosHelper";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";

import { required, minLength, sameAs } from "vuelidate/lib/validators";

Vue.use(Vuelidate);
Vue.use(VModal);
export default {
  name: "reset-password-dashboard",
  components: { MenuSettings },
  data() {
    return {
      user: {},
      loading: false,
      loaded: false,
      inputCompanyToDelete: "",
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    deleteAccount() {
      this.$modal.show("openDeleteAccount");
    },
    closeModel() {
      this.$modal.hide("openDeleteAccount");
    },
    loadUser() {
      AxiosHelper.get("profile")
        .then((response) => {
          this.user = response.data.result;
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
          this.user = {};
        });
    },
    deleteAnyway() {
      AxiosHelper.delete("company/delete-company")
        .then(() => {
          Vue.$toast.open({
            message: "We have deleted your information.",
            type: "success",
          });
          localStorage.removeItem("profile");
          localStorage.removeItem("company");
          localStorage.removeItem("isAuth", true);
          localStorage.removeItem("token");
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
    resetPassword() {
      const data = {
        password: this.user.password,
        email: this.user.email,
      };
      AxiosHelper.post("change-password", data)
        .then(() => {
          Vue.$toast.open({
            message:
              "Password has  been changed successfully. You will need to login again to continue",
            type: "success",
          });

          localStorage.removeItem("profile");
          localStorage.removeItem("company");
          localStorage.removeItem("isAuth", true);
          localStorage.removeItem("token");
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  validations: {
    user: {
      password: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        sameAsPassword: sameAs("password"),
      },
    },
  },
};
</script>

<style scoped>
</style>˝