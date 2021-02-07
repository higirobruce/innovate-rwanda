<template>
  <div>
    <h3 class="px-4 pt-4">Edit info</h3>
    <div class="mx-4 py-2">
      <div
        v-if="profile.companyId === company.id && company.status === 'approved'"
        class="alert alert-danger"
      >
        We don't recommend you to update company's information when it is
        approved. However, if you do so, your changes will be published after
        being reviewed
      </div>
      <form @submit="submitCompanyInfo">
        <div style="max-height: 410px; overflow-y: auto; overflow-x: hidden">
          <!-- main area of interest -->
          <div class="row">
            <div class="col-12">
              <h5 class="mt-1">Company summary</h5>
              <div class="form-group">
                <textarea
                  class="form-control"
                  rows="4"
                  v-model="companyInfo.shortDescription"
                  placeholder="Company summary...."
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 mb-3">
          <span class="float-left">
            <button
              type="submit"
              @click="submitCompanyInfo"
              class="btn btn-success-outline mr-2"
            >
              Save
            </button>
          </span>
          <span class="float-right">
            <button
              type="button"
              @click="closeModal"
              class="btn btn-gray-outline"
            >
              Close
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import VModal from "vue-js-modal";
Vue.use(VModal);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import { required, minLength } from "vuelidate/lib/validators";

import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";
export default {
  name: "company-info",
  props: ["company"],
  data() {
    return {
      companyInfo: {},
    };
  },
  mounted() {
    this.companyInfo = { ...this.company };
  },
  methods: {
    closeModal() {
      this.$modal.hide("editCompanySummary");
    },
    submitCompanyInfo(evt) {
      evt.preventDefault();
      AxiosHelper.patch(`company/edit/${this.companyInfo.id}`, this.companyInfo)
        .then(() => {
          Vue.$toast.open({
            message: "Company summary has been updated successfully",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2000);
        })
        .catch(() => {
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating your social media accounts",
            type: "error",
          });
        });
    },
    changeDistrict(e) {
      this.companyInfo.districtBasedIn = e.target.value;
    },
    changeMainInterest(e) {
      this.companyInfo.mainAreaOfInterest = e.target.value;
    },
  },
  validations: {
    companyInfo: {
      shortDescription: {
        required,
        minLength: minLength(3),
      },
    },
  },
};
</script>