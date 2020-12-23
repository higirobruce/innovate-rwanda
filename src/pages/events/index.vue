<template>
  <div>
    <component :is="layout">
      <div
        class="page-header"
        :style="{
          'background-image':
            'url(' + require('@/assets/images/auth-bg.jpg') + '',
        }"
      >
        <div
          class="page-overlay"
          :style="{ 'background-color': 'rgba(212, 121, 2, 0.7)' }"
        ></div>
        <h1>Events</h1>
        <div class="subtitle">
          We bring industry experts to you - Live - in a virtual environment.
          Access to all our live sessions, including workshops, meetups, pitch
          nights, other signature conferences. Sign up and learn at your own
          pace and convenience.
        </div>
        <form @submit="search" class="page-search">
          <input
            type="text"
            v-model="query"
            placeholder="Type to search and hit enter"
          />
          <button :disabled="_.isEmpty(query)" @click.prevent="search(query)">
            <img src="@/assets/images/search.png" />
          </button>
        </form>
      </div>
      <div class="container">
        <h2
          class="h2 pb-4 text-blue-dark text-center"
          v-if="loaded && !_.isEmpty(posts)"
        >
          Upcoming Events
        </h2>
        <div class="row">
          <div
            class="col-sm-12 col-md-6 col-lg-4"
            v-for="(post, index) in posts.filter(
              (p) => p.eventDate >= timeNow
            )"
            :key="index"
          >
            <div class="wrap-one-event">
              <router-link :to="`event/${post.id}`">
                <div class="one-event-image">
                  <img
                    v-if="post.flyer"
                    :src="`${IMAGE_URL}c_fill,g_center,w_500,h_250/${post.flyer}`"
                    :alt="post.title"
                  />
                  <img
                    v-else
                    src="@/assets/images/post_placeholder.svg"
                    :alt="post.title"
                  />
                  <h2>
                    {{ post.title | truncate(58) }}
                  </h2>
                </div>
              </router-link>
              <div class="post-info">
                <h3 class="h5 text-blue-dark">
                  <i class="icon-calendar mr-2" />
                  {{ post.eventDate | date("DD MMM YYYY") }}
                </h3>
                <div>
                  <span>
                    by
                    <span class="text-blue">{{ post.eventTime }}</span>
                  </span>
                  <span class="float-right">
                    <i class="icon-calendar mr-2" />
                    {{ post.eventTime }} CAT</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2
          class="h2 pb-4 text-blue-dark text-center"
          v-if="loaded && !_.isEmpty(posts)"
        >
          Past Events
        </h2>
        <div class="row">
          <div
            class="col-sm-12 col-md-6 col-lg-4"
            v-for="(post, index) in posts.filter(
              (p) => p.eventDate < timeNow
            )"
            :key="index"
          >
            <div class="wrap-one-event">
              <router-link :to="`event/${post.id}`">
                <div class="one-event-image">
                  <img
                    v-if="post.flyer"
                    :src="`${IMAGE_URL}c_fill,g_center,w_500,h_250/${post.flyer}`"
                    :alt="post.title"
                  />
                  <img
                    v-else
                    src="@/assets/images/post_placeholder.svg"
                    :alt="post.title"
                  />
                  <h2>
                    {{ post.title | truncate(58) }}
                  </h2>
                </div>
              </router-link>
              <div class="post-info">
                <h3 class="h5 text-blue-dark">
                  <i class="icon-calendar mr-2" />
                  {{ post.eventDate | date("DD MMM YYYY") }}
                </h3>
                <div>
                  <span>
                    by
                    <span class="text-blue">{{ post.category }}</span>
                  </span>
                  <span class="float-right">
                    <i class="icon-calendar mr-2" />
                    {{ post.eventTime }} CAT</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loaded && _.isEmpty(posts)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">No event found</h2>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import PageHeader from "@/components/PageHeader";
import AxiosHelper from "@/helpers/AxiosHelper";
let marked = require("marked");

import moment from "moment";
Vue.use(moment);

export default {
  name: "jobs",
  components: {
    PageHeader,
  },
  data() {
    return {
      query: "",
      posts: {},
      loading: false,
      loaded: false,
      timeNow: "",
    };
  },
  created() {
    this.timeNow = moment().format('YYYY-MM-DD');
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search(value);
    } else {
      AxiosHelper.get("events/public")
        .then((response) => {
          this.posts = response.data.result;
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
          this.posts = [];
        });
    }
  },
  methods: {
    filterHtml(str) {
      return `${str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200)}...`;
    },
    search(query) {
      AxiosHelper.get(`events/public/search?searchValue=${query}`)
        .then((response) => {
          this.posts = response.data.result;
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
          this.posts = [];
        });
    },
    convertToObject(object) {
      return JSON.parse(object);
    },
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
      return marked(this.post.description);
    },
  },
};
</script>

<style scoped>
.wrap-one-event {
  background: #fff;
  box-shadow: 0px 4px 16px rgba(27, 41, 88, 0.08);
  border-radius: 3px;
  margin-bottom: 40px;
}
.post-info {
  padding: 30px;
  height: 140px;
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
.one-event-image {
  width: 100%;
  position: relative;
}
.one-event-image h2 {
  position: absolute;
  padding: 10px 20px;
  bottom: 5px;
  font-size: 28px;
  color: #ffffff;
}
.one-event-image::before {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
}
.one-event-image img {
  width: 100%;
}
</style>