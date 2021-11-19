<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="blog" />
        <div class="wrap-content-head-btns" v-if="profile.role === 'normal'">
          <router-link
            :to="'/dashboard/content'"
            class="btn font-weight-bol btn-gray-outline mr-3"
            >Cancel</router-link
          >
          <button
            @click="saveAsDraft('draft')"
            :disabled="post.title === ''"
            class="btn font-weight-bold btn-primary-outline mr-3"
          >
            Save as draft
          </button>
          <button
            @click="publishAPost('pending')"
            :disabled="
              post.title === '' || post.content === ''
            "
            class="btn font-weight-bold btn-success-outline mr-3"
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
            <router-link :to="'/dashboard/content'" class="btn btn-back">
              <i class="icon-arrow-left" />
              <span class="ml-3"> Back </span>
            </router-link>
            <span class="text-blue-dark font-weight-bold"> New post </span>
          </h4>
          <div class="alert alert-info" v-if="!created && uploading">
            Wait, we are creating your content...
          </div>
          <div class="alert alert-success" v-if="created && !uploading">
            Your content has been created successfully!
          </div>
          <!-- FORM: CREATE BLOG -->
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
                <textarea
                  style="height: auto"
                  rows="16"
                  class="form-control"
                  v-model="post.content"
                ></textarea>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-l-4">
              <div class="content-form-sidebar">
                <div class="form-group" v-if="showOtherCategoryInput">
                  <h3 class="h6">Specify other category</h3>
                  <input
                    class="form-control custom-input"
                    v-model="post.category"
                    type="text"
                    placeholder="Type category..."
                  />
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
import MenuContent from "@/components/MenuContent";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import categories from "@/data/blogCategories.js";
import VModal from "vue-js-modal";
Vue.use(VModal);

let marked = require("marked");

export default {
  name: "write-blog",
  components: {
    MenuContent,
    VueCropper,
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
        type: "",
        image: "",
        status: "pending",
        author: "",
        category: "",
      },
      listOfBusinessActivities: "",
      selectedBusinessActivities: [],
      activities: [],
      categories: [],
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
      showOtherCategoryInput: false,
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
  mounted() {
    this.categories = categories;
  },
  methods: {
    changeCategory(e) {
      if (e.target.value === "other") {
        this.showOtherCategoryInput = true;
        this.post.category = "";
      } else {
        this.showOtherCategoryInput = false;
        this.post.category = e.target.value;
      }
    },
    publishAPost(status) {
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
      this.post.status = status;
      this.post.activities = this.activities;
      this.uploading = true;
      this.created = false;
      if (this.selectedFile) {
        Vue.$toast.open({
          message: "Wait. We are creating your post...",
          type: "warning",
        });
        this.uploading = false;
        this.uploadImage();
      } else {
        this.submitPostNow();
      }
    },
    submitPostNow() {
      AxiosHelper.post("blog/post", this.post)
        .then(() => {
          this.created = true;
          this.post = {}
          Vue.$toast.open({
            message: "Blog has been created successfully",
            type: "success",
          });
          setTimeout(() => {
            // this.$router.go();
          }, 4500);
        })
        .catch(() => {
          this.uploading = false;
          this.created = false;
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while creating a blog post",
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
            this.post.image = `v${response.data.version}/${response.data.public_id}.${response.data.format}`;
            this.submitPostNow();
          })
          .catch(() => {
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
      return marked(this.post.content);
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
