<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Directory</h2>
        <ul class="page-nav list-inline">
          <li class="list-inline-item list-active mr-5">
            <router-link class="text-blue" :to="'/dashboard/directory'">
              All Companies
            </router-link>
          </li>
          <li class="list-inline-item mr-5">
            <router-link class="text-blue" :to="'/dashboard/directory/pending'">
              Pending Approval
            </router-link>
          </li>
        </ul>
        <br />
      </div>
      <Loading v-if="loadingDirectory && !loaded" />
      <div
        class="dash-container"
        v-if="
          profile &&
          (profile.role === 'admin-company' ||
            profile.role === 'super-admin') &&
          directory &&
          directory.result
        "
      >
        <div>
          <span class="float-right">
            <button @click="closeModal" class="btn btn-primary-outline mr-2">
              Export
            </button>
          </span>
        </div>
        <div class="clear" />
        <ListAdminCompanies
          v-if="!loadingDirectory && loaded"
          :directory="companies"
        />
        <div></div>
        <div v-if="!notAllowed && !loadingDirectory && error.length > 1">
          <h2 class="h5 font-weight-light">{{ error }}</h2>
        </div>
        <div v-if="notAllowed">
          <NotAllowed />
        </div>
      </div>
      <modal
        name="EditcompanyInfo"
        :adaptive="true"
        :scrollable="true"
        :height="660"
        :width="960"
      >
        <button type="button" @click.prevent="closeModal" class="close">
          <img src="@/assets/images/close.png" />
        </button>
        <EditCompanyInfo :company="company.company" />
      </modal>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import Loading from "@/components/Loading";
import CompanyInfo from "@/components/CompanyInfo";
import NotAllowed from "@/components/NotAllowed";
import EditCompanyInfo from "@/components/EditCompanyInfo";
import ListAdminCompanies from "@/components/ListAdminCompanies.vue";
import { EventBus } from "@/helpers/event-bus.js";
export default {
  name: "directory",
  components: {
    Loading,
    CompanyInfo,
    NotAllowed,
    EditCompanyInfo,
    ListAdminCompanies,
  },
  data() {
    return {
      isAuthModelOpen: false,
      directory: [],
      loadingDirectory: false,
      error: "",
      showCompany: false,
      company: {},
      errorCompany: "",
      companyToDeleteName: "",
      companyToDeleteId: "",
      notAllowed: false,
      companyIdEdit: "",
      currentStatus: "pending",
      companies: [],
      loaded: false,
    };
  },
  created() {
    EventBus.$on("reload-company-dir", () => {
      this.loadCompanies();
    });
    this.loadCompanies();
  },
  mounted() {
    this.$modal.hide("companyInfo");
    this.currentStatus = this.$route.params.status;
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  methods: {
    loadCompanies() {
      this.loadingDirectory = true;
      this.loaded = false;
      AxiosHelper.get("directory/admin")
        .then((response) => {
          this.directory = response.data;
          // this.companies = this.directory.result;
          this.companies =
            this.directory &&
            this.directory.result.filter((d) => d.status !== "pending");
          this.loadingDirectory = false;
          this.loaded = true;
        })
        .catch((error) => {
          if (error.response.status === 404 || error.response.status === 400) {
            this.error = "No companies found at this moment";
          } else if (error.response.status === 403) {
            this.error = "No companies found at this moment";
            this.notAllowed = true;
          } else {
            this.error = "Something went wrong, try again later";
          }
          this.loadingDirectory = false;
          this.loaded = false;
        });
    },
    loadPendingDir() {
      this.currentStatus = "pending";
      this.companies =
        this.directory &&
        this.directory.result.filter((d) => d.status === "pending");
    },
    resetDirStatus() {
      this.currentStatus = "";
      this.companies = this.directory.result;
    },
    convertToObject(object) {
      return JSON.parse(object);
    },
    async openCompanyEdit(id) {
      AxiosHelper.get(`company/${id}`)
        .then((response) => {
          this.company = response.data.result;
          this.loadingDirectory = false;
          this.loadingCompany = false;
          this.$modal.show("EditcompanyInfo");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorCompany = error.response.data.error;
          } else {
            this.errorCompany = "Something went wrong, try again later";
          }
          Vue.$toast.open({
            message: this.errorCompany,
            type: "error",
          });
          this.loadingDirectory = false;
          this.loadingCompany = false;
        });
    },
    loadCompany(id) {
      this.company = {};
      this.loadingCompany = true;
      this.errorCompany = "";
      AxiosHelper.get(`company/${id}`)
        .then((response) => {
          this.company = response.data.result;
          this.loadingDirectory = false;
          this.loadingCompany = false;
          this.$modal.show("companyInfo");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.errorCompany = error.response.data.error;
          } else {
            this.errorCompany = "Something went wrong, try again later";
          }
          Vue.$toast.open({
            message: this.errorCompany,
            type: "error",
          });
          this.loadingDirectory = false;
          this.loadingCompany = false;
        });
    },
    cancelDelete() {
      this.$modal.hide("deleteCompany");
    },
    closeModal() {
      this.$modal.hide("EditcompanyInfo");
    },
  },
};
</script>

<style scoped>
.page-nav button {
  background: none;
  padding: 8px 20px;
  border: none;
}
.page-nav button:hover {
  box-shadow: none;
}
</style>
