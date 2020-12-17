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
                class="status approved"
                v-if="company.company.status === 'approved'"
              >
                Company is approved
              </span>
              <span
                class="status pending"
                v-if="company.company.status === 'pending'"
              >
                Pending approval
              </span>
              <span
                class="status declined"
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
                {{ company.company.contactPhone !== "" }}
                Phone:&nbsp;&nbsp;
                <span>{{
                  company.company.contactPhone ||
                  "No contact phone provided yet"
                }}</span>
                <span
                  class="ml-2 co-badge"
                  v-if="
                    company.company.contactPhone !== null &&
                    company.company.phoneDisplay !== true
                  "
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
                  Social media&nbsp;&nbsp;
                  <!-- <span v-if="!_.isEmpty(company.company.socialMedia)"> -->

                  <a
                    style="color: #1473e6"
                    :to="''"
                    v-if="!_.isEmpty(socialMedia) && socialMedia.facebook"
                  >
                    <icon :icon="['fab', 'facebook']" class="icon mr-2" />
                  </a>

                  <a
                    style="color: #00aeef"
                    :to="''"
                    target="_blank"
                    v-if="!_.isEmpty(socialMedia) && socialMedia.twitter"
                  >
                    <icon :icon="['fab', 'twitter']" class="icon mr-2" />
                  </a>
                  <a
                    style="color: #ff1d77"
                    :to="''"
                    target="_blank"
                    v-if="!_.isEmpty(socialMedia) && socialMedia.instagram"
                  >
                    <icon :icon="['fab', 'instagram']" class="icon mr-2" />
                  </a>
                  <a
                    style="color: #ff0000"
                    target="_blank"
                    v-if="!_.isEmpty(socialMedia) && socialMedia.youtube"
                    :href="`https://youtube.com/c/${
                      convertToObject(company.company.socialMedia).youtube
                    }`"
                  >
                    <icon :icon="['fab', 'youtube']" class="icon mr-2" />
                  </a>
                  <a
                    style="color: #007bb5"
                    target="_blank"
                    v-if="!_.isEmpty(socialMedia) && socialMedia.linkedin"
                    :href="`https://linkedin.com/in/${
                      convertToObject(company.company.socialMedia).linkedin
                    }`"
                  >
                    <icon :icon="['fab', 'linkedin']" class="icon mr-2" />
                  </a>
                  <!-- UNPROVIDED LINKS  -->
                  <!-- company.company.socialMedia &&
                      convertToObject(company.company.socialMedia).facebook ===
                        '' -->
                  <span
                    style="color: #dedede"
                    v-if="!socialMedia.facebook || socialMedia.facebook === ''"
                  >
                    <icon :icon="['fab', 'facebook']" class="icon mr-2" />
                  </span>
                  <span
                    style="color: #dedede"
                    v-if="!socialMedia.twitter || socialMedia.twitter === ''"
                  >
                    <icon :icon="['fab', 'twitter']" class="icon mr-2" />
                  </span>
                  <span
                    style="color: #dedede"
                    v-if="
                      !socialMedia.instagram || socialMedia.instagram === ''
                    "
                  >
                    <icon :icon="['fab', 'instagram']" class="icon mr-2" />
                  </span>
                  <span
                    style="color: #dedede"
                    v-if="!socialMedia.youtube || socialMedia.youtube === ''"
                  >
                    <icon :icon="['fab', 'youtube']" class="icon mr-2" />
                  </span>
                  <span
                    style="color: #dedede"
                    v-if="!socialMedia.linkedin || socialMedia.linkedin === ''"
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
                    :height="500"
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
            <div>
              Main business activity:
              <span class="text-blue-dark"
                >{{ company.company.BusinessActivity.name }}
              </span>
            </div>
          </div>
          <div class="info-separator">&nbsp;</div>
          <div class="company-info">
            <div>Business activities</div>
            <div class="my-3">
              <span v-if="!_.isEmpty(company.company.businessActivities)">
                <div
                  class="co-badge"
                  v-for="(act, index) in convertToObject(
                    company.company.businessActivities
                  )"
                  :key="index"
                >
                  <span
                    v-for="(activity, index) in listOfBusinessActivities"
                    :key="index"
                  >
                    <span v-if="activity.id === act">
                      {{ activity.name }}
                    </span>
                  </span>
                </div>
              </span>
              <button
                @click="updateActivities"
                class="btn btn-transparent mx-1 px-1"
              >
                Update
              </button>
              <modal
                name="openEditBusinessActivies"
                :adaptive="true"
                :scrollable="true"
                :height="570"
                :width="850"
              >
                <EditBusinessActivities :company="company.company" />
              </modal>
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
          <div class="wrap-map" v-if="company.company.officeAddress">
            <GmapMap
              :center="convertLatLng(company.company)"
              :zoom="17"
              map-type-id="terrain"
              style="width: 1000px; height: 700px"
            >
              <GmapMarker
                :position="convertLatLng(company.company)"
                :clickable="false"
                :draggable="false"
              />
            </GmapMap>
          </div>
          <div class="my-3" v-else>
            <h3>You did not provide the office location yet</h3>
            <button
              class="border bg-white cursor-pointer py-2 px-4"
              @click="openEditCompanyLocation"
            >
              <icon class="icon" icon="map-marker-alt" />
              Add location
            </button>
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
import EditBusinessActivities from "@/components/EditBusinessActivities";
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
    EditBusinessActivities,
  },
  data() {
    return {
      company: {},
      socialMedia: {},
      listOfBusinessActivities: "",
    };
  },
  created() {
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch(() => {});
  },
  mounted() {
    AxiosHelper.get("company/my-company")
      .then((response) => {
        this.company = response.data.result;
        this.socialMedia =
          this.convertToObject(response.data.result.company.socialMedia) || {};
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.errorCompany = "Company information not found. Try again later";
        } else if (error.response.status === 403) {
          this.errorCompany =
            "You are not allowed to access this resource. Kindly log out and login in again!";
        } else {
          this.errorCompany = "Something went wrong, try again later";
        }
        Vue.$toast.open({
          message: this.errorCompany,
          type: "error",
        });
      });
  },
  methods: {
    convertToObject(object) {
      return JSON.parse(object);
    },
    convertLatLng(company) {
      let latLng = { lat: -1.9535713202050946, lng: 30.09239731494155 };
      if (company && company.officeAddress !== "") {
        latLng = JSON.parse(company.officeAddress);
      }
      return latLng;
    },
    updateActivities() {
      this.$modal.show("openEditBusinessActivies");
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