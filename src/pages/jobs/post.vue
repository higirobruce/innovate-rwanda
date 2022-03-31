<template>
  <div>
    <component :is="layout">
      <PageHeaderSm
        image="bg-why.png"
        rgba="rgba(4, 137, 187, 0.83)"
        title="Find talent"
      />
      <div
        class="container"
        v-if="!loading && post && post.status === 'approved' || (isLoggedIn && userProfile.role === 'super-admin')"
      >
        <div class="wrap-event-image">
          <img
            v-if="post.flyer"
            :src="`${IMAGE_URL}c_fill,g_center,w_1200/${post.flyer}`"
            :alt="post.title"
            class="current-logo"
          />
        </div>
        <div class="head-post">
          <h1 class="text-blue-dark font-weight-bold">
            {{ post.title }}
          </h1>

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
              <span class="ml-1">{{ post.deadlineTime }} CAT </span>
            </span>
          </div>
        </div>
        <div class="divider bg-gray-1 my-3"></div>
        <div
          class="wrap-post-content mt-0 py-0"
          v-if="post.description"
          v-html="previewText"
        ></div>

        <div class="clear"></div>
        <router-link
          class="text-blue-dark"
          :to="`/redirect/${FILE_URL}${post.jobDetailsDocument}`"
          target="_blank"
        >
          <div
            class="media my-3 p-3 bg-white border rounded"
            v-if="post.jobDetailsDocument"
          >
            <img class="align-self-start mr-3" src="@/assets/images/pdf.png" />
            <div class="media-body">
              <h5 class="mt-2">Preview</h5>
              <p>Job attachment</p>
            </div>
          </div>
        </router-link>
        <div class="my-4">
          <div
            class="co-badge"
            v-for="(act, index) in post.AudienceForPosts"
            :key="index"
          >
            <span>
              {{ act.BusinessActivity.name }}
            </span>
          </div>
        </div>
        <div class="more-posts mt-5">
          <router-link :to="'/jobs'">Find jobs</router-link>
        </div>
      </div>
      <div
        v-if="!cantViewPost"
        class="not-found"
      ></div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import PageHeaderSm from "@/components/PageHeaderSm";
let marked = require("marked");

export default {
  name: "blog-post",
  components: {
    PageHeaderSm,
  },
  data() {
    return {
      post: {},
      loading: false,
      loaded: false,
    };
  },
  created() {
    this.getJobDetails();
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
    userProfile(){
      const user = JSON.parse(localStorage.getItem('profile'));
      return user;
    },
    isLoggedIn(){
      const loggedIn = JSON.parse(localStorage.getItem('isAuth'));

      return loggedIn;
    },
    cantViewPost(){

      const eligibleToView = !this.loading && this.post && this.post.status === 'approved' || (this.isLoggedIn && this.userProfile && this.userProfile.role === 'super-admin' && !this.loading)
      return eligibleToView;

    
    },
  },
  methods: {
   async  getJobDetails() {
      this.loading = true;
          const slug = this.$route.params.slug;
      try {
        const response = await AxiosHelper.get(`/jobs/info/${slug}`);
        this.post = response.data.result;
        this.loaded = true;
        this.loading = false;
      } catch(error) {
         if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
        this.loading = false;
        this.loaded = true;
      }

    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
.head-post {
  width: 100%;
}
.head-post h1 {
  font-size: 65px;
}
.wrap-event-image {
  margin: 30px auto 0 auto;
  width: 100%;
  max-width: 1280px;
  display: block;
}
.wrap-event-image img {
  width: 100%;
}
.more-posts {
  margin: 25px 0;
  border: 2px solid #5e7c8d;
  border-radius: 3px;
}
.more-posts a {
  display: block;
  padding: 25px 0;
  text-align: center;
  color: #5e7c8d;
}
</style>