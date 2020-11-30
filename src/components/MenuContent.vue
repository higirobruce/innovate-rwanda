<template>
  <ul class="page-nav list-inline">
    <li
      class="list-inline-item mr-5 list-active"
      v-if="profile && profile.role === 'admin-blog' || profile.role === 'super-admin'"
    >
      <router-link exact :to="'/dashboard/directory'">Posts</router-link>
    </li>
    <li
      class="list-inline-item mr-5"
      v-if="profile && profile.role === 'admin-event' || profile.role === 'super-admin'"
    >
      <router-link exact :to="'/dashboard/directory/pending'"
        >Events</router-link
      >
    </li>
    <li
      class="list-inline-item mr-5"
      v-if="profile && profile.role === 'admin-job' || profile.role === 'super-admin'"
    >
      <router-link exact :to="'/dashboard/directory/area-of-interests'"
        >Jobs</router-link
      >
    </li>
  </ul>
</template>
<script>
export default {
  name: "menu-content",
  data() {
    return {
      user: {},
      auth: false,
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("profile")) || {};
    this.auth = localStorage.getItem("isAuth") || false;
  },
};
</script>