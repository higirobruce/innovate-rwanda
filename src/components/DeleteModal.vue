<template>
  <div>
    <h3 class="p-4">Delete</h3>
    <div class="p-4">Do you really want to delete this {{ entity }}?</div>
    <div class="my-2 mx-4">
      <span class="float-right">
        <button @click="closeModal" class="btn btn-primary-outline mr-2">
          Cancel
        </button>
        <button
          @click="deleteAnyway"
          class="btn btn-danger-outline float-right"
        >
          Delete
        </button>
      </span>
      <span class="float-left">
        <button @click="closeModal" class="btn btn-gray-outline mr-2">
          Close
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import VModal from "vue-js-modal";
Vue.use(VModal);

export default {
  name: "post-info",
  props: ["url", "entity"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$modal.hide("openDeleteRecord");
    },
    deleteAnyway() {
      AxiosHelper.delete(this.url)
        .then(() => {
          Vue.$toast.open({
            message: `${this.entity} has been deleted successfully`,
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2000);
          this.closeModal();
        })
        .catch((error) => {
          if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
  },
};
</script>