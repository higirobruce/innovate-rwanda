<template>
  <div class="bg-white wrap-header">
    <div class="py-2 middle-header">
      <div class="container">
        <div class="wrap-middle-header">
          <button class="sidebar-btn" @click="toggleMenu">
            <img src="@/assets/images/menu.png" />
          </button>
          <div class="wrap-logo">
            <div class="main-logo">
              <router-link :to="'/'">
                <img src="@/assets/images/logo.svg" alt="Innovate Rwanda" />
              </router-link>
            </div>
          </div>
          <div class="wrap-main-nav">
            <ul class="list-inline py-3 my-2">
              <li class="list-inline-item">
                <router-link :to="'/about'">About</router-link>
              </li>
              <li class="list-inline-item">
                <router-link active :to="'/why-rwanda'">Why Rwanda</router-link>
              </li>
              <li class="list-inline-item">
                <router-link active :to="'/directory'">Directory</router-link>
              </li>
              <li class="list-inline-item">
                <router-link active :to="'/events'">Events</router-link>
              </li>
              <li class="list-inline-item">
                <router-link active :to="'/blog'">Blog</router-link>
              </li>
              <li class="list-inline-item">
                <router-link active :to="'/resources'">Resources</router-link>
              </li>
              <li class="list-inline-item">
                <router-link active :to="'/jobs'">Jobs</router-link>
              </li>
              <li class="list-inline-item">
                <router-link active :to="'/find-talents'"
                  >Find Talents</router-link
                >
              </li>
            </ul>
          </div>
          <div class="wrap-hotlinks">
            <div
              class="py-2 float-right"
              v-if="profile && Object.keys(profile).length > 0"
            >
              <div class="wrap-avatar-user">
                <div class="avatar user-avatar" @click="toggleUserDropdown">
                  <img src="@/assets/images/user-avatar.png" alt="user" />
                  <div class="user-info">
                    Hello, {{ profile.lastName | truncate(10) }}
                    <p>Account<img src="@/assets/images/arrow-down.png" /></p>
                  </div>
                </div>
                <div
                  class="wrap-userdropdown"
                  v-if="isUserDropdown"
                  v-on-clickaway="hideIsUserDropdown"
                >
                  <ul>
                    <li>
                      <router-link :to="'/dashboard'">Dashboard</router-link>
                    </li>
                    <li>
                      <router-link :to="'/dashboard/settings'"
                        >My Profile</router-link
                      >
                    </li>
                    <li>
                      <button @click="logout">Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="py-2 float-right" v-else>
              <router-link
                :to="'/login'"
                class="btn font-weight-bold btn-primary-outline mr-2"
              >
                Login
              </router-link>
              <router-link
                :to="'/join'"
                class="btn font-weight-bold btn-primary"
              >
                Join The Community
              </router-link>
            </div>
          </div>
          <button
            v-if="_.isEmpty(profile)"
            class="auth-btn"
            @click="toggleAuthModal"
          >
            <img class="avatar profile" src="@/assets/images/user-avatar.svg" />
          </button>
          <router-link class="auth-btn" v-else :to="'/dashboard'">
            <img class="avatar profile" src="@/assets/images/user-avatar.svg" />
          </router-link>
        </div>
      </div>
    </div>
    <!-- Sidebar -->
    <div class="wrap-sidebar" v-if="isSidebarOpen">
      <button class="close" @click="isSidebarOpen = false">
        <i class="icon-times" />
      </button>
      <div class="sidebar-nav mt-5">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <router-link :to="'/about'">About</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="'/why-rwanda'">Why Rwanda</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="'/directory'">Community Directory</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="'/events'">Events</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="'/blog'">Blog</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="'/resources'">Resources</router-link>
          </li>
          <li class="list-group-item">
            <router-link :to="'/jobs'">Jobs</router-link>
          </li>
          <!-- <li class="list-group-item">
            <router-link :to="'/find-talents'">Find Talents</router-link>
          </li> -->
          <li
            class="list-group-item"
            v-if="profile && Object.keys(profile).length > 0"
          >
            <router-link
              :to="'/dashboard'"
              class="btn btn-block font-weight-bold btn-primary"
              style="color: white"
            >
              Go to dashboard
            </router-link>
          </li>
          <li class="list-group-item" v-else>
            <div>
              <router-link
                :to="'/login'"
                class="btn btn-block font-weight-bold btn-primary-outline mr-2"
                style="color: #06adef"
              >
                Login
              </router-link>
              <router-link
                :to="'/join'"
                class="btn btn-block font-weight-bold btn-primary"
                style="color: white"
              >
                Join The Community
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- AuthButtonModal -->
    <modal
      name="openJoin"
      :adaptive="true"
      :scrollable="true"
      :height="250"
      :width="420"
    >
      <button type="button" @click.prevent="closeModal" class="close">
        <img src="@/assets/images/close.png" />
      </button>
      <div class="auth-wrap-btns py-5 my-3">
        <router-link
          :to="'/login'"
          class="btn btn-block font-weight-bold btn-primary-outline mr-2"
        >
          Login
        </router-link>
        <router-link
          :to="'/join'"
          class="btn btn-block font-weight-bold btn-primary mt-4"
        >
          Join The Community
        </router-link>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import VModal from "vue-js-modal";
