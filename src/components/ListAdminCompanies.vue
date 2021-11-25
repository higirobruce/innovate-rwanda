<template>
  <div class="mt-3">
    <table class="table table-responsive-sm">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Date joined</th>
          <th scope="col">Type</th>
          <th scope="col">Activities</th>
          <th scope="col">Activities</th>
          <th scope="col">Status</th>
          <th scope="col">
            <span class="float-right mr-3"> Actions </span>
          </th>
        </tr>
      </thead>
      <tbody v-if="directory && directory">
        <tr v-for="(dir, index) in directory" :key="index">
          <td>
            <router-link class="text-blue" :to="`/dashboard/company/${dir.id}`">
              {{ dir.coName }}
            </router-link>
            <br />
            <!-- <small>Created by: {{ dir }}</small> -->
          </td>
          <td>{{ dir.createdAt | date("DD MMM, YYYY") }}</td>
          <td>{{ dir.CompanyType.name }}</td>
          <td>
            {{ dir.BusinessActivity.name }}
          </td>
          <td style="max-width: 200px">
            <span v-if="!_.isEmpty(dir.ActivitiesOfCompanies)">
              <span
                v-for="(act, index) in dir.ActivitiesOfCompanies.slice(0, 3)"
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
        <b>{{ companyToDeleteName }}</b> company and all information attached to
        it.
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
      :height="220"
      :minHeight="180"
      :width="600"
    >
      <button type="button" @click.prevent="closeModal" class="close">
        <img src="@/assets/images/close.png" />
      </button>
      <h3 class="p-4">Decline company</h3>
      <div class="px-4 py-1 h6 font-weight-light">
        Are you sure you want to decline this company?
      </div>
      <div class="py-3 px-4">
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
  </div>
</template>
<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import CompanyInfo from "@/components/CompanyInfo";
import { EventBus } from "@/helpers/event-bus.js";
export default {
  name: "list-companies",
  props: ["directory"],
  components: {
    CompanyInfo,
  },
  data() {
    return {
      companyToDeleteName: "",
      companyToDeleteId: "",
      inputCompanyToDelete: "",
      companyToApprove: "",
      companyToDecline: "",
      company: {},
    };
  },
  methods: {
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
      const data = {
        id: this.companyToDecline,
        decision: "declined",
      };
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
td {
  /* text-align: center; */
  vertical-align: middle;
}
</style>