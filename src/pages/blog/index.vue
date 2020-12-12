<template>
  <div>
    <component :is="layout">
      <PageHeader
        image="auth-bg.jpg"
        rgba="rgba(212, 121, 2, 0.7)"
        title="Blog"
        subtitle="Whether you're a corporation looking for innovation, a startup looking for a boost, or a VC looking to meet great startups, we're the right place for you."
      />
      <div class="container">
        <div class="row">
          <div
            class="col-sm-12 col-md-6 col-lg-4"
            v-for="(post, index) in posts"
            :key="index"
          >
            <div class="wrap-one-post">
              <router-link :to="`blog/${post.id}`">
                <div class="one-post-image">
                  <img
                    v-if="post.image"
                    :src="`${IMAGE_URL}c_fill,g_center,w_500,h_250/${post.image}`"
                    :alt="post.title"
                  />
                  <img
                    v-else
                    src="@/assets/images/post_placeholder.svg"
                    :alt="post.title"
                  />
                </div>
              </router-link>
              <div class="post-info position-relative">
                <div class="post-category" v-if="post.category">
                  {{ post.category }}
                </div>
                <h2>
                  <router-link
                    class="text-blue-dark font-weight-bold"
                    :to="`blog/${post.id}`"
                  >
                    {{ post.title | truncate(58) }}
                  </router-link>
                </h2>
                <div
                  class="post-content"
                  :inner-html.prop="post.content | truncate(200)"
                ></div>
                <div>
                  <span>
                    by <span class="text-blue">{{ post.author }}</span>
                  </span>
                  <span class="float-right"> <icon class="icon" icon="calendar-alt" /> {{ post.createdAt | date("MMM YYYY") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import AxiosHelper from "@/helpers/AxiosHelper";
export default {
  name: "blog",
  components: {
    PageHeader,
  },
  data() {
    return {
      posts: {},
      loading: false,
      loaded: false,
    };
  },
  created() {
    this.slug = this.$route.params.slug;
    AxiosHelper.get("blog/public")
      .then((response) => {
        this.posts = response.data.result;
        this.loaded = true;
      })
      .catch(() => {
        this.loading = false;
        this.loaded = true;
      });
  },
  methods: {
    convertToObject(object) {
      return JSON.parse(object);
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
.wrap-one-post {
  background: #fff;
  box-shadow: 0px 4px 16px rgba(27, 41, 88, 0.08);
  border-radius: 3px;
  margin-bottom: 40px;
}
.post-info {
  padding: 30px;
  height: 310px;
}
.post-category {
  position: absolute;
  top: -18px;
  padding: 5px 15px;
  background: #fef2e3;
  color: #ef8700;
}
.post-content {
  font-weight: 200 !important;
  font-size: 16px !important;
  max-height: 120px;
  overflow: hidden;
}
.post-info h2 {
  font-size: 28px;
  max-height: 100px;
}
.one-post-image {
  width: 100%;
}
.one-post-image img {
  width: 100%;
}
</style>