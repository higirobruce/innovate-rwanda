<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Contents</h2>
        <ul class="page-nav list-inline">
          <li class="list-inline-item mr-5 list-active">
            <router-link exact :to="'/dashboard/directory'">Posts</router-link>
          </li>
          <li class="list-inline-item mr-5">
            <router-link exact :to="'/dashboard/directory/pending'"
              >Events</router-link
            >
          </li>
          <li class="list-inline-item mr-5">
            <router-link exact :to="'/dashboard/directory/area-of-interests'"
              >Jobs</router-link
            >
          </li>
        </ul>
      </div>
      <div class="dash-container">
        <table class="table">
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
                <div class="wrap-switch-toggle">
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
export default {
  name: "users",
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