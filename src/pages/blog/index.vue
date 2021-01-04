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
              name="district"
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
          <!-- <div class="filter-select">
            <select
              name="district"
              v-model="yearFounded"
              @change="changeYearfound($event)"
              required
            >
              <option value="" selected disabled>Year founded</option>
              <option
                v-for="(year, index) in 21"
                v-bind:value="1999 + year"
                :key="index"
              >
                {{ 1999 + year }}
              </option>
            </select>
          </div> -->
          <div class="filter-select">
            <select
              name="district"
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
          <!-- <span class="float-right">
            <div class="filter-select" style="max-width: 220px">
              <select
                name="district"
                v-model="sortBy"
                @change="changeSort($event)"
                required
              >
                <option value="" disabled selected>Sort by</option>
                <option v-bind:value="'date,asc'">Year founded(Asc)</option>
                <option v-bind:value="'date,desc'">Year founded(Desc)</option>
                <option v-bind:value="'name,asc'">Company name(A-Z)</option>
                <option v-bind:value="'name,desc'">Company name(Z-A)</option>
              </select>
            </div>
            <button type="button" @click.prevent="resetFilter">
              Reset filters
            </button>
          </span> -->
        </div>
      </div>
      <div class="container">
        
      {{ posts }}
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
                <div class="post-content mb-2">
                  {{ filterHtml(post.content) }}
                </div>
                <div>
                  <span>
                    by
                    <span class="text-blue"
                      >{{ post.User.lastName }} {{ post.User.firstName }}</span
                    >
                  </span>
                  <span class="float-right">
                    <i class="icon-calendar mr-2" />
                    {{ post.createdAt | date("MMM YYYY") }}</span
                  >
                </div>
              </div>
            </div>
          </div>
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
export default {
  name: "blog",
  components: {
    PageHeader,
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
      this.districtBasedIn = "";
      this.sortBy = "";
      this.yearFounded = "";
      this.selectedCompany = "";
      this.loadBlogWithFilter("topic", e.target.value);
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