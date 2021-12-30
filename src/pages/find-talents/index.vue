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
      </div>
      <div class="container mt-4">
        <div v-if="!_.isEmpty(users)">
          <ListTalents :users="users" />
          <div class="clear" />
          <div class="wrap-pagination">
            <button
              type="button"
              :disabled="meta.prev === 0"
              @click.prevent="goTo(meta.prev)"
            >
              <img src="@/assets/images/left-arrow.png" />
            </button>
            <span
              v-for="(p, index) in meta && meta.pages"
              :class="`${p === meta.page ? 'active-page' : ''}`"
              :key="index"
              @click.prevent="goTo(p)"
            >
              {{ p }}
            </span>
            <button
              type="button"
              @click.prevent="goTo(meta.next)"
              :disabled="meta.next === 0"
            >
              <img src="@/assets/images/right-arrow.png" />
            </button>
          </div>
        </div>
        <div v-if="!loaded && users && _.isEmpty(users)">
          <Loading />
        </div>
        <div v-if="loaded && _.isEmpty(users)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">Sorry, Nothing found here!</h2>
        </div>
      </div>
    </component>
  </div>
</template>


<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import PageHeader from "@/components/PageHeader";
import ListTalents from "@/components/ListTalents";
import Loading from "@/components/Loading";
import { Districts } from "rwanda";
export default {
  name: "find-talents",
  components: {
    PageHeader,
    ListTalents,
    Loading,
  },
  data() {
    return {
      users: {},
      query: "",
      loading: false,
      loaded: false,
      yearFounded: "",
      selectedActivity: "",
      allDistricts: [],
      districtBasedIn: "",
      listOfBusinessActivities: [],
      sortBy: "",
      page: 1,
      meta: {},
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  created() {
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch(() => {});
    // loading all districts
    this.allDistricts = Districts();
    // load companies
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.query = value;
    } else {
      this.loadTalents(this.page);
    }
  },
  methods: {
    goTo(page) {
      this.loadTalents(page);
      this.users = {};
      this.loaded = false;
    },
    loadTalents(page) {
      AxiosHelper.get(`talent/public?page=${page}`)
        .then((response) => {
          this.users = response.data.result;
          this.meta = response.data.meta;
          console.log("companies:", this.users);
          console.log("meta:", this.meta);
          this.loaded = true;
        })
        .catch(() => {
          this.loading = false;
          this.loaded = true;
          this.users = [];
        });
    },
  },
};
</script>
<style scoped>
</style>