<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="blog" />
        <div class="wrap-content-head-btns" v-if="profile.role === 'normal'">
          <router-link
            :to="'/dashboard/content'"
            class="btn font-weight-bol btn-gray-outline ml-3"
            >Cancel</router-link
          >
          <button
            @click="updateArticle"
            class="btn font-weight-bold btn-primary-outline ml-3"
          >
            Update
          </button>
          <button
            v-if="post.status === 'pending' || post.status === 'draft'"
            @click="publishArticle"
            class="btn font-weight-bold btn-success-outline ml-3"
          >
            Publish
          </button>
          <button
            v-if="post.status === 'approved'"
            @click="unpublishArticle"
            class="btn font-weight-bold btn-danger-outline ml-3"
          >
            Unpublish
          </button>
        </div>
        <div class="clear" />
      </div>
      <div class="dash-container">
        <div
          v-if="
            profile.role === 'normal' ||
            profile.role === 'admin-blog' ||
            profile.role === 'super-admin'
          "
        >
          <h4 class="h5">
            <router-link :to="'/dashboard/content'" class="btn btn-back">
              <i class="icon-arrow-left" />
              <span class="ml-3"> Back </span>
            </router-link>
            <span class="text-blue-dark font-weight-bold">
              {{ post.title | truncate(65) }}
            </span>
          </h4>
          <div class="alert alert-info" v-if="editing">
            Wait, we are editing your content...
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

              <div class="alert alert-info" v-if="_.size(post.title) > 65">
                We are recommend short titles. Preferably not more thatn 65
                characters
              </div>
              <div class="form-group">
                <div class="form-group">
                  <textarea
                    style="height: auto"
                    rows="16"
                    class="form-control"
                    v-model="post.content"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-l-4">
              <div class="content-form-sidebar">
                <h3 class="h6">Which group are you trying to reach?</h3>
                <div
                  class="co-badge"
                  v-for="(act, index) in post.AudienceForPosts"
                  :key="index"
                >
                  <span
                    v-if="act.BusinessActivity && act.BusinessActivity.name"
                  >
                    {{ act.BusinessActivity.name }}
                  </span>
                  <button
                    v-if="act.BusinessActivity && act.BusinessActivity.name"
                    @click.prevent="removeActivityFromPost(act.activity)"
                  >
                    <img src="@/assets/images/remove.png" />
                  </button>
                </div>
                <a @click="updateActivities" class="btn btn-transparent px-1">
                  Add
                </a>
                <h3 class="h6 my-3">Featured Image</h3>
                <button
                  class="btn btn-block select-image"
                  @click="$refs.FileInput.click()"
                >
                  <span v-if="post.image"> Change image </span>
                  <span v-else> Select image </span>
                </button>
                <div class="image my-3" v-if="!selectedFile && post.image">
                  <img
                    :src="`${IMAGE_URL}c_fill,g_center,w_440,h_220/${post.image}`"
                    :alt="post.title"
                  />
                </div>
                <div class="my-3">
                  <input
                    ref="FileInput"
                    type="file"
                    style="display: none"
                    @change="onFileSelect"
                  />
                  <VueCropper
                    v-show="selectedFile && !imageUpdated"
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
import { VueEditor } from "vue2-editor";
let marked = require("marked");
import VModal from "vue-js-modal";
Vue.use(VModal);

export default {
  name: "edit-blog",
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
        content: "",
        tags: "",
        image: "",
        status: "pending",
        author: "",
      },
      toobar: [["bold", "italic", "underline"]],
      editorSettings: {
        modules: {
          clipboard: {
            matchVisual: false,
          },
        },
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
      listOfBusinessActivities: [],
      message: "",
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
  methods: {
    // load post
    loadPost() {
      AxiosHelper.get(`blog/info/${this.slug}`)
        .then((response) => {
          this.post = response.data.result;
          this.loaded = true;
          JSON.parse(this.post.tags).map((value) => {
            this.tags.push({ text: value });
          });
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
        type: "blog",
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
        `post/remove-activity?post=${this.post.id}&activity=${id}&type=blog`
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
    updateArticle() {
      const status = this.post.status;
      this.editing = true;
      this.savePost(status);
      this.message = "Blog has been updated successfully";
    },
    publishArticle() {
      const status = "pending";
      this.editing = true;
      this.savePost(status);
      this.message =
        "Blog has been submitted. It will be published after review";
    },
    unpublishArticle() {
      const status = "draft";
      this.editing = true;
      this.savePost(status);
      this.message =
        "Blog has been marked as draft. If you want to published again, please reflesh the page and click on publish";
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
      AxiosHelper.patch(`blog/edit/${this.post.id}`, this.post)
        .then(() => {
          this.created = true;
          Vue.$toast.open({
            message: this.message,
            type: "success",
          });
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
      this.editing = false;
    },
    uploadImage() {
      this.imageUpdated = false;
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
            this.selectedFile = false;
            this.imageUpdated = true;
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
