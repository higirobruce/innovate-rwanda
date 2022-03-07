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
        <h1>Sourcing talent in the ecosystem</h1>
        <div class="subtitle">
          Our community listing of tech and innovation companies in the
          ecosystem
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
        <div class="wrap-jobs" v-if="!_.isEmpty(posts)">
          <div
            class="row one-company"
            v-for="(post, index) in posts"
            :key="index"
          >
            <div class="col-sm-12 col-md-4 col-lg-2">
              <div class="company-logo">
                <router-link :to="`/company/${post.slug}`">
                  <img
                    v-if="post && post.Company.logo"
                    :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${post.Company.logo}`"
                    :alt="post.coName"
                  />
                  <img
                    v-else
                    src="@/assets/images/logo_placeholder.png"
                    :alt="post.coName"
                  />
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-10">
              <h2 class="mb-1">
                <router-link class="text-blue" :to="`/job/${post.id}`">
                  {{ post.title }}
                </router-link>
              </h2>
              <div>
                <div class="mb-2 co-info mt-2">
                  <div class="text-blue">
                    <i class="icon-company" />
                    {{ post.Company.companyName }}
                  </div>
                  <span class="mr-3">
                    <i class="icon-calendar" />
                    Published
                    <span class="ml-2"
                      >{{ post.createdAt | date("DD-MM-YYYY") }}
                    </span>
                  </span>
                  |
                  <span>
                    <i class="icon-calendar" />
                    Deadline
                    <span class="ml-2"
                      >{{ post.deadlineDate | date("DD-MM-YYYY") }}
                    </span>
                  </span>
                </div>
                <div class="mb-2 co-info" v-if="post.jobDetailsDocument">
                  <a
                    class="text-blue-dark"
                    :href="`${FILE_URL}${post.jobDetailsDocument}`"
                    target="_blank"
                  >
                    <i class="icon-file" />
                    <span class="ml-2">Attachment</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="info-separator clear my-3">&nbsp;</div>
          </div>
        </div>
        <div v-if="loaded && _.isEmpty(posts)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">No jobs found</h2>
        </div>
      </div>
      <Loading  v-if="loading && !loaded" />
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";
import moment from "moment";
Vue.use(moment);
export default {
  name: "job-page",
  components: {
    PageHeader,
    Loading
  },
  data() {
    return {
      query: "",
      posts: {},
      loading: false,
      loaded: false,
      companies: [],
      selectedCompany: "",
      selectedActivity: "",
      listOfBusinessActivities: "",
      sortBy: "",
      yearFounded: "",
      coTypes: [],
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  created() {
    AxiosHelper.get("company-types").then((response) => {
      this.coTypes = response.data.result;
    });
    // loading company types
    AxiosHelper.get("jobs/public").then((response) => {
      this.posts = response.data.result;
    });
    this.timeNow = moment().format("YYYY-MM-DD");
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search(value);
    } else {
      this.loadJob();
    }
    this.loaded = false;
    this.loading = true;
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch((error) => {
         if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
      });
    // load all companies
    AxiosHelper.get("directory/public")
      .then((response) => {
        this.companies = response.data.result;
        this.loaded = true;
      })
      .catch((error) => {
         if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
        this.loading = false;
        this.loaded = true;
        this.companies = [];
      });
  },
  methods: {
    search(query) {
      AxiosHelper.get(`jobs/public/search?searchValue=${query}`)
        .then((response) => {
          this.posts = response.data.result;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = true;
          this.posts = [];
        });
    },
    changeCompany(e) {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.sortBy = "";
      this.selectedCompany = e.target.value;
      this.loadJobsWithFilter("company-type", this.selectedCompany);
    },
    changeYearfound(e) {
      this.sortBy = "";
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.loadJobsWithFilter("year", e.target.value);
    },
    changeActivity(e) {
      this.sortBy = "";
      this.yearFounded = "";
      this.selectedCompany = "";
      this.loadJobsWithFilter("topic", e.target.value);
    },
    resetFilter() {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.yearFounded = "";
      this.sortBy = "";
      this.posts = [];
      this.loadJob();
    },
    loadJobsWithFilter(filter, value) {
      this.posts = [];
      AxiosHelper.get(
        `jobs/public/filter?filterBy=${filter}&filterValue=${value}`
      )
        .then((response) => {
          this.posts = response.data.result;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = true;
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
        `jobs/public/sort?sortBy=${sortBy}&sortValue=${sortValue}`
      )
        .then((response) => {
          this.posts = response.data.result;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = true;
          this.posts = [];
        });
    },
    loadJob() {
      AxiosHelper.get("jobs/public")
        .then((response) => {
          this.posts = response.data.result;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = true;
          this.posts = [];
        });
    },
  },
};
</script>
<style scoped>
.wrap-jobs {
  padding: 40px;
  box-shadow: 0px 17px 36px #1b295814;
  border-radius: 40px;
  margin: 0 auto;
  max-width: 1200px;
  background: #ffffff;
}
.one-company {
  margin: 25px 0;
}
.company-logo {
  margin: 25px;
  border-radius: 4px;
}
.company-logo img {
  max-width: 140px;
  border-radius: 4px;
}
.one-company h2 {
  margin: 20px 0;
  font-size: 26px;
  font-weight: 900;
  color: #1b2958;
}
</style>