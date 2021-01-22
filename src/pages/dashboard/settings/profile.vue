<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Settings</h2>
        <MenuSettings active="profile" />
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container">
        <div class="wrap-dash-box">
          <h2 class="font-weight-light text-blue-dark h3">
            Profile information
          </h2>
          <div>
            <form @submit="updateUser">
              <h4 class="mt-3">First name</h4>
              <div
                :class="`${
                  $v.user.firstName.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
                <input
                  type="text"
                  v-model="user.firstName"
                  required
                  class="form-control custom-input"
                  placeholder="Company name"
                />
              </div>
              <h4 class="mt-3">Last name(family name)</h4>
              <div
                :class="`${
                  $v.user.lastName.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
                <input
                  type="text"
                  v-model="user.lastName"
                  required
                  class="form-control custom-input"
                  placeholder="Company name"
                />
              </div>
              <div v-if="profile.role === 'normal'">
                <h4 class="mt-3">Job title</h4>
                <div
                  :class="`${
                    $v.user.jobTitle.$invalid === true
                      ? 'form-group has-error'
                      : 'form-group'
                  }`"
                >
                  <input
                    type="text"
                    v-model="user.jobTitle"
                    required
                    class="form-control custom-input"
                    placeholder="Company name"
                  />
                </div>
              </div>
              <h4 class="mt-3">Your email</h4>
              <div class="form-group">
                <input
                  type="text"
                  disabled
                  v-model="user.email"
                  class="form-control custom-input"
                  placeholder="Company name"
                />
              </div>
              <div>
                <button
                  type="button"
                  :disabled="$v.$invalid"
                  class="btn btn-success-outline"
                  @click.prevent="updateUser"
                >
                  Update your information
                </button>
              </div>
            </form>
          </div>
          <div class="border-top my-4 py-4">
            <h2 class="text-blue-dark h5">
              Permanently delete this account and company
            </h2>
            <div class="mb-3">
              The account and associated company no longer be available, and all
              data in the account will be permanently deleted
            </div>
            <button
              type="button"
              @click.prevent="deleteAccount"
              class="btn btn-danger-outline"
            >
              De-register this company
            </button>
          </div>
        </div>
      </div>
      <!-- DELETE ACCOUNT -->
      <modal
        name="openDeleteAccount"
        :adaptive="true"
        :scrollable="true"
        :height="430"
        :width="700"
      >
       <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <h3 class="p-4">Delete account &amp; company</h3>
        <div class="mx-4 mt-4">We're sorry to see your go</div>
        <div class="mx-4 my-2">
          Deleting your account will remove all your profile and company
          information from our database. This cannot be undone
        </div>
        <div class="px-4 py-1 h6 font-weight-light">
          Please type <b class="text-danger font-weight-bold">DELETE</b> to
          confirm.
        </div>
        <div class="form-group px-4">
          <input
            type="text"
            v-model="inputCompanyToDelete"
            class="form-control custom-input"
            placeholder="Type here..."
          />
        </div>
        <div class="py-3 px-4">
          <span class="float-left">
            <button class="btn btn-success-outline mr-2" @click="closeModel">
              Cancel
            </button>
            <button
              class="btn btn-danger"
              :disabled="
                inputCompanyToDelete !== 'delete' &&
                inputCompanyToDelete !== 'DELETE'
              "
              @click="deleteAnyway"
            >
              Delete
            </button>
          </span>
          <span class="float-right">
            <button @click="closeModel" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
        </div>
      </modal>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import MenuSettings from "@/components/MenuSettings";
import AxiosHelper from "@/helpers/AxiosHelper";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";

import { required, minLength, maxLength } from "vuelidate/lib/validators";

Vue.use(Vuelidate);
Vue.use(VModal);
export default {
  name: "dashboard",
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
    updateUser() {
      AxiosHelper.put("profile/edit", this.user)
        .then(() => {
          Vue.$toast.open({
            message: "Your information has  been updated",
            type: "success",
          });
          localStorage.setItem("profile", JSON.stringify(this.user));
          this.loadUser();
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
      firstName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      lastName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      jobTitle: {
        minLength: minLength(2),
        maxLength: maxLength(25),
      },
    },
  },
};
</script>

<style scoped>
</style>