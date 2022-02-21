<template>
  <div>
    <h3 class="p-4">Business activities</h3>
    <div class="px-4">
        <div class="wrap-modal" style="max-height: 500px; overflow: scroll">
          <div class="row mt-1">
            <div class="col-12" v-if="listOfBusinessActivities">
              <div v-for="(a, index) in listOfBusinessActivities" :key="index">
                <div class="s-one-activity">
                  {{ a.name }}
                  <button @click.prevent="addToCompany(a.id)" type="button">Add</button>
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
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
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
      .catch((error) => {
        if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
      });
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
    addToCompany(id) {
      const data = {
        companyId: this.company.company.id,
        activityId: id
      }
      AxiosHelper.post('activities/add-activity', data)
        .then(() => {
          Vue.$toast.open({
            message:
              "Activity have been added successfully",
            type: "success",
          });
        })
        .catch((error) => {
          if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          Vue.$toast.open({
            message:
              "Sorry, something went wrong. Try again later",
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
  top: 12px;
  right: 5px;
  border: none;
  background: none;
}
.active-one-activity {
  background: #f5f5f5 !important;
}
</style>