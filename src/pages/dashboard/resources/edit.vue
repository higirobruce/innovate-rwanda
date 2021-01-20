<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Resources</h2>
        <div
          class="wrap-content-head-btns"
          v-if="profile.role === 'super-admin'"
        >
          <router-link
            :to="'/dashboard/resources'"
            class="btn font-weight-bol btn-gray-outline"
            >Cancel</router-link
          >
          <button
            @click="updatePost"
            class="btn font-weight-bold btn-primary-outline ml-3"
          >
            Update
          </button>
        </div>
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container">
        <div v-if="profile.role === 'super-admin'">
          <h4 class="h5">
            <router-link :to="'/dashboard/resources'" class="btn btn-back">
              <i class="icon-arrow-left" />
              <span class="ml-3"> Back </span>
            </router-link>
            <span class="text-blue-dark font-weight-bold">
              {{ post.title }}
            </span>
          </h4>
          <div class="alert alert-info" v-if="!created && editing">
            Wait, we are editing your content...
          </div>
          <div class="alert alert-success" v-if="created && !uploading">
            Your content has been created successfully!
          </div>
          <!-- FORM: EDIT RESOURCES -->
          <div class="row">
            <div class="col-sm-12 col-md-8 col-l-8">
              <div class="form-group">
                <input
                  type="text"
                  v-model="post.title"
                  required
                  class="form-control custom-input"
                  placeholder="Post Title"
                />
              </div>
              <div class="form-group">
                <div class="form-group">
                  <textarea
                    style="height: auto"
                    rows="5"
                    class="form-control"
                    v-model="post.description"
                  ></textarea>
                </div>
                <div class="text-info">
                  Description should not exceed 255 characters
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-l-4">
              <div class="content-form-sidebar">
                <h3 class="h6">Resource type</h3>
                <div class="h4 mb-4">
                  <div class="my-3">
                    <select
                      class="form-control form-control-lg"
                      name="district"
                      v-model="post.type"
                    >
                      <option value="" selected disabled>Select type</option>
                      <option
                        v-for="(type, index) in resourceTypes"
                        v-bind:value="type"
                        :key="index"
                        :selected="post.type === type"
                      >
                        {{ type }}
                      </option>
                    </select>
                  </div>
                </div>

                <h3 class="h6 my-3">Resource attachment</h3>
                <button
                  class="btn btn-block select-image"
                  @click="$refs.file.click()"
                >
                  <span v-if="post.file"> Change resource attachment </span>
                  <span v-else> Select resource attachment </span>
                </button>
                <input
                  type="file"
                  id="file"
                  ref="file"
                  style="display: none"
                  accept="application/pdf"
                  @change="handleFileUpload()"
                />
                <div
                  class="media mt-3 p-3 bg-white rounded"
                  v-if="!selectedFile && post.file"
                >
                  <img
                    class="align-self-start mr-3"
                    src="@/assets/images/pdf.png"
                  />
                  <div class="media-body">
                    <h5 class="mt-2">Preview</h5>
                    <p>Resource attachment</p>
                  </div>
                </div>
                <div
                  class="media mt-3 p-3 bg-white rounded"
                  v-if="selectedFile"
                >
                  <img
                    class="align-self-start mr-3"
                    src="@/assets/images/pdf.png"
                  />
                  <div class="media-body">
                    <h5 class="mt-2">Preview</h5>
                    <p>
                      {{ fileName }}
                    </p>
                  </div>
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
            <h3 class="p-4 bottom-shadow shadow">Business activities</h3>
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
                          @click.prevent="addActivityToPost(a.id, a.name)"
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
import File from "@/helpers/File";
import AxiosHelper from "@/helpers/AxiosHelper";
import MenuContent from "@/components/MenuContent";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { VueEditor } from "vue2-editor";
let marked = require("marked");
import VModal from "vue-js-modal";
import resourceTypes from "@/data/resourceTypes.js";
Vue.use(VModal);

export default {
  name: "edit-event",
  components: {
    MenuContent,
    VueCropper,
    VueEditor,
  },
  data() {
    return {
      id: "",
      post: {
        id: "",
        title: "",
        description: "",
        type: "",
        file: "",
      },
      mime_type: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      aspectRatio: 16 / 9,
      image: "",
      dialog: false,
      files: "",
      uploading: false,
      created: false,
      editing: false,
      imageUpdated: false,
      showOtherCategoryInput: false,
      listOfBusinessActivities: [],
      file: "",
      fileName: "",
      resourceTypes: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.loadPost();
  },
  mounted() {
    this.resourceTypes = resourceTypes;
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name;
      this.selectedFile = true;
    },
    // load post
    loadPost() {
      AxiosHelper.get(`resources/${this.id}`)
        .then((response) => {
          this.post = response.data.result;
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
        });
    },
    changeCategory(e) {
      if (e.target.value === "other") {
        this.showOtherCategoryInput = true;
        this.post.category = "";
      } else {
        this.showOtherCategoryInput = false;
        this.post.category = e.target.value;
      }
    },
    updatePost() {
      const status = this.post.status;
      this.editing = true;
      this.savePost(status);
    },
    savePost(status) {
      this.post.status = status;
      this.uploading = true;
      this.created = false;
      if (this.selectedFile) {
        this.uploading = false;
        this.uploadImage();
      } else {
        this.submitPostNow();
      }
    },
    submitPostNow() {
      AxiosHelper.patch(`resources/edit-resource`, this.post)
        .then(() => {
          this.created = true;
          Vue.$toast.open({
            message: "Resource has been created successfully",
            type: "success",
          });
        })
        .catch((err) => {
          console.log("e", err);
          this.uploading = false;
          this.created = false;
          Vue.$toast.open({
            message: "Sorry, something went wrong. Try again later",
            type: "error",
          });
        });
      this.editing = false;
    },
    uploadImage() {
      this.imageUpdated = false;
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", "wjjxv2a4");
      formData.append("cloud_name", "dbvxqoznr");
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      File.upload("upload", formData, config)
        .then((response) => {
          this.post.file = response.data.file;
          this.submitPostNow();
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    onFileSelect(e) {
      const file = e.target.files[0];
      this.mime_type = file.type;
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
      return marked(this.post.description);
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
