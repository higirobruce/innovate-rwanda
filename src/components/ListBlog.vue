<template>
  <div class="wrap-companies">
    <div
      class="row one-company"
      v-for="(company, index) in response"
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
              src="@/assets/images/logo_placeholder.svg"
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
    <div class="wrap-pagination">
      <button
        type="button"
        :disabled="currentPage < 1"
        @click.prevent="goToPrevious"
      >
        <img src="@/assets/images/left-arrow.png" />
      </button>
      <span
        v-for="(page, index) in allPages"
        :class="`${page === currentPage + 1 ? 'active-page' : ''}`"
        :key="index"
        @click.prevent="goTo(page - 1)"
      >
        {{ page }}
      </span>
      <button
        type="button"
        :disabled="allPages === currentPage + 1"
        @click="goToNext"
      >
        <img src="@/assets/images/right-arrow.png" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-companies",
  props: ["companies"],
  data() {
    return {
      response: [],
      numberOnPage: 20,
      currentPage: 0,
      allPages: 0,
      count: 0,
    };
  },
  created() {
    this.count = this.companies.length;
    this.response = this.companies.slice(
      this.currentPage,
      this.numberOnPage >= this.count ?  this.count : this.numberOnPage
    );
    this.allPages = this.count > this.numberOnPage ? this.count / this.numberOnPage : 1;
  },
  methods: {
    goToPrevious() {
      this.currentPage = this.currentPage - 1;
      this.response = this.companies.slice(
        this.currentPage,
        this.numberOnPage + this.currentPage
      );
    },
    goToNext() {
      this.currentPage = this.currentPage + 1;
      this.response = this.companies.slice(
        this.currentPage,
        this.numberOnPage + this.currentPage
      );
    },
    goTo(page) {
      this.currentPage = page;
      this.response = this.companies.slice(
        this.currentPage,
        this.numberOnPage + this.currentPage
      );
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
  margin-bottom: 40px;
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
.wrap-pagination {
  padding: 25px 0;
}
.wrap-pagination button {
  border: 2px solid #06adef;
  background: #06adef;
  padding: 2px 22px;
  margin-right: 5px;
  cursor: pointer;
}
.wrap-pagination button:disabled,
.wrap-pagination button[disabled] {
  border: 2px solid #f3f3f3;
  background-color: #f0f0f0;
  color: #777777;
  cursor: unset;
  pointer-events: all !important;
}
.wrap-pagination button:disabled img,
.wrap-pagination button[disabled] img {
  opacity: 0.2;
}
.wrap-pagination span {
  position: relative;
  border: 2px solid #d5d8e4;
  top: 2px;
  margin-right: 5px;
  background: #ffffff;
  padding: 6px 18px;
  text-align: center;
  cursor: pointer;
}
.wrap-pagination span.active-page {
  border: 2px solid #06adef;
  background: #06adef;
  color: #ffffff;
}
</style>
