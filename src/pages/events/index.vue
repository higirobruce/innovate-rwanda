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
          :style="{ 'background-color': 'rgba(4, 137, 187, 0.83)' }"
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
          <ListEvents :events="getUpcomingEvents()" />
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
            v-for="(post, index) in getPastEvents()"
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
import ListEvents from "@/components/ListEvents";
let marked = require("marked");

import moment from "moment";
Vue.use(moment);

export default {
  name: "jobs",
  components: {
    PageHeader,
    ListEvents,
  },
  data() {
    return {
      query: "",
      posts: {},
      postEvents: [],
      upcomingEVents: [],
      loading: false,
      loaded: false,
      timeNow: "",
    };
  },
  created() {
    this.timeNow = moment().format("YYYY-MM-DD");
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
    getPastEvents() {
      let pastEvents = [];
      if (this.posts && this.posts.length > 0) {
        this.posts.forEach((event) => {
          if (event.eventDate <= this.timeNow) {
            pastEvents = [...pastEvents, event];
          }
        });
      }
      return pastEvents;
    },
    getUpcomingEvents() {
      let comingEvents = [];
      if (this.posts && this.posts.length > 0) {
        console.log("hey", this.posts.length);
        this.posts.forEach((event) => {
          if (event.eventDate >= this.timeNow) {
            comingEvents = [...comingEvents, event];
          }
        });
      }
      return comingEvents;
    },
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
