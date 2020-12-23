<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="jobs" />
        <div class="wrap-content-head-btns">
          <router-link
            v-if="profile.role === 'normal'"
            :to="'/dashboard/content/jobs/new'"
            class="btn font-weight-bold btn-primary-outline"
            >Post a Job</router-link
          >
        </div>
      </div>
      <div class="dash-container">
        <table
          class="table"
          v-if="
            profile &&
            (profile.role === 'normal' ||
              profile.role === 'admin-job' ||
              profile.role === 'super-admin')
          "
        >
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Company</th>
              <th scope="col">Category</th>
              <th scope="col">Target group</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody v-if="posts">
            <tr v-for="(post, index) in posts" :key="index">
              <td>
                <span
                  class="cursor-pointer text-blue"
                  @click="loadPost(post.id)"
                >
                  {{ post.title }}
                </span>
              </td>
              <td>{{ post.Company.companyName }}</td>
              <td>{{ post.category }}</td>
              <td>
                <div
                  class="co-badge no-button"
                  v-for="(act, index) in post.AudienceForPosts.slice(0, 1)"
                  :key="index"
                >
                  <span>
                    {{ act.BusinessActivity.name }}
                  </span>
                </div>
                <div
                  class="co-badge no-button"
                  v-if="_.size(post.AudienceForPosts) > 1"
                >
                  <span> +{{ _.size(post.AudienceForPosts) - 1 }} </span>
                </div>
              </td>
              <td>{{ post.createdAt | date("DD/MM/YYYY") }}</td>
              <td>
                <div>
                  <span
                    class="status approved"
                    v-if="post.status === 'approved'"
                  >
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
                </div>
              </td>
              <td>
                <div class="wrap-actions">
                  <router-link
                    v-if="post.status !== 'deleted'"
                    target="_blank"
                    :to="`/job/${post.id}`"
                  >
                    <img src="@/assets/images/view.png" alt="view" />
                  </router-link>
                  <router-link
                    v-if="
                      (profile.role === 'normal' ||
                        profile.role === 'super-admin') &&
                      post.status !== 'deleted'
                    "
                    :to="`/dashboard/content/jobs/edit/${post.id}`"
                  >
                    <img src="@/assets/images/edit.png" alt="edit" />
                  </router-link>
                  <button
                    v-if="post.status !== 'deleted'"
                    @click="deleteRecord(post.id)"
                  >
                    <img src="@/assets/images/delete.png" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="not-allowed"></div>
        <modal
          name="openInfoJob"
          :adaptive="true"
          :scrollable="true"
          :height="700"
          :width="1100"
        >
          <InfoJob :id="postId" />
        </modal>
        <modal
          name="openDeleteRecord"
          :adaptive="true"
          :scrollable="true"
          :height="240"
          :width="600"
        >
          <DeleteModal
            :url="`jobs/delete?jobId=${recordId}`"
            entity="job"
          />
        </modal>
      </div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import MenuContent from "@/components/MenuContent";
import InfoJob from "@/components/InfoJob";
import DeleteModal from "@/components/DeleteModal";
export default {
  name: "content",
  components: {
    MenuContent,
    InfoJob,
    DeleteModal,
  },
  data() {
    return {
      posts: [],
      loading: false,
      postId: {},
      recordId: "",
    };
  },
  created() {
    this.loading = true;
    let url = "jobs/all";
    if (this.profile.role === "normal" && this.profile.companyId) {
      url = `jobs/company/${this.profile.companyId}`;
    }
    AxiosHelper.get(url)
      .then((response) => {
        this.posts = response.data.result;
        this.loading = false;
      })
      .catch((error) => {
        if (error.response.status === 404 || error.response.status === 400) {
          this.error = "No content yet!";
        } else if (error.response.status === 403) {
          this.error = "No companies found at this moment";
          this.notAllowed = true;
        } else {
          this.error = "Something went wrong, try again later";
        }
        this.loading = false;
      });
  },
  methods: {
    convertTagsArray(object) {
      const arr = object
        .substring(1, object.length - 1)
        .replace(/"/g, "")
        .split(",");
      return arr;
    },
    loadPost(postId) {
      this.postId = postId;
      this.$modal.show("openInfoJob");
    },
    deleteRecord(id) {
      this.recordId = id;
      this.$modal.show("openDeleteRecord");
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
.page-info a {
  position: absolute;
  right: 30px;
  bottom: 15px;
}
</style>
