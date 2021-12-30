<template>
  <div>
    <component :is="layout">
      <div class="container">
        <div v-if="!notfound && loaded && !loading">
          <div>
            <div class="company-header mb-3 p-3">
              <img
                v-if="company && company.company.logo"
                :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${company.company.logo}`"
                :alt="company.company.coName"
              />
              <h1>{{ company.company.coName }}</h1>
            </div>
            <div class="company-body mb-3">
              <div class="row">
                <div class="col-sm-12 col-lg-6">
                  <div class="company-small-info">
                    <h4>Website</h4>
                    <div class="text-truncate">
                      <router-link
                        v-if="!_.isEmpty(company.company.coWebsite)"
                        :to="`/redirect/${company.company.coWebsite}`"
                        target="_blank"
                      >
                        {{ company.company.coWebsite }}
                      </router-link>
                    </div>
                    <img src="@/assets/images/globe.png" />
                  </div>
                  <div class="company-small-info">
                    <h4>Location</h4>
                    <div class="text-truncate">
                      {{ company.company.districtBasedIn }}
                    </div>
                    <img src="@/assets/images/map-marker.png" />
                  </div>
                  <div class="info-separator clear my-3">&nbsp;</div>
                  <div class="company-small-info">
                    <h4>Year founded</h4>
                    <div class="text-truncate">
                      {{ company.company.yearFounded }}
                    </div>
                    <img src="@/assets/images/calendar-alt.png" />
                  </div>
                  <div class="company-small-info">
                    <h4>Social media</h4>
                    <div class="social-links">
                      <router-link
                        style="color: #1473e6"
                        target="_blank"
                        :to="`/redirect/facebook.com/${
                          convertToObject(company.company.socialMedia).facebook
                        }`"
                        v-if="
                          company.company.socialMedia &&
                          convertToObject(company.company.socialMedia).facebook
                        "
                      >
                        <i class="icon-facebook-official mr-2" />
                      </router-link>
                      <router-link
                        style="color: #00aeef"
                        target="_blank"
                        :to="`/redirect/twitter.com/${
                          convertToObject(company.company.socialMedia).twitter
                        }`"
                        v-if="
                          company.company.socialMedia &&
                          convertToObject(company.company.socialMedia).twitter
                        "
                      >
                        <i class="icon-twitter mr-2" />
                      </router-link>
                      <router-link
                        style="color: #ff1d77"
                        :to="`/redirect/instagram.com/${
                          convertToObject(company.company.socialMedia).instagram
                        }`"
                        v-if="
                          company.company.socialMedia &&
                          convertToObject(company.company.socialMedia).instagram
                        "
                      >
                        <i class="icon-instagram mr-2" />
                      </router-link>
                      <router-link
                        style="color: #ff0000"
                        :to="`/redirect/youtube.com/c/${
                          convertToObject(company.company.socialMedia).youtube
                        }`"
                        v-if="
                          company.company.socialMedia &&
                          convertToObject(company.company.socialMedia).youtube
                        "
                      >
                        <i class="icon-youtube-play mr-2" />
                      </router-link>
                      <router-link
                        style="color: #007bb5"
                        :to="`/redirect/linkedin.com/company/${
                          convertToObject(company.company.socialMedia).linkedin
                        }`"
                        v-if="
                          company.company.socialMedia &&
                          convertToObject(company.company.socialMedia).linkedin
                        "
                      >
                        <i class="icon-linkedin-alt mr-2" />
                      </router-link>
                    </div>
                    <img src="@/assets/images/hashtag.png" />
                  </div>
                  <div class="info-separator clear my-3">&nbsp;</div>
                  <div
                    class="company-small-info"
                    v-if="company.company.phoneDisplay === true"
                  >
                    <h4>Contact phone number</h4>
                    <h5>
                      {{ company.company.contactPhone }}
                    </h5>
                    <img src="@/assets/images/phone.png" />
                  </div>
                  <div
                    class="company-small-info"
                    v-if="company.company.emailDisplay === true"
                  >
                    <h4>Contact email</h4>
                    <h5>
                      {{ company.company.contactEmail }}
                    </h5>
                    <img src="@/assets/images/email.png" />
                  </div>

                  <div
                    class="info-separator clear my-3"
                    v-if="
                      company.company.emailDisplay === true ||
                      company.company.phoneDisplay === true
                    "
                  >
                    &nbsp;
                  </div>

                  <div class="company-large-info">
                    <h4>Business activitivies</h4>
                    <div class="my-3">
                      <div
                        class="co-badge"
                        v-for="(act, index) in company.company
                          .ActivitiesOfCompanies"
                        :key="index"
                      >
                        <span>
                          {{ act.BusinessActivity.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="info-separator clear my-3">&nbsp;</div>
                  <SendMessage
                    v-if="company && company.company"
                    :company="company.company"
                  />
                </div>
                <div class="col-sm-12 col-lg-6">
                  <div class="wrap-summary">
                    <h3>Company summary</h3>
                    <div>
                      {{ company.company.shortDescription }}
                    </div>
                    <div class="info-separator my-3">&nbsp;</div>
                    <h3>Main business actity</h3>
                    <div>
                      {{ company.company.BusinessActivity.name }}
                    </div>
                    <div class="info-separator my-3">&nbsp;</div>
                    <h3>Client base</h3>
                    <div>
                      <span
                        class="text-blue-dark"
                        v-for="(base, index) in JSON.parse(
                          company.company.customerBase
                        )"
                        :key="index"
                      >
                        <span v-if="index > 0"> , </span>
                        {{ base }}
                      </span>
                    </div>
                    <div class="info-separator my-3">&nbsp;</div>
                    <div
                      class="wrap-map"
                      v-if="company.company && company.company.officeAddress"
                    >
                      <h3>
                        Location

                        <span class="mx-3 font-weight-bold text-blue-dark">
                          {{
                            convertLatLng(company.company.officeAddress).place
                          }}
                        </span>
                      </h3>
                      <GmapMap
                        :center="convertLatLng(company.company.officeAddress)"
                        :zoom="17"
                        map-type-id="terrain"
                        style="max-width: 500px; width: 100%; height: 400px"
                      >
                        <GmapMarker
                          :position="
                            convertLatLng(company.company.officeAddress)
                          "
                          :clickable="false"
                          :draggable="false"
                        />
                      </GmapMap>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="wrap-similar-companies"
            v-if="_.size(company.similarCompanies) > 0"
          >
            <h3 class="text-center text-blue-dark">Similar companies</h3>
            <div class="text-center similar-desc mb-4">
              based on areas of interests
            </div>
            <div class="row similar-companies">
              <div
                class="col-sm-12 col-md-6 col-lg-4"
                v-for="(co, index) in company.similarCompanies"
                :key="index"
              >
                <a class="cursor-pointer" @click.prevent="goToCompany(co.slug)">
                  <div class="co-similar">
                    <img
                      v-if="co && co.logo"
                      :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${co.logo}`"
                      :alt="co.coName"
                    />
                    <img
                      v-else
                      src="@/assets/images/logo_placeholder.png"
                      :alt="co.coName"
                    />
                    <h4>
                      {{ co.companyName }}
                    </h4>
                  </div>
                </a>
              </div>
            </div>
            <div class="co-loadmore">
              <router-link to="/directory">Load more</router-link>
            </div>
          </div>
        </div>
        <div class="my-5 py-5" v-if="notfound && _.isEmpty(company)">
          <div class="empty-post">
            <img src="@/assets/images/empty.png" />
            <h2 class="my-0 py-0 font-weight-light h3">Company not found</h2>
          </div>
        </div>
        <Loading v-if="!loaded && loading" />
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import * as VueGoogleMaps from "vue2-google-maps";
import SendMessage from "@/components/SendMessage";
import Loading from "@/components/Loading";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBOcgzwN-u8KLJ2JHeeJON8St0jAkD2u_8",
    libraries: "places",
  },
});
export default {
  name: "company-page",
  components: {
    SendMessage,
    Loading,
  },
  data() {
    return {
      company: {},
      slug: "",
      notfound: false,
      loading: false,
      loaded: false,
      meta: "",
    };
  },
  created() {
    this.company = {};
  },
  mounted() {
    this.notfound = false;
    this.slug = this.$route.params.slug;
    this.loadCompanyInfo(this.slug);
  },
  methods: {
    goToCompany(slug) {
      window.scrollTo(0, 0);
      this.loadCompanyInfo(slug);
    },
    convertToObject(object) {
      return JSON.parse(object);
    },
    loadCompanyInfo(slug) {
      this.loaded = false;
      this.loading = true;
      AxiosHelper.get(`company/public/${slug}`)
        .then((response) => {
          this.company = response.data.result;
          this.meta = response.data.meta;
          this.loaded = true;
          this.loading = false;
        })
        .catch(() => {
          this.notfound = true;
          this.loaded = false;
          this.loading = false;
        });
    },
    convertLatLng(officeAddress) {
      let latLng = { lat: -1.9535713202050946, lng: 30.09239731494155 };
      if (officeAddress && officeAddress) {
        latLng = JSON.parse(officeAddress);
      }
      return latLng;
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
.company-body {
  background: #ffffff;
  padding: 55px;
}
.company-header {
  background: #fff;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
}
.company-header h1 {
  color: #1b2958;
  font-size: 46px;
  font-weight: 900;
}
.company-header img {
  padding: 15px;
  max-width: 150px;
  border-radius: 4px;
}
.company-small-info {
  position: relative;
  margin: 15px 0;
  padding-left: 45px;
  width: 50%;
  float: left;
}
@media screen and (max-width: 760px) {
  .company-small-info {
    width: 100%;
  }
}
.company-large-info {
  position: relative;
  margin: 15px 0;
  padding-left: 45px;
}
.company-small-info h4,
.company-large-info h4 {
  font-size: 18px;
  color: #c0c6d8;
  font-weight: 400;
}
.company-small-info h5,
.company-large-info h5 {
  font-size: 23px;
  color: #1b2958;
}
.company-small-info img,
.company-large-info img {
  position: absolute;
  top: 0;
  height: 22px;
  left: 0;
}
.wrap-summary {
  padding: 35px;
  background: #f0f2f8;
}
.wrap-summary h3 {
  margin: 20px 0;
  font-size: 20px;
  font-weight: 900;
  color: #1b2958;
}

.social-links a {
  font-size: 30px;
  margin: 4px 0 0 5px;
}
.wrap-similar-companies {
  max-width: 940px;
  margin: 40px auto;
  display: block;
}
.similar-desc {
  color: #c0c6d8;
}
.similar-companies {
  border-top: 1px solid #cecece;
  padding-top: 25px;
}
.co-similar {
  border-bottom: 1px solid #cecece;
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
}
.co-similar img {
  width: 60px;
}
.co-similar h4 {
  padding: 0 20px;
  width: calc(100% - 60px);
  color: #1b2958;
  font-size: 18px;
}
.co-loadmore {
  padding: 30px 0;
  text-align: center;
}
.co-loadmore a {
  color: #5e7c8d;
  font-size: 22px;
  display: block;
}
</style>