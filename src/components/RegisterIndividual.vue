<template>
  <div>
    <div v-if="!individualRegistering && !individualRegistered">
      <h2 class="text-center mb-4">Some basic information about you</h2>
      <div class="register-form">
        <form @submit="registerIndividual">
          <h4 class="text-center mt-3">What is your name?</h4>
          <div class="row mt-4">
            <div class="col-lg-6 col-sm-12">
              <div class="form-group">
                <input
                  type="text"
                  name="first_name"
                  v-model.trim="$v.userIndividual.firstName.$model"
                  required
                  class="form-control custom-input"
                  placeholder="First name"
                />
              </div>
              <div
                class="my-1 alert alert-danger small py-1"
                v-if="
                  $v.userIndividual.firstName.$dirty &&
                  $v.userIndividual.firstName.$invalid || !isFirstNameValid
                "
              >
                First Name is required and should have at least 3 characters
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <div class="form-group">
                <input
                  type="text"
                  name="last_name"
                  v-model.trim="$v.userIndividual.lastName.$model"
                  required
                  class="form-control custom-input"
                  placeholder="Last name"
                />
              </div>
              <div
                class="my-1 alert alert-danger small py-1"
                v-if="
                  $v.userIndividual.lastName.$dirty &&
                  $v.userIndividual.lastName.$invalid || !isLastNameValid
                "
              >
                Last Name is required and should have at least 3 characters
              </div>
            </div>
          </div>
          <h4 class="text-center mt-3">And your work email address?</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <input
                  type="email"
                  name="email"
                  v-model.trim="$v.userIndividual.email.$model"
                  class="form-control custom-input"
                  placeholder="Email"
                />
              </div>
              <div
                class="my-1 alert alert-danger small py-1"
                v-if="
                  $v.userIndividual.email.$dirty &&
                  $v.userIndividual.email.$invalid || !isEmailValid
                "
              >
                Email is invalid
              </div>
            </div>
          </div>
          <h4 class="text-center mt-3">What's your phone number?</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <input
                  type="phone"
                  name="phone"
                  v-model.trim="$v.userIndividual.phone.$model"
                  class="form-control custom-input"
                  placeholder="Phone number"
                />
              </div>
              <div
                class="my-1 alert alert-danger small py-1"
                v-if="
                  $v.userIndividual.phone.$dirty &&
                  $v.userIndividual.phone.$invalid || !isPhoneValid
                "
              >
                Phone number is invalid
              </div>
            </div>
          </div>
          <h4 class="text-center mt-3">Create password</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <input
                  type="password"
                  name="password"
                  v-model.trim="$v.userIndividual.password.$model"
                  required
                  class="form-control custom-input"
                  placeholder="Password"
                />
              </div>
              <div
                class="my-1 alert alert-danger small py-1"
                v-if="
                  $v.userIndividual.password.$dirty &&
                  $v.userIndividual.password.$invalid || !isPasswordValid
                "
              >
                Password is required and must be at least 8 characters
              </div>
            </div>
          </div>
          <h4 class="text-center mt-3">
            Are you a mentor or open for opportunity?
          </h4>
          <div class="row mt-4">
            <div class="col-12">
              <!-- <div class="form-group">
                <input
                  type="text"
                  name="company"
                  v-model.trim="$v.userIndividual.accountType.$model"
                  required
                  class="form-control custom-input"
                  placeholder="Company name"
                />
              </div> -->
              <!-- v-model="userIndividual.location"
                @change="changeLocation($event)" -->
              <select
                class="form-control form-control-lg"
                name="accType"
                v-model="userIndividual.accType"
                @change="accTypeChange"
                required
              >
                <option value="" selected disabled>You are joing as....</option>
                <option v-bind:value="'profession'">I am looking for opportunities </option>
                <option v-bind:value="'volunteer'">
                 I am a volunteer (internship,practicum,apprenticeship)
                </option>
                <option v-bind:value="'mentor'">
                 I am a mentor
                </option>
              </select>
              <div
              class="my-1 alert alert-danger small py-1"
              v-if="!accountTypeValid"
            >
              Select one option
            </div>
            </div>
          </div>
          <h4 class="text-center mt-3">Link to your linkedin</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <input
                  type="text"
                  name="website"
                  v-model.trim="$v.userIndividual.linkedin.$model"
                  required
                  class="form-control custom-input"
                  placeholder="Linkedin profile"
                />
                <!-- @input="changingLinkedin(user.linkedin)" -->
              </div>
              <div class="small">
                Example: linkedin.com/in/yourlinkedinusername
              </div>
              <div
                class="my-1 alert alert-danger small py-1"
                v-if="
                  $v.userIndividual.linkedin.$dirty &&
                  $v.userIndividual.linkedin.$invalid || !isLinkedInValid
                "
              >
                Provide a valid linkedin account link
              </div>
              <!-- {{ linkedinChanged }} -->
            </div>
          </div>
          <h4 class="text-center mt-3">Link to your Portolio</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <input
                  type="text"
                  name="portofolio"
                  v-model.trim="$v.userIndividual.portfolio.$model"
                  required
                  class="form-control custom-input"
                  placeholder="Link to your portfolio"
                />
              </div>
              <div class="small">Provide a link to you portfolio or resume</div>
              <div
                class="my-1 alert alert-danger small py-1"
                v-if="
                  $v.userIndividual.portfolio.$dirty &&
                  $v.userIndividual.portfolio.$invalid || !isPortfolioValid
                "
              >
                Portolio is not provided
              </div>
            </div>
          </div>
          <h4 class="text-center mt-3">What's your location?</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <select
                  class="form-control form-control-lg"
                  name="district"
                  v-model="userIndividual.location"
                  @change="changeLocation($event)"
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
                v-if="submitted && !userIndividual.location"
              >
                Select district you are based in
              </div>
            </div>
          </div>
          <h4 class="text-center mt-3">Your short summary</h4>
          <div class="row mt-4">
            <div class="col-12">
              <div class="form-group">
                <textarea
                  name="description"
                  v-model="userIndividual.shortDescription"
                  class="form-control"
                  rows="6"
                ></textarea>
              </div>
            </div>
            <div
              class="my-1 alert alert-danger small py-1"
              v-if="submitted && !userIndividual.shortDescription || !isSummaryValid"
            >
              Your summary be 10 to 300 characters
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
              <router-link target="_blank" :to="'/terms'"> terms </router-link>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <!-- <div
              v-if="
                !(
                  submitted &&
                  $v.$invalid &&
                  !_.isEmpty(userIndividual.location)
                )
              "
              role="alert"
            >
              <div class="my-1 alert alert-danger small py-1">
                You have to fill all required information
              </div>
            </div> -->
              <!-- :disabled="
                !agreed && !$v.$invalid && _.isEmpty(userIndividual.location) -->
              <button
                @click.prevent="registerIndividual"
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
    <div class="py-5" v-if="individualRegistering && !individualRegistered">
      <Loading />
    </div>
    <div
      v-if="!individualRegistering && individualRegistered"
      class="text-center py-5 my-5"
    >
      <div class="my-3 alert alert-success" role="alert">
        We have created your account successfully. Kindly, check your email to
        verify your account!
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import validator from 'validator';
import PhoneUtils from '@exuus/rwanda-phone-utils';
import AxiosHelper from "@/helpers/AxiosHelper";
import { Districts } from "rwanda";
import Vuelidate from "vuelidate";
import Loading from "@/components/Loading";
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

