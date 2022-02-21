<template>
  <div>
    <div v-if="!loading && types && types">
      <h3 class="p-4">Change company type</h3>
      <div class="px-4">
        <div class="row">
          <div class="col-12">
            <div
              class="form-check list-check-role"
              v-for="(type, index) in types"
              :key="index"
            >
              <input
                class="form-check-input"
                type="radio"
                :name="'type'"
                :id="`id-${type.id}`"
                :value="type.slug"
                :checked="type.slug === company.coType"
                v-on:change="typeSelected(type.slug)"
              />
              <label class="form-check-label" :for="`id-${type.id}`">
                {{ type.name }}
              </label>
            </div>

            <div class="mt-4">
              <span class="float-left">
                <button
                  @click="changeType"
                  class="btn btn-success-outline mr-2"
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>
<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import Loading from "@/components/Loading";
export default {
  name: "edit-type",
  components: {
    Loading,
  },
  props: ["company"],
  data() {
    return {
      types: [],
      companyInfo: {},
      selectedType: "",
      loading: false
    };
  },
  mounted() {
    this.companyInfo = { ...this.company };
  },
  created() {
    this.loadCompanyTypes();
  },
  methods: {
    loadCompanyTypes() {
      this.loading = true;
      AxiosHelper.get("company-types")
        .then((response) => {
          this.types = response.data.result;
          this.loading = false;
        })
        .catch((error) => {
          if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.loading = false;
        });
    },
    typeSelected(e) {
      this.selectedType = e;
    },
    changeType() {
      this.companyInfo.coType = this.selectedType;
      AxiosHelper.patch(`company/edit/${this.companyInfo.id}`, this.companyInfo)
        .then(() => {
          Vue.$toast.open({
            message: "Company type has been updated successfully",
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2000);
        })
        .catch((error) => {
          if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          Vue.$toast.open({
            message:
              "Sorry, something went wrong while updating company type",
            type: "error",
          });
        });
    },
  },
};
</script>