<template>
  <div>
    <h3 class="p-4">Company location</h3>
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
        <div class="py-3">
          <GmapAutocomplete
            :position.sync="place"
            @keyup.enter="setPlace"
            @place_changed="setPlace"
          >
          </GmapAutocomplete>
          <!-- <button class="mx-2 border py-1 px-3" @click="usePlace">Add</button> -->
          <span>
            {{ officeAddress.place }}
          </span>
        </div>
        <div>
          {{ starting_point }}
        </div>
        <div class="wrap-map">
          <GmapMap
            :center="place"
            :zoom="15"
            map-type-id="terrain"
            style="max-width: 940px;width: 100%; height: 410px"
          >
            <GmapMarker
              :position="officeAddress"
              :draggable="true"
              @drag="updateCoordinates($event)"
            />
          </GmapMap>
        </div>
      </div>
      <div class="mt-4">
        <span class="float-right">
          <button
            @click.prevent="submitCompanyInfo"
            class="btn btn-success-outline mr-2"
          >
            <span v-if="!locationUpdating && locationUpdated"
              >Update location</span
            >
            <span v-if="locationUpdating && !locationUpdated">Updating</span>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBOcgzwN-u8KLJ2JHeeJON8St0jAkD2u_8",
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
      placeName: "",
      place: { lat: -1.9535713202050946, lng: 30.09239731494155 },
      starting_point: "",
      locationUpdating: false,
      locationUpdated: true,
    };
  },
  mounted() {
    this.companyInfo = { ...this.company };
    this.officeAddress = {
      lat: -1.9535713202050946,
      lng: 30.09239731494155,
      place: "",
    };
  },
  methods: {
    setPlace(place) {
      this.place = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.officeAddress.lat = place.geometry.location.lat();
      this.officeAddress.lng = place.geometry.location.lng();
      this.officeAddress.place = place.formatted_address;
      this.companyInfo.officeAddress = JSON.stringify(this.officeAddress);
    },
    // convertLatLng() {
    //   let latLng = this.place;
    //   if (this.companyInfo && this.companyInfo.officeAddress) {
    //     latLng = JSON.parse(this.companyInfo.officeAddress);
    //   }
    //   return latLng;
    // },
    convertToObject(object) {
      return JSON.parse(object);
    },
    updateCoordinates(event) {
      // console.log( location);
      this.officeAddress = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        place: "",
      };
      console.log("office", this.officeAddress);
      // this.officeAddress = {
      //   lat: location.latLng.lat(),
      //   lng: location.latLng.lng(),
      //   place: "",
      // };
      this.companyInfo.officeAddress = JSON.stringify(this.officeAddress);
    },
    // setPlace(place) {
    //   this.place = place;
    // },
    usePlace(place) {
      console.log("pl", place);
      // if (this.place) {
      //   this.markers.push({
      //     position: {
      //       lat: this.place.geometry.location.lat(),
      //       lng: this.place.geometry.location.lng(),
      //     },
      //   });
      //   this.place = null;
      // }
    },
    submitCompanyInfo() {
      this.locationUpdating = true;
      this.locationUpdated = false;
      AxiosHelper.patch(`company/edit/${this.companyInfo.id}`, this.companyInfo)
        .then(() => {
          this.locationUpdating = false;
          this.locationUpdated = true;
          Vue.$toast.open({
            message:
              "Office location of the company has been updated successfully",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2500);
        })
        .catch((error) => {
          if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.locationUpdating = false;
          this.locationUpdated = false;
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