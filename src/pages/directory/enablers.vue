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
      <div class="wrap-filters-box">
        <div class="wrap-filters">
          <div class="filter-select">
            <select
              name="district"
              v-model="districtBasedIn"
              @change="changeLocation($event)"
              required
            >
              <option value="" selected disabled>Location</option>
              <option
                v-for="(district, index) in allDistricts"
                v-bind:value="district"
                :key="index"
              >
                {{ district }}
              </option>
            </select>
          </div>
          <div class="filter-select">
            <select
              name="district"
              v-model="yearFounded"
              @change="changeYearfound($event)"
              required
            >
              <option value="" selected disabled>Year founded</option>
              <option
                v-for="(year, index) in 22"
                v-bind:value="new Date().getFullYear() - year + 1"
                :key="index"
              >
                {{ new Date().getFullYear() - year + 1 }}
              </option>
            </select>
          </div>
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
          <span class="float-right">
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
          </span>
          <div class="clear" />
        </div>
      </div>
      <div class="container">
        <div v-if="!_.isEmpty(directory)">
          <ListCompanies :companies="directory" />
        </div>

        <div v-if="loaded && _.isEmpty(directory)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="my-0 py-0 font-weight-light h3">Directory is empty</h2>
        </div>
      </div>
    </component>
  </div>
</template>


<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import PageHeader from "@/components/PageHeader";
import ListCompanies from "@/components/ListCompanies";
import { Districts } from "rwanda";
export default {
  name: "enablers-directory",
  components: {
    PageHeader,
    ListCompanies,
  },
  data() {
    return {
      directory: {},
      query: "",
      loading: false,
      loaded: false,
      yearFounded: "",
      selectedActivity: "",
      allDistricts: [],
      districtBasedIn: "",
      listOfBusinessActivities: [],
      sortBy: "",
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
      .catch((error) => {
         if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
      });
    // loading all districts
    this.allDistricts = Districts();
    // load companies
    const value = this.$route.query.search;
    if (!this._.isEmpty(value)) {
      this.search(value);
      this.query = value;
    } else {
      this.loadCompanies();
    }
  },
  methods: {
    resetFilter() {
      this.districtBasedIn = "";
      this.yearFounded = "";
      this.selectedActivity = "";
      this.sortBy = "";
      this.directory = [];
      this.loadCompanies();
    },
    changeLocation(e) {
      this.yearFounded = "";
      this.selectedActivity = "";
      this.sortBy = "";
      this.loadCompaniesWithFilter("location", e.target.value);
    },
    changeYearfound(e) {
      this.districtBasedIn = "";
      this.selectedActivity = "";
      this.sortBy = "";
      this.loadCompaniesWithFilter("year-founded", e.target.value);
    },
    changeActivity(e) {
      this.districtBasedIn = "";
      this.sortBy = "";
      this.yearFounded = "";
      this.loadCompaniesWithFilter("activities", e.target.value);
    },
    changeSort(e) {
      this.districtBasedIn = "";
      this.selectedActivity = "";
      this.yearFounded = "";
      this.directory = [];
      const sortBy = e.target.value.split(",")[0];
      const sortValue = e.target.value.split(",")[1];
      AxiosHelper.get(
        `directory/sort/Enabler?sortBy=${sortBy}&sortValue=${sortValue}`
      )
        .then((response) => {
          this.directory = response.data.result;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = true;
          this.directory = [];
        });
    },
    loadCompanies() {
      AxiosHelper.get("directory/public/Enabler")
        .then((response) => {
          this.directory = response.data.result;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = true;
          this.directory = [];
        });
    },
    loadCompaniesWithFilter(filter, value) {
      this.directory = [];
      AxiosHelper.get(
        `directory/filter/Enabler?filterBy=${filter}&filterValue=${value}`
      )
        .then((response) => {
          this.directory = response.data.result;
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
    search(query) {
      AxiosHelper.get(`directory/search?searchValue=${query}`)
        .then((response) => {
          this.directory = response.data.result;
          this.loaded = true;
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
          this.loaded = true;
          this.directory = [];
        });
    },
  },
};
</script>
<style scoped>
</style>