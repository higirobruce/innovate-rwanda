<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <MenuContent />
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
              <td>{{ post.title }}</td>
              <td>{{ post.author }}</td>
              <td>{{ post.category }}</td>
              <td>{{ post.tag }}</td>
              <td>{{ post.date }}</td>
              <td>
                <div
                  v-if="profile && profile.role !== 'normal'"
                  class="wrap-switch-toggle"
                >
                  <span
                    :class="`${
                      post.status === true
                        ? 'switch-text active'
                        : 'switch-text'
                    }`"
                    >Off</span
                  >
                  <label class="switch">
                    <input type="checkbox" :checked="post.status === false" />
                    <span class="slider round"></span>
                  </label>
                  <span
                    :class="`${
                      post.status === true
                        ? 'switch-text'
                        : 'switch-text active'
                    }`"
                    >On</span
                  >
                </div>
                <div v-else>
                  <span class="text-success" v-if="post.status === true">Published</span>
                  <span class="text-danger" v-else>Unpublished</span>
                </div>
              </td>
              <td>
                <div class="wrap-actions">
                  <button>
                    <img src="@/assets/images/view.svg" alt="view" />
                  </button>
                  <button>
                    <img src="@/assets/images/edit.svg" alt="edit" />
                  </button>
                  <button>
                    <img src="@/assets/images/delete.svg" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </component>
  </div>
</template>

<script>
import content from "./../../../dummy/content.js";
import MenuContent from "@/components/MenuContent";
export default {
  name: "content",
  components: {
    MenuContent,
  },
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.posts = content;
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