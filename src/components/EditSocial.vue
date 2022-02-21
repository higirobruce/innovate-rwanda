<template>
  <div>
    <h3 class="p-4">Social media</h3>
    <div class="p-3">
      <div class="row">
        <div class="col-12">
          <div class="mb-3">Social network of the organization</div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                style="color: #1da1f2; background: #ffffff"
                class="input-group-text"
              >
                <i class="icon-twitter mr-2" />
                https://twitter.com/</span
              >
            </div>
            <input
              type="text"
              v-model="socialMedia.twitter"
              class="form-control"
              placeholder="type here..."
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                style="color: #007bb5; background: #ffffff"
                class="input-group-text"
              >
                <i class="icon-linkedin-alt mr-2" />
                https://linkedin.com/company/</span
              >
            </div>
            <input
              type="text"
              v-model="socialMedia.linkedin"
              class="form-control"
              placeholder="type here..."
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                style="color: #1877f2; background: #ffffff"
                class="input-group-text"
              >
                <i class="icon-facebook-official mr-2" />
                https://facebook.com/</span
              >
            </div>
            <input
              type="text"
              v-model="socialMedia.facebook"
              class="form-control"
              placeholder="type here..."
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                style="color: #4c5fd7; background: #ffffff"
                class="input-group-text"
              >
                 <i class="icon-instagram mr-2" />
                https://instagram.com/</span
              >
            </div>
            <input
              type="text"
              v-model="socialMedia.instagram"
              class="form-control"
              placeholder="type here..."
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                style="color: #ff0000; background: #ffffff"
                class="input-group-text"
              >
                 <i class="icon-youtube-play mr-2" />
                https://youtube.com/c/</span
              >
            </div>
            <input
              type="text"
              v-model="socialMedia.youtube"
              class="form-control"
              placeholder="type here..."
            />
          </div>

          <div class="mt-4">
            <span class="float-left">
              <button
                @click="updateSocialMedia"
                class="btn btn-success-outline mr-2"
              >
                Save
              </button>
            </span>
            <span class="float-right">
              <button
                type="button"
                @click="closeModal"
                class="btn btn-gray-outline mr-2"
              >
                Close
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
export default {
  name: "edit-social",
  props: ["company"],
  data() {
    return {
      socialMedia: {},
    };
  },
  mounted() {
    this.socialMedia = this.convertToObject(this.company.socialMedia) || {};
  },
  methods: {
    closeModal() {
      this.$modal.hide("editSocialMedia");
    },
    updateSocialMedia() {
      const socialMedia = JSON.stringify(this.socialMedia);
      this.company.socialMedia = socialMedia;
      AxiosHelper.patch(`company/edit/${this.company.id}`, this.company)
        .then(() => {
          Vue.$toast.open({
            message: "Social media accounts  of the company have been updated",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2000);
        })
        .catch((error) => {
          if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating your social media accounts",
            type: "error",
          });
        });
    },
    convertToObject(object) {
      return JSON.parse(object);
    },
  },
};
</script>