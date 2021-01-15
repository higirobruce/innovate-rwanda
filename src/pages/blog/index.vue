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
        <h1>Blog</h1>
        <div class="subtitle">
          Whether you're a corporation looking for innovation, a startup looking
          for a boost, or a VC looking to meet great startups, we're the right
          place for you.
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
                v-for="(company, index) in companies"
                v-bind:value="company.id"
                :key="index"
              >
                {{ company.coName }}
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
        <div v-if="!_.isEmpty(posts)">
          <ListBlog :posts="posts" />
        </div>
        <div v-if="loaded && _.isEmpty(posts)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">No blog posts found</h2>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import AxiosHelper from "@/helpers/AxiosHelper";
import ListBlog from "@/components/ListBlog"
export default {
  name: "blog",
  components: {
    PageHeader,
    ListBlog
  },
  data() {
    return {
      query: "",
      posts: {},
      companies: [],
      loading: false,
      loaded: false,
      selectedCompany: "",
      selectedActivity: "",
      listOfBusinessActivities: "",
      sortBy: "",
      yearFounded: "",
    };
  },
  created() {
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search(value);
    } else {
      this.loadBlog();
    }
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch(() => {});
    AxiosHelper.get("directory/public")
      .then((response) => {
        this.companies = response.data.result;
        this.loaded = true;
      })
      .catch(() => {
        this.loading = false;
        this.loaded = true;
        this.companies = [];
      });
  },
  methods: {
    changeCompany(e) {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.sortBy = "";
      this.selectedCompany = e.target.value;
      this.loadBlogWithFilter("company", this.selectedCompany);
    },
    changeActivity(e) {
      this.sortBy = "";
      this.yearFounded = "";
      this.selectedCompany = "";
      this.loadBlogWithFilter("topic", e.target.value);
    },
    changeYearfound(e) {
      this.sortBy = "";
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.loadBlogWithFilter("year", e.target.value);
    },
    filterHtml(str) {
      return `${str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200)}...`;
    },
    loadBlog() {
      AxiosHelper.get("blog/public")
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
    resetFilter() {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.yearFounded = "";
      this.sortBy = "";
      this.posts = [];
      this.loadBlog();
    },
    loadBlogWithFilter(filter, value) {
      this.posts = [];
      AxiosHelper.get(
        `blogs/public/filter?filterBy=${filter}&filterValue=${value}`
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
    changeSort(e) {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.yearFounded = "";
      this.posts = [];
      const sortBy = e.target.value.split(",")[0];
      const sortValue = e.target.value.split(",")[1];
      AxiosHelper.get(
        `blogs/public/sort?sortBy=${sortBy}&sortValue=${sortValue}`
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
    search(query) {
      AxiosHelper.get(`blogs/search?searchValue=${query}`)
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
  },
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>