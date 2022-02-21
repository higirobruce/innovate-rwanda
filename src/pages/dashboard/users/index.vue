<template>
  <div>
    <component :is="layout">
      <div :class="`${changingRole === true ? 'overlay covered' : 'overlay'}`">
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
        <Loading v-if="loading && !loaded" />
        <div class="dash-container" v-if="!loading && loaded">
          <table
            class="table table-responsive-sm"
            v-if="
              (!loading && profile.role === 'admin-user') ||
              profile.role === 'super-admin'
            "
          >
            <thead>
              <tr>
                <th scope="col">Names</th>
                <th scope="col">email</th>
                <th scope="col">Job</th>
                <th scope="col">Role</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody v-if="users && Object.keys(users).length">
              <tr
                v-for="(user, index) in users"
                :key="index"
                :class="`${profile.id === user.id ? 'my-account' : ''}`"
              >
                <td>
                  <span class="cursor-pointer">
                    {{ user.firstName }} {{ user.lastName }}
                  </span>
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.jobTitle || "-" }}</td>
                <td>
                  <span
                    v-if="user.role === 'normal' || user.role === 'individual'"
                    class="text-capitalize"
                  >
                    {{ user.role }} account
                  </span>
                  <span v-else class="role-button">
                    {{ generateRole(user.role) }}
                    <img src="@/assets/images/arrow-down.png" alt="edit" />
                  </span>
                </td>
                <td>{{ user.createdAt | date("DD/MM/YYYY") }}</td>
                <td class="d-flex align-content-center flex-wrap">
                  <span class="status pending" v-if="user.status === 'new'">
                    Account not verified
                  </span>
                  <span class="status approved" v-if="user.status === 'active'">
                    Active
                  </span>
                  <span
                    class="status deleted"
                    v-if="user.status === 'inactive'"
                  >
                    Inactive
                  </span>
                </td>
                <td>
                  <div class="wrap-actions">
                    <button
                      class="btn btn-sm bg-success text-white"
                      @click="
                        openActivateUser(
                          user.email,
                          `${user.firstName} ${user.lastName}`
                        )
                      "
                      v-if="
                        profile.id !== user.id && user.status === 'inactive'
                      "
                    >
                      Activate
                    </button>
                    <button
                      @click="
                        openDeleteUser(
                          user.email,
                          `${user.firstName} ${user.lastName}`
                        )
                      "
                      v-if="profile.id !== user.id && user.status === 'active'"
                    >
                      <img src="@/assets/images/delete.png" alt="delete" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="!loading && !changingRole && Object.keys(users).length === 0"
            class="not-found"
          ></div>
          <modal
            name="openChangeRole"
            :adaptive="true"
            :scrollable="true"
            :height="400"
            :width="360"
          >
            <button type="button" @click.prevent="closeModal" class="close">
              <img src="@/assets/images/close.png" />
            </button>
            <h3 class="p-4 bottom-shadow text-truncate">Change role</h3>
            <div class="px-4 pb-0">
              <div
                class="form-check list-check-role"
                v-for="(role, index) in roles"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :name="role.text"
                  :id="`id-${role.text}`"
                  :value="role.text"
                  :checked="role.text === selectedRole"
                  v-on:change="roleSelected(role.text)"
                />
                <label class="form-check-label" :for="`id-${role.text}`">
                  {{ role.name }}
                </label>
              </div>
            </div>
            <div class="my-2 mx-4">
              <span class="float-left">
                <button
                  @click="changeRoleAnyway"
                  class="btn btn-success-outline mr-2"
                >
                  Update
                </button>
              </span>
              <span class="float-right">
                <button @click="closeModal" class="btn btn-gray-outline mr-2">
                  Cancel
                </button>
              </span>
            </div>
          </modal>
          <modal
            name="openRegister"
            :adaptive="true"
            :scrollable="true"
            :height="660"
            :width="800"
          >
            <button type="button" @click.prevent="closeModal" class="close">
              <img src="@/assets/images/close.png" />
            </button>
            <NewUser />
          </modal>

          <modal
            name="openDeleteRecord"
            :adaptive="true"
            :scrollable="true"
            :height="220"
            :width="600"
          >
            <button type="button" @click.prevent="closeModal" class="close">
              <img src="@/assets/images/close.png" />
            </button>
            <h3 class="p-4">Delete</h3>
            <div class="px-4">
              Are you absolutely sure you want to delete "<b>{{
                userToDelete
              }}</b
              >"?
            </div>
            <div class="my-4 mx-4">
              <span class="float-left">
                <button
                  @click="closeModal"
                  class="btn btn-primary-outline mr-2"
                >
                  Cancel
                </button>
                <button
                  @click="deleteUser"
                  class="btn btn-danger-outline float-right"
                >
                  Delete
                </button>
              </span>
            </div>
          </modal>
          <modal
            name="openActivateRecord"
            :adaptive="true"
            :scrollable="true"
            :height="220"
            :width="600"
          >
            <button type="button" @click.prevent="closeModal" class="close">
              <img src="@/assets/images/close.png" />
            </button>
            <h3 class="p-4">Activate: {{ userToActivate }}</h3>
            <div class="px-4">
              Do you want to activate "<b>{{ userToActivate }}</b
              >"?
            </div>
            <div class="my-4 mx-4">
              <span class="float-left">
                <button
                  @click="closeModal"
                  class="btn btn-primary-outline mr-2"
                >
                  Cancel
                </button>
                <button
                  @click="activateUser"
                  class="btn btn-success float-right"
                >
                  Activate
                </button>
              </span>
            </div>
          </modal>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import AxiosHelper from "@/helpers/AxiosHelper";
