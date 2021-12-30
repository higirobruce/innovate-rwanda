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
        <form class="page-search">
          <input
            type="text"
            v-model="search"
            placeholder="Type to search and hit enter"
          />
          <button @click.prevent="searchNow" :disabled="_.isEmpty(search)">
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
        <div v-if="!_.isEmpty(posts)">
          <ListBlog :posts="posts" />
        </div>
        <div v-if="loaded && _.isEmpty(posts)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">No blog posts found</h2>
        </div>
      </div>
      <Loading size="big" v-if="loading && !loaded" />
    </component>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import AxiosHelper from "@/helpers/AxiosHelper";
import ListBlog from "@/components/ListBlog";
import Loading from "@/components/Loading";
export default {
  name: "Blog-Component",
  components: {
    PageHeader,
    ListBlog,
    Loading,
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
      coTypes: [],
      orderType: "",
      orderValue:"",
      search: "",
    };
  },
  created() {
    AxiosHelper.get("company-types").then((response) => {
      this.coTypes = response.data.result;
    });
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search = value;
    }
    this.loadBlogs(
      "",
      "",
      "",
      this.orderType,
      this.orderValue || "",
      this.search || ""
      );
    // loading business activities
    AxiosHelper.get("business-activities").then((response) => {
      this.listOfBusinessActivities = response.data.result;
    });
    this.loaded = false;
    this.loading = true;
    AxiosHelper.get("directory/public")
      .then((response) => {
        this.companies = response.data.result;
        this.loaded = true;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.loaded = true;
        this.companies = [];
      });
  },
  methods: {
    changeCompany(e) {
      this.selectedCompany = e.target.value;
      this.loading = true;
      this.loaded = false;
      this.posts = [];
      this.loadBlogs(
        this.selectedCompany || "",
        this.selectedActivity || "",
        this.yearFounded || "",
        this.orderType || "",
        this.orderValue || "",
        this.search || ""
      );
    },
    changeActivity(e) {
      this.selectedActivity = e.target.value;
      this.loading = true;
      this.loaded = false;
      this.posts = [];
      this.loadBlogs(
        this.selectedCompany || "",
        this.selectedActivity || "",
        this.yearFounded || "",
        this.orderType || "",
        this.orderValue || "",
        this.search || ""
      );
    },
    changeYearfound(e) {
      this.yearFounded = e.target.value;
      this.loading = true;
      this.loaded = false;
      this.posts = [];
      this.loadBlogs(
        this.selectedCompany || "",
        this.selectedActivity || "",
        this.yearFounded || "",
        this.orderType || "",
        this.orderValue || "",
        this.search || ""
      );
    },
    filterHtml(str) {
      return `${str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200)}...`;
    },
    loadBlogs(companyType, activity, yearFounded, orderType, orderValue, search) {
      AxiosHelper.get(
        `blog/public?companyType=${companyType}&topic=${activity}&year=${yearFounded}&orderType=${orderType}&orderValue=${orderValue}&search=${search}`
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
    resetFilter() {
      this.selectedCompany = "";
      this.selectedActivity = "";
      this.yearFounded = "";
      this.sortBy = "",
      this.orderType = "",
      this.orderValue = "",
      this.search = ""
      this.posts = [];
      this.loadBlogs(
        "",
        "",
        "",
        this.orderType,
        this.orderValue || "",
        this.search || ""
      );
      this.loaded = false;
      this.loading = true;
    },
    changeSort(e) {
      this.orderType = e.target.value.split(",")[0];
      this.orderValue = e.target.value.split(",")[1];
      this.loading = true;
      this.loaded = false;
      this.posts = [];
      this.loadBlogs(
        this.selectedCompany || "",
        this.selectedActivity || "",
        this.yearFounded || "",
        this.orderType,
        this.orderValue,
        this.search || ""
      );
    },
    async searchNow() {
      await this.$router.push({ query: { search: this.search } });
      this.loading = true;
      this.loaded = false;
      this.posts = [];
      this.loadBlogs(
        this.selectedCompany || "",
        this.selectedActivity || "",
        this.yearFounded || "",
        this.orderType,
        this.orderValue,
        this.search || ""
      );
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