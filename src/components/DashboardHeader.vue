<template>
  <div class="wrap-dash-header">
    <ul class="list-inline my-2 mr-4 py-1 float-right">
      <li class="list-inline-item px-1">
        <router-link class="dash-header-btn" :to="'/dashboard/messages'">
          <img src="@/assets/images/message.png" />
        </router-link>
      </li>
      <li class="list-inline-item px-1">
        <router-link class="dash-header-btn" :to="'/dashboard/notifications'">
          <img src="@/assets/images/notification.png" />
        </router-link>
      </li>
      <li class="list-inline-item px-1 position-relative">
        <button class="dash-header-user" @click="toggleUserDropDown">
          <div class="image avatar">
            <img src="@/assets/images/user-avatar.png" />
          </div>
        </button>
        <div
          class="card profile-card"
          v-if="isUserDropdownOn"
          v-on-clickaway="hideUserDropDown"
        >
          <div class="card-body">
            <h5 class="card-title">
              {{ profile.lastName }} {{ profile.firstName }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ profile.email }}</h6>
            <p class="card-text">
              {{ profile.jobTitle || "" }}
            </p>
            <button @click="logout" class="btn border btn-sm bg-white">
              Logout
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  name: "dashboard-header",
  data() {
    return {
      isUserDropdownOn: false,
    };
  },
  methods: {
    hideUserDropDown() {
      this.isUserDropdownOn = false;
    },
    toggleUserDropDown() {
      this.isUserDropdownOn = !this.isUserDropdownOn;
    },
    logout() {
      localStorage.removeItem("profile");
      localStorage.removeItem("company");
      localStorage.removeItem("isAuth", true);
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.wrap-dash-header {
  width: 100%;
  background: #f0f2f8;
  height: 60px;
}
.dash-header-btn img {
  width: 26px;
}
.dash-header-user {
  border: none;
  background: none;
}
.dash-header-user img {
  width: 36px;
}
.profile-card {
  position: absolute;
  top: 40px;
  right: 0;
  width: 280px;
  z-index: 100000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>