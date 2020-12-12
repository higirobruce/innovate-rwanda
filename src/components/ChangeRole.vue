<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Role</h3>
    <div class="p-4">
      Do you really want to assign this role to
      <b>{{ user.firstName }} {{ user.lastName }}</b
      >?
    </div>
    <div class="my-2 mx-4">
      <button @click="closeModal" class="btn btn-primary-outline mr-2">
        Cancel
      </button>
      <button @click="changeRoleAnyway" class="btn btn-success float-right">
        Change role
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import AxiosHelper from "@/helpers/AxiosHelper";
import VModal from "vue-js-modal";
Vue.use(VModal);

export default {
  name: "change-role",
  props: ["user", "role", "entity"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$modal.hide("openChangeRole");
    },
    changeRoleAnyway() {
      Vue.$toast.open({
        message: `Role update under development`,
        type: "info",
      });
      //   AxiosHelper.put(`users/change-role/${this.user.id}`)
      //     .then(() => {
      //       Vue.$toast.open({
      //         message: `Role of ${this.user.firstName} has been updated successfully`,
      //         type: "success",
      //       });
      //     })
      //     .catch(() => {
      //       Vue.$toast.open({
      //         message: "Sorry, something went wrong. try again later!",
      //         type: "error",
      //       });
      //     });
      //   this.closeModal();
      // },
    },
  },
};
</script>