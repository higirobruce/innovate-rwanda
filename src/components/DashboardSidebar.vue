<template>
  <div>
    <ul class="dash-nav" v-if="profile && Object.keys(profile).length > 0">
      <li>
        <div class="dash-logo">
          <router-link :to="'/'">
            <img src="@/assets/images/logo-dash.svg" />
          </router-link>
        </div>
      </li>
      <li class="nav-item">
        <router-link exact :to="'/dashboard'">
          <img src="@/assets/images/icon-dash.png" />
          <div>Dashboard</div>
        </router-link>
      </li>
      <li
        class="nav-item"
        v-if="profile.role === 'admin-company' || profile.role === 'super-admin'"
      >
        <router-link :to="'/dashboard/directory'">
          <img src="@/assets/images/icon-companies.png" />
          <div>Directory</div>
        </router-link>
      </li>
      <li class="nav-item" v-if="profile.role === 'normal'">
        <router-link :to="'/dashboard/my-company'">
          <img src="@/assets/images/icon-company.png" />
          <div>My Company</div>
        </router-link>
      </li>
      <li
        class="nav-item"
        v-if="profile.role === 'admin-user' || profile.role === 'super-admin'"
      >
        <router-link :to="'/dashboard/users'">
          <img src="@/assets/images/icon-users.png" />
          <div>Users</div>
        </router-link>
      </li>
      <li
        class="nav-item"
        v-if="
          profile.role === 'admin-blog' ||
          profile.role === 'admin-event' ||
          profile.role === 'admin-job' ||
          profile.role === 'normal' ||
          profile.role === 'super-admin'
        "
      >
        <router-link :to="'/dashboard/content'">
          <img src="@/assets/images/icon-content.png" />
          <div>Content</div>
        </router-link>
      </li>
      <li class="nav-item float-bottom">
        <router-link :to="'/dashboard/settings'">
          <img src="@/assets/images/icon-settings.png" />
          <div>Settings</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "sidebar"
};
</script>
<style scoped>
.dash-logo {
  width: 100%;
  border-bottom: 2px solid #3e4972;
}
.dash-logo img {
  width: 100%;
  max-width: 60px;
  margin: 20px auto;
  display: block;
}
.dash-nav {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: block;
  position: relative;
}
.dash-nav li {
  margin: 0;
  display: block;
  text-align: center;
}
.float-bottom {
  position: absolute;
  bottom: 20px;
}
.dash-nav li.nav-item img {
  display: block;
  margin: 5px auto;
  width: 30px;
}
.dash-nav li.nav-item a {
  padding: 10px 0;
  font-size: 14px;
  color: #c0c6d8;
  display: block;
}
.dash-nav li.nav-item:hover a {
  background: #0d1a47;
}
.dash-nav li a.router-link-exact-active {
  background: #0d1a47;
  position: relative;
}
.dash-nav li a.router-link-exact-active::before {
  background: #00aeef;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 4px;
  content: "";
}
.dash-nav li.float-bottom {
  width: 120px;
}
</style>