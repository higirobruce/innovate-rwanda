<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="blog" />
        <div class="wrap-content-head-btns" v-if="profile.role === 'normal'">
          <router-link
            :to="'/dashboard/content/blog/new'"
            class="btn font-weight-bold btn-primary-outline"
            >Add New Post</router-link
          >
        </div>
        <div class="clear" />
        <br />
      </div>
      <div class="dash-container">
        <table
          class="table table-responsive-sm"
          v-if="
            profile &&
            (profile.role === 'normal' ||
              profile.role === 'admin-blog' ||
              profile.role === 'super-admin')
          "
        >
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Company</th>
              <th scope="col">Target group</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody v-for="(post, index) in posts" :key="index">
            <tr>
              <td style="max-width: 220px">
                <span
                  class="cursor-pointer text-blue"
                  @click="loadPost(post.id)"
                >
                  {{ post.title | truncate(60) }}
                </span>
              </td>
              <td>{{ post.User.lastName }} {{ post.User.firstName }}</td>
              <td>{{ post.Company.companyName }}</td>
              <td>
                <div
                  class="co-badge no-button"
                  v-for="(act, index) in post.AudienceForPosts.slice(0, 1)"
                  :key="index"
                >
                  <span
                    v-if="act.BusinessActivity && act.BusinessActivity.name"
                  >
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
                  <span
                    class="status deleted"
                    v-if="
                      profile.role !== 'normal' && post.status === 'deleted'
                    "
                  >
                    Deleted
                  </span>
                  <span
                    class="status deleted"
                    v-if="post.status === 'declined'"
                  >
                    Declined
                  </span>
                </div>
              </td>
              <td>
                <div class="wrap-actions">
                  <router-link
                    v-if="post.status !== 'deleted'"
                    :to="`/blog/${post.id}`"
                  >
                    <img src="@/assets/images/view.png" alt="view" />
                  </router-link>
                  <router-link
                    v-if="
                      (post.status === 'draft' || post.status === 'pending') &&
                      (profile.role === 'normal' ||
                        profile.role === 'super-admin')
                    "
                    :to="`/dashboard/content/blog/edit/${post.id}`"
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
              <!-- -->
            </tr>
          </tbody>
        </table>
        <div v-else class="not-allowed"></div>
        <modal
          name="openInfoBlog"
          :adaptive="true"
          :scrollable="true"
          :height="660"
          :width="1100"
        >
          <button type="button" @click.prevent="closeModal" class="close">
            <img src="@/assets/images/close.png" />
          </button>
          <InfoBlog :id="postId" />
        </modal>
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
          <DeleteModal :url="`blog/delete/${recordId}`" entity="blog" />
        </modal>
      </div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import MenuContent from "@/components/MenuContent";
import InfoBlog from "@/components/InfoBlog";
import DeleteModal from "@/components/DeleteModal";
import { EventBus } from "@/helpers/event-bus.js";
export default {
  name: "blog-admin-content",
  components: {
    MenuContent,
    InfoBlog,
    DeleteModal,
  },
  data() {
    return {
      posts: [],
      loading: false,
      postId: {},
      recordId: "",
      url: "",
    };
  },
  created() {
    this.loading = true;
    this.url = "blog/all";
    if (this.profile.role === "normal" && this.profile.companyId) {
      this.url = `blog/company/${this.profile.companyId}`;
    }
    this.loadPosts();
    EventBus.$on("reload-posts", () => {
      this.loadPosts();
    });
  },
  methods: {
    loadPosts() {
      AxiosHelper.get(this.url)
        .then((response) => {
          this.posts = response.data.result;
          this.loading = false;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
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
    loadPost(postId) {
      this.postId = postId;
      this.$modal.show("openInfoBlog");
    },
    deleteRecord(id) {
      this.recordId = id;
      this.$modal.show("openDeleteRecord");
    },
    closeModal() {
      this.$modal.hide("openInfoBlog");
      this.$modal.hide("openDeleteRecord");
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
</style>
