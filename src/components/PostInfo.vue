<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Blog: {{ post.title }}</h3>
    <div class="px-4 py-2" style="max-height: 600px; overflow: auto">
      <div class="head-post">
        <div class="mb-3">
          <span class="text-blue">
            {{ post.author }}
          </span>
          <span class="ml-2 text-gray">
            {{ post.createdAt | date("DD MMM YYYY") }}
          </span>
        </div>
        <div class="image">
          <img
            v-if="post.image"
            :src="`${IMAGE_URL}c_fill,g_center,w_1200/${post.image}`"
            :alt="post.title"
            class="current-logo"
          />
        </div>
        <div class="wrap-post-content" :inner-html.prop="post.content"></div>
      </div>
    </div>
    <div class="my-2 mx-4">
      <button
        v-if="
          (profile.role === 'admin-blog' ||
          profile.role === 'super-admin') &&
          post.status === 'pending' ||
          post.status === 'declined'
        "
        @click="approveOrDecline('approved', post.id)"
        class="btn btn-success-outline mr-2"
      >
        Approve &amp; Publish
      </button>
      <button
        v-if="
          (profile.role === 'admin-blog' ||
          profile.role === 'super-admin') &&
          post.status === 'pending' ||
          post.status === 'approved'
        "
        @click="approveOrDecline('declined', post.id)"
        class="btn mr-2 btn-danger-outline"
      >
        Decline
      </button>
      <button
        v-if="profile.role === 'normal' && post.status === 'pending'"
        @click="approveOrDecline('declined', post.id)"
        class="btn mr-2 btn-primary-outline"
      >
        Save as draft
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import VModal from "vue-js-modal";
Vue.use(VModal);

export default {
  name: "post-info",
  props: ["id"],
  data() {
    return {
      post: {},
      loadingPost: false,
    };
  },
  //   created() {},
  mounted() {
    // this.id = { ...this.id };
    AxiosHelper.get(`blog/info/${this.id}`)
      .then((response) => {
        this.post = response.data.result;
        this.loadingPost = false;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.errorPost = error.response.data.error;
        } else {
          this.errorPost = "Something went wrong, try again later";
        }
        Vue.$toast.open({
          message: this.errorPost,
          type: "error",
        });
        this.loadingDirectory = false;
        this.loadingPost = false;
      });
  },
  methods: {
    approveOrDecline(decision, id) {
      let data;
      if (decision === "approved") {
        data = {
          id,
          decision,
        };
      }
      if (decision === "declined") {
        data = {
          id,
          decision,
        };
      }
      AxiosHelper.put("blog/approve-decline", data)
        .then(() => {
          Vue.$toast.open({
            message:
              "Blog' status has been updated. We are updating company's directory",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2000);
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
  },
};
</script>