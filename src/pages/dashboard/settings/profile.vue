<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Settings</h2>
        <MenuSettings active="profile" />
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container" v-if="!_.isEmpty(user)">
        <div class="wrap-dash-box">
          <h4 class="font-weight-light text-blue-dark h4">
            Profile information
          </h4>
          <div class="user-photo" v-if="!_.isEmpty(individual)">
            <img
              :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${individual.picture}`"
              v-if="individual.picture"
              :alt="individual.lastName"
            />
            <img
              v-else
              src="@/assets/images/logo_placeholder.png"
              :alt="individual.lastName"
            />
            <button class="btn-upload" @click="openUploadPicture">
              Change profile picture
            </button>
            <modal
              name="uploadPictureModal"
              :adaptive="true"
              :scrollable="true"
              :height="650"
              :width="650"
            >
              <button type="button" @click.prevent="closeModal" class="close">
                <img src="@/assets/images/close.png" />
              </button>

              <div>
                <h3 class="p-4">Update profile picture</h3>
                <div class="px-4 py-2">
                  <button
                    class="btn btn-success-outline mr-2"
                    @click="$refs.FileInput.click()"
                  >
                    Browse picture
                  </button>
                  <div
                    class="wrap-modal"
                    style="max-height: 450px; overflow: scroll"
                  >
                    <img
                      v-if="individual && individual.picture && !selectedFile"
                      :src="`${IMAGE_URL}c_fill,g_center,h_300,w_300/${individual.picture}`"
                      :alt="individual.firstName"
                      class="current-picture"
                    />
                    <img
                      v-if="picture && !individual.picture && !selectedFile"
                      src="@/assets/images/logo_placeholder.png"
                      :alt="individual.firstName"
                      class="current-picture"
                    />
                    <input
                      ref="FileInput"
                      type="file"
                      style="display: none"
                      @change="onFileSelect"
                    />
                    <VueCropper
                      v-show="selectedFile"
                      ref="cropper"
                      :src="selectedFile"
                      alt="Source Image"
                      :aspectRatio="aspectRatio"
                      :viewMode="2"
                      :responsive="true"
                    ></VueCropper>
                  </div>

                  <div class="mt-4">
                    <button class="btn btn-danger-outline" @click="closeModal">
                      Close
                    </button>
                    <button
                      :disabled="!selectedFile"
                      class="btn btn-success mr-2 float-right"
                      @click="saveImage(), (dialog = false)"
                    >
                      Upload
                    </button>

                    <div v-if="uploading" class="my-1 text-info">
                      Uploading, please wait....
                    </div>
                  </div>
                </div>
              </div>
            </modal>
          </div>
          <div>
            <form @submit="updateUser">
              <h6 class="mt-3">First name</h6>
              <div
                :class="`${
                  $v.user.firstName.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
                <input
                  type="text"
                  v-model="user.firstName"
                  required
                  class="form-control custom-input"
                  placeholder="First name"
                />
              </div>
              <h6 class="mt-3">Last name(family name)</h6>
              <div
                :class="`${
                  $v.user.lastName.$invalid === true
                    ? 'form-group has-error'
                    : 'form-group'
                }`"
              >
                <input
                  type="text"
                  v-model="user.lastName"
                  required
                  class="form-control custom-input"
                  placeholder="Last name"
                />
              </div>
              <div v-if="profile.role === 'normal'">
                <h6 class="mt-3">Job title</h6>
                <div
                  :class="`${
                    $v.user.jobTitle.$invalid === true
                      ? 'form-group has-error'
                      : 'form-group'
                  }`"
                >
                  <input
                    type="text"
                    v-model="user.jobTitle"
                    required
                    class="form-control custom-input"
                    placeholder="Job title"
                  />
                </div>
              </div>
              <h6 class="mt-3">Your email</h6>
              <div class="form-group">
                <input
                  type="text"
                  disabled
                  v-model="user.email"
                  class="form-control custom-input"
                  placeholder="Your email"
                />
              </div>
              <div>
                <button
                  type="button"
                  :disabled="$v.$invalid"
                  class="btn btn-success-outline"
                  @click.prevent="updateUser"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          <!-- <div class="border-top my-4 py-4">
            <h2 class="text-blue-dark h5">More info</h2>
            <h6 class="mt-3">Summary</h6>
            <div></div>
          </div> -->
          <div class="border-top my-4 py-4">
            <h2 class="text-blue-dark h5">
              Permanently delete this account and company
            </h2>
            <div class="mb-3">
              The account and associated company no longer be available, and all
              data in the account will be permanently deleted
            </div>
            <button
              type="button"
              @click.prevent="deleteAccount"
              class="btn btn-danger-outline"
            >
              De-register this company
            </button>
          </div>
        </div>
      </div>
      <!-- DELETE ACCOUNT -->
      <modal
        name="openDeleteAccount"
        :adaptive="true"
        :scrollable="true"
        :height="430"
        :width="700"
      >
        <button type="button" @click.prevent="closeModel" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <h3 class="p-4">Delete account &amp; company</h3>
        <div class="mx-4 mt-4">We're sorry to see your go</div>
        <div class="mx-4 my-2">
          Deleting your account will remove all your profile and company
          information from our database. This cannot be undone
        </div>
        <div class="px-4 py-1 h6 font-weight-light">
          Please type <b class="text-danger font-weight-bold">DELETE</b> to
          confirm.
        </div>
        <div class="form-group px-4">
          <input
            type="text"
            v-model="inputCompanyToDelete"
            class="form-control custom-input"
            placeholder="Type here..."
          />
        </div>
        <div class="py-3 px-4">
          <span class="float-left">
            <button class="btn btn-success-outline mr-2" @click="closeModel">
              Close
            </button>
            <button
              class="btn btn-danger"
              :disabled="
                inputCompanyToDelete !== 'delete' &&
                inputCompanyToDelete !== 'DELETE'
              "
              @click="deleteAnyway"
            >
              Delete
            </button>
          </span>
          <span class="float-right">
            <button @click="closeModel" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
        </div>
      </modal>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import MenuSettings from "@/components/MenuSettings";
import AxiosHelper from "@/helpers/AxiosHelper";
import VueCropper from "vue-cropperjs";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";

import "cropperjs/dist/cropper.css";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

Vue.use(Vuelidate);
Vue.use(VModal);
export default {
  name: "dashboard-profile",
  components: { MenuSettings, VueCropper },
  data() {
    return {
      user: {},
      individual: {},
      loading: false,
      loaded: false,
      inputCompanyToDelete: "",
      mime_type: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      aspectRatio: 1,
      picture: "",
      dialog: false,
      files: "",
      uploading: false,
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    deleteAccount() {
      this.$modal.show("openDeleteAccount");
    },
    closeModel() {
      this.$modal.hide("openDeleteAccount");
      this.$modal.hide("uploadPictureModal");
    },
    loadUser() {
      AxiosHelper.get("profile")
        .then((response) => {
          this.user = response.data.result;
          this.loaded = true;
          this.loadIndividual(this.user);
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
          this.user = {};
        });
    },
    openUploadPicture() {
      this.$modal.show("uploadPictureModal");
    },
    loadIndividual(user) {
      console.log("user", user.id);
      AxiosHelper.get(`individual/${user.id}`)
        .then((response) => {
          this.individual = response.data.result;
          console.log("indi", response.data.result);
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
          this.individual = {};
        });
    },
    saveImage() {
      this.uploading = true;
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();
        formData.append("file", blob);
        formData.append("upload_preset", "wjjxv2a4");
        formData.append("cloud_name", "dbvxqoznr");
        const config = {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        };
        axios
          .post(
            "https://api.cloudinary.com/v1_1/dbvxqoznr/image/upload",
            formData,
            config
          )
          .then((response) => {
            // update company information
            const img_url = `v${response.data.version}/${response.data.public_id}.${response.data.format}`;
            this.individual.picture = img_url;
            AxiosHelper.put(`individual/edit_profile`, this.individual)
              .then((response) => {
                console.log("response", response.data);
                this.uploading = false;
                Vue.$toast.open({
                  message: "You have updated your profile picture",
                  type: "success",
                });
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              })
              .catch((error) => {
                console.log("error", error);
                this.uploading = false;
                Vue.$toast.open({
                  message:
                    "Sorry, something went wrong while updating your information",
                  type: "error",
                });
              });
          })
          .catch(() => {
            this.uploading = false;
          });
      }, this.mime_type);
    },
    onFileSelect(e) {
      const file = e.target.files[0];
      this.mime_type = file.type;
      console.log(this.mime_type);
      if (typeof FileReader === "function") {
        this.dialog = true;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedFile = event.target.result;
          this.$refs.cropper.replace(this.selectedFile);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    closeModal() {
      this.$modal.hide("uploadCompanyLogo");
    },
    deleteAnyway() {
      AxiosHelper.delete("company/delete-company")
        .then(() => {
          Vue.$toast.open({
            message: "We have deleted your information.",
            type: "success",
          });
          localStorage.removeItem("profile");
          localStorage.removeItem("company");
          localStorage.removeItem("isAuth", true);
          localStorage.removeItem("token");
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
    updateUser() {
      AxiosHelper.put("profile/edit", this.user)
        .then(() => {
          Vue.$toast.open({
            message: "Your information has  been updated",
            type: "success",
          });
          localStorage.setItem("profile", JSON.stringify(this.user));
          this.loadUser();
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
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
      jobTitle: {
        minLength: minLength(2),
        maxLength: maxLength(25),
      },
    },
  },
};
</script>

<style scoped>
.user-photo {
  width: 140px;
  height: auto;
  /* padding: 10px; */
  background: #fff;
  border-radius: 4px;
}
.user-photo img {
  width: 100%;
  border-radius: 4px;
}
.btn-upload {
  margin: 8px 0 0 0;
  border: none;
  background: #00aeef;
  border: none;
  text-align: center;
  display: block;
  width: 100%;
  color: #fff;
  padding: 8px 0;
  border-radius: 3px;
  font-size: 12px;
}
.current-picture {
  width: 300px !important;
  height: 300px !important;
}
</style>