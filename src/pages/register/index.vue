<template>
  <div>
    <component :is="layout">
      <div
        class="page-header"
        :style="{
          'background-image':
            'url(' + require('@/assets/images/auth-bg.jpg') + '',
        }"
      >
        <div
          class="page-overlay"
          :style="{ 'background-color': 'rgba(4, 137, 187, 0.83)' }"
        ></div>
        <h1>Join The Community</h1>
        <div class="subtitle">
          Whether you're a corporation looking for innovation, a startup looking
          for a boost, or a VC looking to meet great startups, we're the right
          place for you.
        </div>
      </div>
      <div class="container">
        <div v-if="_.isEmpty(profile) && !registering && !registered">
          <h2 class="text-center mt-4">
            Tell us a little bit about yourself...
          </h2>
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
              <img src="@/assets/images/arrow-right.png" />
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
                        name="first_name"
                        v-model.trim="$v.user.firstName.$model"
                        required
                        class="form-control custom-input"
                        placeholder="First name"
                      />
                    </div>
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="
                        $v.user.firstName.$dirty && $v.user.firstName.$invalid
                      "
                    >
                      First name is not provided
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-12">
                    <div class="form-group">
                      <input
                        type="lastname"
                        name="last_name"
                        v-model.trim="$v.user.lastName.$model"
                        required
                        class="form-control custom-input"
                        placeholder="Last name"
                      />
                    </div>
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="
                        $v.user.lastName.$dirty && $v.user.lastName.$invalid
                      "
                    >
                      Last name is not provided
                    </div>
                  </div>
                </div>
                <!-- email -->
                <h4 class="text-center mt-3">
                  And your company email address?
                </h4>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="form-group">
                      <input
                        type="email"
                        name="email"
                        v-model.trim="$v.user.email.$model"
                        class="form-control custom-input"
                        placeholder="Email"
                      />
                    </div>
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="$v.user.email.$dirty && $v.user.email.$invalid"
                    >
                      Email is not provided
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
                        name="password"
                        v-model.trim="$v.user.password.$model"
                        required
                        class="form-control custom-input"
                        placeholder="Password"
                      />
                    </div>
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="
                        $v.user.password.$dirty && $v.user.password.$invalid
                      "
                    >
                      Password is required and must be at least 8 characters
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
                        name="company"
                        v-model.trim="$v.user.coName.$model"
                        required
                        class="form-control custom-input"
                        placeholder="Company name"
                      />
                    </div>
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="$v.user.coName.$dirty && $v.user.coName.$invalid"
                    >
                      Company name is not provided
                    </div>
                  </div>
                </div>
                <!-- website -->
                <h4 class="text-center mt-3">
                  What is your company's website?
                </h4>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="form-group">
                      <input
                        type="text"
                        name="website"
                        v-model.trim="$v.user.coWebsite.$model"
                        required
                        class="form-control custom-input"
                        placeholder="Company's website"
                      />
                    </div>
                    <div class="small">e.g.: example.com</div>
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="
                        $v.user.coWebsite.$dirty && $v.user.coWebsite.$invalid
                      "
                    >
                      Provide a valid website
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
                        name="job_title"
                        v-model.trim="$v.user.jobTitle.$model"
                        required
                        class="form-control custom-input"
                        placeholder="Job title"
                      />
                    </div>
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="
                        $v.user.jobTitle.$dirty && $v.user.jobTitle.$invalid
                      "
                    >
                      Job title is not provided
                    </div>
                  </div>
                </div>
                <!-- district -->
                <h4 class="text-center mt-3">
                  What District are you based in?
                </h4>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="form-group">
                      <select
                        class="form-control form-control-lg"
                        name="district"
                        v-model="user.districtBasedIn"
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
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="submitted && !user.districtBasedIn"
                    >
                      Select district you are based in
                    </div>
                  </div>
                </div>
                <!-- area -->
                <h4 class="text-center mt-3">
                  What is your main business activity closely fits your company?
                </h4>
                <div class="row mt-4">
                  <div class="col-12">
                    <div class="form-group">
                      <select
                        class="form-control form-control-lg"
                        name="business_activity"
                        v-model="user.businessActivityId"
                        @change="changeInterest($event)"
                        required
                      >
                        <option
                          v-for="(activity, index) in listOfBusinessActivities"
                          v-bind:value="activity.id"
                          :key="index"
                        >
                          {{ activity.name }}
                        </option>
                      </select>
                    </div>
                    <div
                      class="my-1 alert alert-danger small py-1"
                      v-if="submitted && !user.businessActivityId"
                    >
                      Choose main business activity
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
                        name="description"
                        v-model="user.shortDescription"
                        class="form-control"
                        rows="6"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="form-check mt-2">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      v-model="agreed"
                      :value="agreed"
                    />
                    I have read and agree to the
                    <router-link :to="'/'"> privacy policy </router-link>
                    and
                    <router-link :to="'/'"> terms </router-link>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div
                      v-if="
                        submitted &&
                        ($v.$invalid ||
                          !user.districtBasedIn ||
                          !user.businessActivityId)
                      "
                      role="alert"
                    >
                      <div class="my-1 alert alert-danger small py-1">
                        You have to fill all required information
                      </div>
                    </div>
                    <button
                      :disabled="!agreed"
                      @click.prevent="registerAccount"
                      class="btn btn-lg font-weight-bold btn-primary-outline mr-lg-5 mt-3"
                    >
                      Register
                    </button>
                    <span class="py-3" v-if="registering">
                      <Loading />
                    </span>

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
        <div v-if="!_.isEmpty(profile)" class="text-center py-5 my-5">
          <h1 class="h3">You are already logged in.<br /></h1>
          <router-link
            class="my-3 btn btn-lg font-weight-bold btn-primary-outline"
            :to="'/dashboard'"
            >Go to dashboard</router-link
          >
          <br />
          or
          <br />
          <button
            class="my-3 btn btn-lg font-weight-bold btn-gray-outline"
            @click="logout"
          >
            Logout
          </button>
        </div>
        <div v-if="!registering && registered" class="text-center py-5 my-5">
          <div class="my-3 alert alert-success" role="alert">
            We have created your account successfully. Kindly, check your email
            to verify your email!
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

