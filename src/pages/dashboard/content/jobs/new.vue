<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="jobs"/>
        <div class="wrap-content-head-btns" v-if="profile.role === 'normal'">
          <router-link
            :to="'/dashboard/content'"
            class="btn font-weight-bol btn-gray-outline"
            >Cancel</router-link
          >
          <button
            @click="saveAsDraft('draft')"
            :disabled="post.title === ''"
            class="btn font-weight-bold btn-primary-outline ml-3"
          >
            Save as draft
          </button>
          <button
            @click="publishArticle('pending')"
            :disabled="
              post.title === '' || post.category === '' || post.content === ''
            "
            class="btn font-weight-bold btn-success-outline ml-3"
          >
            Publish
          </button>
        </div>
      </div>
      <div class="dash-container">
        {{ typeof tags }} {{ tags }}
        <div v-if="profile.role === 'normal'">
          <h4 class="h5">
            <router-link :to="'/dashboard/content/blog'" class="btn btn-back">
              <icon class="icon" icon="arrow-left" />
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
                <vue-editor
                  :editorToolbar="toobar"
                  v-model="post.content"
                  :editorOptions="editorSettings"
                ></vue-editor>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-l-4">
              <div class="content-form-sidebar">
                <h3 class="h6">Category</h3>
                <div class="form-group">
                  <select
                    class="form-control form-control-lg"
                    name="category"
                    v-model="post.category"
                    @change="changeCategory($event)"
                  >
                    <option value="" selected disabled>Select category</option>
                    <option
                      v-for="(cat, index) in categories"
                      v-bind:value="cat.name"
                      :key="index"
                    >
                      {{ cat.name }}
                    </option>
                    <option value="other">Other category</option>
                  </select>
                </div>
                <div class="form-group" v-if="showOtherCategoryInput">
                  <h3 class="h6">Specify other category</h3>
                  <input
                    class="form-control custom-input"
                    v-model="post.category"
                    type="text"
                    placeholder="Type category..."
                  />
                </div>
                <h3 class="h6">Tags</h3>
                <vue-tags-input
                  v-model="post.tags"
                  :tags="tags"
                  @tags-changed="(newTags) => (tags = newTags)"
                />
                <h3 class="h6">Featured Image</h3>
                <button class="btn btn-block" @click="$refs.FileInput.click()">
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
import VueTagsInput from "@johmun/vue-tags-input";
import { VueEditor } from "vue2-editor";

export default {
  name: "write-blog",
  components: {
    MenuContent,
    VueCropper,
    VueTagsInput,
    VueEditor,
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
        tags: "",
        image: "",
        status: "pending",
        author: "",
        category: "",
      },
      toobar: [["bold", "italic", "underline"]],
      editorSettings: {
        modules: {
          clipboard: {
            matchVisual: false,
          },
        },
      },
      tags: [],
      categories: [],
      mime_type: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      aspectRatio: 2/1,
      image: "",
      dialog: false,
      files: "",
      uploading: false,
      created: false,
      showOtherCategoryInput: false,
    };
  },
  mounted() {
    this.categories = categories;
    this.post.author = `${this.profile.firstName} ${this.profile.lastName}`;
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
    publishArticle(status) {
      this.savePost(status);
    },
    saveAsDraft(status) {
      this.savePost(status);
    },
    savePost(status) {
      this.post.status = status;
      this.uploading = true;
      this.created = false;
      // convert tags
      let getTags = [];
      if (this.tags) {
        for (const value of this.tags) {
          getTags = [...getTags, value.text];
        }
        this.post.tags = JSON.stringify(getTags);
      }
      if (this.selectedFile) {
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
              "Sorry, something went wrong while updating your social media accounts",
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
  },
};
</script>

<style scoped>
.content-form-sidebar {
  background: #f0f2f8;
  padding: 25px;
  border-radius: 3px;
}
.content-form-sidebar button {
  border: 1px solid #5e7c8d;
  background: #f0f2f8;
  border-radius: 3px;
}
</style>
