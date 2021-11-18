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

      <div class="wrap-filters-box">
        <div class="wrap-filters">
          <div class="filter-select">
            <select
              name="company"
              v-model="selectedCompany"
              @change="changeCompany($event)"
              required
            >
              <option value="" selected disabled>Company</option>
              <option
                v-for="(type, index) in coTypes"
                v-bind:value="type.slug"
                :key="index"
              >
                {{ type.name }}
              </option>
            </select>
          </div>
          <div class="filter-select">
            <select
              name="year"
              v-model="yearFounded"
              @change="changeYearfound($event)"
              required
            >
              <option value="" selected disabled>Year</option>
              <option
                v-for="(year, index) in 4"
                v-bind:value="new Date().getFullYear() - year + 1"
                :key="index"
              >
                {{ new Date().getFullYear() - year + 1 }}
              </option>
            </select>
          </div>
          <div class="filter-select">
            <select
              name="activity"
              v-model="selectedActivity"
              @change="changeActivity($event)"
              required
            >
              <option value="" selected disabled>Activity</option>
              <option
                v-for="(act, index) in listOfBusinessActivities"
                v-bind:value="act.id"
                :key="index"
              >
                {{ act.name }}
              </option>
            </select>
          </div>

          <span class="float-right">
            <div class="filter-select" style="max-width: 220px">
              <select
                name="sort"
                v-model="sortBy"
                @change="changeSort($event)"
                required
              >
                <option value="" disabled selected>Sort by</option>
                <option v-bind:value="'date,asc'">Date(Asc)</option>
                <option v-bind:value="'date,desc'">Date(Desc)</option>
                <option v-bind:value="'title,asc'">Title(A-Z)</option>
                <option v-bind:value="'title,desc'">Title(Z-A)</option>
              </select>
            </div>
            <button type="button" @click.prevent="resetFilter">
              Reset filters
            </button>
          </span>
          <div class="clear" />
        </div>
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
            v-for="(post, index) in getUpcomingEvents()"
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
                <div style="font-size: 14px">
                  <span>
                    <span>{{ post.category }}</span>
                  </span>
                  <span class="float-right text-blue">
                    {{ post.eventTime }} CAT</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-3 mb-5" v-if="loaded && !_.isEmpty(posts)">
          <h2 class="h2 text-blue-dark">Past Events</h2>
          <div>
            Missed our sessions? Don’t worry, you can watch the videos here.
          </div>
        </div>
        <div class="row">
          <div
            class="col-sm-12 col-md-6 col-lg-4"
            v-for="(post, index) in getPastEvents()"
            :key="index"
          >
            <Event :event="post" />
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
import Event from "@/components/Event";
let marked = require("marked");

import moment from "moment";
Vue.use(moment);

export default {
  name: "jobs",
  components: {
    PageHeader,
    ListEvents,
    Event,
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
      selectedCompany: "",
      selectedActivity: "",
      listOfBusinessActivities: "",
      sortBy: "",
      yearFounded: "",
      coTypes: [],
    };
  },
  created() {
    AxiosHelper.get("company-types").then((response) => {
      this.coTypes = response.data.result;
    });
    AxiosHelper.get("business-activities").then((response) => {
      this.listOfBusinessActivities = response.data.result;
    });
    this.timeNow = moment().format("YYYY-MM-DD");
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search(value);
    } else {
      this.loadEvents();
    }
  },
  methods: {
    changeCompany(e) {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.sortBy = "";
      this.yearFounded = "";
      this.selectedCompany = e.target.value;
      this.loadEventsWithFilter("company-type", this.selectedCompany);
    },
    changeActivity(e) {
      this.sortBy = "";
      this.yearFounded = "";
      this.selectedCompany = "";
      this.loadEventsWithFilter("topic", e.target.value);
    },
    changeYearfound(e) {
      this.sortBy = "";
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.loadEventsWithFilter("year", e.target.value);
    },
    loadEventsWithFilter(filter, value) {
      this.posts = [];
      AxiosHelper.get(
        `events/public/filter?filterBy=${filter}&filterValue=${value}`
      )
        .then((response) => {
          this.posts = response.data.result;
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
        });
    },
    resetFilter() {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.yearFounded = "";
      this.sortBy = "";
      this.posts = [];
      this.loadEvents();
    },
    loadEvents() {
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
    },
    changeSort(e) {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.yearFounded = "";
      this.posts = [];
      const sortBy = e.target.value.split(",")[0];
      const sortValue = e.target.value.split(",")[1];
      AxiosHelper.get(
        `events/public/sort?sortBy=${sortBy}&sortValue=${sortValue}`
      )
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
<style scoped>
@media (max-width: 1024px) {
  .wrap-one-event h2 {
    font-size: 18px !important;
  }
  .post-info,
  .post-info h3 {
    font-size: 16px;
  }
}
</style>