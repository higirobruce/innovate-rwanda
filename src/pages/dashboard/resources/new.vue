<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Resources</h2>
        <div
          class="wrap-content-head-btns"
          v-if="profile && profile.role !== 'normal'"
        >
          <router-link
            :to="'/dashboard/resources'"
            class="btn font-weight-bol btn-gray-outline"
            >Cancel</router-link
          >
          <button
            :disabled="
              !characterLength ||
              resource.title === '' ||
              resource.description === '' ||
              resource.type === '' ||
              file === ''
            "
            type="button"
            @click.prevent="publishNow('pending')"
            class="btn font-weight-bold btn-success-outline ml-3"
          >
            Publish
          </button>
        </div>
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container">
        <div
          v-if="
            profile && profile.role !== 'normal' && !typesLoading && typesLoaded
          "
        >
          <h4 class="h5">
            <router-link :to="'/dashboard/resources'" class="btn btn-back">
              <i class="icon-arrow-left" />
              <span class="ml-3"> Back </span>
            </router-link>
            <span class="text-blue-dark font-weight-bold"> New Resource </span>
          </h4>
          <div class="alert alert-info" v-if="creating">
            Please wait, we are creating a resource...
          </div>
          <div class="alert alert-success" v-if="created && !uploading">
            Resource has been published successfully
          </div>
          <!-- FORM: CREATE BLOG -->
          <div class="row">
            <div class="col-sm-12 col-md-8 col-l-8">
              <div class="form-group">
                <input
                  type="text"
                  v-model="resource.title"
                  required
                  class="form-control custom-input"
                  placeholder="Resource title"
                />
              </div>
              <div class="form-group">
                <textarea
                  style="height: auto"
                  rows="5"
                  class="form-control"
                  @keydown="checkCharacterLength"
                  v-model="resource.description"
                ></textarea>
              </div>
              <div class="text-info">
                Description should not exceed 255 characters{{ 255 - resource.description.length }} )
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-l-4">
              <div class="content-form-sidebar">
                <h3 class="h6">Resource type</h3>
                <div class="my-3">
                  <select
                    class="form-control form-control-lg"
                    name="district"
                    v-model="resource.type"
                  >
                    <option value="" selected disabled>Select type</option>
                    <option
                      v-for="(type, index) in resourceTypes"
                      v-bind:value="type.name"
                      :key="index"
                    >
                      {{ type.name }}
                    </option>
                  </select>
                </div>
                <h3 class="h6">Resource attachment</h3>
                <button
                  class="btn btn-block select-image"
                  @click="$refs.file.click()"
                >
                  Select resource attachment
                </button>
                <div class="my-3">
                  <input
                    type="file"
                    id="file"
                    ref="file"
                    style="display: none"
                    accept="application/pdf"
                    @change="handleFileUpload()"
                  />
                </div>
                <div class="media p-3 bg-white rounded" v-if="file">
                  <img
                    class="align-self-start mr-3"
                    src="@/assets/images/pdf.png"
                    alt="Generic placeholder image"
                  />
                  <div class="media-body" style="overflow: hidden">
                    <h5 class="mt-2">Preview</h5>
                    <p class="text-truncate">
                      {{ fileName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Update activities -->
        </div>
        <div
          v-if="
            profile && profile.role === 'normal' && !typesLoading && typesLoaded
          "
          class="not-allowed"
        ></div>
        <Loading v-if="typesLoading && !typesLoaded" />
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import File from "@/helpers/File";
import Loading from "@/components/Loading";

export default {
  components: {
    Loading,
  },
  name: "post-resource",
  data() {
    return {
      resource: {
        title: "",
        description: "",
        file: "",
        type: "",
      },
      mime_type: "",
      cropedImage: "",
      autoCrop: true,
      selectedFile: "",
      aspectRatio: 2 / 1,
      image: "",
      dialog: false,
      files: "",
      uploading: false,
      created: false,
      creating: false,
      file: "",
      fileName: "",
      resourceTypes: [],
      typesLoading: false,
      typesLoaded: false,
      characterLength: false,
    };
  },
  created() {
    this.loadResourceTypes();
  },
  mounted() {
    // this.resourceTypes = resourceTypes;
  },
  methods: {
    checkCharacterLength(e) {
      parseInt(this.resource.description.length) > 5 &&
      parseInt(this.resource.description.length) < 355
        ? (this.characterLength = true)
        : (this.characterLength = false);
    },
    loadResourceTypes() {
      this.typesLoading = true;
      this.typesLoaded = false;
      AxiosHelper.get("resources-types")
        .then((response) => {
          this.resourceTypes = response.data.result;
          this.typesLoading = false;
          this.typesLoaded = true;
        })
        .catch(() => {
          this.typesLoading = false;
          this.typesLoaded = false;
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name;
    },
    publishNow(status) {
      this.savePost(status);
    },
    savePost(status) {
      this.resource.status = status;
      this.uploading = true;
      this.created = false;
      if (this.file) {
        Vue.$toast.open({
          message: "Wait. We are creating your resource...",
          type: "warning",
        });
        this.uploading = false;
        this.uploadImage();
      } else {
        this.submitPostNow();
      }
    },
    submitPostNow() {
      AxiosHelper.post("resources/add-resource", this.resource)
        .then(() => {
          this.created = true;
          this.resource = {};
          Vue.$toast.open({
            message: "Resource has been created successfully",
            type: "success",
          });
        })
        .catch(() => {
          this.uploading = false;
          this.created = false;
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later",
            type: "error",
          });
        });
    },
    uploadImage() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", "wjjxv2a4");
      formData.append("cloud_name", "dbvxqoznr");
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };
      File.upload("upload", formData, config)
        .then((response) => {
          this.resource.file = response.data.file;
          this.submitPostNow();
        })
        .catch(() => {});
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
</style>
