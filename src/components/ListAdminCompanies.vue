<template>
  <div>
    <table class="table table-responsive-sm">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Date joined</th>
          <th scope="col">Type</th>
          <th scope="col">Business activity</th>
          <th scope="col">Activities</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-if="directory && directory">
        <tr v-for="(dir, index) in directory" :key="index">
          <td>
            <span class="cursor-pointer text-blue" @click="loadCompany(dir.id)">
              {{ dir.coName }}
            </span>
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
            <div class="wrap-actions">
              <router-link :to="`/dashboard/my-company/${dir.id}`">
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
      <h3 class="p-4 bottom-shadow shadow">Are you absolutely sure?</h3>
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
  </div>
</template>
<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
export default {
  name: "list-companies",
  props: ["directory"],
  data() {
    return {
      companyToDeleteName: "",
      companyToDeleteId: "",
      inputCompanyToDelete: "",
    };
  },
  methods: {
    deleteCompany(name, id) {
      this.companyToDeleteName = name;
      this.companyToDeleteId = id;
      this.$modal.show("deleteCompany");
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
    cancelDelete() {
      this.$modal.hide("deleteCompany");
    },
  },
};
</script>