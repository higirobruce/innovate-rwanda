<template>
  <div class="wrap-dash-header">
    <ul class="list-inline my-2 mr-4 py-1 float-right">
      <li class="list-inline-item px-1">
        <router-link class="dash-header-btn" :to="'/dashboard/messages'">
          <img src="@/assets/images/message.svg" />
        </router-link>
      </li>
      <li class="list-inline-item px-1">
        <router-link class="dash-header-btn" :to="'/dashboard/notifications'">
          <img src="@/assets/images/notification.svg" />
        </router-link>
      </li>
      <li class="list-inline-item px-1">
        <router-link class="dash-header-user" :to="'/dashboard/profile'">
          <img src="@/assets/images/user-avatar.png" />
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.wrap-dash-header {
  width: 100%;
  background: #f0f2f8;
  height: 60px;
}
.dash-header-btn img {
  width: 26px;
}
.dash-header-user img {
  width: 36px;
}
</style>