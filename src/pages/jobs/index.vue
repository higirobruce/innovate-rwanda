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
        <h1>Find talents</h1>
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
      <div class="container">
        <div class="wrap-companies" v-if="!_.isEmpty(posts)">
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
                    src="@/assets/images/logo_placeholder.svg"
                    :alt="post.coName"
                  />
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-10">
              <router-link :to="`/job/${post.id}`">
                <h2 class="mb-1">{{ post.title }}</h2>
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
                  <div class="mb-2 co-info">
                    <i class="icon-tag" />
                    <span class="ml-2">{{ post.category }} </span>
                  </div>
                  <div class="mb-2 co-info" v-if="post.jobDetailsDocument">
                    <i class="icon-file" />
                    <span class="ml-2">Attachment</span>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="info-separator clear my-3">&nbsp;</div>
          </div>
        </div>
        <div v-if="loaded && _.isEmpty(posts)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">No jobs found</h2>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import PageHeader from "@/components/PageHeader";
import moment from "moment";
Vue.use(moment);
export default {
  name: "companies",
  components: {
    PageHeader,
  },
  data() {
    return {
      query: "",
      posts: {},
      loading: false,
      loaded: false,
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  created() {
    AxiosHelper.get("jobs/public")
      .then((response) => {
        this.posts = response.data.result;
      })
      .catch(() => {
        console.log("something went wrong");
      });
    this.timeNow = moment().format("YYYY-MM-DD");
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search(value);
    } else {
      AxiosHelper.get("jobs/public")
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
    search(query) {
      AxiosHelper.get(`jobs/public/search?searchValue=${query}`)
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
  },
};
</script>
<style scoped>
.wrap-companies {
  padding: 40px;
  box-shadow: 0px 17px 36px #1b295814;
  border-radius: 3px;
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