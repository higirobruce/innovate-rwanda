<template>
  <div>
    <h3 class="px-4 pt-4">Edit summary</h3>
    <div class="mx-4 py-2">
      <form @submit="submitCompanyInfo">
        <div
          style="
            width: 100%;
            max-height: 410px;
            overflow-y: auto;
            overflow-x: hidden;
          "
        >
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
        <div
          v-if="
            profile.companyId === company.id && company.status === 'approved'
          "
          class="alert alert-danger"
        >
          Clicking on update button below, your institution/entity will be
          pending review. You will wait for an approval from the Innovate Rwanda
          team. We want to make sure you follow the guidelines for updating your
          institution or entity's information
        </div>
        <div class="mt-2 mb-3">
          <button
            type="button"
            @click="closeModal"
            class="btn btn-gray-outline mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            @click="submitCompanyInfo"
            class="btn btn-success-outline"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
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
      this.companyInfo.status = "pending";
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
        .catch((error) => {
          if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating your summary",
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