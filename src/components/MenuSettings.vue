<template>
  <ul class="page-nav list-inline">
    <li
      :class="{
        'list-inline-item mr-4 list-active': active == 'profile',
        'list-inline-item mr-4': active != 'profile',
      }"
    >
      <router-link exact :to="'/dashboard/settings'">User information</router-link>
    </li>
    <li
      :class="{
        'list-inline-item mr-4 list-active': active == 'reset',
        'list-inline-item mr-4': active != 'reset',
      }"
    >
      <router-link exact :to="'/dashboard/settings/reset-password'"
        >Reset password</router-link
      >
    </li>
    <li
      :class="{
        'list-inline-item mr-4 list-active': active == 'activities',
        'list-inline-item mr-4': active != 'activities',
      }"
      v-if="
        profile &&
        (profile.role === 'admin-company' || profile.role === 'super-admin')
      "
    >
      <router-link exact :to="'/dashboard/settings/business-activities'"
        >Business activities</router-link
      >
    </li>
    <li
      :class="{
        'list-inline-item mr-4 list-active': active == 'type',
        'list-inline-item mr-4': active != 'type',
      }"
      v-if="
        profile &&
        (profile.role === 'admin-company' || profile.role === 'super-admin')
      "
    >
      <router-link exact :to="'/dashboard/settings/company-types'"
        >Company types</router-link
      >
    </li>
    <li
      :class="{
        'list-inline-item mr-4 list-active': active == 'categories',
        'list-inline-item mr-4': active != 'categories',
      }"
      v-if="
        profile &&
        (profile.role === 'admin-company' || profile.role === 'super-admin')
      "
    >
      <router-link exact :to="'/dashboard/settings/categories'"
        >Categories</router-link
      >
    </li>
    <li
      :class="{
        'list-inline-item mr-4 list-active': active == 'event-types',
        'list-inline-item mr-4': active != 'event-types',
      }"
      v-if="
        profile &&
        (profile.role === 'admin-company' || profile.role === 'super-admin')
      "
    >
      <router-link exact :to="'/dashboard/settings/event-types'"
        >Event types</router-link
      >
    </li>
    <li
      :class="{
        'list-inline-item mr-4 list-active': active == 'resources-types',
        'list-inline-item mr-4': active != 'resources-types',
      }"
      v-if="
        profile &&
        (profile.role === 'admin-company' || profile.role === 'super-admin')
      "
    >
      <router-link exact :to="'/dashboard/settings/resource-types'"
        >Resources types</router-link
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
      // user: {},
      auth: false,
    };
  },
  mounted() {
    // this.user = JSON.parse(localStorage.getItem("profile")) || {};
    this.auth = localStorage.getItem("isAuth") || false;
  },
};
</script>