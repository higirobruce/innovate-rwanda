<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Company location</h3>
    <div class="px-4 py-2">
      <div class="wrap-modal" style="max-height: 550px; overflow: scroll">
        <div class="mt-1 mb-3 text-success">
          To update office address, please place the red pin on the right
          location
        </div>
        <!-- <label>
          <gmap-autocomplete
            placeholder="Type location..."
            @place_changed="setPlace"
          >
          </gmap-autocomplete>
          <button @click="usePlace">Add</button>
        </label> -->
        <!-- ref="input" -->
        <!-- <gmap-autocomplete class="introInput">
          <template v-slot:input="slotProps">
            <v-text-field
              outlined
              prepend-inner-icon="place"
              placeholder="Search location"
              :value="starting_point"
              v-on:listeners="slotProps.listeners"
              v-on:attrs="slotProps.attrs"
              @place_changed="setPlace"
            >
            </v-text-field>
          </template>
        </gmap-autocomplete> -->
        <GmapAutocomplete
          :position.sync="place"
          @keyup.enter="usePlace"
          @place_changed="setPlace"
        >
        </GmapAutocomplete>
        <button @click="usePlace">Add</button>
        <div>
          {{ starting_point }}
        </div>
        <div class="wrap-map">
          <GmapMap
            :center="place"
            :zoom="15"
            map-type-id="terrain"
            style="width: 940px; height: 430px"
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
    key: "AIzaSyBOcgzwN-u8KLJ2JHeeJON8St0jAkD2u_8",
    // key: "AIzaSyAs37zlR3-DucdN_ArQfHPLSJ5Eay1tdUs",
    libraries: "places",
    v: "3.26",
    installComponents: true,
  },
});
export default {
  name: "company-info",
  props: ["company"],
  data() {
    return {
      companyInfo: {},
      officeAddress: null,
      place: { lat: -1.9535713202050946, lng: 30.09239731494155 },
      starting_point: "",
    };
  },
  mounted() {
    this.companyInfo = { ...this.company };
  },
  methods: {
    setPlace(place) {
      this.place = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
    },
    locationChanged() {
      console.log("hey", this.starting_point);
    },
    convertLatLng() {
      let latLng = this.place;
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
    // setPlace(place) {
    //   this.place = place;
    // },
    usePlace(place) {
      console.log("pl", place);
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          },
        });
        this.place = null;
      }
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