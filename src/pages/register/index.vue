<template>
  <div>
    <component :is="layout">
      <PageHeader
        image="auth-bg.jpg"
        rgba="rgba(4, 137, 187, 0.83)"
        title="Join The Community"
        subtitle="Whether you're a corporation looking for innovation, a startup looking for a boost, or a VC looking to meet great startups, we're the right place for you."
      />
      <div class="container">
        <h2 class="text-center">Tell us a little bit about yourself...</h2>
        <div class="choose-company-type" v-if="coTypes">
          <div
            v-for="(type, index) in coTypes"
            :key="index"
            :class="`${
              currentType === type.slug ? 'type-option active' : 'type-option'
            }`"
            @click="chooseType(type.slug)"
          >
            <h3>{{ type.name }}</h3>
            <img src="@/assets/images/arrow-right.svg" />
          </div>
        </div>
        <div class="wrap-register" v-if="typeChosen">
          <h2 class="text-center mb-4">Some basic information about you</h2>
          <div class="register-form">
            <form @submit="registerAccount">
              <!-- names -->
              <h4 class="text-center mt-3">What is your name?</h4>
              <div class="row mt-4">
                <div class="col-lg-6 col-sm-12">
                  <div class="form-group">
                    <input
                      type="firstname"
                      v-model.trim="$v.user.firstName.$model"
                      required
                      class="form-control custom-input"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <div class="form-group">
                    <input
                      type="lastname"
                      v-model.trim="$v.user.lastName.$model"
                      required
                      class="form-control custom-input"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
              <!-- email -->
              <h4 class="text-center mt-3">And your company email address?</h4>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="form-group">
                    <input
                      type="email"
                      v-model.trim="$v.user.email.$model"
                      class="form-control custom-input"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
              <!-- password -->
              <h4 class="text-center mt-3">Create password</h4>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="form-group">
                    <input
                      type="password"
                      v-model.trim="$v.user.password.$model"
                      required
                      class="form-control custom-input"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              <!-- company/institution -->
              <h4 class="text-center mt-3">
                What is the name of your company?
              </h4>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model.trim="$v.user.coName.$model"
                      required
                      class="form-control custom-input"
                      placeholder="Company name"
                    />
                  </div>
                </div>
              </div>
              <!-- website -->
              <h4 class="text-center mt-3">What is your company's website?</h4>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model.trim="$v.user.coWebsite.$model"
                      required
                      class="form-control custom-input"
                      placeholder="Company's website"
                    />
                  </div>
                </div>
              </div>
              <!-- job title -->
              <h4 class="text-center mt-3">
                What is your job title at the company?
              </h4>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model.trim="$v.user.jobTitle.$model"
                      required
                      class="form-control custom-input"
                      placeholder="Job title"
                    />
                  </div>
                </div>
              </div>
              <!-- district -->
              <h4 class="text-center mt-3">What District are you based in?</h4>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="form-group">
                    <select
                      class="form-control form-control-lg"
                      name="district"
                      v-model="user.district"
                      @change="changeDistrict($event)"
                      required
                    >
                      <option
                        v-for="(district, index) in allDistricts"
                        v-bind:value="district"
                        :key="index"
                      >
                        {{ district }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- area -->
              <h4 class="text-center mt-3">
                Which area of interest closely fits your company?
              </h4>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="form-group">
                    <select
                      class="form-control form-control-lg"
                      name="district"
                      v-model="user.businessActivity"
                      @change="changeInterest($event)"
                      required
                    >
                      <option
                        v-for="(area, index) in listOfBusinessActivities"
                        v-bind:value="area.name"
                        :key="index"
                      >
                        {{ area.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- description -->
              <h4 class="text-center mt-3">
                Short description about the company
              </h4>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="form-group">
                    <textarea
                      v-model="user.description"
                      class="form-control"
                      rows="6"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button
                    :disabled="
                      $v.$invalid ||
                      !user.districtBasedIn ||
                      !user.businessActivity
                    "
                    class="btn btn-lg font-weight-bold btn-primary-outline mr-lg-5 mt-3"
                  >
                    Register
                  </button>
                  <span class="py-3" v-if="registering">
                    <Loading />
                  </span>
                  <div
                    v-if="!registering && registered"
                    class="my-3 alert alert-success"
                    role="alert"
                  >
                    We have created your account successfully. Kindly, check
                    your email to verify your email!
                  </div>
                  <div
                    v-if="errorHappened && error"
                    class="my-3 alert alert-danger"
                    role="alert"
                  >
                    {{
                      error.error ||
                      "Something went wrong while creating your company, try again later"
                    }}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import { Districts } from "rwanda";
import Vuelidate from "vuelidate";
import Loading from "@/components/Loading";
Vue.use(Vuelidate);

import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

const checkWebsite = (value) =>
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value);

import PageHeader from "@/components/PageHeader";
export default {
  name: "register",
  components: {
    PageHeader,
    Loading,
  },
  data() {
    return {
      typeChosen: false,
      currentType: "",
      registering: false,
      registered: false,
      error: {},
      errorHappened: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        password: "",
        role: "normal",
        coName: "",
        coType: "",
        coWebsite: "",
        districtBasedIn: "",
        businessActivity: "",
        shortDescription: "",
      },
      allDistricts: [],
      listOfBusinessActivities: [],
      coTypes: [],
    };
  },
  created() {
    // loading all districts
    this.allDistricts = Districts();
    // loading company types
    AxiosHelper.get("company-types")
      .then((response) => {
        this.coTypes = response.data.result;
      })
      .catch(() => {});
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch(() => {});
  },
  methods: {
    chooseType(type) {
      this.registered = false;
      if (this.currentType === type) {
        this.typeChosen = false;
        this.currentType = "";
      } else {
        this.typeChosen = true;
        this.currentType = type;
      }
    },
    changeDistrict(e) {
      this.user.districtBasedIn = e.target.value;
    },
    changeInterest(e) {
      this.user.businessActivity = e.target.value;
    },
    registerAccount(evt) {
      evt.preventDefault();
      this.registering = true;
      this.registered = false;
      this.errorHappened = false;
      this.user.coType = this.currentType;
      AxiosHelper.post("register", this.user)
        .then(() => {
          this.registering = false;
          this.registered = true;
        })
        .catch((error) => {
          this.error = error.response.data;
          this.registering = false;
          this.errorHappened = true;
        });
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  validations: {
    user: {
      firstName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      lastName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      email: {
        email,
      },
      jobTitle: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(35),
      },
      password: {
        required,
        minLength: minLength(6),
      },
      coName: {
        required,
        minLength: minLength(3),
      },
      coWebsite: {
        required,
        validateWebsite: checkWebsite,
      },
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 30px;
  color: #1b2958;
}
.choose-company-type {
  max-width: 700px;
  margin: 30px auto;
  display: flex;
  gap: 20px;
}
.type-option {
  width: 50%;
  background: #ffffff;
  box-shadow: 0px 9px 36px #1b295826;
  border-radius: 3px;
  text-align: center;
  padding: 25px 0;
  cursor: pointer;
  position: relative;
}
.type-option.active::before {
  z-index: 1;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;
  background: #00aeef;
}
.type-option.active::after {
  position: absolute;
  content: "";
  top: 160px;
  left: 0;
  width: 100%;
  height: 6px;
  background: #6fcff2;
}
.type-option h3 {
  font-size: 22px;
  margin: 10px 0;
  z-index: 4;
  position: relative;
}
.type-option.active h3 {
  color: #ffffff !important;
}
.wrap-register {
  max-width: 1200px;
  margin: 30px auto;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 9px 36px #1b295826;
  border-radius: 3px;
}
.register-form {
  max-width: 860px;
  display: block;
  margin: 40px auto;
}
.register-form h4 {
  font-weight: 300;
  color: #1b2958;
}
</style>