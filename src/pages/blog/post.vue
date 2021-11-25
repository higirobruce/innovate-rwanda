<template>
  <div>
    <component :is="layout">
      <PageHeaderSm
        image="bg-why.png"
        rgba="rgba(4, 137, 187, 0.83)"
        title="Blog"
      />
      <div
        class="container"
        v-if="loaded && post && post.status === 'approved'"
      >
        <div class="head-post">
          <h1 class="text-blue-dark font-weight-bold">
            {{ post.title }}
          </h1>
          <div>
            <span class="text-blue">
              {{ post.User.lastName }} {{ post.User.firstName }}
            </span>
            <br />
            {{ post.createdAt | date("DD MMM YYYY") }}
          </div>
        </div>
        <div class="wrap-post-image">
          <img
            v-if="post.image"
            :src="`${IMAGE_URL}c_fill,g_center,w_1200/${post.image}`"
            :alt="post.title"
            class="current-logo"
          />
        </div>

        <div
          class="wrap-post-content"
          v-if="post.content"
          v-html="previewText"
        ></div>

        <div>
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
        <div class="more-posts">
          <router-link :to="'/blog'">More Posts</router-link>
        </div>
      </div>
      <div
        v-if="loaded && post && post.status !== 'approved'"
        class="not-found"
      ></div>
      <Loading v-if="loading && !loaded" />
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import PageHeaderSm from "@/components/PageHeaderSm";
import Loading from "@/components/Loading";
let marked = require("marked");
export default {
  name: "blog-post",
  components: {
    PageHeaderSm,
    Loading,
  },
  data() {
    return {
      post: {},
      loading: false,
      loaded: false,
    };
  },
  created() {
    const slug = this.$route.params.slug;
    this.loading = false;
    this.loaded = true;
    AxiosHelper.get(`blog/info/${slug}`)
      .then((response) => {
        this.post = response.data.result;
        this.loaded = true;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.loaded = true;
      });
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
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
      return marked(this.post.content);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
.head-post {
  margin: 0 auto;
  display: block;
}
.head-post h1 {
  font-size: 65px;
}
.wrap-post-image {
  margin: 30px auto 0 auto;
  width: 100%;
  display: block;
}
.wrap-post-image img {
  width: 100%;
}
.more-posts {
  margin: 25px 0;
  border: 2px solid #5e7c8d;
  border-radius: 3px;
}
.more-posts a {
  display: block;
  padding: 25px 0;
  text-align: center;
  color: #5e7c8d;
}
</style>