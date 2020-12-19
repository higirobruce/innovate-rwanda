<template>
  <div>
    <h3 class="p-4 bottom-shadow shadow">Business activities</h3>
    <div class="px-4">
      <form @submit="submit">
        <div class="wrap-modal" style="max-height: 500px; overflow: scroll">
          <div class="row mt-1">
            <div class="col-12" v-if="listOfBusinessActivities">
              <div
                v-for="(a, index) in convertToObject(
                  company.businessActivities
                )"
                :key="index"
              >
                <div
                  v-for="(activity, index) in listOfBusinessActivities.filter(
                    (p) => p.id === a
                  )"
                  :key="index"
                >
                  <div
                    :class="`${
                      a === activity.id
                        ? 's-one-activity active-one-activity'
                        : 's-one-activity'
                    }`"
                  >
                    {{ activity.name }}
                    <button :disabled="a === activity.id" type="button">
                      Remove
                    </button>
                  </div>
                </div>
                <!-- <div
                  v-for="(activity, index) in listOfBusinessActivities.filter(
                    (p) =>  a !== p.id
                  )"
                  :key="index"
                >
                  <div
                    :class="`${
                      a === activity.id
                        ? 's-one-activity active-one-activity'
                        : 's-one-activity'
                    }`"
                  >
                    {{ a }}=={{ activity.id }} {{ activity.name }}
                    <button :disabled="a === activity.id" type="button">
                      Remove
                    </button>
                  </div>
                </div> -->
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
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import VModal from "vue-js-modal";
Vue.use(VModal);

export default {
  name: "company-info",
  props: ["company"],
  data() {
    return {
      companyInfo: {},
      businessActivities: [],
      listOfBusinessActivities: [],
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
    this.companyInfo = { ...this.company };
  },
  methods: {
    convertToObject(object) {
      return JSON.parse(object);
    },
    closeModal() {
      this.$modal.hide("openEditBusinessActivies");
    },
    submit(evt) {
      evt.preventDefault();
      this.companyInfo.businessActivities =
        this.businessActivities !== ""
          ? JSON.stringify(this.businessActivities)
          : "";
      console.log("wait", this.companyInfo.businessActivities);
      // AxiosHelper.patch(`company/edit/${this.companyInfo.id}`, this.companyInfo)
      //   .then(() => {
      //     Vue.$toast.open({
      //       message:
      //         "Company business activities have been updated successfully",
      //       type: "success",
      //     });
      //     setTimeout(() => {
      //       this.$router.go();
      //     }, 2000);
      //   })
      //   .catch(() => {
      //     Vue.$toast.open({
      //       message:
      //         "Sorry, something went wrong while updating your social media accounts",
      //       type: "error",
      //     });
      //   });
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

<style scoped>
.form-check-inline {
  padding: 4px 10px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  margin-top: 8px;
  cursor: pointer;
}
.s-one-activity {
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
}
.s-one-activity button {
  position: absolute;
  font-size: 14px;
  color: #747474;
  top: 8px;
  right: 5px;
  border: none;
  background: none;
}
.active-one-activity {
  background: #f5f5f5 !important;
}
</style>