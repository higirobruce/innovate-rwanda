<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">My Company</h2>
        <div class="logo-mycompany">
          <img src="@/assets/images/jica.png" alt="Tech Solver" />
          <h3>Tech Solver Ltd</h3>
        </div>
      </div>
      <div class="dash-container">
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
                <span>+25073210213</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Email:&nbsp;&nbsp;
                <span>+25073210213</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Website:&nbsp;&nbsp;
                <span>techsolver.com</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Year Founded:&nbsp;&nbsp;
                <span>2012</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Location:&nbsp;&nbsp;
                <span>Gasabo</span>
              </div>
              <div class="col-sm-12 col-lg-6 info-box">
                Social media:&nbsp;&nbsp;
                <span>-</span>
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
                >Online business exposing and selling</span
              >
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
          <button
            class="btn font-weight-bold btn-primary-outline mr-2 shadow floating-btn"
          >
            <icon class="icon" icon="pen" />
            Edit
          </button>
          <div class="my-3">Company summary</div>
          <div class="text-blue-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?" Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?" Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?"
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
            <span class="text-blue-dark"
              >233 KG 7 Ave Kigali Height 8th floor</span
            >
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
import companies from "./../../../dummy/company.js";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB4BlTNmRI2uk50yZ-QLat92Vb08U_WNhE",
    libraries: "places", // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
});
export default {
  name: "directory",
  data() {
    return {
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
  created() {
    this.directory = companies;
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
.logo-mycompany {
  display: flex;
  align-items: center;
}
.logo-mycompany img {
  background: #ffffff;
  padding: 15px;
}
.logo-mycompany h3 {
  font-size: 32px;
  padding-left: 25px;
  color: #1b2958;
  font-weight: bold;
}
.wrap-company {
  font-size: 18px;
  border: 1px solid #c0c6d8;
  padding: 30px 10px;
  border-radius: 5px;
}
.co-description {
  margin-top: 30px;
  /* font-size: 14px; */
  background: #f0f2f8;
  padding: 30px 40px;
  border-radius: 5px;
}
.small-row {
  max-width: 600px;
}
.info-separator {
  background: #c0c6d8;
  height: 1px;
  margin: 15px 0;
  width: 100%;
}
.company-info {
  margin: 0px 35px;
}
.info-box {
  margin: 7px 0;
}
.info-box span {
  font-weight: 500;
  color: #1b2958;
}
.co-badge {
  font-size: 14px;
  padding: 5px 20px;
  background: #f0f2f8;
  border-radius: 24px;
  color: #1b2958;
  margin: 8px 10px 8px 0;
  display: inline-block;
}
.floating-btn {
  position: absolute;
  top: 15px;
  right: 20px;
}
</style>