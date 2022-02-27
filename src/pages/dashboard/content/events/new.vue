<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="events" />
        <div class="wrap-content-head-btns" v-if="profile.role === 'normal'">
          <router-link
            :to="'/dashboard/content/events'"
            class="btn font-weight-bol btn-gray-outline"
            >Cancel</router-link
          >
          <button
            @click="saveAsDraft('draft')"
            :disabled="event.title === ''"
            class="btn font-weight-bold btn-primary-outline ml-3"
          >
            Save as draft
          </button>
          <button
            @click="publishPost('pending')"
            :disabled="
              event.title === '' ||
              event.eventDate === '' ||
              event.eventTime === '' ||
              event.content === ''
            "
            class="btn font-weight-bold btn-success-outline ml-3"
          >
            Publish
          </button>
        </div>
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container">
        <div v-if="profile.role === 'normal'">
          <h4 class="h5">
            <router-link :to="'/dashboard/content/events'" class="btn btn-back">
              <i class="icon-arrow-left" />
              <span class="ml-3"> Back </span>
            </router-link>
            <span class="text-blue-dark font-weight-bold"> New event </span>
          </h4>
          <div class="alert alert-info" v-if="creating">
            We are creating your event, please wait...
          </div>
          <div class="alert alert-success" v-if="created && !uploading">
            Your event has been created successfully! Our admins will review and
            published it.
          </div>
          <!-- FORM: CREATE BLOG -->
          <div class="row">
            <div class="col-sm-12 col-md-8 col-l-8">
              <div class="form-group">
                <input
                  type="text"
                  v-model="event.title"
                  required
                  class="form-control custom-input"
                  placeholder="Event Title"
                />
              </div>
              <div class="form-group">
                <textarea
                  style="height: auto"
                  rows="16"
                  class="form-control"
                  v-model="event.description"
                ></textarea>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-l-4">
              <div class="content-form-sidebar">
                <div v-if="_.size(types)">
                  <h3 class="h6">Event type</h3>
                  <div class="form-group">
                    <select
                      class="form-control form-control-lg"
                      name="category"
                      v-model="event.category"
                      @change="changeCategory($event)"
                    >
                      <option value="" selected disabled>Select type</option>
                      <option
                        v-for="(cat, index) in types"
                        v-bind:value="cat.name"
                        :key="index"
                      >
                        {{ cat.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group" v-if="showOtherCategoryInput">
                  <h3 class="h6">Specify other category</h3>
                  <input
                    class="form-control custom-input"
                    v-model="event.category"
                    type="text"
                    placeholder="Type category..."
                  />
                </div>
                <h3 class="h6">Event time</h3>
                <div class="my-3">
                  <date-picker
                    v-model="event.eventDate"
                    :type="'date'"
                    :placeholder="'Choose date'"
                    :format="'YYYY-MM-DD'"
                    valueType="format"
                  ></date-picker>
                </div>
                <div class="my-3">
                  <date-picker
                    v-model="event.eventTime"
                    :type="'time'"
                    :placeholder="'Choose time'"
                    :format="'hh:mm a'"
                    valueType="format"
                  ></date-picker>
                </div>
                <h3 class="h6">Which group are you trying to reach?</h3>
                <div
                  class="co-badge"
                  v-for="(act, index) in selectedBusinessActivities"
                  :key="index"
                >
                  <span>
                    {{ act.name }}
                  </span>
                  <button @click.prevent="removeActivityFromBlog(act.id)">
                    <img src="@/assets/images/remove.png" />
                  </button>
                </div>
                <a @click="updateActivities" class="btn btn-transparent px-1">
                  Add
                </a>
                <h3 class="h6">Featured Image</h3>
                <button
                  class="btn btn-block select-image"
                  @click="$refs.FileInput.click()"
                >
                  Select image
                </button>
                <div class="my-3">
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
                  ></VueCropper>
                </div>
              </div>
            </div>
          </div>
          <!-- Update activities -->
          <modal
            name="openEditBusinessActivies"
            :adaptive="true"
            :scrollable="true"
            :height="660"
            :width="550"
          >
            <button type="button" @click.prevent="closeModal" class="close">
              <img src="@/assets/images/close.png" />
            </button>
            <h3 class="p-4">Business activities</h3>
            <div class="px-4">
              <div
                class="wrap-modal"
                style="max-height: 500px; overflow: scroll"
              >
                <div class="row mt-1">
                  <div class="col-12" v-if="listOfBusinessActivities">
                    <div
                      v-for="(a, index) in listOfBusinessActivities"
                      :key="index"
                    >
                      <div class="s-one-activity">
                        {{ a.name }}
                        <button
                          @click.prevent="addActivityToCompany(a, a.id)"
                          type="button"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-1">
                <span class="float-right">
                  <button
                    type="button"
                    @click.prevent="closeModal"
                    class="btn btn-gray-outline mr-2"
                  >
                    Close
                  </button>
                </span>
              </div>
            </div>
          </modal>
        </div>
        <div v-else class="not-allowed"></div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import MenuContent from "@/components/MenuContent";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import VModal from "vue-js-modal";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
Vue.use(VModal);

let marked = require("marked");

export default {
  name: "write-event",
  components: {
    MenuContent,
    VueCropper,
    DatePicker,
  },
  data() {
    return {
      event: {
        title: "",
        description: "",
        tags: "",
        flyer: "",
        eventDate: "",
        eventTime: "",
        companyId: "",
        category: "",
      },
      types: [],
      listOfBusinessActivities: "",
      selectedBusinessActivities: [],
      activities: [],
      mime_type: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      aspectRatio: 2 / 1,
      image: "",
      dialog: false,
      files: "",
      uploading: false,
      created: false,
      creating: false,
      showOtherCategoryInput: false,
    };
  },
  beforeCreate() {
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch((error) => {
         if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
      });
  },
  mounted() {
    this.loadEventTypes();
  },
  methods: {
    loadEventTypes() {
      AxiosHelper.get("events-types")
        .then((response) => {
          this.types = response.data.result;
          this.loading = false;
        })
        .catch((error) =>{
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
        });
    },
    changeCategory(e) {
      if (e.target.value === "other") {
        this.showOtherCategoryInput = true;
        this.event.category = "";
      } else {
        this.showOtherCategoryInput = false;
        this.event.category = e.target.value;
      }
    },
    publishPost(status) {
      this.savePost(status);
    },
    saveAsDraft(status) {
      this.savePost(status);
    },
    updateActivities() {
      this.$modal.show("openEditBusinessActivies");
    },
    closeModal() {
      this.$modal.hide("openEditBusinessActivies");
    },
    addActivityToCompany(activity, id) {
      if (!this.activities.includes(id)) {
        this.selectedBusinessActivities = [
          ...this.selectedBusinessActivities,
          activity,
        ];
        this.activities = [...this.activities, id];
      } else {
        Vue.$toast.open({
          message: "Activity is already added",
          type: "warning",
        });
      }
    },
    removeActivityFromBlog(id) {
      const ids = this._.remove(this.activities, (n) => {
        return n !== id;
      });
      this.selectedBusinessActivities = this.selectedBusinessActivities.filter(
        (e) => e.id != id
      );
      this.activities = ids;
    },
    savePost(status) {
      this.event.status = status;
      this.event.activities = this.activities;
      this.uploading = true;
      this.created = false;
      if (this.selectedFile) {
        Vue.$toast.open({
          message: "Wait. We are creating your event...",
          type: "warning",
        });
        this.uploading = false;
        this.uploadImage();
      } else {
        this.submitPostNow();
      }
    },
    submitPostNow() {
      AxiosHelper.post("events", this.event)
        .then(() => {
          this.created = true;
          this.event = {};
          Vue.$toast.open({
            message: "Event has been created successfully",
            type: "success",
          });
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.uploading = false;
          this.created = false;
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while creating a event post",
            type: "error",
          });
        });
    },
    uploadImage() {
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
            // uploaded successfully, continue submiting article then
            this.event.flyer = `v${response.data.version}/${response.data.public_id}.${response.data.format}`;
            this.submitPostNow();
          })
          .catch((error) => {
             if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
            this.uploading = false;
            this.created = false;
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
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
    previewText() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
      });
      return marked(this.event.content);
    },
  },
};
</script>

<style scoped>
.content-form-sidebar {
  background: #f0f2f8;
  padding: 25px;
  border-radius: 3px;
}
</style>
