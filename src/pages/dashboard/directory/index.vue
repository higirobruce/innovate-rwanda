<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Directory</h2>
        <ul class="page-nav list-inline">
          <li class="list-inline-item mr-5 list-active">
            <router-link exact :to="'/dashboard/directory'"
              >Companies list</router-link
            >
          </li>
        </ul>
      </div>
      <div class="dash-container">
        <table
          class="table"
          v-if="
            profile &&
            (profile.role === 'admin-company' ||
              profile.role === 'super-admin') &&
            directory &&
            directory.result
          "
        >
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date joined</th>
              <th scope="col">Type</th>
              <th scope="col">Area of intrests</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody v-if="directory && directory.result">
            <tr v-for="(dir, index) in directory.result" :key="index">
              <td>
                <span
                  class="cursor-pointer text-blue"
                  @click="loadCompany(dir.id)"
                >
                  {{ dir.coName }}
                </span>
              </td>
              <td>{{ dir.createdAt | date("DD MMM, YYYY") }}</td>
              <td>{{ dir.coType }}</td>
              <td>
                {{ dir.mainAreaOfInterest }}
              </td>
              <td>
                <div class="wrap-switch-toggle">
                  <span
                    class="status text-capitalize approved"
                    v-if="dir.status === 'approved'"
                  >
                    Company is approved
                  </span>
                  <span
                    class="status text-capitalize pending"
                    v-if="dir.status === 'pending'"
                  >
                    Pending approval
                  </span>
                  <span
                    class="status text-capitalize declined"
                    v-if="dir.status === 'declined'"
                  >
                    Company is rejected
                  </span>
                </div>
              </td>
              <td>
                <div class="wrap-actions">
                  <button @click="loadCompany(dir.id)">
                    <img src="@/assets/images/view.svg" alt="view" />
                  </button>
                  <button @click="openCompanyEdit(dir.id)">
                    <img src="@/assets/images/edit.svg" alt="edit" />
                  </button>
                  <button @click="deleteCompany(dir.coName, dir.id)">
                    <img src="@/assets/images/delete.svg" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
        name="companyInfo"
        :adaptive="true"
        :scrollable="true"
        :height="700"
        :width="960"
      >
        <CompanyInfo :company="company" />
      </modal>
      <modal
        name="EditcompanyInfo"
        :adaptive="true"
        :scrollable="true"
        :height="660"
        :width="960"
      >
        <EditCompanyInfo :company="company.company" />
      </modal>
      <modal
        name="deleteCompany"
        :adaptive="true"
        :scrollable="true"
        :minHeight="350"
        :width="600"
      >
        <h3 class="p-4 bottom-shadow shadow">Are you absolutely sure?</h3>
        <div class="px-4 py-1 h6 font-weight-light">
          This action cannot be undone. This will permanently delete
          <b>{{ companyToDeleteName }}</b> company and all information attached
          to it.
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
            <button class="btn btn-success-outline mr-2" @click="cancelDelete">
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
            <button @click="cancelDelete" class="btn btn-gray-outline mr-2">
              Close
            </button>
          </span>
        </div>
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
export default {
  name: "directory",
  components: {
    Loading,
    CompanyInfo,
    NotAllowed,
    EditCompanyInfo,
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
      inputCompanyToDelete: "",
    };
  },
  created() {
    this.loadingDirectory = true;
    AxiosHelper.get("directory/admin")
      .then((response) => {
        this.directory = response.data;
        this.loadingDirectory = false;
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
  mounted() {
    this.$modal.hide("companyInfo");
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
  methods: {
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
    deleteAnyway(id) {
      console.log("id", id);
    },
    deleteCompany(name, id) {
      this.companyToDeleteName = name;
      this.companyToDeleteId = id;
      this.$modal.show("deleteCompany");
    },
  },
};
</script>

<style scoped>
</style>