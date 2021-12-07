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
        <div v-if="_.isEmpty(profile) && !registered">
          <div v-if="coTypes && coTypes.length">
            <h2 class="text-center mt-4 choose-type">
              Tell us a little bit about yourself...
            </h2>
            <div class="choose-company-type">
              <div
                v-for="(type, index) in coTypes"
                :key="index"
                :class="`${
                  currentType === type.slug
                    ? 'type-option active'
                    : 'type-option'
                }`"
                @click="chooseType(type.slug)"
              >
                <div class="type-box">
                  <img
                    :src="`${IMAGE_URL}c_fill,g_center,w_178,h_178/${type.image}`"
                    :alt="type.name"
                  />
                  <h3>{{ type.name }}</h3>
                  <div>
                    {{ type.description }}
                  </div>
                  <button>Join</button>
                </div>
              </div>
              <div
                :class="`${
                  currentType === 'individual'
                    ? 'type-option active'
                    : 'type-option'
                }`"
                @click="chooseType('individual')"
              >
                <div class="type-box">
                  <img src="@/assets/images/user-type-icon.png" />
                  <h3>Individual</h3>
                  <div>
                    I am a profession/freelancer looking for jobs opportunities
                    in the Rwandan tech ecosystem
                  </div>
                  <button>Join</button>
                </div>
              </div>
            </div>
            <div
              class="wrap-register"
              v-if="
                typeChosen &&
                currentType !== 'individual' &&
                !registering &&
                !registered
              "
            >
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
                  <h4 class="text-center mt-3">And your work email address?</h4>
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
                    What is the name of your organization/entity?
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
                    What is your organisation/entity's website?
                  </h4>
                  <div class="row mt-4">
                    <div class="col-12">
                      <div class="form-group">
                        <input
                          type="text"
                          name="website"
                          v-model.trim="$v.user.coWebsite.$model"
                          @input="changingWeb(user.coWebsite)"
                          required
                          class="form-control custom-input"
                          placeholder="Company's website"
                        />
                      </div>
                      <div class="small">Example: example.com</div>
                      <div
                        class="my-1 alert alert-danger small py-1"
                        v-if="
                          $v.user.coWebsite.$dirty && $v.user.coWebsite.$invalid
                        "
                      >
                        Provide a valid website
                      </div>
                      {{ webChanged }}
                    </div>
                  </div>
                  <!-- job title -->
                  <h4 class="text-center mt-3">What is your job title</h4>
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
                    What district are your head offices based in?
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
                    What is the main business activity or sector that closely
                    fits your organisation/entity’s Mandate?
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
                            v-for="(
                              activity, index
                            ) in listOfBusinessActivities"
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
                    Short description about your organisation/entity
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
                      <router-link target="_blank" :to="'/privacy-policy'">
                        privacy policy
                      </router-link>
                      and
                      <router-link target="_blank" :to="'/terms'">
                        terms
                      </router-link>
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
                        class="
                          btn btn-lg
                          font-weight-bold
                          btn-primary-outline
                          mr-lg-5
                          mt-3
                        "
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
            <div
              class="py-5 bg-white shadow rounded-md mb-3"
              v-if="!registered && registering"
            >
              <Loading />
            </div>
            <div
              class="wrap-register"
              v-if="typeChosen && currentType === 'individual'"
            >
              <RegisterIndividual />
            </div>
          </div>
          <div class="loading-register" v-else>
            <Loading />
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
import RegisterIndividual from "@/components/RegisterIndividual";
Vue.use(Vuelidate);

import { required, minLength, email } from "vuelidate/lib/validators";

const checkWebsite = (value) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(value);
};
// const checkWebsite = (value) =>
//   /^([a-z0-9])(([a-z0-9-]{1,61})?[a-z0-9]{1})?(\.[a-z0-9](([a-z0-9-]{1,61})?[a-z0-9]{1})?)?(\.[a-zA-Z]{2,4})+$/i.test(
//     value
//   );

import PageHeader from "@/components/PageHeader";
export default {
  name: "register",
  components: {
    PageHeader,
    Loading,
    RegisterIndividual,
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
        linkedin: "",
        districtBasedIn: "",
        businessActivityId: "",
        shortDescription: "",
      },
      webChanged: "",
      allDistricts: [],
      listOfBusinessActivities: [],
      coTypes: [],
    };
  },
  mounted() {
    if (!this._.isEmpty(this.profile) && this.profile.id) {
      this.$router.push("/dashboard");
    }
  },
  created() {
    // loading all districts
    const dist = Districts();
    this.allDistricts = dist.sort();
    // loading company types
    AxiosHelper.get("company-types").then((response) => {
      this.coTypes = response.data.result;
    });
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch(() => {});
  },
  methods: {
    changingWeb(domain) {
      let web = domain;
      web = this._.replace(web, "https://", "");
      web = this._.replace(web, "http://", "");
      web = this._.replace(web, "www.", "");
      return (this.webChanged = web);
    },
    changingLinkedin(domain) {
      let web = domain;
      web = this._.replace(web, "https://", "");
      web = this._.replace(web, "http://", "");
      web = this._.replace(web, "www.", "");
      return (this.linkedinChanged = web);
    },
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
  max-width: 1200px;
  margin: 10px auto 30px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
.type-option {
  position: relative;
  box-sizing: border-box;
}

.type-box {
  width: 100%;
  height: 350px;
  background: #ffffff;
  box-shadow: 0px 9px 36px #1b295826;
  text-align: center;
  padding: 25px 0;
  cursor: pointer;
  position: relative;
  border-radius: 22px;
  z-index: 10;
  border: 2px solid #ffffff;
}
.type-option.active .type-box {
  border: 2px solid #00aeef;
  top: 50px;
}
.type-box div {
  font-size: 14px;
  max-width: 200px;
  margin: 0 auto;
  display: auto;
  color: #5e7c8d;
}
.type-box img {
  width: 50px;
  height: 50px;
}
.type-option.active::before {
  position: absolute;
  content: "";
  top: 0px;
  left: 0;
  width: 100%;
  height: 100px;
  background: #c0c6d8;
  z-index: -3;
  border-radius: 30px 30px 0 0;
}

.type-option button {
  position: absolute;
  bottom: 35px;
  background: #ffffff;
  box-shadow: 0px 4px 8px #1b295840;
  border: 2px solid #5e7c8d;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
  padding: 20px auto;
  left: 0;
  right: 0;
  width: 160px;
  font-size: 14px;
}
.type-option h3 {
  font-size: 16px;
  margin: 10px 0;
  color: #1b2958;
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
.choose-type {
  color: #00aeef;
  font-size: 36px;
  margin: 22px 0;
  padding: 15px 0;
}
.loading-register {
  padding: 120px 0;
}
</style>
