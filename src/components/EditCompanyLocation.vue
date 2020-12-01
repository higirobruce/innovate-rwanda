<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Company location</h3>
    <div class="px-4 py-2">
      <div class="wrap-modal" style="max-height: 550px; overflow: scroll">
        <div class="wrap-map">
          <gmap-map
            ref="map"
            :options="{
              disableDefaultUI: true,
              zoomControl: true,
              autobindAllEvents: true,
            }"
            :center="{ lat: 1.38, lng: 103.8 }"
            :zoom="12"
            style="width: 100%; height: 500px"
          >
          </gmap-map>
        </div>
      </div>
      <div class="mt-4">
        <button @click="submitCompanyInfo" class="btn btn-success-outline mr-2">
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import * as VueGoogleMaps from "vue2-google-maps";
import VModal from "vue-js-modal";
Vue.use(VModal);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBzyXzhhqWBsTj305rY30VC1UF_1OHDKgA",
    libraries: "places",
    load: {
      region: "VI",
      language: "vi",
    },
  },
});

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

const checkWebsite = (value) =>
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(value);
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";
export default {
  name: "company-info",
  props: ["company"],
  data() {
    return {
      companyInfo: {},
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
    this.companyInfo = { ...this.company };
    this.$nextTick(() => {
      this.$refs.map.$gmapApiPromiseLazy().then(this.loadControls);
    });
  },
  methods: {
    loadControls(map) {
      console.log("map", map);
      var controlDiv = document.createElement("div");
      var firstChild = document.createElement("button");
      firstChild.style.backgroundColor = "#fff";
      firstChild.style.border = "none";
      firstChild.style.outline = "none";
      firstChild.style.width = "28px";
      firstChild.style.height = "28px";
      firstChild.style.borderRadius = "2px";
      firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
      firstChild.style.cursor = "pointer";
      firstChild.style.marginRight = "10px";
      firstChild.style.padding = "0px";
      firstChild.title = "Your Location";
      controlDiv.appendChild(firstChild);
      var secondChild = document.createElement("div");
      secondChild.style.margin = "5px";
      secondChild.style.width = "18px";
      secondChild.style.height = "18px";
      secondChild.style.backgroundImage =
        "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)";
      secondChild.style.backgroundSize = "180px 18px";
      secondChild.style.backgroundPosition = "0px 0px";
      secondChild.style.backgroundRepeat = "no-repeat";
      secondChild.id = "you_location_img";
      firstChild.appendChild(secondChild);
      window.google.maps.event.addListener(
        this.$refs.map.$mapObject,
        "center_changed",
        function () {
          secondChild.style["background-position"] = "0 0";
        }
      );
      var ref = this;
      firstChild.addEventListener("click", function () {
        navigator.geolocation.getCurrentPosition((position) => {
          let latlng = new window.google.maps.LatLng(
            parseFloat(position.coords.latitude),
            parseFloat(position.coords.longitude)
          );
          ref.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          ref.createMarker(latlng);
        });
      });
      controlDiv.index = 1;
      this.$refs.map.$mapObject.controls[
        window.google.maps.ControlPosition.RIGHT_BOTTOM
      ].push(controlDiv);
    },
    getOfficeLocation(e) {
      console.log("hello", e);
    },
    submitCompanyInfo(evt) {
      evt.preventDefault();
      AxiosHelper.patch(`company/edit/${this.companyInfo.id}`, this.companyInfo)
        .then(() => {
          Vue.$toast.open({
            message: "Company summary has been updated successfully",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 500);
        })
        .catch(() => {
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating your social media accounts",
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
  validations: {
    companyInfo: {
      coName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(25),
      },
      yearFounded: {},
      contactEmail: {
        email,
      },
      emailDisplay: {
        required,
      },
      contactPhone: {
        required,
        minLength: minLength(3),
      },
      phoneDisplay: {
        required,
      },
      coWebsite: {
        validateWebsite: checkWebsite,
      },
      districtBasedIn: {},
      areaOfInterest: {},
      mainAreaOfInterest: {},
      shortDescription: {
        minLength: minLength(3),
      },
    },
  },
};
</script>