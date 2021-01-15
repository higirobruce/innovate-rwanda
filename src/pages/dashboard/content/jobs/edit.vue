<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="jobs" />
        <div class="wrap-content-head-btns" v-if="profile.role === 'normal'">
          <router-link
            :to="'/dashboard/content/jobs'"
            class="btn font-weight-bol btn-gray-outline ml-3"
            >Cancel</router-link
          >
          <button
            @click="updatePost"
            class="btn font-weight-bold btn-primary-outline ml-3"
          >
            Update
          </button>
          <button
            v-if="post.status === 'approved'"
            @click="unpublishPost"
            class="btn font-weight-bold btn-danger-outline ml-3"
          >
            Unpublish
          </button>
          <button
            v-if="post.status === 'draft'"
            @click="publishPost"
            class="btn font-weight-bold btn-success-outline ml-3"
          >
            Publish
          </button>
        </div>
        <div class="clear" />
      </div>
      <div class="dash-container">
        <div v-if="profile.role === 'normal'">
          <h4 class="h5">
            <router-link :to="'/dashboard/content/jobs'" class="btn btn-back">
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
          <!-- FORM: EDIT JOBS -->
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
                    rows="16"
                    class="form-control"
                    v-model="post.description"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-l-4">
              <div class="content-form-sidebar">
                <h3 class="h6">Category</h3>
                <div class="h4 mb-4">
                  {{ post.category }}
                </div>

                <h3 class="h6">Which group are you trying to reach?</h3>
                <div
                  class="co-badge"
                  v-for="(act, index) in post.AudienceForPosts"
                  :key="index"
                >
                  <span>
                    {{ act.BusinessActivity.name }}
                  </span>
                  <button @click.prevent="removeActivityFromPost(act.activity)">
                    <img src="@/assets/images/remove.png" />
                  </button>
                </div>
                <a @click="updateActivities" class="btn btn-transparent px-1">
                  Add
                </a>
                <div class="form-group" v-if="showOtherCategoryInput">
                  <h3 class="h6 my-3">Specify other category</h3>
                  <input
                    class="form-control custom-input"
                    v-model="post.category"
                    type="text"
                    placeholder="Type category..."
                  />
                </div>
                <h3 class="h6 my-3">Job attachment</h3>
                <button
                  class="btn btn-block select-image"
                  @click="$refs.file.click()"
                >
                  <span v-if="post.jobDetailsDocument">
                    Change job attachment
                  </span>
                  <span v-else> Select job attachment </span>
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
                  v-if="!selectedFile && post.jobDetailsDocument"
                >
                  <img
                    class="align-self-start mr-3"
                    src="@/assets/images/pdf.png"
                  />
                  <div class="media-body">
                    <h5 class="mt-2">Preview</h5>
                    <p>Job attachment</p>
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
import axios from "axios";
import AxiosHelper from "@/helpers/AxiosHelper";
import MenuContent from "@/components/MenuContent";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import categories from "@/data/blogCategories.js";
import { VueEditor } from "vue2-editor";
let marked = require("marked");
import VModal from "vue-js-modal";
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
      slug: "",
      post: {
        id: "",
        title: "",
        description: "",
        jobDetailsDocument: "",
        deadlineDate: "",
        deadlineTime: "",
        companyId: "",
        category: "",
        status: "",
      },
      categories: [],
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
    };
  },
  beforeCreate() {
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch(() => {});
  },
  created() {
    this.slug = this.$route.params.slug;
    this.loadPost();
  },
  mounted() {
    this.categories = categories;
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name;
      this.selectedFile = true;
    },
    // load post
    loadPost() {
      AxiosHelper.get(`jobs/info/${this.slug}`)
        .then((response) => {
          this.post = response.data.result;
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
        });
    },
    addActivityToPost(id, name) {
      const data = {
        post: this.post.id,
        activity: id,
        type: "job",
      };
      AxiosHelper.post("post/add-activity", data)
        .then(() => {
          this.loadPost();
          Vue.$toast.open({
            message: `"${name}" activity have been added successfully`,
            type: "success",
          });
        })
        .catch((error) => {
          if (error.response.status === 409) {
            Vue.$toast.open({
              message: "Activity has been already added",
              type: "warning",
            });
          } else {
            Vue.$toast.open({
              message: "Sorry, something went wrong. Try again later",
              type: "error",
            });
          }
        });
    },
    removeActivityFromPost(id) {
      AxiosHelper.delete(
        `post/remove-activity?post=${this.post.id}&activity=${id}&type=job`
      )
        .then(() => {
          this.loadPost();
          Vue.$toast.open({
            message: `Activity has been removed successfully`,
            type: "success",
          });
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. Try again later",
            type: "error",
          });
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
    publishPost() {
      const status = "pending";
      this.editing = true;
      this.savePost(status);
      this.message =
        "Job has been submitted. It will be published after review";
    },
    unpublishPost() {
      const status = "draft";
      this.editing = true;
      this.savePost(status);
      this.message =
        "Job has marked as draft. If you want to published again, please reflesh the page and click on publish";
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
    updateActivities() {
      this.$modal.show("openEditBusinessActivies");
    },
    closeModal() {
      this.$modal.hide("openEditBusinessActivies");
    },
    submitPostNow() {
      console.log("start submitting", this.post);
      AxiosHelper.patch(`jobs/edit`, this.post)
        .then(() => {
          this.created = true;
          Vue.$toast.open({
            message: "Job has been created successfully",
            type: "success",
          });
        })
        .catch((err) => {
          console.log("e", err);
          this.uploading = false;
          this.created = false;
          Vue.$toast.open({
            message: "Sorry, something went wrong while updating this jobb",
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
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dbvxqoznr/image/upload",
          formData,
          config
        )
        .then((response) => {
          this.post.jobDetailsDocument = `v${response.data.version}/${response.data.public_id}.${response.data.format}`;
          this.submitPostNow();
          console.log("file uploaded", this.post);
        })
        .catch((e) => {
          console.log("upload error", e);
          this.uploading = false;
          this.created = false;
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
