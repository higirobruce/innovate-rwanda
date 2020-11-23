<template>
  <div>
    <component :is="layout">
      <div class="page-info px-5">
        <h2 class="h2 font-weight-bold">Users</h2>
      </div>
      <div class="dash-container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Date joined</th>
              <th scope="col">Last activity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody v-if="users">
            <tr v-for="(user, index) in users" :key="index">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.createdAt }}</td>
              <td>{{ user.lastActivity }}</td>
              <td>
                <div class="wrap-actions">
                  <button>
                    <img src="@/assets/images/view.svg" alt="view" />
                  </button>
                  <button>
                    <img src="@/assets/images/edit.svg" alt="edit" />
                  </button>
                  <button>
                    <img src="@/assets/images/delete.svg" alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </component>
  </div>
</template>

<script>
import users from "./../../../dummy/users.js";
export default {
  name: "users",
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.users = users;
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
</style>