import { required, minLength, email } from "vuelidate/lib/validators";

const checkWebsite = (value) =>
  /^([a-z0-9])(([a-z0-9-]{1,61})?[a-z0-9]{1})?(\.[a-z0-9](([a-z0-9-]{1,61})?[a-z0-9]{1})?)?(\.[a-zA-Z]{2,4})+$/i.test(
    value
  );

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
      submitted: false,
      agreed: false,
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
        businessActivityId: "",
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
      this.user.businessActivityId = e.target.value;
    },
    registerAccount() {
      this.submitted = true;
      if (!this.$v.$invalid) {
        this.registering = true;
        this.registered = false;
        this.errorHappened = false;
        this.user.coType = this.currentType;
        AxiosHelper.post("register", this.user)
          .then(() => {
            this.registering = false;
            this.registered = true;
            this.user = {
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
              businessActivityId: "",
              shortDescription: "",
            };
            Vue.$toast.open({
              message: "Company has been registered successfully",
              type: "success",
            });
          })
          .catch((error) => {
            this.error = error.response.data;
            this.registering = false;
            this.errorHappened = true;
          });
      }
    },
    logout() {
      localStorage.removeItem("profile");
      localStorage.removeItem("company");
      localStorage.removeItem("isAuth", true);
      localStorage.removeItem("token");
      this.$router.push("/login");
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
      },
      lastName: {
        required,
      },
      email: {
        email,
      },
      jobTitle: {
        required,
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
input[type="checkbox"] {
  margin-top: 8px;
  -ms-transform: scale(1.6); /* IE */
  -moz-transform: scale(1.6); /* FF */
  -webkit-transform: scale(1.6); /* Safari and Chrome */
  -o-transform: scale(1.6); /* Opera */
  padding: 8px;
  cursor: pointer;
}
</style>
