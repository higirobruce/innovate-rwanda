<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Settings</h2>
        <MenuSettings active="type" />
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container">
        <div class="wrap-dash-box">
          <h1 class="font-weight-light text-blue-dark h3">
            Company/Institution types
            <span class="float-right">
              <button
                class="btn btn-sm font-weight-bold btn-primary-outline"
                @click.prevent="addActivity"
                type="button"
              >
                Add
              </button>
            </span>
          </h1>
          <div class="clear"></div>
          <div v-if="loading">
            <Loading />
          </div>
          <ul v-if="!loading && types" class="list-group list-group-flush">
            <li
              class="list-group-item py-4 px-0"
              v-for="(act, index) in types"
              :key="index"
            >
              <div class="row">
                <div class="col-sm-12 col-md-2 col-lg-2">
                  <div
                    class="image cursor-pointer"
                    @click.prevent="addCategoryImage(act)"
                  >
                    <img
                      v-if="act.image"
                      class="d-block float-left"
                      :src="`${IMAGE_URL}c_fill,g_center,w_80,h_80/${act.image}`"
                    />
                    <img
                      v-else
                      class="d-block float-left"
                      src="@/assets/images/logo_placeholder.png"
                    />
                    <button @click.prevent="addCategoryImage(act)">
                      <img src="@/assets/images/change-photo.png" />
                    </button>
                  </div>
                </div>

                <div class="col-sm-12 col-md-10 col-lg-10">
                  <div>
                    <h5 class="p-0 m-0">
                      {{ act.name }}
                    </h5>
                    <div>{{ act.description }}</div>
                    <div class="wrap-actions">
                      <button>
                        Order: {{ act.id }} (<span
                          class="bold text-primary"
                          @click="openTypeReorder(act)"
                        >
                          Change</span
                        >
                        <img
                          src="@/assets/images/arrow-down.png"
                          alt="delete"
                        />
                        )
                      </button>
                      <button type="button" @click.prevent="editType(act)">
                        <img src="@/assets/images/edit.png" alt="edit" /> Edit
                      </button>
                      <button @click.prevent="deleteRecord(act.id)">
                        <img src="@/assets/images/delete.png" alt="delete" />
                        Delete
                      </button>
                      <!-- wrap-order -->
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              v-if="!loading && _.size(types) === 0"
              class="list-group-item px-1 py-4"
            >
              No type yet
            </li>
          </ul>
        </div>
      </div>
      <!-- REORDER COMPANY TYPES -->
      <modal
        name="reorderModal"
        :adaptive="true"
        :scrollable="true"
        :width="600"
      >
        <!-- :height="240" -->
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <h3 class="p-4">Update display order</h3>
        <div class="p-3">
          <div>
            Current display order of <b>{{ activeType && activeType.name }}:</b>
            {{ activeType && activeType.display_order }}
          </div>
          <div>Select new order</div>
          <div>
            <select name="display_order" id="">
              <option value="something"
              v-for="(o, index) in types"
              :key="index"
              >1</option>
              <option value="something1"> {{ index + 1 }} </option>
              <option value="something3">3</option>
            </select>
            <button>Update</button>
          </div>
          <!-- <ul class="list-group">
            <li
              class="list-group-item"
              @click="updateTypeOrder(act, index + 1)"
            >
              {{ o.name }} Set to order #{{ index + 1 }}
            </li>
          </ul> -->
        </div>
      </modal>
      <!-- DELETE ACTIVITY -->
      <modal
        name="openDeleteRecord"
        :adaptive="true"
        :scrollable="true"
        :height="240"
        :width="600"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <DeleteModal
          :url="`company-types/remove-type?type=${recordId}`"
          entity="company type"
        />
      </modal>
      <!-- ADD NEW ACTIVITY -->
      <modal
        name="openAddActivity"
        :adaptive="true"
        :scrollable="true"
        :height="440"
        :width="600"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <h3 class="p-4">Create company type</h3>
        <div class="m-4">
          <form @submit="submitType">
            <h4 class="mt-3">Institution type</h4>
            <div
              :class="`${
                $v.form.$invalid === true
                  ? 'form-group has-error'
                  : 'form-group'
              }`"
            >
              <input
                type="text"
                v-model="form.name"
                required
                class="form-control custom-input"
                placeholder="Institution type..."
              />
            </div>
            <h4 class="mt-3">Description</h4>
            <div
              :class="`${
                $v.form.$invalid === true
                  ? 'form-group has-error'
                  : 'form-group'
              }`"
            >
              <input
                type="text"
                v-model="form.description"
                required
                class="form-control custom-input"
                placeholder="Typp description..."
              />
            </div>
          </form>
        </div>
        <div class="my-2 mx-4">
          <span class="float-left">
            <button
              @click="submitType"
              class="btn btn-success-outline float-right"
            >
              Submit
            </button>
          </span>
          <span class="float-right">
            <button @click="closeModal" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
          <Loading v-if="adding && !added" />
        </div>
      </modal>
      <!-- EDIT ACTIVITY -->
      <modal
        name="openEditType"
        :adaptive="true"
        :scrollable="true"
        :height="450"
        :width="700"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <h3 class="p-4">Edit company type</h3>

        <div class="m-4">
          <form @submit="submitEditType">
            <h4 class="mt-3">Type</h4>
            <div
              :class="`${
                $v.activity.$invalid === true
                  ? 'form-group has-error'
                  : 'form-group'
              }`"
            >
              <input
                type="text"
                v-model="activity.name"
                required
                class="form-control custom-input"
                placeholder="Type"
              />
            </div>
            <h4 class="mt-3">Description</h4>
            <div
              :class="`${
                $v.activity.$invalid === true
                  ? 'form-group has-error'
                  : 'form-group'
              }`"
            >
              <input
                type="text"
                v-model="activity.description"
                required
                class="form-control custom-input"
                placeholder="Type desciption"
              />
            </div>
          </form>
        </div>
        <div class="my-2 mx-4">
          <span class="float-left">
            <button
              @click="submitEditType"
              class="btn btn-success-outline float-right"
            >
              Submit
            </button>
          </span>
          <span class="float-right">
            <button @click="closeModal" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
          <Loading v-if="editing && !edited" />
        </div>
      </modal>

      <!-- EDIT ACTIVITY -->
      <modal
        name="openUploadCategoryImage"
        :adaptive="true"
        :scrollable="true"
        :height="650"
        :width="700"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <h3 class="p-4">Category image</h3>

        <div class="my-2 mx-4">
          <button
            class="btn btn-gray-outline btn-block mx-auto"
            @click="$refs.FileInput.click()"
          >
            Browse logo
          </button>
        </div>
        <div class="m-4 wrap-image-cropper">
          <div
            v-if="currentCategory && currentCategory.image && !selectedFile"
            class="current-image"
          >
            <img
              :src="`${IMAGE_URL}c_fill,g_center,h_420,w_420/${currentCategory.image}`"
              class="current-image"
            />
          </div>
          <div
            class="current-image"
            v-if="currentCategory && !currentCategory.image && !selectedFile"
          >
            <img src="@/assets/images/logo_placeholder.png" />
          </div>
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
            :img-style="{ width: '500px', height: '400px' }"
            :aspectRatio="aspectRatio"
          ></VueCropper>
        </div>
        <div class="clear"></div>
        <div class="my-2 mx-4">
          <span class="float-left">
            <button
              @click="submiCategoryImage"
              class="btn btn-success-outline float-right"
            >
              Upload &amp; Update
            </button>
          </span>
          <span class="float-right">
            <button @click="closeModal" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
          <Loading v-if="editing && !edited" />
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
import DeleteModal from "@/components/DeleteModal";
import Loading from "@/components/Loading";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import VModal from "vue-js-modal";
Vue.use(VModal);
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "dashboard",
  components: { MenuSettings, DeleteModal, Loading, VueCropper },
  data() {
    return {
      types: [],
      recordId: "",
      form: {
        name: "",
        description: "",
      },
      activity: {},
      loading: true,
      added: false,
      adding: false,
      editing: false,
      edited: false,
      selectedFile: "",
      currentCategory: "",
      aspectRatio: 1,
      size: {},
      activeType: undefined,
    };
  },
  created() {
    this.loadCompanyTypes();
  },
  methods: {
    submiCategoryImage() {
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
            this.activity.image = img_url;
            this.submitEditType();
          })
          .catch(() => {
            this.uploading = false;
          });
      }, this.mime_type);
    },
    submitEditType() {
      this.edited = false;
      this.editing = true;
      AxiosHelper.patch("company-types/edit-type", this.activity)
        .then(() => {
          Vue.$toast.open({
            message: "Company type has been edited successfully",
            type: "success",
          });
          this.loadCompanyTypes();
          this.edited = true;
          this.editing = false;
          this.$modal.hide("openUploadCategoryImage");
        })
        .catch(() => {
          this.editing = false;
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating company type",
            type: "error",
          });
        });
    },
    submitType() {
      this.added = false;
      this.adding = true;
      AxiosHelper.post("company-types/add-type", this.form)
        .then(() => {
          Vue.$toast.open({
            message: "Company type has been added successfully",
            type: "success",
          });
          this.loadCompanyTypes();
          this.added = true;
          this.adding = false;
          this.$modal.hide("openAddActivity");
        })
        .catch(() => {
          this.adding = false;
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while creating a business type",
            type: "error",
          });
        });
    },
    loadCompanyTypes() {
      AxiosHelper.get("company-types")
        .then((response) => {
          this.types = response.data.result;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    updateTypeOrder(type, display_order) {
      type.display_order = display_order;
      console.log("type", type);
      AxiosHelper.patch("company-types/edit-type", type)
        .then(() => {
          Vue.$toast.open({
            message: "Company type order has been updated successfully",
            type: "success",
          });
          this.loadCompanyTypes();
          this.edited = true;
          this.editing = false;
          this.loading = false;
        })
        .catch(() => {
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating your the display order",
            type: "error",
          });
          this.loading = false;
        });
    },
    deleteRecord(id) {
      this.recordId = id;
      this.$modal.show("openDeleteRecord");
    },
    addActivity() {
      this.form = {};
      this.$modal.show("openAddActivity");
    },
    editType(act) {
      this.activity = act;
      this.$modal.show("openEditType");
    },
    addCategoryImage(cat) {
      this.selectedFile = "";
      this.currentCategory = cat;
      this.activity = cat;
      this.$modal.show("openUploadCategoryImage");
    },
    closeModal() {
      this.$modal.hide("openAddActivity");
      this.$modal.hide("openEditType");
      this.$modal.hide("openUploadCategoryImage");
      this.$modal.hide("openDeleteRecord");
      this.$modal.hide("reorderModal");
    },
    changeOrder(id) {
      console.log("changeOrder", id);
    },
    openTypeReorder(type) {
      this.activeType = type;
      this.$modal.show("reorderModal");
      // console.log('#', this.$refs[0].classList)
      // this.$refs["key" + key][0].classList.add("show-options");
    },
    // hideDisplayOption() {
    // for (const classname of this.$refs["key" + key][0].classList) {
    // console.log("classname", this.$refs);
    // this.$refs[classname[0]].classList.remove("show-options");
    // }
    // },
    onFileSelect(e) {
      const file = e.target.files[0];
      this.mime_type = file.type;
      console.log(this.mime_type);
      if (typeof FileReader === "function") {
        this.dialog = true;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedFile = event.target.result;
          const image = new Image();
          image.src = event.target.result;
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
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(55),
      },
      description: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(140),
      },
    },
    activity: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
    },
  },
};
</script>

<style scoped>
.wrap-image-cropper {
  max-height: 450px;
  overflow-y: auto;
}
.current-image {
  width: 350px;
  height: 350px;
  margin: 0 auto;
  display: block;
}
.current-image img {
  width: 350px;
  margin: 0 auto;
  display: block;
}
.image {
  position: relative;
  margin-top: 5px;
  margin-left: 10px;
}
.image button {
  position: absolute;
  bottom: -5px;
  right: -5px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
}
.image {
  width: 70px;
  height: 70px;
}
.wrap-order {
  position: absolute;
  top: 35px;
  width: 180px;
  left: 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  text-align: left;
  cursor: pointer;
  display: none;
}
.wrap-order li:hover {
  background: #f2f2f2;
}
.show-options {
  display: block;
}
</style>
