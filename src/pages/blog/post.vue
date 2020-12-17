<template>
  <div>
    <component :is="layout">
      <PageHeaderSm
        image="bg-why.png"
        rgba="rgba(212, 121, 2, 0.7)"
        title="Blog"
      />
      <div class="container" v-if="post">
        <div class="head-post">
          <h1 class="text-blue-dark font-weight-bold">
            {{ post.title }}
          </h1>
          <div>
            <span class="text-blue">
              {{ post.author }}
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
        <div class="wrap-post-content" :inner-html.prop="post.content"></div>
        <div class="more-posts">
          <router-link :to="'/blog'">More Posts</router-link>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import PageHeaderSm from "@/components/PageHeaderSm";
export default {
  name: "blog-post",
  components: {
    PageHeaderSm,
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
    AxiosHelper.get(`blog/info/${slug}`)
      .then((response) => {
        this.post = response.data.result;
        this.loaded = true;
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
  },
};
</script>

<style scoped>
.head-post {
  margin: 0 auto;
  max-width: 1280px;
  display: block;
}
.head-post h1 {
  font-size: 65px;
}
.wrap-post-image {
  margin: 30px auto 0 auto;
  width: 100%;
  max-width: 1400px;
  display: block;
}
.wrap-post-image img {
  width: 100%;
}
.wrap-post-content {
  margin: 30px auto 0 auto;
  width: 100%;
  max-width: 1280px;
  display: block;
  text-align: left;
  padding: 30px 0;
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