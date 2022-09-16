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
          <li class="list-inline-item mr-5">
            <router-link class="text-blue" :to="'/dashboard/directory/individuals'">
              Individual Registrations
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
            <button
              v-if="!loadingDirectory && loaded"
              @click="openExportModal"
              class="btn btn-primary-outline mr-2"
            >
              Export
            </button>
          </span>
        </div>
        <div class="clear" />
        <modal
          name="ExportModal"
          :adaptive="true"
          :scrollable="true"
          :height="380"
          :width="600"
        >
          <button type="button" @click.prevent="closeModal" class="close">
            <img src="@/assets/images/close.png" />
          </button>
          <h3 class="p-4">Export companies</h3>
          <div class="px-4">
            <div class="row">
              <div class="col-6">
                <h3 class="h6">Founded from</h3>
                <date-picker
                  v-model="startingDate"
                  :type="'year'"
                  :placeholder="'Choose starting date'"
                  :format="'YYYY'"
                  valueType="format"
                ></date-picker>
              </div>
              <div class="col-6">
                <h3 class="h6">To</h3>
                <date-picker
                  v-model="endingDate"
                  :type="'year'"
                  :placeholder="'Choose ending date'"
                  :format="'YYYY'"
                  valueType="format"
                ></date-picker>
              </div>
            </div>

            <div class="my-3">
              <h3 class="h6">Company status</h3>
              <div class="form-group">
                <select
                  v-model="companyStatus"
                  class="form-control form-control-lg"
                  @change="changeCompanyStatusForExport($event)"
                  name="company-status"
                >
                  <option :value="''" selected>All companies</option>
                  <option :value="'pending'">Pending companies</option>
                  <option :value="'approved'">Approved companies</option>
                  <option :value="'in_editing'">In editing mode</option>
                </select>
              </div>
            </div>
            <div
              class="alert alert-danger"
              v-if="!pdfDownloaded && !pdfDownloading && companyNotFound"
            >
              Directory is empty, select other options and export again
            </div>
            <div>
              <span class="float-left">
                <button
                  type="button"
                  @click.prevent="closeModal"
                  class="btn btn-gray-outline"
                >
                  Close
                </button>
              </span>
              <span class="float-right">
                <div class="my-3" v-if="!pdfDownloaded && pdfDownloading">
                  Generating companies....
                </div>
                <button
                  v-if="!pdfDownloading"
                  type="button"
                  @click.prevent="loadCompaniesForExport"
                  class="btn btn-success"
                >
                  Export now
                </button>
              </span>
            </div>
          </div>
        </modal>
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="Companies - Exported"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <div class="wrap-export">
              <div class="export-header">
                <div class="brand">
                  <h1 class="h2 font-weight-bold">INNOVATE RWANDA</h1>
                </div>
                <div class="export-title">
                  <h2>List of Companies</h2>
                </div>
              </div>
              <div class="export-body">
                <ExportCompanies :directory="companiesForExport" />
              </div>
            </div>
          </section>
        </vue-html2pdf>
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
import isTokenExpired from '@/helpers/isTokenExpired';
import Loading from "@/components/Loading";
import CompanyInfo from "@/components/CompanyInfo";
import ExportCompanies from "@/components/ExportCompanies";
import NotAllowed from "@/components/NotAllowed";
import EditCompanyInfo from "@/components/EditCompanyInfo";
import ListAdminCompanies from "@/components/ListAdminCompanies.vue";
import { EventBus } from "@/helpers/event-bus.js";
import VueHtml2pdf from "vue-html2pdf";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
export default {
  name: "directory-directory",
  components: {
    Loading,
    CompanyInfo,
    NotAllowed,
    EditCompanyInfo,
    ListAdminCompanies,
    VueHtml2pdf,
    ExportCompanies,
    DatePicker,
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
      companiesForExport: [],
      startingDate: "",
      endingDate: "",
      companyStatus: "",
      pdfDownloaded: false,
      pdfDownloading: false,
      companyNotFound: false,
    };
  },
  
  created() {
    this.$forceUpdate();
    EventBus.$on("reload-company-dir", () => {
      this.loadCompanies();
    });
    this.loadCompanies();
    // this.loadCompaniesForExport();
  },
  mounted() {
    this.$modal.hide("companyInfo");
    this.currentStatus = this.$route.params.status;
    this.startingDate = "1960";
    this.endingDate = moment().format("YYYY");
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  methods: {
    changeCompanyStatusForExport(e) {
      this.companyStatus = e.target.value;
    },
    // generateReport() {
    //   this.loadCompaniesForExport();
    // },
    downloadReportNow() {
      // this.loadCompaniesForExport();
      this.$refs.html2Pdf.generatePdf();
      this.pdfDownloaded = true;
      this.pdfDownloading = false;
    },
    loadCompaniesForExport() {
      this.pdfDownloading = true;
      this.pdfDownloaded = false;
      this.companyNotFound = true;
      AxiosHelper.get(
        `export?model=Company&start=${this.startingDate}&end=${this.endingDate}&status=${this.companyStatus}`
      )
        .then((response) => {
          this.companiesForExport = response.data.result;
          this.loadedCompaniesForExport = true;
          this.$refs.html2Pdf.generatePdf();
          this.pdfDownloaded = true;
          this.pdfDownloading = false;
          this.$modal.hide("ExportModal");
        })
        .catch((error) => {
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.pdfDownloaded = false;
          this.pdfDownloading = false;
          if (error.response.status === 404) {
            Vue.$toast.open({
              message:
                "You can not export right now, please select different options and export again",
              type: "error",
            });
          }
        });
    },
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
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
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
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
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
           if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
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
    openExportModal() {
      this.$modal.show("ExportModal");
    },
    closeModal() {
      this.$modal.hide("EditcompanyInfo");
      this.$modal.hide("ExportModal");
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
.wrap-export {
  padding: 20px;
}
.export-header {
  text-align: center;
}
.brand {
  margin: 15px 0;
}
.brand h1 {
  color: #04adef;
}
.export-title {
  padding: 20px 0;
  border-top: 1px solid #b1b1b1;
}
.export-body {
  font-size: 12px;
  border: 1px solid #b1b1b1;
}
</style>
