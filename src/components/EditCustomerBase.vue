<template>
  <div>
    <h3 class="p-4">Edit customer base</h3>
    <div class="px-4 py-2">
      <form @submit.prevent="submitCompanyInfo">
        <div class="wrap-modal" style="max-height: 450px; overflow: scroll">
          <h5 class="mt-3">Company summary</h5>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <select
                  class="form-control form-control-lg"
                  name="business_activity"
                  v-model="companyInfo.customerBase"
                  @change="changeCustomerBase($event)"
                  required
                >
                  <option
                    v-for="(base, index) in customerBase"
                    v-bind:value="base"
                    :key="index"
                    :selected="customerBase === companyInfo.customerBase"
                  >
                    {{ base }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button
            type="button"
            @click="closeModal"
            class="btn btn-gray-outline mr-2"
          >
            Close
          </button>
          <button
            type="submit"
            @click.prevent="submitCompanyInfo"
            class="btn btn-success-outline mr-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// import AxiosHelper from "@/helpers/AxiosHelper";
import VModal from "vue-js-modal";
Vue.use(VModal);

import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";
export default {
  name: "company-info",
  props: ["company"],
  data() {
    return {
      companyInfo: {},
      customerBase: [
        "Business to business (B2B)",
        "Business to consumer (B2C)",
        "Private public partnership (PPP)",
        "Business to government (B2G)",
        "Consumer to business (C2B)",
        "Consumer to consumer (C2C)",
      ],
    };
  },
  mounted() {
    this.companyInfo = { ...this.company };
  },
  methods: {
    closeModal() {
      this.$modal.hide("editCompanySummary");
    },
    submitCompanyInfo() {
      console.log('this.companyInfo.status', this.companyInfo.status)
      // evt.preventDefault();
      // AxiosHelper.patch(`company/edit/${this.companyInfo.id}`, this.companyInfo)
      //   .then(() => {
      //     Vue.$toast.open({
      //       message: "Client base has been updated successfully",
      //       type: "success",
      //     });
      //     setTimeout(() => {
      //       this.$router.go();
      //     }, 2000);
      //   })
      //   .catch(() => {
      //     Vue.$toast.open({
      //       message:
      //         "Sorry, something went wrong while client base",
      //       type: "error",
      //     });
      //   });
    },
    changeCustomerBase(e) {
      this.companyInfo.districtBasedIn = e.target.value;
    },
  },
};
</script>