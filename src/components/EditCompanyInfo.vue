<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Edit info</h3>
    <div class="px-4 py-2">
      <form @submit="submitCompanyInfo">
        <div class="wrap-modal" style="max-height: 450px; overflow: scroll">
          <div class="row mt-4">
            <div class="col-lg-8 col-sm-12">
              <h4 class="mt-3">What is your name?</h4>
              <div class="form-group">
                <input
                  type="text"
                  v-model.trim="$v.companyInfo.coName.$model"
                  required
                  class="form-control custom-input"
                  placeholder="Company name"
                />
              </div>
            </div>
            <div class="col-lg-4 col-sm-12">
              <h4 class="mt-3">Year founded</h4>
              <div class="form-group">
                <input
                  type="number"
                  v-model.trim="$v.companyInfo.yearFounded.$model"
                  class="form-control custom-input"
                  placeholder="Example: 2018"
                />
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-6 col-sm-12">
              <h4 class="mt-3">Contact email</h4>
              <div class="form-group">
                <input
                  type="email"
                  v-model.trim="$v.companyInfo.contactEmail.$model"
                  class="form-control custom-input"
                  placeholder="Contact email name"
                />
              </div>
              <div class="wrap-switch-toggle">
                Display email address to public
                <span
                  :class="`${
                    companyInfo.emailDisplay === true
                      ? 'switch-text active'
                      : 'switch-text'
                  }`"
                  >Off</span
                >
                <label class="switch">
                  <input
                    v-model="companyInfo.emailDisplay"
                    type="checkbox"
                    :checked="companyInfo.emailDisplay === false"
                  />
                  <span class="slider round"></span>
                </label>
                <span
                  :class="`${
                    companyInfo.emailDisplay === true
                      ? 'switch-text'
                      : 'switch-text active'
                  }`"
                  >On</span
                >
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <h4 class="mt-3">Phone number</h4>
              <div class="form-group">
                <input
                  type="number"
                  v-model.trim="$v.companyInfo.contactPhone.$model"
                  class="form-control custom-input"
                  placeholder="Contact phone"
                />
              </div>
              <div class="wrap-switch-toggle">
                Display phone number to public
                <span
                  :class="`${
                    companyInfo.phoneDisplay === true
                      ? 'switch-text active'
                      : 'switch-text'
                  }`"
                  >Off</span
                >
                <label class="switch">
                  <input
                    type="checkbox"
                    v-model="companyInfo.phoneDisplay"
                    :checked="companyInfo.phoneDisplay === false"
                  />
                  <span class="slider round"></span>
                </label>
                <span
                  :class="`${
                    companyInfo.phoneDisplay === true
                      ? 'switch-text'
                      : 'switch-text active'
                  }`"
                  >On</span
                >
              </div>
            </div>
          </div>

          <!-- district -->
          <h4 class="mt-3">What District are you based in?</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <select
                  class="form-control form-control-lg"
                  name="district"
                  v-model="companyInfo.districtBasedIn"
                  @change="changeDistrict($event)"
                >
                  <option
                    v-for="(district, index) in allDistricts"
                    v-bind:value="district"
                    :key="index"
                    :selected="district === companyInfo.districtBasedIn"
                  >
                    {{ district }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <!-- main area of interest -->
          <h4 class="mt-3">Main area of your interest</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <select
                  class="form-control form-control-lg"
                  name="district"
                  v-model="companyInfo.mainAreaOfInterest"
                  @change="changeMainInterest($event)"
                >
                  <option
                    v-for="(area, index) in listOfMainAreaOfInterests"
                    v-bind:value="area"
                    :key="index"
                  >
                    {{ area }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button
            @click="submitCompanyInfo"
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
      twitter: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      youtube: "",
      allDistricts: ["Gasabo", "Kicukiro"],
      listOfMainAreaOfInterests: [
        "Tech companies",
        "Co-working spaces",
        "Business networks",
        "Accelerators",
        "Government agencies",
        "Ecosystem builders",
        "Financer/Investors",
        "Academic/Research institutions",
        "Incubators",
        "Talent Development",
      ],
      listOfAreaOfInterests: ["Education", "Shopping", "IoT"],
      Deselect: {
        render: (createElement) => createElement("span", "❌"),
      },
    };
  },
  mounted() {
    this.companyInfo = { ...this.company };
  },
  methods: {
    submitCompanyInfo(evt) {
      evt.preventDefault();
      AxiosHelper.patch(`company/edit/${this.companyInfo.id}`, this.companyInfo)
        .then(() => {
          Vue.$toast.open({
            message: "Company information has been updated successfully",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 500);
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