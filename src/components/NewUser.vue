<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Create a user</h3>
    <div class="px-4">
      <form @submit="register">
        <div
          class="wrap-modal py-2"
          style="max-height: 600px; overflow: scroll"
        >
          <!-- names -->
          <h4 class="pl-2">Names</h4>
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <div class="form-group">
                <input
                  type="text"
                  name="firstname"
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
                  type="text"
                  name="last name"
                  v-model.trim="$v.user.lastName.$model"
                  required
                  class="form-control custom-input"
                  placeholder="Lastname"
                />
              </div>
            </div>
          </div>
          <h4 class="pl-2">Emails</h4>
          <div class="row">
            <!-- email -->
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
            </div>
          </div>
          <h4 class="pl-2">Role</h4>
          <div class="row">
            <!-- area -->
            <div class="col-12">
              <div class="form-group">
                <select
                  class="form-control form-control-lg"
                  v-model="user.role"
                  @change="changeRole($event)"
                  name="role"
                >
                  <option value="" selected disabled>Select role</option>
                  <option
                    v-for="(role, index) in roles"
                    v-bind:value="role.text"
                    :key="index"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <!-- email -->
          <h4 class="pl-2">Password</h4>
          <div class="row">
            <div class="col-8">
              <div class="form-group">
                <input
                  disabled
                  v-model="user.password"
                  class="form-control custom-input"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="col-4">
              <button
                type="button"
                @click="generatePassword(10)"
                class="btn mt-3 btn-gray btn-block btn-sm"
              >
                Generate new password
              </button>
            </div>
          </div>
        </div>
        <div class="my-2">
          <span class="float-left">
            <button
              :disabled="$v.$invalid"
              type="submit"
              @click.prevent="register"
              class="btn btn-success float-right"
            >
              Register new user
            </button>
          </span>
          <span class="float-right">
            <button
              type="button"
              @click="closeModal"
              class="btn btn-gray-outline mr-2"
            >
              Cancel
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
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

Vue.use(VModal);

export default {
  name: "register-user",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
      },
      roles: [
        {
          name: "Administrator",
          text: "super-admin",
        },
        {
          name: "Users",
          text: "admin-user",
        },
        {
          name: "Blog",
          text: "admin-blog",
        },
        {
          name: "Events",
          text: "admin-event",
        },
        {
          name: "Jobs",
          text: "admin-job",
        },
        {
          name: "Companies",
          text: "admin-job",
        },
      ],
    };
  },
  created() {
    this.generatePassword(10);
  },
  methods: {
    generatePassword(length) {
      let password = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        password += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      this.user.password = password;
    },
    changeRole(e) {
      this.user.role = e.target.value;
    },
    closeModal() {
      this.$modal.hide("openRegister");
    },
    register() {
      AxiosHelper.post("users/create", this.user)
        .then(() => {
          Vue.$toast.open({
            message: `User has been registered successfully, he/she should check the message sent to his/her email!`,
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2000);
        })
        .catch((error) => {
           if (error.response.status === 409) {
            Vue.$toast.open({
              message: "This account already exists",
              type: "info",
            });
          } else {
            Vue.$toast.open({
              message: "Sorry, something went wrong. try again later!",
              type: "error",
            });
          }
        });
      this.closeModal();
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
      role: {
        required,
      },
    },
  },
};
</script>
