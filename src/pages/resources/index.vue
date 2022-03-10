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
        <h1>Resources</h1>
        <div class="subtitle">
          You will find some useful content about how to do business in the
          Rwandan tech ecosystem for your needs here
        </div>
      </div>
      <div class="container">
        <div v-if="!_.isEmpty(posts)">
          <div class="wrap-resources">
            <div
              class="one-resource"
              v-for="(post, index) in posts"
              :key="index"
              @click.prevent="viewFile(post)"
            >
              <div class="resource-logo">
                <img
                  src="@/assets/images/icon-resource.png"
                  :alt="post.title"
                />
              </div>
              <h2 class="mb-3 h5 font-weight-light">
                {{ post.title | truncate(45) }}
              </h2>
              <button type="button">See disclaimer</button>
            </div>
            <div class="clear" />
          </div>
        </div>
        <div v-if="loaded && _.isEmpty(posts)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">No resources found</h2>
        </div>
        <Loading v-if="loading && !loaded" />
      </div>
      <modal
        name="openViewFile"
        :adaptive="true"
        :scrollable="true"
        :height="550"
        :width="650"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <div class="wrap-preview-resource">
          <div class="image">
            <img src="@/assets/images/icon-resource.png" />
          </div>
          <h4 class="text-center font-weight-light text-blue">
            {{ resource.title }}
          </h4>
          <div class="py-5 text-justify">
            {{ resource.description }}
          </div>
          <router-link
            :to="`/redirect/${FILE_URL}${resource.file}`"
            target="_blank"
            >Download the document</router-link
          >
        </div>
      </modal>
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
import VModal from "vue-js-modal";

Vue.use(VModal);
Vue.use(moment);
export default {
  name: "resources-pages",
  components: {
    PageHeader,
    Loading,
  },
  data() {
    return {
      query: "",
      posts: {},
      loading: false,
      loaded: false,
      resource: {},
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  created() {
    AxiosHelper.get("resources")
      .then((response) => {
        this.posts = response.data.result;
      })
      .catch((error) => {
         if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
      });
    this.timeNow = moment().format("YYYY-MM-DD");
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search(value);
    } else {
      this.loadJob();
    }
    // load all companies
    AxiosHelper.get("resources")
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
    viewFile(resource) {
      this.resource = {};
      this.resource = resource;
      this.$modal.show("openViewFile");
    },
    closeModal() {
      this.$modal.hide("openViewFile");
    },
    loadJob() {
      this.loaded = false;
      this.loading = true;
      AxiosHelper.get("resources")
        .then((response) => {
          this.posts = response.data.result;
          this.loaded = true;
          this.loading = false;
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
.wrap-resources {
  padding: 40px;
  box-shadow: 0px 17px 36px #1b295814;
  border-radius: 3px;
  margin: 0 auto;
  max-width: 1200px;
  background: #ffffff;
}
.one-resource {
  margin: 0 1% 30px 1%;
  border: 1px solid #06adef;
  padding: 25px;
  width: 23%;
  cursor: pointer;
  float: left;
}
.one-resource:hover {
  background: #f7fbfd;
}
.one-resource:hover a {
  color: #06adef;
}
.one-resource h2 {
  height: 80px;
}
.one-resource button {
  margin: 10px 0;
  border: 1px solid #06adef;
  padding: 4px 30px;
  background: none;
  font-size: 14px;
  color: #06adef;
}
.resource-logo {
  margin: 20px 0;
  border-radius: 4px;
}
.resource-logo img {
  width: 50px;
}
.wrap-preview-resource {
  padding: 50px;
  margin-bottom: 50px;
}
.wrap-preview-resource .image {
  width: 60px;
  margin: 30px auto;
}
.wrap-preview-resource a {
  margin: 10px auto;
  border: 1px solid #06adef;
  padding: 10px 40px;
  text-align: center;
  background: none;
  font-size: 16px;
  color: #06adef;
  display: block;
  width: 350px;
}
@media screen and (max-width: 760px) {
  .wrap-resources {
    padding: 20px;
  }
  .one-resource {
    width: 48%;
  }
  .one-resource h2 {
    font-size: 16px;
  }
}
@media screen and (max-width: 500px) {
  .wrap-resources {
    padding: 12px;
  }
  .one-resource {
    width: 98%;
  }
  .one-resource h2 {
    font-size: 13px;
  }
}
</style>