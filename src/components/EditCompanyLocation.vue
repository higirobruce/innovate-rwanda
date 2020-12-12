<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Company location</h3>
    <div class="px-4 py-2">
      <div class="wrap-modal" style="max-height: 550px; overflow: scroll">
        <div class="mt-1 mb-3 text-success">
          To update office address, please place the red pin on the right
          location
        </div>
        <div class="wrap-map">
          <GmapMap
            :center="{ lat: -1.9535713202050946, lng: 30.09239731494155 }"
            :zoom="15"
            map-type-id="terrain"
            style="width: 940px; height: 450px"
          >
            <GmapMarker
              :position="convertLatLng()"
              :draggable="true"
              @drag="updateCoordinates"
            />
          </GmapMap>
        </div>
      </div>
      <div class="mt-4">
        <button @click="submitCompanyInfo" class="btn btn-success-outline mr-2">
          Update location
        </button>
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
    key: "AIzaSyBzyXzhhqWBsTj305rY30VC1UF_1OHDKgA",
    libraries: "places",
    installComponents: false,
  },
});

export default {
  name: "company-info",
  props: ["company"],
  data() {
    return {
      companyInfo: {},
      officeAddress: null,
    };
  },
  mounted() {
    this.companyInfo = { ...this.company };
  },
  methods: {
    convertLatLng() {
      let latLng = { lat: -1.9535713202050946, lng: 30.09239731494155 };
      if (this.companyInfo && this.companyInfo.officeAddress) {
        latLng = JSON.parse(this.companyInfo.officeAddress);
      }
      return latLng;
    },
    convertToObject(object) {
      return JSON.parse(object);
    },
    updateCoordinates(location) {
      this.officeAddress = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
      this.companyInfo.officeAddress = JSON.stringify(this.officeAddress);
    },
    submitCompanyInfo(evt) {
      evt.preventDefault();
      AxiosHelper.patch(`company/edit/${this.companyInfo.id}`, this.companyInfo)
        .then(() => {
          Vue.$toast.open({
            message:
              "Office location of the company has been updated successfully",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2500);
        })
        .catch((err) => {
          console.log(err.response.data);
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating office location",
            type: "error",
          });
        });
    },
    changeDistrict(e) {
      this.companyInfo.districtBasedIn = e.target.value;
    },
    changeMainInterest(e) {
      this.companyInfo.mainAreaOfInterest = e.target.value;
    },
  },
};
</script>