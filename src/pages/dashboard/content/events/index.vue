<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent active="events"/>
        <div class="wrap-content-head-btns">
          <router-link
            :to="'/dashboard/content/events/new'"
            class="btn font-weight-bold btn-primary-outline"
            >Add New Event</router-link
          >
        </div>
      </div>
      <div class="dash-container">
        <table
          class="table"
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
              <th scope="col">Category</th>
              <th scope="col">Tags</th>
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
              <td>{{ post.author }}</td>
              <td>{{ post.category }}</td>
              <td>
                <span
                  v-for="(tag, index) of convertTagsArray(post.tags)"
                  :key="index"
                >
                  <span v-if="index !== 0">,</span>
                  {{ tag }}
                </span>
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
                    :to="`/blog/${post.id}`"
                  >
                    <img src="@/assets/images/view.png" alt="view" />
                  </router-link>
                  <router-link
                    v-if="
                      (profile.role === 'normal' ||
                        profile.role === 'super-admin') &&
                      post.status !== 'deleted'
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
            </tr>
          </tbody>
        </table>
        <div v-else class="not-allowed"></div>
        <modal
          name="openPostInfo"
          :adaptive="true"
          :scrollable="true"
          :height="800"
          :width="1100"
        >
          <PostInfo :id="postId" />
        </modal>
        <modal
          name="openDeleteRecord"
          :adaptive="true"
          :scrollable="true"
          :height="240"
          :width="600"
        >
          <DeleteModal :url="`blog/delete/${recordId}`" entity="blog" />
        </modal>
      </div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import MenuContent from "@/components/MenuContent";
import PostInfo from "@/components/PostInfo";
import DeleteModal from "@/components/DeleteModal";
export default {
  name: "content",
  components: {
    MenuContent,
    PostInfo,
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
    let url = "blog/all";
    if (this.profile.role === "normal" && this.profile.companyId) {
      url = `blog/company/${this.profile.companyId}`;
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
      this.$modal.show("openPostInfo");
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
