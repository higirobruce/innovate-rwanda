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
        <h1>Ecosystem Enablers</h1>
        <div class="subtitle">
          Companies, organizations and service providers working together to
          foster growth in the Ecosystem
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
        <div class="wrap-companies" v-if="!_.isEmpty(directory)">
          <div
            class="row one-company"
            v-for="(company, index) in directory"
            :key="index"
          >
            <div class="col-sm-12 col-md-4 col-lg-2">
              <div class="company-logo">
                <router-link :to="`/company/${company.slug}`">
                  <img
                    v-if="company && company.logo"
                    :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${company.logo}`"
                    :alt="company.coName"
                  />
                  <img
                    v-else
                    src="@/assets/images/logo_placeholder.png"
                    :alt="company.coName"
                  />
                </router-link>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-10">
              <router-link :to="`/company/${company.slug}`">
                <h2>{{ company.coName }}</h2>
                <div>
                  <div class="mb-2 co-info" v-if="company.yearFounded">
                    <i class="icon-calendar" />
                    <span class="ml-2">{{ company.yearFounded }} </span>
                  </div>
                  <div class="mb-2 co-info" v-if="company.districtBasedIn">
                    <i class="icon-marker-stroked" />
                    <span class="ml-2">{{ company.districtBasedIn }} </span>
                  </div>
                  <div class="mb-2 co-info" v-if="company.mainAreaOfInterest">
                    <i class="icon-pound" />
                    <span class="ml-2">{{ company.mainAreaOfInterest }} </span>
                  </div>
                  <div class="mb-2 co-info" v-if="company.shortDescription">
                    <i class="icon-comment" />
                    <span class="ml-2">{{ company.shortDescription }} </span>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="info-separator clear my-3">&nbsp;</div>
          </div>
        </div>
        <div v-if="loaded && _.isEmpty(directory)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">Companies not found</h2>
        </div>
      </div>
    </component>
  </div>
</template>


<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import PageHeader from "@/components/PageHeader";
export default {
  name: "enablers",
  components: {
    PageHeader,
  },
  data() {
    return {
      directory: {},
      query: "",
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
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search(value);
    } else {
      AxiosHelper.get("directory/public/Enabler")
        .then((response) => {
          this.directory = response.data.result;
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
          this.directory = [];
        });
    }
  },
  methods: {
    search(query) {
      AxiosHelper.get(`directory/search?searchValue=${query}`)
        .then((response) => {
          this.directory = response.data.result;
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
          this.directory = [];
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