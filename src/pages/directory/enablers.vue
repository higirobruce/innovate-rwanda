<template>
  <div>
    <component :is="layout">
      <PageHeader
        image="auth-bg.jpg"
        rgba="rgba(4, 137, 187, 0.83)"
        title="Ecosystem Enablers"
        subtitle="Companies, organizations and service providers working together to foster growth in the Ecosystem"
      />
      <div class="container">
        <div class="wrap-companies" v-if="directory">
          <div
            class="row one-company"
            v-for="(company, index) in directory"
            :key="index"
          >
            <router-link :to="`/company/${company.slug}`">
              <div class="col-sm-12 col-md-4 col-lg-2">
                <div class="company-logo">
                  <img
                    v-if="company && company.logo"
                    :src="company.logo"
                    :alt="company.coName"
                  />
                  <img
                    v-else
                    src="@/assets/images/logo_placeholder.svg"
                    :alt="company.coName"
                  />
                </div>
              </div>
              <div class="col-sm-12 col-md-8 col-lg-10">
                <h2>{{ company.coName }}</h2>
                <div>
                  <div class="mb-2 co-info">
                    <icon class="icon" icon="calendar-alt" />
                    <span class="ml-2">{{ company.yearFounded }} </span>
                  </div>
                  <div class="mb-2 co-info">
                    <icon class="icon" icon="map-marker-alt" />
                    <span class="ml-2">{{ company.districtBasedIn }} </span>
                  </div>
                  <div class="mb-2 co-info">
                    <icon class="icon" icon="tag" />
                    <span class="ml-2">{{ company.mainAreaOfInterest }} </span>
                  </div>
                  <div class="mb-2 co-info">
                    <icon class="icon" icon="comment" />
                    <span class="ml-2">{{ company.shortDescription }} </span>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="info-separator clear my-3">&nbsp;</div>
          </div>
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
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  created() {
    AxiosHelper.get("directory/public")
      .then((response) => {
        this.directory = response.data.result;
      })
      .catch(() => {
        console.log("something went wrong");
      });
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
}
.one-company {
  margin: 25px 0;
}
.company-logo {
  margin: 25px;
}
.company-logo img {
  max-width: 140px;
}
.one-company h2 {
  margin: 20px 0;
  font-size: 26px;
  font-weight: 900;
  color: #1b2958;
}
.co-info {
  color: #5e7c8d;
  font-size: 18px;
}
</style>