<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Edit info</h3>
    <div class="px-4 py-2">
      <form @submit="editCompany">
        <div class="wrap-modal" style="max-height: 450px; overflow: scroll">
          <div class="row mt-4">
            <div class="col-lg-8 col-sm-12">
              <h4 class="mt-3">What is your name?</h4>
              <div class="form-group">
                <input
                  type="text"
                  v-model.trim="$v.company.coName.$model"
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
                  v-model.trim="$v.company.yearFounded.$model"
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
                  v-model.trim="$v.company.contactEmail.$model"
                  class="form-control custom-input"
                  placeholder="Contact email name"
                />
              </div>
              <div class="wrap-switch-toggle">
                Display email address to public
                <span
                  :class="`${
                    company.emailDisplay === true
                      ? 'switch-text active'
                      : 'switch-text'
                  }`"
                  >Off</span
                >
                <label class="switch">
                  <input
                    type="checkbox"
                    :checked="company.emailDisplay === false"
                  />
                  <span class="slider round"></span>
                </label>
                <span
                  :class="`${
                    company.emailDisplay === true
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
                  v-model.trim="$v.company.contactPhone.$model"
                  class="form-control custom-input"
                  placeholder="Contact phone"
                />
              </div>
              <div class="wrap-switch-toggle">
                Display phone number to public
                <span
                  :class="`${
                    company.phoneDisplay === true
                      ? 'switch-text active'
                      : 'switch-text'
                  }`"
                  >Off</span
                >
                <label class="switch">
                  <input
                    type="checkbox"
                    :checked="company.phoneDisplay === false"
                  />
                  <span class="slider round"></span>
                </label>
                <span
                  :class="`${
                    company.phoneDisplay === true
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
                  v-model="company.districtBasedIn"
                  @change="changeDistrict($event)"
                >
                  <option
                    v-for="(district, index) in allDistricts"
                    v-bind:value="district"
                    :key="index"
                    :selected="district === company.districtBasedIn"
                  >
                    {{ district }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <!-- area of interest -->
          <h4 class="mt-3">Area of interests that fits your company</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <v-select
                  multiple
                  v-model="company.areaOfInterest"
                  :options="listOfAreaOfInterests"
                ></v-select>
              </div>
            </div>
          </div>
          <!-- main area of interest -->
          <!-- area -->
          <h4 class="mt-3">Main area of your interest</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <select
                  class="form-control form-control-lg"
                  name="district"
                  v-model="company.mainAreaOfInterest"
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
          <!-- description -->
          <h4 class="mt-3">Short description about the company</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <textarea
                  v-model="company.shortDescription"
                  class="form-control"
                  rows="6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button @click="editCompany" class="btn btn-success-outline mr-2">
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
  props: ["companyId"],
  data() {
    return {
      company: {
        coName: "",
        yearFounded: "",
        contactEmail: "",
        emailDisplay: false,
        contactPhone: "",
        phoneDisplay: false,
        coWebsite: "",
        districtBasedIn: "",
        areaOfInterest: "",
        mainAreaOfInterest: "",
        shortDescription: "",
      },
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
    AxiosHelper.get(`company/${this.companyId}`)
      .then((response) => {
        console.log("response",response)
        this.company = response.data.result.company;
        // this.loadingDirectory = false;
        // this.loadingCompany = false;
      })
      .catch((error) => {
        if (error.response.status === 404) {
            this.errorCompany = error.response.data.error;
        } else {
          this.errorCompany = "Something went wrong, try again later";
        }
        Vue.$toast.open({
          message: error.response.data,
          type: "error",
        });
      });
  },
  methods: {
    convertSocialMedia(object) {
        console.log("oject", object)
      return true;
    },
    editCompany(evt) {
      evt.preventDefault();
      const social = {
        twitter: this.twitter || "",
        linkedin: this.linkedin || "",
        facebook: this.facebook || "",
        instagram: this.instagram || "",
        youtube: this.youtube || "",
      };
      this.company.areaOfInterest = JSON.stringify(this.company.areaOfInterest);
      this.company.socialMedia = JSON.stringify(social);
      AxiosHelper.patch(`company/edit/${this.companyId}`, this.company)
        .then(() => {
          Vue.$toast.open({
            message: "Company's information has been updated",
            type: "success",
          });
          //   setTimeout(() => {
          //     this.$router.go();
          //   }, 4000);
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
    changeDistrict(e) {
      this.company.districtBasedIn = e.target.value;
    },
    changeMainInterest(e) {
      this.company.mainAreaOfInterest = e.target.value;
    },
  },
  validations: {
    company: {
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