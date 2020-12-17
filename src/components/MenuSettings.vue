<template>
  <ul class="page-nav list-inline">
    <li
      :class="{
        'list-inline-item mr-5 list-active': active == 'blog',
        'list-inline-item mr-5': active != 'blog',
      }"
      v-if="profile && profile.role === 'super-admin'"
    >
      <router-link exact :to="'/dashboard/content'">Profile</router-link>
    </li>
    <li
      :class="{
        'list-inline-item mr-5 list-active': active == 'events',
        'list-inline-item mr-5': active != 'events',
      }"
      v-if="profile && profile.role === 'super-admin'"
    >
      <router-link exact :to="'/dashboard/content/events'"
        >Business Activities</router-link
      >
    </li>
    <li
      :class="{
        'list-inline-item mr-5 list-active': active == 'jobs',
        'list-inline-item mr-5': active != 'jobs',
      }"
      v-if="profile && profile.role === 'super-admin'"
    >
      <router-link exact :to="'/dashboard/content/jobs'"
        >Company type</router-link
      >
    </li>
    <li
      :class="{
        'list-inline-item mr-5 list-active': active == 'jobs',
        'list-inline-item mr-5': active != 'jobs',
      }"
    >
      <router-link exact :to="'/dashboard/content/jobs'"
        >Reset password</router-link
      >
    </li>
  </ul>
</template>
<script>
export default {
  name: "menu-content",
  props: ["active"],
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