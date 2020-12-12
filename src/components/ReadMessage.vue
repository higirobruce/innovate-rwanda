<template>
  <div>
    <div class="message-head">
      <div class="image">
        <img
          class="avatar"
          src="@/assets/images/user-avatar.svg"
          :alt="message.email"
        />
      </div>
      <div class="head-info">
        <h4 class="h2 font-weight-bold">{{ message.email }}</h4>
        <div>
          {{ message.createdAt | date("DD MMM YYYY") }}
        </div>
      </div>
    </div>
    <div class="message-body">
      {{ message.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "read-message",
  props: ["message"],
};
</script>

<style scoped>
.message-head {
  padding: 30px 50px;
  display: flex;
  background: #ffffff;
}
.message-head .image {
  width: 80px;
}
.message-head .head-info {
  width: calc(100% - 80px);
  padding: 8px 30px;
}
.message-body {
  padding: 30px 60px;
  font-size: 22px;
}
.avatar {
  background: #00aeef;
}
</style>