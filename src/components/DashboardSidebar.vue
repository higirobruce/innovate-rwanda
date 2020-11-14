<template>
  <div>
    <div class="dash-logo">
      <router-link :to="'/dashboard'">
        <img src="@/assets/images/logo-dash.svg" />
      </router-link>
    </div>
    <ul class="dash-nav">
      <li>
        <router-link exact :to="'/dashboard'">
          <img src="@/assets/images/icon-dash.svg" />
          <div>Dashboard</div>
        </router-link>
      </li>
      <li>
        <router-link :to="'/dashboard/companies'">
          <img src="@/assets/images/icon-companies.svg" />
          <div>Companies</div>
        </router-link>
      </li>
      <li>
        <router-link :to="'/dashboard/my-company'">
          <img src="@/assets/images/icon-company.svg" />
          <div>My Company</div>
        </router-link>
      </li>
      <li>
        <router-link :to="'/dashboard/users'">
          <img src="@/assets/images/icon-users.svg" />
          <div>Users</div>
        </router-link>
      </li>
      <li>
        <router-link :to="'/dashboard/content'">
          <img src="@/assets/images/icon-content.svg" />
          <div>Content</div>
        </router-link>
      </li>
      <li>
        <router-link :to="'/dashboard/settings'">
          <img src="@/assets/images/icon-settings.svg" />
          <div>Settings</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

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
  display: block;
}
.dash-nav li {
  margin: 0;
  display: block;
  text-align: center;
}
.dash-nav li img {
  display: block;
  margin: 5px auto;
  width: 30px;
}
.dash-nav li a {
  padding: 10px 0;
  font-size: 14px;
  color: #c0c6d8;
  display: block;
}
.dash-nav li:hover a {
  background: #0D1A47;
}
.dash-nav li a.router-link-exact-active {
  background: #0D1A47;
  position: relative;
}
.dash-nav li a.router-link-exact-active::before {
  background: #00AEEF;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 4px;
  content: "";
}
</style>