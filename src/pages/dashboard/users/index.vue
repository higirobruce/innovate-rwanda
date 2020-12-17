<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5 position-relative">
        <h2 class="h2 font-weight-bold">Users</h2>
        <div class="wrap-content-head-btns align-items-end">
          <button
            v-if="
              (profile && profile.role === 'admin-user') ||
              profile.role === 'super-admin'
            "
            class="btn font-weight-bold btn-primary-outline"
            @click="regiserUser"
          >
            Add New User
          </button>
        </div>
      </div>
      <div class="dash-container">
        <table
          class="table"
          v-if="!loading && profile.role === 'admin-user' || profile.role === 'super-admin'"
          
        >
          <thead>
            <tr>
              <th scope="col">Names</th>
              <th scope="col">email</th>
              <th scope="col">Job</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody v-if="users && Object.keys(users).length">
            <tr v-for="(user, index) in users" :key="index">
              <td>
                <span class="cursor-pointer text-blue">
                  {{ user.firstName }} {{ user.lastName }}
                </span>
              </td>
              <td>{{ user.email }}</td>
              <td>{{ user.jobTitle || "-" }}</td>
              <td>
                <select
                  v-if="user.role !== 'normal'"
                  class="form-control form-control-sm"
                  @change="changeRole($event, user)"
                  name="category"
                  :disabled="profile.id === user.id"
                >
                  <option
                    v-for="(role, index) in roles"
                    v-bind:value="user.text"
                    :key="index"
                    :selected="user.role === role.text"
                  >
                    {{ role.name }}
                  </option>
                </select>
                <span v-if="user.role === 'normal'"> Normal </span>
              </td>
              <td class="d-flex align-content-center flex-wrap">
                <span class="status pending" v-if="user.status === 'new'">
                  Account not verified
                </span>
                <span class="status approved" v-if="user.status === 'active'">
                  Active
                </span>
                <span class="status declined" v-if="user.status === 'inactive'">
                  Inactive
                </span>
              </td>
              <td>{{ user.createdAt | date("DD/MM/YYYY") }}</td>
              <td>
                <div class="wrap-actions">
                  <button
                    @click="deleteUser(user.email)"
                    v-if="profile.id !== user.id && user.status === 'active'"
                  >
                    <img src="@/assets/images/delete.svg" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="!loading && Object.keys(users).length === 0"
          class="not-found"
        ></div>
        <modal
          name="openChangeRole"
          :adaptive="true"
          :scrollable="true"
          :height="240"
          :width="600"
        >
          <ChangeRole :user="user" :role="role" entity="user" />
        </modal>
        <modal
          name="openRegister"
          :adaptive="true"
          :scrollable="true"
          :height="660"
          :width="800"
        >
          <NewUser />
        </modal>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import ChangeRole from "@/components/ChangeRole";
import NewUser from "@/components/NewUser";
export default {
  components: { ChangeRole, NewUser },
  data() {
    return {
      users: [],
      loading: false,
      userRole: "",
      user: {},
      role: "",
      roles: [
        {
          name: "Administrator",
          text: "super-admin",
        },
        {
          name: "Users",
          text: "admin-user",
        },
        {
          name: "Blog",
          text: "admin-blog",
        },
        {
          name: "Events",
          text: "admin-event",
        },
        {
          name: "Jobs",
          text: "admin-job",
        },
        {
          name: "Companies",
          text: "admin-job",
        },
      ],
    };
  },
  created() {
    this.loading = true;
    this.loadUsers();
  },
  methods: {
    changeRole(e, user) {
      this.user = user;
      this.$modal.show("openChangeRole");
    },
    regiserUser() {
      this.$modal.show("openRegister");
    },
    deleteUser(email) {
      AxiosHelper.delete(`users/deactivate/${email}`)
        .then(() => {
          this.loadUsers();
          Vue.$toast.open({
            message: `User has been deleted successfully`,
            type: "success",
          });
        })
        .catch(() => {
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
    },
    loadUsers() {
      this.loading = true;
      AxiosHelper.get("users")
        .then((response) => {
          this.users = response.data.result;
          this.loading = false;
        })
        .catch((error) => {
          this.users = [];
          if (error.response.status === 404 || error.response.status === 400) {
            this.error = "No content yet!";
          } else if (error.response.status === 403) {
            this.error = "No companies found at this moment";
            this.notAllowed = true;
          } else {
            this.error = "Something went wrong, try again later";
          }
          this.loading = false;
        });
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
.page-info a {
  position: absolute;
  right: 30px;
  bottom: 15px;
}
table .form-control {
  background: #f0f2f8;
  border: none !important;
}
</style>
