<template>
  <div class="wrap-blog">
    <div class="row">
      <div
        class="col-sm-12 col-md-6 col-lg-4"
        v-for="(post, index) in response"
        :key="index"
      >
        <div class="wrap-one-post rounded-big">
          <router-link :to="`blog/${post.id}`">
            <div class="one-post-image">
              <img
                v-if="post.image"
                :src="`${IMAGE_URL}c_fill,g_center,w_500,h_250/${post.image}`"
                :alt="post.title"
                class="rounded-big-img"
              />
              <img
                v-else
                src="@/assets/images/post_placeholder.svg"
                :alt="post.title"
                class="rounded-big-img"
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
                {{ post.title }}
              </router-link>
            </h2>
            <div class="post-content d-none d-sm-block mb-2">
              {{ filterHtml(post.content) }}
            </div>
            <div>
              <span>
                by
                <span class="text-blue"
                  >{{ post.User.lastName }} {{ post.User.firstName }}</span
                >
                <br />
                <!-- <i class="icon-calendar mr-2" /> -->
                {{ post.createdAt | date("MMM YYYY") }}</span
              >
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <!-- START PAGINATION -->
    <div class="wrap-pagination">
      <button
        type="button"
        :disabled="currentPage < 1"
        @click.prevent="goToPrevious"
      >
        <img src="@/assets/images/left-arrow.png" />
      </button>
      <span
        v-for="(page, index) in allPages"
        :class="`${page === currentPage + 1 ? 'active-page' : ''}`"
        :key="index"
        @click.prevent="goTo(page - 1)"
      >
        {{ page }}
      </span>
      <button
        type="button"
        :disabled="allPages === currentPage + 1"
        @click="goToNext"
      >
        <img src="@/assets/images/right-arrow.png" />
      </button>
    </div>
    <!-- END PAGINATION -->
  </div>
</template>

<script>
export default {
  name: "list-blog",
  props: ["posts"],
  data() {
    return {
      response: [],
      numberOnPage: 20,
      currentPage: 0,
      allPages: 0,
      count: 0,
    };
  },
  created() {
    this.count = this.posts.length;
    this.response = this.posts.slice(
      this.currentPage,
      this.numberOnPage >= this.count ? this.count : this.numberOnPage
    );
    this.allPages =
      this.count > this.numberOnPage ? this.count / this.numberOnPage : 1;
  },
  methods: {
    filterHtml(str) {
      return `${str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 80)}...`;
    },
    goToPrevious() {
      this.currentPage = this.currentPage - 1;
      this.response = this.posts.slice(
        this.currentPage,
        this.numberOnPage + this.currentPage
      );
    },
    goToNext() {
      this.currentPage = this.currentPage + 1;
      this.response = this.posts.slice(
        this.currentPage,
        this.numberOnPage + this.currentPage
      );
    },
    goTo(page) {
      this.currentPage = page;
      this.response = this.posts.slice(
        this.currentPage,
        this.numberOnPage + this.currentPage
      );
    },
  },
};
</script>

<style scoped>
.wrap-pagination {
  padding: 25px 0;
}
.wrap-pagination button {
  border: 2px solid #06adef;
  background: #06adef;
  padding: 2px 22px;
  margin-right: 5px;
  cursor: pointer;
}
.wrap-pagination button:disabled,
.wrap-pagination button[disabled] {
  border: 2px solid #f3f3f3;
  background-color: #f0f0f0;
  color: #777777;
  cursor: unset;
  pointer-events: all !important;
}
.wrap-pagination button:disabled img,
.wrap-pagination button[disabled] img {
  opacity: 0.2;
}
.wrap-pagination span {
  position: relative;
  border: 2px solid #d5d8e4;
  top: 2px;
  margin-right: 5px;
  background: #ffffff;
  padding: 6px 18px;
  text-align: center;
  cursor: pointer;
}
.wrap-pagination span.active-page {
  border: 2px solid #06adef;
  background: #06adef;
  color: #ffffff;
}
.post-info h2 {
  overflow: hidden;
  text-overflow: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-line;
}
</style>
