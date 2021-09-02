<template>
  <div>
    <component :is="layout">
      <div
        v-if="
          profile.role === 'normal' ||
          profile.role === 'super-admin' ||
          profile.role === 'admin-company'
        "
      >
        <div v-if="company && Object.keys(company).length > 0">
          <div class="page-info px-5">
            <h2 class="h2 mb-0 py-0 font-weight-bold">
              {{ company.company.coName }}
              <span
                class="status approved"
                v-if="company.company.status === 'approved'"
              >
                Public
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
                Rejected
              </span>
              <span
                class="status deleted"
                v-if="company.company.status === 'deleted'"
              >
                Deleted
              </span>
            </h2>
            <div class="text-capitalize mb-2">
              {{ company.company.CompanyType.name }}
            </div>
            <div
              class="alert alert-warning mt-3"
              v-if="
                profile.role === 'super-admin' ||
                profile.role === 'admin-company'
              "
            >
              You are viewing this page because you are an admin.
              <router-link :to="'/dashboard/directory'">
                See all companies
              </router-link>
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
                <i class="icon-edit" />
                Edit
              </button>
              <modal
                name="editCompanyInfo"
                :adaptive="true"
                :scrollable="true"
                :height="640"
                :width="920"
              >
                <button type="button" @click.prevent="closeModal" class="close">
                  <img src="@/assets/images/close.png" />
                </button>
                <EditCompanyInfo :company="company.company" />
              </modal>
              <div class="company-info">
                <div class="row">
                  <div class="col-sm-12 col-lg-2">
                    <div class="logo-mycompany">
                      <img
                        :src="`${IMAGE_URL}c_fill,g_center,h_120,w_120/${company.company.logo}`"
                        v-if="company.company.logo"
                        :alt="company.company.coName"
                      />
                      <img
                        v-else
                        src="@/assets/images/logo_placeholder.png"
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
                        <button
                          type="button"
                          @click.prevent="closeModal"
                          class="close"
                        >
                          <img src="@/assets/images/close.png" />
                        </button>
                        <UploadCompanyLogo :company="company.company" />
                      </modal>
                    </div>
                  </div>
                  <div class="col-sm-12 col-lg-10">
                    <div class="row small-row">
                      <div class="col-sm-12 col-lg-6 info-box">
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
                        <router-link
                          v-if="!_.isEmpty(company.company.coWebsite)"
                          :to="`/redirect/${company.company.coWebsite}`"
                          target="_blank"
                        >
                          {{ company.company.coWebsite }}
                        </router-link>
                      </div>
                      <div class="col-sm-12 col-lg-6 info-box">
                        Year Founded:&nbsp;&nbsp;
                        <span>{{ company.company.yearFounded || "-" }}</span>
                      </div>
                      <div class="col-sm-12 col-lg-6 info-box">
                        Location:&nbsp;&nbsp;
                        <span>
                          {{ company.company.districtBasedIn || "" }}</span
                        >
                      </div>
                      <div class="col-sm-12 col-lg-6 info-box">
                        <div class="social-links">
                          Social media&nbsp;&nbsp;

                          <a
                            style="color: #1473e6"
                            :href="`https://facebook.com/${
                              convertToObject(company.company.socialMedia)
                                .facebook
                            }`"
                            v-if="
                              !_.isEmpty(socialMedia) && socialMedia.facebook
                            "
                          >
                            <i class="icon-facebook-official mr-2" />
                          </a>

                          <a
                            style="color: #00aeef"
                            target="_blank"
                            :href="`https://twitter.com/${
                              convertToObject(company.company.socialMedia)
                                .twitter
                            }`"
                            v-if="
                              !_.isEmpty(socialMedia) && socialMedia.twitter
                            "
                          >
                            <i class="icon-twitter mr-2" />
                          </a>
                          <a
                            style="color: #ff1d77"
                            target="_blank"
                            :href="`https://instagram.com/${
                              convertToObject(company.company.socialMedia)
                                .instagram
                            }`"
                            v-if="
                              !_.isEmpty(socialMedia) && socialMedia.instagram
                            "
                          >
                            <i class="icon-instagram mr-2" />
                          </a>
                          <a
                            style="color: #ff0000"
                            target="_blank"
                            v-if="
                              !_.isEmpty(socialMedia) && socialMedia.youtube
                            "
                            :href="`https://youtube.com/c/${
                              convertToObject(company.company.socialMedia)
                                .youtube
                            }`"
                          >
                            <i class="icon-youtube-play mr-2" />
                          </a>
                          <a
                            style="color: #007bb5"
                            target="_blank"
                            v-if="
                              !_.isEmpty(socialMedia) && socialMedia.linkedin
                            "
                            :href="`https://linkedin.com/company/${
                              convertToObject(company.company.socialMedia)
                                .linkedin
                            }`"
                          >
                            <i class="icon-linkedin-alt mr-2" />
                          </a>
                          <span
                            style="color: #dedede"
                            v-if="
                              !socialMedia.facebook ||
                              socialMedia.facebook === ''
                            "
                          >
                            <i class="icon-facebook-official mr-2" />
                          </span>
                          <span
                            style="color: #dedede"
                            v-if="
                              !socialMedia.twitter || socialMedia.twitter === ''
                            "
                          >
                            <i class="icon-twitter mr-2" />
                          </span>
                          <span
                            style="color: #dedede"
                            v-if="
                              !socialMedia.instagram ||
                              socialMedia.instagram === ''
                            "
                          >
                            <i class="icon-instagram mr-2" />
                          </span>
                          <span
                            style="color: #dedede"
                            v-if="
                              !socialMedia.youtube || socialMedia.youtube === ''
                            "
                          >
                            <i class="icon-youtube-play mr-2" />
                          </span>
                          <span
                            style="color: #dedede"
                            v-if="
                              !socialMedia.linkedin ||
                              socialMedia.linkedin === ''
                            "
                          >
                            <i class="icon-linkedin-alt mr-2" />
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
                            <button
                              type="button"
                              @click.prevent="closeModal"
                              class="close"
                            >
                              <img src="@/assets/images/close.png" />
                            </button>
                            <button
                              type="button"
                              @click.prevent="closeModal"
                              class="close"
                            >
                              <img src="@/assets/images/close.png" />
                            </button>
                            <EditSocial :company="company.company" />
                          </modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="info-separator">&nbsp;</div>
              <div
                v-if="
                  profile.companyId === company.company.id &&
                  company &&
                  company.company.status === 'declined' &&
                  !_.isEmpty(company.company.messages)
                "
              >
                <div class="company-info">
                  <div class="alert alert-warning">
                    <h5 class="my-2 alert-heading">Alert</h5>
                    Your company has been declined. <br />
                    <div>Message: {{ _.last(company.company.messages) }}</div>
                    <hr />
                    <div>
                      <button
                        @click.prevent="resubmitCompany"
                        class="btn btn-danger"
                      >
                        Resubmit company
                      </button>
                    </div>
                  </div>
                </div>
                <div class="info-separator">&nbsp;</div>
              </div>
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
                  <span
                    v-if="!_.isEmpty(company.company.ActivitiesOfCompanies)"
                  >
                    <div
                      class="co-badge"
                      v-for="(act, index) in company.company
                        .ActivitiesOfCompanies"
                      :key="index"
                    >
                      <span>
                        {{ act.BusinessActivity.name }}
                      </span>
                      <button
                        @click.prevent="
                          removeActivityFromCompany(act.activityId)
                        "
                      >
                        <img src="@/assets/images/remove.png" />
                      </button>
                    </div>
                  </span>
                  <button
                    @click="updateActivities"
                    class="btn btn-transparent mx-1 px-1"
                  >
                    Add activity
                  </button>
                </div>
              </div>
              <div class="info-separator">&nbsp;</div>
              <div class="company-info">
                <div>
                  <span>
                    Client base:
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
                    <button
                      @click="updateCustomerBase"
                      class="btn btn-sm p-0 my-0 mx-2 btn-transparent"
                    >
                      <span
                        v-if="_.size(JSON.parse(company.company.customerBase))"
                        >Add client base</span
                      >
                      <span v-else>Update</span>
                    </button>
                  </span>
                </div>
                <modal
                  name="openEditCustomerBase"
                  :adaptive="true"
                  :scrollable="true"
                  :height="335"
                  :width="550"
                >
                  <button
                    type="button"
                    @click.prevent="closeModal"
                    class="close"
                  >
                    <img src="@/assets/images/close.png" />
                  </button>
                  <h3 class="p-4">Client base</h3>
                  <div class="px-4 py-2">
                    <form>
                      <div
                        class="wrap-modal"
                        style="max-height: 180px; overflow: scroll"
                      >
                        <div
                          class="form-check"
                          v-for="(base, index) in bases"
                          :key="index"
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :value="base"
                            :id="`base-id-${index}`"
                            :checked="checkCurrentBases(base)"
                            @input="changeBase"
                          />
                          <label
                            class="form-check-label"
                            :for="`base-id-${index}`"
                          >
                            {{ base }}
                          </label>
                        </div>
                      </div>
                      <div class="mt-2">
                        <span class="float-left">
                          <button
                            @click.prevent="submitCompanyInfo"
                            type="submit"
                            class="btn btn-success-outline mr-2"
                          >
                            Save
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </modal>
              </div>
            </div>
            <div class="co-description position-relative">
              <button
                @click="openEditCompanySummary"
                class="btn font-weight-bold btn-primary-outline mr-2 shadow floating-btn"
              >
                <i class="icon-edit" />
                Edit
              </button>
              <modal
                name="editCompanySummary"
                :adaptive="true"
                :scrollable="true"
                :height="400"
                :width="920"
              >
                <button type="button" @click.prevent="closeModal" class="close">
                  <img src="@/assets/images/close.png" />
                </button>
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
                <i class="icon-marker-stroked mr-2" />
                Update location
              </button>
              <modal
                name="editCompanyLocation"
                :adaptive="true"
                :scrollable="true"
                :height="700"
                :width="920"
              >
                <button type="button" @click.prevent="closeModal" class="close">
                  <img src="@/assets/images/close.png" />
                </button>
                <EditCompanyLocation :company="company.company" /> </modal
              >˝
              <div class="my-3" v-if="company.company.officeAddress">
                Our office:
                <span class="mx-3 font-weight-bold text-blue-dark">
                  {{ convertLatLng(company.company).place }}
                </span>
              </div>

              <div class="wrap-map" v-if="company.company.officeAddress">
                <GmapMap
                  :center="convertLatLng(company.company)"
                  :zoom="17"
                  map-type-id="terrain"
                  style="max-width: 1000px; height: 700px"
                >
                  <GmapMarker
                    :position="convertLatLng(company.company)"
                    :clickable="false"
                    :draggable="false"
                  />
                </GmapMap>
              </div>
              <div class="my-3" v-else>
                <h3>No office location yet</h3>
                <button
                  class="border bg-white cursor-pointer py-2 px-4"
                  @click="openEditCompanyLocation"
                >
                  <i class="icon-marker-stroked mr-2" />
                  Add location
                </button>
              </div>

              <div class="clear"></div>
            </div>

            <!-- RESUBMIT COMPANY -->
            <modal
              name="openResubmitCompany"
              :adaptive="true"
              :scrollable="true"
              :height="220"
              :width="600"
            >
              <button type="button" @click.prevent="closeModal" class="close">
                <img src="@/assets/images/close.png" />
              </button>
              <h3 class="px-4 pt-4">Resubmit company's information</h3>
              <div class="mx-4 py-2">
                By resubmitting company's information, you agree that you
                applied changes requested.
              </div>

              <div class="my-2 mx-4">
                <button @click="closeModal" class="btn btn-gray-outline mr-2">
                  Cancel
                </button>
                <button @click="resubmitNow" class="btn btn-success-outline">
                  Resubmit
                </button>
              </div>
            </modal>
            <modal
              name="openEditBusinessActivies"
              :adaptive="true"
              :scrollable="true"
              :height="660"
              :width="550"
            >
              <button type="button" @click.prevent="closeModal" class="close">
                <img src="@/assets/images/close.png" />
              </button>
              <h3 class="p-4">Business activities</h3>
              <div class="px-4">
                <div
                  class="wrap-modal"
                  style="max-height: 500px; overflow: scroll"
                >
                  <div class="row mt-1">
                    <div class="col-12" v-if="listOfBusinessActivities">
                      <div
                        v-for="(a, index) in listOfBusinessActivities"
                        :key="index"
                      >
                        <div class="s-one-activity">
                          {{ a.name }}
                          <button
                            @click.prevent="addActivityToCompany(a.id, a.name)"
                            type="button"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-1">
                  <span class="float-right">
                    <button
                      type="button"
                      @click.prevent="closeModal"
                      class="btn btn-gray-outline mr-2"
                    >
                      Close
                    </button>
                  </span>
                </div>
              </div>
            </modal>
          </div>
        </div>
      </div>
      <div v-else class="not-allowed"></div>
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
import EditCustomerBase from "@/components/EditCustomerBase";
import UploadCompanyLogo from "@/components/UploadCompanyLogo";
import bases from "@/data/bases.js";
import VModal from "vue-js-modal";
Vue.use(VModal);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBOcgzwN-u8KLJ2JHeeJON8St0jAkD2u_8",
    libraries: "places",
  },
});
export default {
  name: "company",
  components: {
    EditSocial,
    EditCompanyInfo,
    EditCompanySummary,
    EditCompanyLocation,
    UploadCompanyLogo,
    EditBusinessActivities,
    EditCustomerBase,
  },
  data() {
    return {
      company: {},
      socialMedia: {},
      listOfBusinessActivities: "",
      bases: [],
      checkedBases: [],
      companyId: "",
    };
  },
  created() {
    this.companyId = this.$route.params.companyId;
  },
  beforeCreate() {
    // loading business activities
    AxiosHelper.get("business-activities")
      .then((response) => {
        this.listOfBusinessActivities = response.data.result;
      })
      .catch(() => {});
  },
  mounted() {
    this.bases = bases;
    this.loadCompanyInfo();
  },
  methods: {
    checkCurrentBases(base) {
      if (JSON.parse(this.company.company.customerBase) !== null) {
        return JSON.parse(this.company.company.customerBase.includes(base));
      } else {
        return false;
      }
    },
    changeBase(e) {
      let arr = JSON.parse(this.company.company.customerBase) || [];
      if (arr.length === 0) {
        arr = [...arr, e.target.value];
        this.company.company.customerBase = JSON.stringify(arr);
      } else {
        if (
          !JSON.parse(
            this.company.company.customerBase.includes(e.target.value)
          )
        ) {
          arr = [...arr, e.target.value];
          this.company.company.customerBase = JSON.stringify(arr);
        } else {
          const newArray = arr.filter(function (el) {
            return el != e.target.value;
          });
          this.company.company.customerBase = JSON.stringify(newArray);
        }
      }
    },
    resubmitNow() {
      const data = {
        id: this.company.company.id,
        decision: "pending",
      };
      AxiosHelper.put("company/manage", data)
        .then(() => {
          this.loadCompanyInfo();
          Vue.$toast.open({
            message: "Resubmitted",
            type: "success",
          });
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
      this.$modal.hide("openResubmitCompany");
    },
    loadCompanyInfo() {
      AxiosHelper.get(`company/${this.companyId}`)
        .then((response) => {
          this.company = response.data.result;
          this.socialMedia =
            this.convertToObject(response.data.result.company.socialMedia) ||
            {};
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorCompany =
              "Company information not found. Try again later";
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
    resubmitCompany() {
      this.$modal.show("openResubmitCompany");
    },
    updateCustomerBase() {
      this.$modal.show("openEditCustomerBase");
    },
    toggleShow() {
      this.show = !this.show;
    },
    submitCompanyInfo() {
      AxiosHelper.patch(
        `company/edit/${this.company.company.id}`,
        this.company.company
      )
        .then(() => {
          Vue.$toast.open({
            message: "Client base has been updated successfully",
            type: "success",
          });
          this.$modal.hide("openEditCustomerBase");
        })
        .catch(() => {
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating your social media accounts",
            type: "error",
          });
        });
    },
    closeModal() {
      this.$modal.hide("openEditBusinessActivies");
      this.$modal.hide("editCompanyInfo");
      this.$modal.hide("uploadCompanyLogo");
      this.$modal.hide("editSocialMedia");
      this.$modal.hide("editCompanySummary");
      this.$modal.hide("editCompanyLocation");
      this.$modal.hide("openEditCustomerBase");
      this.$modal.hide("openResubmitCompany");
    },
    addActivityToCompany(id, name) {
      const data = {
        companyId: this.company.company.id,
        activityId: id,
      };
      AxiosHelper.post("activities/add-activity", data)
        .then(() => {
          this.loadCompanyInfo();
          Vue.$toast.open({
            message: `"${name}" activity have been added successfully`,
            type: "success",
          });
        })
        .catch((error) => {
          if (error.response.status === 409) {
            Vue.$toast.open({
              message: "Activity has been already added",
              type: "warning",
            });
          } else {
            Vue.$toast.open({
              message: "Sorry, something went wrong. Try again later",
              type: "error",
            });
          }
        });
    },
    removeActivityFromCompany(id) {
      AxiosHelper.delete(
        `activities/remove-activity?company=${this.company.company.id}&activity=${id}`
      )
        .then(() => {
          this.loadCompanyInfo();
          Vue.$toast.open({
            message: `Activity has been removed successfully`,
            type: "success",
          });
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. Try again later",
            type: "error",
          });
        });
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
  /* padding: 10px; */
  background: #fff;
  border-radius: 4px;
}
.logo-mycompany img {
  width: 100%;
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
  float: left;
}
</style>