export default {
  name: "register-individual",
  components: {
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
      userIndividual: {
        firstName: "",
        lastName: "",
        email: "",
        accountType: "",
        password: "",
        linkedin: "",
        portfolio: "",
        location: "",
        shortDescription: "",
        phone: "",
        entity_type: "individual",
        accType: "",
      },
      webChanged: "",
      allDistricts: [],
      listOfBusinessActivities: [],
      coTypes: [],
      individualRegistering: false,
      individualRegistered: false,
       isPhoneValid: true,
      isLinkedInValid: true,
      isPortfolioValid: true,
      isEmailValid: true,
      isFirstNameValid: true,
      isLastNameValid: true,
      accountTypeValid: true,
      isPasswordValid: true,
      isSummaryValid: true,
      isLocationValid: true,
    };
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
    changeLocation(e) {
      this.userIndividual.location = e.target.value;
    },
    accTypeChange(e){
      this.userIndividual.accType = e.target.value;
    },
    registerIndividual() {
       this.isFirstNameValid = true;
      this.isLastNameValid = true;
      this.isEmailValid = true;
      this.isPhoneValid = true;
      this.isLinkedInValid = true;
      this.isPortfolioValid = true;
      this.accountTypeValid = true;
      this.isPasswordValid = true;
      this.isLocationValid = true;
      this.isSummaryValid = true;

 if (!validator.isLength(this.userIndividual.firstName, { min: 3 })) {
        this.isFirstNameValid = false;
        return;
      }
       if (!validator.isLength(this.userIndividual.lastName, { min: 3 })) {
        this.isLastNameValid = false;
        return;
      }
      if (!validator.isEmail(this.userIndividual.email)) {
        this.isEmailValid = false;
        return;
      }
      const phoneValid = PhoneUtils(this.userIndividual.phone).isValid;
      if (!phoneValid) {
        this.isPhoneValid = false;
        return;
      }

      if (!validator.isURL(this.userIndividual.linkedin)) {
        this.isLinkedInValid = false;
        return;
      }
      if (!validator.isURL(this.userIndividual.portfolio)) {
        this.isPortfolioValid = false;
        return;
      }
      if(!this.userIndividual.accType) {
        this.accountTypeValid = false;
        return;
      }
      if(!validator.isLength(this.userIndividual.password, {min: 8})) {
        this.isPasswordValid = false;
        return;
      }

      if(!validator.isLength(this.userIndividual.shortDescription, {min: 10, max: 300})) {
        this.isSummaryValid = false;
        return;
      }

      this.individualRegistering = true;
      this.individualRegistered = false;
      this.submitted = true;
        this.registering = true;
        this.registered = false;
        this.errorHappened = false;
        AxiosHelper.post("register", this.userIndividual)
          .then(() => {
            this.individualRegistering = false;
            this.individualRegistered = true;
            this.userIndividual = {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
              accountType: "",
              linkedin: "",
              portfolio: "",
              location: "",
              shortDescription: "",
            };
            Vue.$toast.open({
              message: "Company has been registered successfully",
              type: "success",
            });
          })
          .catch((error) => {
            this.error = error.response.data;
            this.individualRegistering = false;
            this.individualRegistered = false;
            this.errorHappened = true;
          });
      
    },
  },
  validations: {
    userIndividual: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        email,
      },
      linkedin: {
        validateWebsite: checkWebsite,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      portfolio: {
        required,
      },
      phone: {
        required,
      },
      shortDescription: {
        required,
        minLength: minLength(10),
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
