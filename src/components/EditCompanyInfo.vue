<template>
  <div>
    <h3 class="px-4 pt-4">Edit info</h3>
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
            <div class="col-lg-8 col-sm-12">
              <h5 class="mt-3">Company name</h5>
              <div
                :class="`${
                  $v.companyInfo.coName.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
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
              <h5 class="mt-3">Year founded</h5>
              <div
                :class="`${
                  $v.companyInfo.yearFounded.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
                <input
                  type="number"
                  v-model.trim="$v.companyInfo.yearFounded.$model"
                  class="form-control custom-input"
                  placeholder="Example: 2018"
                />
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <h5 class="mt-3">Contact email</h5>

              <div
                :class="`${
                  $v.companyInfo.contactEmail.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
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
              <h5 class="mt-3">Phone number</h5>
              <div
                :class="`${
                  $v.companyInfo.contactPhone.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
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
            <div class="col-12">
              <h5 class="my-3">What District are you based in?</h5>
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
            @click.prevent="closeModal"
            class="btn btn-gray-outline mr-2"
          >
            Close
          </button>
          <button
            @click.prevent="submitCompanyInfo"
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
import VModal from "vue-js-modal";
import { Districts } from "rwanda";
Vue.use(VModal);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

const checkYear = (value) => {
  console.log(value);
  return true;
};

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
      allDistricts: [],
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
      listOfBusinessActivities: [],
      Deselect: {
        render: (createElement) => createElement("span", "❌"),
      },
    };
  },
  created() {
    // loading all districts
    const dist = Districts();
    this.allDistricts = dist.sort();
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch(() => {});
  },
  mounted() {
    this.companyInfo = { ...this.company };
  },
  methods: {
    closeModal() {
      this.$modal.hide("editCompanyInfo");
    },
    changeInterest(e) {
      this.companyInfo.businessActivityId = e.target.value;
    },
    submitCompanyInfo() {
      this.companyInfo.status = "pending";
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
      yearFounded: {
        validateYear: checkYear,
      },
      contactEmail: {
        email,
      },
      emailDisplay: {
        required,
      },
      contactPhone: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(18),
      },
      phoneDisplay: {
        required,
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