<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Directory</h2>
        <ul class="page-nav list-inline">
          <li class="list-inline-item mr-5">
            <router-link class="text-blue" :to="'/dashboard/directory'">
              All Companies
            </router-link>
          </li>
          <li class="list-inline-item mr-5 list-active">
            <router-link class="text-blue" :to="'/dashboard/directory/pending'">
              Pending Approval
            </router-link>
          </li>
        </ul>
        <br />
      </div>
      <div class="dash-container" v-if="!_.size(companies) && loaded">
        <div class="no-pending my-5 py-5">
          <div class="image">
            <img src="@/assets/images/companies.png" alt="companies" />
          </div>
          <h3 class="text-center py-4 font-weight-light">
            All pending approval companies found.
          </h3>
        </div>
      </div>
      <div
        class="dash-container"
        v-if="
          profile &&
          (profile.role === 'admin-company' ||
            profile.role === 'super-admin') &&
          directory &&
          directory.result &&
          _.size(companies)
        "
      >
        <table class="table table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date joined</th>
              <th scope="col">Type</th>
              <th scope="col">Business activity</th>
              <th scope="col">Activities</th>
              <th scope="col">Status</th>
              <th scope="col">
                <span class="float-right mr-3"> Actions </span>
              </th>
            </tr>
          </thead>
          <tbody v-if="companies && companies">
            <tr v-for="(dir, index) in companies" :key="index">
              <td>
                <router-link
                  class="text-blue"
                  :to="`/dashboard/company/${dir.id}`"
                >
                  {{ dir.coName }}
                </router-link>
              </td>
              <td>{{ dir.createdAt | date("DD MMM, YYYY") }}</td>
              <td>
                {{ dir.CompanyType.name }}
              </td>
              <td>
                {{ dir.BusinessActivity.name }}
              </td>
              <td style="max-width: 200px">
                <span v-if="!_.isEmpty(dir.ActivitiesOfCompanies)">
                  <span
                    v-for="(act, index) in dir.ActivitiesOfCompanies.slice(
                      0,
                      3
                    )"
                    :key="index"
                  >
                    <span v-if="index !== 0">,</span>
                    {{ act.BusinessActivity.name }}
                  </span>
                  <span v-if="dir.ActivitiesOfCompanies.length >= 3">
                    and more</span
                  >
                </span>
              </td>
              <td>
                <div class="wrap-switch-toggle">
                  <span
                    class="status text-capitalize approved"
                    v-if="dir.status === 'approved'"
                  >
                    Approved
                  </span>
                  <span
                    class="status text-capitalize pending"
                    v-if="dir.status === 'pending'"
                  >
                    Pending
                  </span>
                  <span
                    class="status text-capitalize declined"
                    v-if="dir.status === 'declined'"
                  >
                    Rejected
                  </span>
                  <span
                    class="status text-capitalize deleted"
                    v-if="dir.status === 'deleted'"
                  >
                    Deleted
                  </span>
                </div>
              </td>
              <td>
                <div class="wrap-actions float-right">
                  <button
                    v-if="dir.status === 'pending' || dir.status === 'declined'"
                    @click="openApprove(dir.id)"
                    class="btn btn-sm btn-success-outline mr-2"
                  >
                    Approve
                  </button>
                  <button
                    v-if="dir.status === 'pending' || dir.status === 'approved'"
                    @click="openDecline(dir.id)"
                    class="btn btn-sm btn-danger-outline"
                  >
                    Decline
                  </button>

                  <router-link :to="`/dashboard/company/${dir.id}`">
                    <img src="@/assets/images/view.png" alt="view" />
                  </router-link>
                  <button
                    v-if="
                      profile.role === 'super-admin' && dir.status !== 'deleted'
                    "
                    @click="deleteCompany(dir.coName, dir.id)"
                  >
                    <img src="@/assets/images/delete.png" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <modal
          name="deleteCompany"
          :adaptive="true"
          :scrollable="true"
          :minHeight="350"
          :width="600"
        >
          <button type="button" @click.prevent="closeModal" class="close">
            <img src="@/assets/images/close.png" />
          </button>
          <h3 class="p-4">Are you absolutely sure?</h3>
          <div class="px-4 py-1 h6 font-weight-light">
            This action cannot be undone. This will permanently delete
            <b>{{ companyToDeleteName }}</b> company and all information
            attached to it.
          </div>
          <div class="px-4 py-1 h6 font-weight-light">
            Please type <b class="text-danger">{{ companyToDeleteName }}</b> to
            confirm.
          </div>
          <div class="form-group px-4">
            <input
              type="text"
              v-model="inputCompanyToDelete"
              class="form-control custom-input"
              placeholder="type here..."
            />
          </div>
          <div class="py-3 px-4">
            <span class="float-left">
              <button class="btn btn-success-outline mr-2" @click="closeModal">
                Cancel
              </button>
              <button
                class="btn btn-danger"
                :disabled="inputCompanyToDelete !== companyToDeleteName"
                @click="deleteAnyway(companyToDeleteId)"
              >
                Delete
              </button>
            </span>
            <span class="float-right">
              <button @click="closeModal" class="btn btn-gray-outline mr-2">
                Close
              </button>
            </span>
          </div>
        </modal>

        <modal
          name="companyInfo"
          :adaptive="true"
          :scrollable="true"
          :height="700"
          :width="960"
        >
          <button type="button" @click.prevent="closeModal" class="close">
            <img src="@/assets/images/close.png" />
          </button>
          <CompanyInfo :company="company" />
        </modal>

        <!-- Approve -->
        <modal
          name="approveCompany"
          :adaptive="true"
          :scrollable="true"
          :height="220"
          :minHeight="180"
          :width="600"
        >
          <button type="button" @click.prevent="closeModal" class="close">
            <img src="@/assets/images/close.png" />
          </button>
          <h3 class="p-4">Approve company</h3>
          <div class="px-4 py-1 h6 font-weight-light">
            Are you sure you want to approve this company?
          </div>
          <div class="py-3 px-4">
            <span class="float-left">
              <button class="btn btn-primary-outline mr-2" @click="closeModal">
                Cancel
              </button>
              <button @click.prevent="approveCompany" class="btn btn-success">
                Approve
              </button>
            </span>
          </div>
        </modal>
        <!-- Decline -->
        <modal
          name="declineCompany"
          :adaptive="true"
          :scrollable="true"
          :height="370"
          :minHeight="180"
          :width="600"
        >
          <button type="button" @click.prevent="closeModal" class="close">
            <img src="@/assets/images/close.png" />
          </button>
          <h3 class="p-4">Decline company</h3>
          <div class="px-4 mb-2 font-weight-light">
            Are you sure you want to decline this company?
          </div>
          <div class="form-group px-4">
            <label for="message">Message</label>
            <textarea
              class="form-control"
              id="message"
              v-model="message"
              rows="3"
            ></textarea>
            <div class="text-danger">This message will be sent to the company's owner</div>
          </div>
          <div class="py-2 px-4">
            <span class="float-left">
              <button class="btn btn-primary-outline mr-2" @click="closeModal">
                Cancel
              </button>
              <button @click.prevent="declineCompany" class="btn btn-danger">
                Decline
              </button>
            </span>
          </div>
        </modal>
        <div>
          <Loading v-if="loadingDirectory" />
        </div>
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
      loaded: false,
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
      inputCompanyToDelete: "",
      companyToApprove: "",
      companyToDecline: "",
      message: ""
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
            this.directory.result.filter((d) => d.status === "pending");
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
    // closeModal() {
    //   this.$modal.hide("EditcompanyInfo");
    // },
    openApprove(id) {
      this.companyToApprove = id;
      this.$modal.show("approveCompany");
    },
    openDecline(id) {
      this.companyToDecline = id;
      this.$modal.show("declineCompany");
    },
    deleteCompany(name, id) {
      this.companyToDeleteName = name;
      this.companyToDeleteId = id;
      this.$modal.show("deleteCompany");
    },
    approveCompany() {
      const data = {
        id: this.companyToApprove,
        decision: "approved",
      };
      AxiosHelper.put("company/manage", data)
        .then(() => {
          Vue.$toast.open({
            message: "Company has been approved successfully",
            type: "success",
          });
          EventBus.$emit("reload-company-dir");
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
      this.$modal.hide("approveCompany");
    },
    declineCompany() {
      let data = {
        id: this.companyToDecline,
        decision: "declined",
      };
      if(this._.size(this.message)) {
        data.message = this.message
      }
      AxiosHelper.put("company/manage", data)
        .then(() => {
          Vue.$toast.open({
            message: "Company has been declined successfully",
            type: "success",
          });
          EventBus.$emit("reload-company-dir");
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
      this.$modal.hide("declineCompany");
    },
    deleteAnyway(id) {
      AxiosHelper.delete(`company/delete/${id}`)
        .then(() => {
          Vue.$toast.open({
            message: `We have deleted company: "${this.companyToDeleteName}"`,
            type: "success",
          });
          setTimeout(() => {
            this.$router.go();
          }, 2000);
          this.$modal.hide("deleteCompany");
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
    closeModal() {
      this.$modal.hide("deleteCompany");
      this.$modal.hide("approveCompany");
      this.$modal.hide("declineCompany");
      this.$modal.hide("companyInfo");
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
.no-pending .image {
  max-width: 120px;
  margin: 20px auto;
  display: block;
}
</style>
