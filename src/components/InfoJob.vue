<template>
  <div v-if="post">
    <h3 class="p-4 bottom-shadow shadow">
      Job: {{ post.title }}
      <span class="status approved" v-if="post.status === 'approved'">
        Published
      </span>
      <span class="status pending" v-if="post.status === 'pending'">
        Pending
      </span>
      <span class="status declined" v-if="post.status === 'draft'">
        Draft
      </span>
      <span class="status deleted" v-if="post.status === 'deleted'">
        Deleted
      </span>
    </h3>
    <div class="px-4 py-2" style="max-height: 460px; overflow: auto">
      <div class="head-post">
        <div class="mb-3">
          <span class="text-blue" v-if="post.Company">
            {{ post.company }}
          </span>
          <span class="ml-2 text-gray">
            Created: {{ post.createdAt | date("DD MMM YYYY") }}
          </span>
        </div>
        <div v-if="post.description" v-html="previewText"></div>
        <div
          class="media my-3 p-3 bg-white border rounded"
          v-if="post.jobDetailsDocument"
        >
          <img class="align-self-start mr-3" src="@/assets/images/pdf.png" />
          <div class="media-body">
            <h5 class="mt-2">Preview</h5>
            <p>Job attachment</p>
          </div>
        </div>
        <div class="mb-2">
          <div
            class="co-badge"
            v-for="(act, index) in post.AudienceForPosts"
            :key="index"
          >
            <span v-if="act.BusinessActivity && act.BusinessActivity.name">
              {{ act.BusinessActivity.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="my-3 mx-4">
      <span class="float-left">
        <button
          v-if="
            ((profile.role === 'admin-job' || profile.role === 'super-admin') &&
              post.status === 'pending') ||
            post.status === 'declined'
          "
          @click="approveOrDecline('approved', post.id)"
          class="btn btn-success-outline mr-2"
        >
          Approve &amp; Publish
        </button>
        <button
          v-if="
            ((profile.role === 'admin-job' || profile.role === 'super-admin') &&
              post.status === 'pending') ||
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
      </span>
      <span class="float-right">
        <button @click="closeModal" class="btn btn-gray-outline mr-2">
          Close
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import VModal from "vue-js-modal";
Vue.use(VModal);

let marked = require("marked");

export default {
  name: "post-info",
  props: ["id"],
  data() {
    return {
      post: {},
      loadingPost: false,
    };
  },
  mounted() {
    AxiosHelper.get(`jobs/info/${this.id}`)
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
    closeModal() {
      this.$modal.hide("openInfoJob");
    },
    approveOrDecline(decision, jobId) {
      const data = {
        decision,
        jobId,
      };
      AxiosHelper.put("jobs/approve-decline", data)
        .then(() => {
          Vue.$toast.open({
            message:
              decision === "approved"
                ? "Job has been approved and published. We are updating blog list..."
                : "Job has been declined. We are updating blog list...",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 3000);
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
  },
  computed: {
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