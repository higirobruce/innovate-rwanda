<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">My Company</h2>
        <div
          class="company-header"
          v-if="company && Object.keys(company).length > 0"
        >
          <div class="logo-mycompany">
            <img
              :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${company.company.logo}`"
              v-if="company.company.logo"
              :alt="company.company.coName"
            />
            <img
              v-else
              src="@/assets/images/logo_placeholder.svg"
              :alt="company.company.coName"
            />
            <button class="btn-upload" @click="openUploadCompanyLogo">
              Change logo
            </button>
            <modal
              name="uploadCompanyLogo"
              :adaptive="true"
              :scrollable="true"
              :height="650"
              :width="650"
            >
              <UploadCompanyLogo :company="company.company" />
            </modal>
          </div>
          <div class="ml-4">
            <h3 class="position-relative">
              {{ company.company.coName }}
              <span
                class="company-status approved"
                v-if="company.company.status === 'approved'"
              >
                Company is approved
              </span>
              <span
                class="company-status pending"
                v-if="company.company.status === 'pending'"
              >
                Pending approval
              </span>
              <span
                class="company-status declined"
                v-if="company.company.status === 'declined'"
              >
                Company is rejected
              </span>
            </h3>
            <div class="text-capitalize">
              {{ company.company.coType }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="dash-container"
        v-if="company && Object.keys(company).length > 0"
      >
        <div class="wrap-company position-relative">
          <button
            @click="openEditCompanyInfo"
            class="btn font-weight-bold btn-primary-outline mr-2 shadow floating-btn"
          >
            <icon class="icon" icon="pen" />
            Edit
          </button>
          <modal
            name="editCompanyInfo"
            :adaptive="true"
            :scrollable="true"
            :height="640"
            :width="920"
          >
            <EditCompanyInfo :company="company.company" />
          </modal>
          <div class="company-info">
            <div class="row small-row">
              <div class="col-sm-12 col-lg-6 info-box">
                Phone:&nbsp;&nbsp;
                <span>{{
                  company.company.contactPhone ||
                  "No contact phone provided yet"
                }}</span>
                <span
                  class="ml-2 co-badge"
                  v-if="company.company.phoneDisplay !== true"
                  >Hidden on public</span
                >
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Email:&nbsp;&nbsp;
                <span>{{
                  company.company.contactEmail ||
                  "No contact provided email yet"
                }}</span>
                <span
                  class="ml-2 co-badge"
                  v-if="company.company.emailDisplay !== true"
                  >Hidden on public</span
                >
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Website:&nbsp;&nbsp;
                <span>{{
                  company.company.coWebsite || "No contact phone yet"
                }}</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Year Founded:&nbsp;&nbsp;
                <span>{{ company.company.yearFounded || "-" }}</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Location:&nbsp;&nbsp;
                <span> {{ company.company.districtBasedIn || "" }}</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                <div class="social-links">
                  Social media:&nbsp;&nbsp;
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

                  <!-- UNPROVIDED LINKS  -->
                  <span
                    style="color: #dedede"
                    v-if="
                      company.company.socialMedia &&
                      convertToObject(company.company.socialMedia).facebook ===
                        ''
                    "
                  >
                    <icon :icon="['fab', 'facebook']" class="icon mr-2" />
                  </span>
                  <span
                    style="color: #dedede"
                    v-if="
                      company.company.socialMedia &&
                      convertToObject(company.company.socialMedia).twitter ===
                        ''
                    "
                  >
                    <icon :icon="['fab', 'twitter']" class="icon mr-2" />
                  </span>
                  <span
                    style="color: #dedede"
                    v-if="
                      company.company.socialMedia &&
                      convertToObject(company.company.socialMedia).instagram ===
                        ''
                    "
                  >
                    <icon :icon="['fab', 'instagram']" class="icon mr-2" />
                  </span>
                  <span
                    style="color: #dedede"
                    v-if="
                      company.company.socialMedia &&
                      convertToObject(company.company.socialMedia).youtube ===
                        ''
                    "
                  >
                    <icon :icon="['fab', 'youtube']" class="icon mr-2" />
                  </span>
                  <span
                    style="color: #dedede"
                    v-if="
                      company.company.socialMedia &&
                      convertToObject(company.company.socialMedia).linkedin ===
                        ''
                    "
                  >
                    <icon :icon="['fab', 'linkedin']" class="icon mr-2" />
                  </span>
                  <button
                    @click="openEditSocial"
                    class="btn btn-transparent mx-1 px-1"
                  >
                    Update
                  </button>
                  <modal
                    name="editSocialMedia"
                    :adaptive="true"
                    :scrollable="true"
                    :height="550"
                    :width="650"
                  >
                    <EditSocial :company="company.company" />
                  </modal>
                </div>
              </div>
            </div>
          </div>
          <div class="info-separator">&nbsp;</div>
          <div class="company-info">
            <div>Areas of Interests</div>
            <div class="my-3">
              <div class="co-badge">Business consulting</div>
              <div class="co-badge">Information Technology Services</div>
              <div class="co-badge">Tax and Accounting Consulting</div>
              <div class="co-badge">Non-academic courses</div>
              <div class="co-badge">Marketing</div>
              <div class="co-badge">Communications &amp; Public Relations</div>
              <div class="co-badge">Mentoring</div>
            </div>
          </div>
          <div class="info-separator">&nbsp;</div>
          <div class="company-info">
            <div>
              Main Area of Interest:
              <span class="text-blue-dark"
                >{{ company.company.mainAreaOfInterest || "" }}
              </span>
            </div>
          </div>
          <div class="info-separator">&nbsp;</div>
          <div class="company-info">
            <div>
              Customer base:
              <span class="text-blue-dark">{{
                company.company.customerBase || ""
              }}</span>
            </div>
          </div>
        </div>
        <div class="co-description position-relative">
          <button
            @click="openEditCompanySummary"
            class="btn font-weight-bold btn-primary-outline mr-2 shadow floating-btn"
          >
            <icon class="icon" icon="pen" />
            Edit
          </button>
          <modal
            name="editCompanySummary"
            :adaptive="true"
            :scrollable="true"
            :height="400"
            :width="920"
          >
            <EditCompanySummary :company="company.company" /> </modal
          >˝
          <div class="my-3">Company summary</div>
          <div class="text-blue-dark">
            {{
              company.company.shortDescription ||
              "No company summary provided yet"
            }}
          </div>
        </div>
        <div class="co-description position-relative">
          <button
            @click="openEditCompanyLocation"
            class="btn font-weight-bold btn-primary-outline mr-2 shadow floating-btn"
          >
            <icon class="icon" icon="map-marker-alt" />
            Update location
          </button>
          <modal
            name="editCompanyLocation"
            :adaptive="true"
            :scrollable="true"
            :height="700"
            :width="920"
          >
            <EditCompanyLocation :company="company.company" /> </modal
          >˝
          <div class="my-3">Our office</div>
          <div class="wrap-map">
            <GmapMap
              :center="{
                lat: convertToObject(company.company.officeAddress).lat,
                lng: convertToObject(company.company.officeAddress).lng,
              }"
              :zoom="17"
              map-type-id="terrain"
              style="width: 1000px; height: 700px"
            >
              <GmapMarker
                :position="{
                  lat: convertToObject(company.company.officeAddress).lat,
                  lng: convertToObject(company.company.officeAddress).lng,
                }"
                :clickable="false"
                :draggable="false"
              />
            </GmapMap>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import * as VueGoogleMaps from "vue2-google-maps";
import EditSocial from "@/components/EditSocial";
import EditCompanyInfo from "@/components/EditCompanyInfo";
import EditCompanySummary from "@/components/EditCompanySummary";
import EditCompanyLocation from "@/components/EditCompanyLocation";
import UploadCompanyLogo from "@/components/UploadCompanyLogo";
import VModal from "vue-js-modal";
Vue.use(VModal);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBzyXzhhqWBsTj305rY30VC1UF_1OHDKgA",
    libraries: "places",
  },
});
export default {
  name: "my-company",
  components: {
    EditSocial,
    EditCompanyInfo,
    EditCompanySummary,
    EditCompanyLocation,
    UploadCompanyLogo,
  },
  data() {
    return {
      company: {},
    };
  },
  mounted() {
    AxiosHelper.get("company/my-company")
      .then((response) => {
        this.company = response.data.result;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.errorCompany = error.response.data.error;
        } else {
          this.errorCompany = "Something went wrong, try again later";
        }
        Vue.$toast.open({
          message: error.response.data,
          type: "error",
        });
      });
  },
  methods: {
    convertToObject(object) {
      return JSON.parse(object);
    },
    openEditSocial() {
      this.$modal.show("editSocialMedia");
    },
    openEditCompanyInfo() {
      this.$modal.show("editCompanyInfo");
    },
    openEditCompanySummary() {
      this.$modal.show("editCompanySummary");
    },
    openEditCompanyLocation() {
      this.$modal.show("editCompanyLocation");
    },
    openUploadCompanyLogo() {
      this.$modal.show("uploadCompanyLogo");
    },
    toggleShow() {
      this.show = !this.show;
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
.social-links {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.social-links a,
.social-links span {
  font-size: 35px;
  margin: 4px 0 0 5px;
}
.company-header {
  display: flex;
  align-items: center;
}
.logo-mycompany {
  width: 140px;
  height: auto;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
}
.logo-mycompany img {
  border-radius: 4px;
}
.btn-upload {
  margin: 8px 0 0 0;
  border: none;
  background: #00aeef;
  border: none;
  text-align: center;
  display: block;
  width: 100%;
  color: #fff;
  padding: 8px 0;
  border-radius: 3px;
  font-size: 12px;
}
.wrap-map {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: block;
}
</style>