<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">
      Company:
      <span v-if="company && Object.keys(company).length">{{
        company.company.coName
      }}</span>
    </h3>
    <div class="px-4 py-2">
      <div v-if="!loadingCompany && Object.keys(company).length">
        <div class="wrap-modal" style="max-height: 500px; overflow: scroll">
          <div class="wrap-company position-relative">
            <div class="company-info">
              <div class="row small-row">
                <div class="col-sm-12 col-lg-6 info-box">
                  Owner's name:&nbsp;&nbsp;
                  <span
                    >{{ company.owner.lastName }}
                    {{ company.owner.firstName }}</span
                  >
                </div>
                <div class="col-sm-12 col-lg-6 info-box">
                  Email:&nbsp;&nbsp;
                  <span>{{ company.owner.email }}</span>
                </div>
                <div class="col-sm-12 col-lg-6 info-box">
                  Phone:&nbsp;&nbsp;
                  <span>{{ company.company.contactPhone || "" }}</span>
                </div>
                <div class="col-sm-12 col-lg-6 info-box">
                  Website:&nbsp;&nbsp;
                  <span>{{ company.company.coWebsite || "" }}</span>
                </div>
                <div class="col-sm-12 col-lg-6 info-box">
                  Year Founded:&nbsp;&nbsp;
                  <span>{{ company.company.createdAt | date("YYYY") }}</span>
                </div>
                <div class="col-sm-12 col-lg-6 info-box">
                  Location:&nbsp;&nbsp;
                  <span>{{ company.company.districtBasedIn }}</span>
                </div>
                <div class="col-sm-12 col-lg-6 info-box">
                  Social media:&nbsp;&nbsp;
                  <span v-if="company.company.socialMedia !== null">-</span>
                  <span v-else> No social media provided </span>
                </div>
              </div>
            </div>
            <div class="info-separator">&nbsp;</div>
            <div class="company-info">
              <div>
                Main Area of Interest:
                <span class="text-blue-dark">{{
                  company.company.BusinessActivity.name
                }}</span>
              </div>
            </div>
            <div class="info-separator">&nbsp;</div>
            <div class="company-info">
              <div>Areas of Interests</div>
              <div class="my-3">
                <div class="co-badge">Business consulting</div>

                <div class="co-badge">
                  Communications &amp; Public Relations
                </div>
                <div class="co-badge">Mentoring</div>
              </div>
            </div>
            <div class="info-separator">&nbsp;</div>
            <div class="company-info">
              <div>
                Customer base:
                <span class="text-blue-dark">Business to Business</span>
              </div>
            </div>
          </div>
          <div class="co-description position-relative">
            <div class="my-3">Company summary</div>
            <div class="text-blue-dark">
              {{ company.company.shortDescription || "No company summary yet" }}
            </div>
          </div>
          <div class="co-description position-relative">
            <div class="my-3">Our office</div>
            <div class="wrap-map">
              <div class="wrap-map" v-if="company.company.officeAddress">
                <GmapMap
                  :center="convertLatLng(company.company.officeAddress)"
                  :zoom="17"
                  map-type-id="terrain"
                  style="width: 1000px; height: 700px"
                >
                  <GmapMarker
                    :position="convertLatLng(company.company.officeAddress)"
                    :clickable="false"
                    :draggable="false"
                  />
                </GmapMap>
              </div>
              <div class="my-3" v-else>
                <h3>No office location provided</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="my-3">
          <span class="float-right">
            <button @click="closeModal" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
          <span class="float-left">
            <button
              v-if="
                company.company.status === 'pending' ||
                company.company.status === 'declined'
              "
              @click="approveOrDecline('approved', company.company.id)"
              class="btn btn-success-outline mr-2"
            >
              Approve
            </button>
            <button
              v-if="
                company.company.status === 'pending' ||
                company.company.status === 'approved'
              "
              @click="approveOrDecline('declined', company.company.id)"
              class="btn btn-danger-outline"
            >
              Decline
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB4BlTNmRI2uk50yZ-QLat92Vb08U_WNhE",
    libraries: "places",
  },
});

import VModal from "vue-js-modal";
Vue.use(VModal);
export default {
  name: "company-info",
  props: ["company"],
  data() {
    return {
      loadingCompany: false,
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
  methods: {
    closeModal() {
      this.$modal.hide("companyInfo");
    },
    convertLatLng(officeAddress) {
      let latLng = { lat: -1.9535713202050946, lng: 30.09239731494155 };
      if (officeAddress && officeAddress) {
        latLng = JSON.parse(officeAddress);
      }
      return latLng;
    },
    approveOrDecline(decision, id) {
      let data;
      if (decision === "approved") {
        data = {
          id,
          decision,
        };
      }
      if (decision === "declined") {
        data = {
          id,
          decision,
        };
      }
      AxiosHelper.put("company/approve-decline", data)
        .then((res) => {
          console.log("res", res)
          Vue.$toast.open({
            message:
              "Company' status has been updated. We are updating company's directory",
            type: "success",
          });
          // setTimeout(() => {
          //   this.$router.go();
          // }, 2000);
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
  },
};
</script>