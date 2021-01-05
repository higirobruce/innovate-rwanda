<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Settings</h2>
        <MenuSettings active="profile" />
      </div>
      <div class="dash-container">
        <div class="wrap-dash-box">
          <h2 class="font-weight-light text-blue-dark h3">
            Profile information
          </h2>
          <div class="border-top my-4 py-4">
            <h2 class="text-blue-dark h5">Profile information</h2>
            <button
              type="button"
              @click.prevent="deleteAccount"
              class="btn btn-danger-outline"
            >
              Delete your account
            </button>
          </div>
        </div>
      </div>
      <!-- DELETE ACCOUNT -->
      <modal
        name="openDeleteAccount"
        :adaptive="true"
        :scrollable="true"
        :height="450"
        :width="700"
      >
        <h3 class="p-4 bottom-shadow shadow">Delete account</h3>
        <div class="mx-4 mt-4">We're sorry to see your go</div>
        <div class="mx-4 my-2">
          Deleting your acccount will remove all your information from our
          database. This cannot be undone
        </div>
        <div class="px-4 py-1 h6 font-weight-light">
          Please type <b class="text-danger">DELETE</b> to confirm.
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
            <button class="btn btn-success-outline mr-2" @click="cancelDelete">
              Cancel
            </button>
            <button
              class="btn btn-danger"
              @click="deleteAnyway(companyToDeleteId)"
            >
              Delete
            </button>
          </span>
          <span class="float-right">
            <button @click="cancelDelete" class="btn btn-gray-outline mr-2">
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
Vue.use(VModal);
export default {
  name: "dashboard",
  components: { MenuSettings },
  data() {
    return {};
  },
  created() {
    AxiosHelper.get("events/public")
      .then((response) => {
        this.posts = response.data.result;
        this.loaded = true;
      })
      .catch(() => {
        this.loading = false;
        this.loaded = true;
        this.posts = [];
      });
  },
  methods: {
    deleteAccount() {
      this.$modal.show("openDeleteAccount");
    },
    closeModel() {
      this.$modal.show("openDeleteAccount");
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
</style>