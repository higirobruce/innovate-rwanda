<template>
  <div>
    <component :is="layout">
      <div class="container">
        <div v-if="!notfound && loaded">
          <div class="company-header mb-3 p-3">
            <img
              v-if="company && company.company.logo"
               :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${company.company.logo}`"
              :alt="company.company.coName"
            />
            <img
              v-else
              src="@/assets/images/logo_placeholder.svg"
              :alt="company.company.coName"
            />
            <h1>{{ company.company.coName }}</h1>
          </div>
          <div class="company-body mb-3">
            <div class="row">
              <div class="col-sm-12 col-lg-6">
                <div class="company-small-info">
                  <h4>Website</h4>
                  <h5>
                    {{ company.company.coWebsite }}
                  </h5>
                  <img src="@/assets/images/globe.svg" />
                </div>
                <div class="company-small-info">
                  <h4>Location</h4>
                  <h5>
                    {{ company.company.districtBasedIn }}
                  </h5>
                  <img src="@/assets/images/map-marker.svg" />
                </div>
                <div class="info-separator clear my-3">&nbsp;</div>
                <div class="company-small-info">
                  <h4>Year founded</h4>
                  <h5>
                    {{ company.company.yearFounded }}
                  </h5>
                  <img src="@/assets/images/calendar-alt.svg" />
                </div>
                <div class="company-small-info">
                  <h4>Social media</h4>
                  <div class="social-links">
                    <a
                      style="color: #1473e6"
                      :to="''"
                      v-if="
                        company.company.socialMedia &&
                        convertToObject(company.company.socialMedia).facebook
                      "
                    >
                      <icon :icon="['fab', 'facebook']" class="icon mr-2" />
                    </a>
                    <a
                      style="color: #00aeef"
                      :to="''"
                      target="_blank"
                      v-if="
                        company.company.socialMedia &&
                        convertToObject(company.company.socialMedia).twitter
                      "
                    >
                      <icon :icon="['fab', 'twitter']" class="icon mr-2" />
                    </a>
                    <a
                      style="color: #ff1d77"
                      :to="''"
                      target="_blank"
                      v-if="
                        company.company.socialMedia &&
                        convertToObject(company.company.socialMedia).instagram
                      "
                    >
                      <icon :icon="['fab', 'instagram']" class="icon mr-2" />
                    </a>
                    <a
                      style="color: #ff0000"
                      target="_blank"
                      v-if="
                        company.company.socialMedia &&
                        convertToObject(company.company.socialMedia).youtube
                      "
                      :href="`https://youtube.com/${
                        convertToObject(company.company.socialMedia).youtube
                      }`"
                    >
                      <icon :icon="['fab', 'youtube']" class="icon mr-2" />
                    </a>
                    <a
                      style="color: #007bb5"
                      target="_blank"
                      v-if="
                        company.company.socialMedia &&
                        convertToObject(company.company.socialMedia).linkedin
                      "
                      :href="`https://youtube.com/${
                        convertToObject(company.company.socialMedia).linkedin
                      }`"
                    >
                      <icon :icon="['fab', 'linkedin']" class="icon mr-2" />
                    </a>
                  </div>
                  <img src="@/assets/images/hashtag.svg" />
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
                  <img src="@/assets/images/phone.svg" />
                </div>
                <div
                  class="company-small-info"
                  v-if="company.company.emailDisplay === true"
                >
                  <h4>Contact phone number</h4>
                  <h5>
                    {{ company.company.contactEmail }}
                  </h5>
                  <img src="@/assets/images/email.svg" />
                </div>

                <div class="info-separator clear my-3" v-if="company.company.emailDisplay === true || company.company.phoneDisplay === true">&nbsp;</div>

                <div class="company-large-info">
                  <h4>Areas of interests</h4>
                  <img src="@/assets/images/phone.svg" />
                  <div class="my-3">
                    <div class="co-badge">Business consulting</div>
                    <div class="co-badge">Information Technology Services</div>
                    <div class="co-badge">Tax and Accounting Consulting</div>
                    <div class="co-badge">Non-academic courses</div>
                    <div class="co-badge">Marketing</div>
                    <div class="co-badge">
                      Communications &amp; Public Relations
                    </div>
                    <div class="co-badge">Mentoring</div>
                  </div>
                </div>
                <div class="info-separator clear my-3">&nbsp;</div>
                <div class="company-large-info">
                  <h4
                    style="
                      margin: 20px 0;
                      font-size: 27px;
                      font-weight: 900;
                      color: #1b2958;
                    "
                  >
                    Contact {{ company.company.coName }}
                  </h4>
                  <div class="row mt-4">
                    <div class="col-12">
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control custom-input"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group">
                        <textarea
                          class="form-control"
                          rows="7"
                          placeholder="Type your message...."
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>
                  <div class="my-4 border float-right">
                    <button class="btn btn-primary-outline px-5">Send</button>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-lg-6">
                <div class="wrap-summary">
                  <h3>Company summary</h3>
                  <div>
                    {{ company.company.shortDescription }}
                  </div>
                  <div class="info-separator my-3">&nbsp;</div>
                  <h3>Main area of interest</h3>
                  <div>
                    {{ company.company.mainAreaOfInterest }}
                  </div>
                  <div class="info-separator my-3">&nbsp;</div>
                  <h3>Customer base</h3>
                  <div>
                    {{ company.company.customerBase || "-" }}
                  </div>
                  <div class="info-separator my-3">&nbsp;</div>
                  <h3>Location</h3>
                  <div>Map soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="notfound">Company not found</div>
      </div>
    </component>
  </div>
</template>

<script>
import AxiosHelper from "@/helpers/AxiosHelper";
export default {
  name: "company",
  data() {
    return {
      company: {},
      slug: "",
      notfound: false,
      loaded: false,
    };
  },
  created() {
    this.notfound = false;
    this.slug = this.$route.params.slug;
    AxiosHelper.get(`company/public/${this.slug}`)
      .then((response) => {
        this.company = response.data.result;
        this.loaded = true;
      })
      .catch(() => {
        this.notfound = true;
        this.loaded = false;
      });
  },
  methods: {
    convertToObject(object) {
      return JSON.parse(object);
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
</style>