import { mixin as clickaway } from "vue-clickaway";
Vue.use(VModal);
export default {
  name: "HeaderComponent",
  mixins: [clickaway],
  data() {
    return {
      isSidebarOpen: false,
      isAuthModelOpen: false,
      isUserDropdown: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleAuthModal() {
      this.$modal.show("openJoin");
    },
    closeModal() {
      this.$modal.hide("openJoin");
    },
    toggleUserDropdown() {
      this.isUserDropdown = !this.isUserDropdown;
    },
    hideIsUserDropdown() {
      this.isUserDropdown = false;
    },
    logout() {
      localStorage.removeItem("profile");
      localStorage.removeItem("company");
      localStorage.removeItem("isAuth", true);
      localStorage.removeItem("token");
      this.$router.go();
    },
  },
};
</script>


<style scoped>
.wrap-header {
  position: relative;
  z-index: 120000;
}

.wrap-middle-header {
  display: flex;
  height: auto;
}
@media (min-width: 1241px) {
  .wrap-logo {
    width: 320px;
  }
  .main-logo {
    max-width: 180px;
    margin: 10px 0;
    position: relative;
  }
  .wrap-hotlinks {
    width: 400px;
    padding: 5px 0;
  }
  .wrap-main-nav {
    width: -webkit-calc(100% - 400px);
    width: -moz-calc(100% - 400px);
    width: calc(100% - 440px);
  }
  .wrap-main-nav ul {
    justify-content: center;
    display: flex;
  }
  .sidebar-btn,
  .auth-btn {
    display: none;
  }
  .list-inline-item {
    margin: 0 !important;
  }
  .wrap-main-nav a {
    padding: 0 10px !important;
    font-weight: 100;
  }
  .wrap-hotlinks .btn {
    padding: 8px 20px !important;
    margin: 8px 5px !important;
    box-shadow: 0px 4px 26px #1b295840;
  }
  .sidebar-btn,
  .auth-btn {
    display: none;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1240px) {
  .wrap-logo {
    width: 150px;
  }
  .main-logo {
    max-width: 150px;
    margin: 10px 0;
    position: relative;
  }
  .wrap-hotlinks {
    width: 260px;
    padding: 5px 0;
  }
  .wrap-main-nav {
    width: -webkit-calc(100% - 380px);
    width: -moz-calc(100% - 380px);
    width: calc(100% - 380px);
  }
  .sidebar-btn,
  .auth-btn {
    display: none;
  }
  .list-inline-item {
    margin: 0 !important;
  }
  .wrap-main-nav a {
    font-size: 13px;
    padding: 0 0px;
    font-weight: 100;
  }
  .wrap-hotlinks .btn {
    padding: 8px 12px !important;
    margin: 8px 2px !important;
  }
}
@media (max-width: 1024px) {
  .main-logo {
    max-width: 140px;
  }
  .wrap-middle-header {
    display: inline-flex;
    flex-flow: row wrap;
    height: auto;
    width: 100%;
  }
  .wrap-logo {
    flex: 0 0 calc(100% - 100px);
  }
  .main-logo {
    margin: 4px auto;
    position: relative;
  }
  .wrap-main-nav,
  .wrap-hotlinks {
    display: none;
  }
  .sidebar-btn,
  .auth-btn {
    border: none;
    padding: 0 5px;
    background: transparent;
    width: 50px;
  }
}
.sidebar-btn img,
.auth-btn img.menu {
  width: 26px;
}
.auth-btn img.profile {
  width: 42px;
  margin-top: 10px;
}

.main-logo img {
  margin: 0;
  width: 100%;
}
.middle-header {
  border-bottom: 1px solid #c0c6d8;
}
.wrap-main-nav a {
  color: #5e7c8d;
  font-size: 15px;
  padding: 0 8px;
  font-weight: 100;
}
.wrap-main-nav a.router-link-active {
  position: relative;
}
.wrap-main-nav a.router-link-active::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 6px;
  background: #1b2958;
  bottom: -46px;
  left: 0;
  border-radius: 4px 4px 0 0;
}
/* .wrap-userdropdown {
  background: #ffffff;
  top: 40px;
  right: 0;
  width: auto;
  height: auto;
  position: absolute;
  z-index: 100000;
} */
.wrap-sidebar {
  background: #ffffff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100000;
}
.wrap-auth-modal {
  background: rgba(42, 104, 139, 0.8);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100000;
}
.auth-modal {
  position: relative;
  background: #ffffff;
  top: 25%;
  padding: 40px 20px 20px 20px;
  margin: 0 auto;
  display: block;
  max-width: 90%;
  border-radius: 3px;
}
.auth-modal .close,
.wrap-userdropdown .close {
  position: absolute;
  right: 5px;
  top: 10px;
  width: 30px;
  height: 30px;
}
.wrap-sidebar .close {
  position: absolute;
  right: 5px;
  top: 10px;
  width: 30px;
  height: 30px;
}
.auth-wrap-btns {
  margin: 0 auto;
  display: block;
  max-width: 200px;
}
.sidebar-nav {
  width: 100%;
}
.sidebar-nav li {
  padding: 36px 0;
  text-align: center;
  border: none;
}
.sidebar-nav li a {
  color: #5e7c8d;
}

/* Avatar */
.avatar {
  cursor: pointer;
  width: 44px;
  height: 44px;
  overflow: hidden;
  border-radius: 0 !important;
  margin: 0 0.5em 0 0 !important;
  background: none !important;
  font-size: 15px;
}
.avatar p {
  font-size: 11px;
}
.avatar img {
  width: 44px;
  height: auto;
}
.avatar .user-info {
  padding: 0 10px;
  height: 40px;
}
.avatar .user-info img {
  width: 10px;
  margin: 4px 2px;
  float: right;
}
.avatar.user-avatar {
  width: auto;
  height: 44px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-right: 10px;
  height: 50px;
}
.avatar.user-avatar i {
  padding-left: 5px;
  float: right;
}
.wrap-avatar-user {
  position: relative;
}
.wrap-userdropdown {
  width: auto;
  min-width: 180px;
  height: auto;
  position: absolute;
  top: 50px;
  right: 20px;
  box-shadow: 0px 16px 24px #00000029;
  border-radius: 8px;
  background: #ffffff;
}
.wrap-userdropdown ul,
.wrap-sidebar ul {
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.wrap-userdropdown ul li,
.wrap-sidebar ul li {
  padding: 10px 20px;
}
.wrap-userdropdown button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  display: block;
  width: 100%;
  text-align: left;
}
.wrap-userdropdown ul li,
.wrap-userdropdown ul li a {
  font-size: 14px;
}
</style>