import isTokenExpired from '@/helpers/isTokenExpired';
import NewUser from "@/components/NewUser";
import Loading from "@/components/Loading";
export default {
  name: "dashboard-users",
  components: { NewUser, Loading },
  data() {
    return {
      users: [],
      temporaryUsers: [],
      loading: false,
      loaded: false,
      userRole: "",
      changingRole: false,
      user: {},
      selectedRole: "",
      currentUser: "",
      recordEmail: "",
      userToDelete: "",
      activateEmail: "",
      userToActivate: "",
      roles: [
        {
          name: "Administrator",
          text: "super-admin",
        },
        {
          name: "User  admin",
          text: "admin-user",
        },
        {
          name: "Blog  admin",
          text: "admin-blog",
        },
        {
          name: "Event  admin",
          text: "admin-event",
        },
        {
          name: "Job admin",
          text: "admin-job",
        },
        {
          name: "Company admin",
          text: "admin-company",
        },
      ],
    };
  },
  created() {
    this.loading = true;
    this.loadUsers();
  },
  methods: {
    generateRole(e) {
      let converted = "";
      if (e === "normal") return "Company owner";
      this.roles.map((r) => {
        if (r.text === e) {
          converted = r.name;
        }
      });
      return converted;
    },
    roleSelected(e) {
      this.selectedRole = e;
    },
    regiserUser() {
      this.$modal.show("openRegister");
    },
    openDeleteUser(email, name) {
      this.recordEmail = email;
      this.userToDelete = name;
      this.$modal.show("openDeleteRecord");
    },
    openActivateUser(email, name) {
      this.activateEmail = email;
      this.userToActivate = name;
      this.$modal.show("openActivateRecord");
    },
    deleteUser() {
      AxiosHelper.delete(`users/deactivate/${this.recordEmail}`)
        .then(() => {
          this.loadUsers();
          Vue.$toast.open({
            message: `User has been deleted successfully`,
            type: "success",
          });
        })
        .catch((error) => {
            if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
      this.$modal.hide("openDeleteRecord");
    },
    activateUser() {
      AxiosHelper.put(`users/activate/${this.activateEmail}`)
        .then(() => {
          this.loadUsers();
          Vue.$toast.open({
            message: `User has been activate successfully`,
            type: "success",
          });
        })
        .catch((error) => {
            if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
      this.$modal.hide("openActivateRecord");
    },
    loadUsers() {
      this.loading = true;
      this.loaded = false;
      AxiosHelper.get("users")
        .then((response) => {
          this.users = response.data.result;
          this.temporaryUsers = response.data.result;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => {
            if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          this.users = [];
          if (error.response.status === 404 || error.response.status === 400) {
            this.error = "No content yet!";
          } else if (error.response.status === 403) {
            this.error = "No resources found at this moment";
            this.notAllowed = true;
          } else {
            this.error = "Something went wrong, try again later";
          }
          this.loading = false;
          this.loaded = false;
        });
    },
    closeModal() {
      this.changingRole = false;
      this.users = this.temporaryUsers;
      this.$modal.hide("openChangeRole");
      this.$modal.hide("openRegister");
      this.$modal.hide("openDeleteRecord");
      this.$modal.hide("openActivateRecord");
    },
    changeRole(user) {
      this.changingRole = true;
      this.currentUser = user;
      this.$modal.show("openChangeRole");
    },
    changeRoleAnyway() {
      AxiosHelper.put(`users/change-role/${this.currentUser.id}`, {
        role: this.selectedRole,
      })
        .then(() => {
          this.loadUsers();
          Vue.$toast.open({
            message: `Role of ${this.user.firstName} has been updated successfully`,
            type: "success",
          });
        })
        .catch((error) => {
            if(isTokenExpired(error)) {
           window.location.href = '/login';
         }
          Vue.$toast.open({
            message: "Sorry, something went wrong. try again later!",
            type: "error",
          });
        });
      this.closeModal();
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
table .form-control {
  background: #f0f2f8;
  border: none !important;
}
.my-account {
  background: #f7f9fc !important;
}
.role-button {
  background: #eff2f7;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.role-button img {
  width: 20px;
  padding: 0 4px;
}
.list-check-role {
  padding: 7px 18px;
}
.form-check label {
  cursor: pointer;
}
</style>
