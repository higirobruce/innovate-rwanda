<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="jobs" />
        <div class="wrap-content-head-btns" v-if="profile.role === 'normal'">
          <router-link
            :to="'/dashboard/content/jobs'"
            class="btn font-weight-bol btn-gray-outline"
            >Cancel</router-link
          >
          <button
            @click.prevent="saveAsDraft('draft')"
            :disabled="job.title === ''"
            class="btn font-weight-bold btn-primary-outline ml-3"
          >
            Save as draft
          </button>
          <button
            :disabled="
              job.title === '' ||
              job.deadlineDate === '' ||
              job.deadlineTime === '' ||
              job.description === ''
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
        <div v-if="profile.role === 'normal'">
          <h4 class="h5">
            <router-link :to="'/dashboard/content/jobs'" class="btn btn-back">
              <i class="icon-arrow-left" />
              <span class="ml-3"> Back </span>
            </router-link>
            <span class="text-blue-dark font-weight-bold"> New Job </span>
          </h4>
          <div class="alert alert-info" v-if="creating">
            We are creating your job, please wait...
          </div>
          <div class="alert alert-success" v-if="created && !uploading">
            Your job has been posted successfully! Our admins will review and
            published it.
          </div>
          <!-- FORM: CREATE BLOG -->
          <div class="row">
            <div class="col-sm-12 col-md-8 col-l-8">
              <div class="form-group">
                <input
                  type="text"
                  v-model="job.title"
                  required
                  class="form-control custom-input"
                  placeholder="Job Title"
                />
              </div>
              <div class="form-group">
                <textarea
                  style="height: auto"
                  rows="16"
                  class="form-control"
                  v-model="job.description"
                ></textarea>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-l-4">
              <div class="content-form-sidebar">
                <div class="form-group" v-if="showOtherCategoryInput">
                  <h3 class="h6">Specify other category</h3>
                  <input
                    class="form-control custom-input"
                    v-model="job.category"
                    type="text"
                    placeholder="Type category..."
                  />
                </div>
                <h3 class="h6">Deadline</h3>
                <div class="my-3">
                  <date-picker
                    v-model="job.deadlineDate"
                    :type="'date'"
                    :placeholder="'Choose date'"
                    :format="'YYYY-MM-DD'"
                    valueType="format"
                  ></date-picker>
                </div>
                <div class="my-3">
                  <date-picker
                    v-model="job.deadlineTime"
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
                <h3 class="h6">Job attachment</h3>
                <button
                  class="btn btn-block select-image"
                  @click="$refs.file.click()"
                >
                  Select job attachment
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
import AxiosHelper from "@/helpers/AxiosHelper";
import File from "@/helpers/File";
import MenuContent from "@/components/MenuContent";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import VModal from "vue-js-modal";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
Vue.use(VModal);

export default {
  name: "write-job",
  components: {
    MenuContent,
    VueCropper,
    DatePicker,
  },
  data() {
    return {
      job: {
        title: "",
        description: "",
        jobDetailsDocument: "",
        deadlineDate: "",
        deadlineTime: "",
        companyId: "",
        category: "",
        status: "",
      },
      listOfBusinessActivities: "",
      selectedBusinessActivities: [],
      activities: [],
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
      showOtherCategoryInput: false,
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

  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name;
    },
    publishNow(status) {
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
      this.job.status = status;
      this.job.activities = this.activities;
      this.uploading = true;
      this.created = false;
      if (this.file) {
        Vue.$toast.open({
          message: "Wait. We are creating your job...",
          type: "warning",
        });
        this.uploading = false;
        this.uploadImage();
      } else {
        this.submitPostNow();
      }
    },
    submitPostNow() {
      AxiosHelper.post("jobs/post", this.job)
        .then(() => {
          this.created = true;
          this.job = {};
          Vue.$toast.open({
            message: "Blog has been created successfully",
            type: "success",
          });
        })
        .catch(() => {
          this.uploading = false;
          this.created = false;
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while creating a post",
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
          this.job.jobDetailsDocument = response.data.file;
          this.submitPostNow();
        })
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
