<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">My Company</h2>
        <div
          class="logo-mycompany"
          v-if="company && Object.keys(company).length > 0"
        >
          <img
            v-if="company && company.company.logo"
            :src="company.company.logo"
            alt="Tech Solver"
          />
          <img
            v-else
            src="@/assets/images/logo_placeholder.svg"
            alt="Tech Solver"
          />
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
            class="btn font-weight-bold btn-primary-outline mr-2 shadow floating-btn"
          >
            <icon class="icon" icon="pen" />
            Edit
          </button>
          <div class="company-info">
            <div class="row small-row">
              <div class="col-sm-12 col-lg-6 info-box">
                Phone:&nbsp;&nbsp;
                <span>{{
                  company.company.contactPhone || "No contact phone yet"
                }}</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Email:&nbsp;&nbsp;
                <span>{{
                  company.company.contactPhone || "No contact email yet"
                }}</span>
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
                    style="color: #1473E6"
                    :to="''"
                    v-if="
                      company.company.socialMedia &&
                      convertToObject(company.company.socialMedia).facebook
                    "
                  >
                    <icon :icon="['fab', 'facebook']" class="icon mr-2" />
                  </a>
                  <a
                    style="color: #00AEEF"
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
                    style="color: #FF1D77"
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
                    <EditSocial
                      :company="company.company"
                    />
                  </modal>
                </div>
              </div>
            </div>
          </div>
          <div class="info-separator">&nbsp;</div>
          <div class="company-info">
            {{ company.company }}
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
            class="btn font-weight-bold btn-primary-outline mr-2 shadow floating-btn"
          >
            <icon class="icon" icon="pen" />
            Edit
          </button>
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
            class="btn font-weight-bold btn-primary-outline mr-2 shadow floating-btn"
          >
            <icon class="icon" icon="pen" />
            Edit
          </button>
          <div class="my-3">
            Our office:
            <span class="text-blue-dark">
              {{ company.company.officeAddress }}
            </span>
          </div>
          <div class="wrap-map">
            <GmapMap
              :center="{ lat: -1.953841484576185, lng: 30.08110361228947 }"
              :zoom="17"
              map-type-id="terrain"
              style="width: 1000px; height: 700px"
            >
              <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center = m.position"
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
import VModal from "vue-js-modal";
Vue.use(VModal);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB4BlTNmRI2uk50yZ-QLat92Vb08U_WNhE",
    libraries: "places",
  },
});
export default {
  name: "my-company",
  components: {
    EditSocial,
  },
  data() {
    return {
      company: {},
      center: { lat: 10.0, lng: 10.0 },
      markers: [
        {
          position: { lat: 10.0, lng: 10.0 },
        },
        {
          position: { lat: 11.0, lng: 11.0 },
        },
      ],
    };
  },
  mounted() {
    AxiosHelper.get("company/my-company")
      .then((response) => {
        this.company = response.data.result;
        // this.loadingDirectory = false;
        // this.loadingCompany = false;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          //   this.errorCompany = error.response.data.error;
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
.company-status {
  position: relative;
  top: -4px;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 200;
  color: #fff;
}
.company-status.approved {
  background: #2ab363;
}
.company-status.pending {
  background: #e98e26;
}
.company-status.declined {
  background: #e42121;
}
</style>