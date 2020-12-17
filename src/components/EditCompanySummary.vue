<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Edit info</h3>
    <div class="px-4 py-2">
      <form @submit="submitCompanyInfo">
        <div class="wrap-modal" style="max-height: 450px; overflow: scroll">
          <!-- main area of interest -->
          <h4 class="mt-3">Company summary</h4>
          <div class="row mt-4">
            <div class="col-12">
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
        <div class="mt-4">
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
              class="btn btn-gray-outline mr-2"
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

import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

const checkWebsite = (value) =>
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value);
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
      coName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      yearFounded: {},
      contactEmail: {
        email,
      },
      emailDisplay: {
        required,
      },
      contactPhone: {
        required,
        minLength: minLength(3),
      },
      phoneDisplay: {
        required,
      },
      coWebsite: {
        validateWebsite: checkWebsite,
      },
      districtBasedIn: {},
      areaOfInterest: {},
      mainAreaOfInterest: {},
      shortDescription: {
        minLength: minLength(3),
      },
    },
  },
};
</script>