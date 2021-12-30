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
        <h1>Community Directory</h1>
        <div class="subtitle">
          Our community listing of tech and innovation companies in the
          ecosystem.
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
              name="district"
              v-model="typeSelected"
              @change="changeType($event)"
              required
            >
              <option value="" selected disabled>Campany category</option>
              <option
                v-for="(type, index) in types"
                v-bind:value="type.slug"
                :key="index"
              >
                {{ type.name }}
              </option>
              <option v-bind:value="''">All companies</option>
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
          <div class="filter-select">
            <select
              name="location"
              v-model="selectedLocation"
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
          <span class="float-right">
            <div class="filter-select" style="max-width: 220px">
              <select
                name="district"
                v-model="sortBy"
                @change="changeSort($event)"
                required
              >
                <option value="" disabled selected>Sort by</option>
                <option v-bind:value="'yearFounded,asc'">
                  Year founded(Asc)
                </option>
                <option v-bind:value="'yearFounded,desc'">
                  Year founded(Desc)
                </option>
                <option v-bind:value="'coName,asc'">Company name(A-Z)</option>
                <option v-bind:value="'coName,desc'">Company name(Z-A)</option>
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
        <div v-if="!loaded && directory && _.isEmpty(directory)">
          <Loading />
        </div>
        <div v-if="loaded && _.isEmpty(directory)" class="empty-post">
          <img src="@/assets/images/empty.png" />
          <h2 class="mt-0 py-0 font-weight-light h3">Directory is empty</h2>
          <button
            class="btn btn-success-outline mt-4"
            type="button"
            @click.prevent="resetFilter"
          >
            Refresh directory
          </button>
        </div>
      </div>
    </component>
  </div>
</template>


<script>
import AxiosHelper from "@/helpers/AxiosHelper";
import PageHeader from "@/components/PageHeader";
import ListCompanies from "@/components/ListCompanies";
import Loading from "@/components/Loading";
import { Districts } from "rwanda";
export default {
  name: "company-directory-page",
  components: {
    PageHeader,
    ListCompanies,
    Loading,
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
      typeSelected: "",
      selectedLocation: "",
      listOfBusinessActivities: [],
      sortBy: "",
      page: 1,
      meta: {},
      types: [],
      orderType: "createdAt",
      orderValue: "DESC",
      search: "",
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  created() {
    this.loadCompanyTypes();
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
      this.search = value;
    }

    this.loadCompanies(
      this.page,
      "",
      "",
      "",
      this.orderType,
      this.orderValue,
      this.search
    );
  },
  methods: {
    changeType(e) {
      this.typeSelected = e.target.value;
      this.loading = true;
      this.loaded = false;
      this.directory = [];
      this.loadCompanies(
        this.page,
        e.target.value,
        this.selectedActivity || "",
        this.selectedLocation || "",
        this.orderType,
        this.orderValue,
        this.search || ""
      );
    },
    changeActivity(e) {
      this.selectedActivity = e.target.value;
      this.loading = true;
      this.loaded = false;
      this.directory = [];
      this.loadCompanies(
        this.page,
        this.typeSelected || "",
        this.selectedActivity || "",
        this.selectedLocation || "",
        this.orderType,
        this.orderValue,
        this.search || ""
      );
    },
    changeLocation(e) {
      this.selectedLocation = e.target.value;
      this.loading = true;
      this.loaded = false;
      this.directory = [];
      this.loadCompanies(
        this.page,
        this.typeSelected || "",
        this.selectedActivity || "",
        e.target.value,
        this.orderType,
        this.orderValue,
        this.search || ""
      );
    },
    changeSort(e) {
      this.orderType = e.target.value.split(",")[0];
      this.orderValue = e.target.value.split(",")[1];
      this.loading = true;
      this.loaded = false;
      this.directory = [];
      this.loadCompanies(
        this.page,
        this.typeSelected || "",
        this.selectedActivity || "",
        this.selectedLocation || "",
        this.orderType,
        this.orderValue,
        this.search || ""
      );
    },
    async searchNow() {
      await this.$router.push({ query: { search: this.search } });
      if (this.$route.path !== `/directory?search=${this.search}`) {
        console.log("something", this.$route);
      } else {
        console.log("something", this.$route);
      }
      this.loading = true;
      this.loaded = false;
      this.directory = [];
      this.loadCompanies(
        this.page,
        this.typeSelected || "",
        this.selectedActivity || "",
        this.selectedLocation || "",
        this.orderType,
        this.orderValue,
        this.search
      );
    },
    async resetFilter() {
      await this.$router.push({ query: { search: "" } });
      this.loading = true;
      this.loaded = false;
      this.search = "";
      this.directory = [];
      this.loadCompanies(
        this.page,
        (this.typeSelected = ""),
        (this.selectedActivity = ""),
        (this.selectedLocation = ""),
        this.orderType,
        this.orderValue,
        (this.search = "")
      );
    },
    goTo(page) {
      this.directory = [];
      this.loading = false;
      this.loaded = false;
      this.loadCompanies(
        page,
        this.typeSelected || "",
        this.selectedActivity || "",
        this.selectedLocation || "",
        this.orderType,
        this.orderValue,
        this.search
      );
    },
    loadCompanies(
      page,
      companyType,
      activity,
      location,
      orderType,
      orderValue,
      search
    ) {
       
      AxiosHelper.get(
        `directory/public?page=${page}&companyType=${companyType}&activity=${activity}&location=${location}&orderType=${orderType}&orderValue=${orderValue}&search=${search}`
      )
        .then((response) => {
          this.directory = response.data.result;
          this.meta = response.data.meta;
          this.loaded = true;
        })
        .catch((error) => {
          
          console.log('404', error)
          this.loading = false;
          this.loaded = true;
          this.directory = [];
        });
    },
    loadCompanyByActivity() {
      // this.loading = true;
      // AxiosHelper.get("directory//?")
      //   .then((response) => {
      //     this.types = response.data.result;
      //     this.loading = false;
      //   })
      //   .catch(() => (this.loading = false));
      AxiosHelper.get(
        `directory/filter?filterBy=activities&filterValue=${this.selectedActivity}`
      )
        .then((response) => {
          this.directory = response.data.result;
          this.loaded = true;
          this.loading = false;
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.directory = [];
          } else {
            // this.errorPost = "Something went wrong, try again later";
          }
          this.loading = false;
          this.loaded = true;
        });
    },
    loadCompanyTypes() {
      this.loading = true;
      AxiosHelper.get("company-types")
        .then((response) => {
          this.types = response.data.result;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
  },
};
</script>
<style scoped>
</style>