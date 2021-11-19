<template>
  <div>
    <h3 class="p-4">Update company logo</h3>
    <div class="px-4 py-2">
      <div class="wrap-modal" style="max-height: 420px; overflow: scroll">
        <img
          v-if="company && company.logo && !selectedFile"
          :src="`${IMAGE_URL}c_fill,g_center,h_420,w_420/${company.logo}`"
          :alt="company.coName"
          class="current-logo"
        />
        <img
          v-if="company && !company.logo && !selectedFile"
          src="@/assets/images/logo_placeholder.png"
          :alt="company.coName"
          class="current-logo"
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
        ></VueCropper>
      </div>

      <div class="mt-4">
        <button class="btn btn-danger-outline" @click="closeModal">
          Cancel
        </button>
        <button
          :disabled="!selectedFile"
          class="btn btn-success mr-2 float-right"
          @click="saveImage(), (dialog = false)"
        >
          Upload
        </button>
        <button
          class="btn btn-success mr-2 float-right"
          @click="$refs.FileInput.click()"
        >
          Browse logo
        </button>
        <div v-if="uploading" class="my-1 text-info">
          Uploading, please wait....
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import AxiosHelper from "@/helpers/AxiosHelper";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "logo-company-upload",
  props: ["company"],
  components: {
    VueCropper,
  },
  data() {
    return {
      companyInfo: {},
      mime_type: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      aspectRatio: 1,
      image: "",
      dialog: false,
      files: "",
      uploading: false,
    };
  },
  mounted() {
    this.companyInfo = { ...this.company };
  },
  methods: {
    closeModal() {
      this.$modal.hide("uploadCompanyLogo");
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
            this.companyInfo.logo = img_url;
            AxiosHelper.patch(
              `company/edit/${this.companyInfo.id}`,
              this.companyInfo
            )
              .then(() => {
                this.uploading = false;
                Vue.$toast.open({
                  message:
                    "Company logo has been upload, wait while we are uploading your information",
                  type: "success",
                });
                setTimeout(() => {
                  this.$router.go();
                }, 2500);
              })
              .catch(() => {
                this.uploading = false;
                Vue.$toast.open({
                  message:
                    "Sorry, something went wrong while update company logo",
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
  },
};
</script>
<style scoped>
.current-logo {
  margin: 0 auto;
  display: block;
  max-width: 420px;
  border-radius: 4px;
}
</style>