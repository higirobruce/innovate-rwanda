<template>
  <div>
    <div class="wrap-dash" v-if="isLoggedIn">
      <div class="wrap-sidebar">
        <DashboardSidebar />
      </div>
      <div class="wrap-dash-content">
        <DashboardHeader />
        <slot />
      </div>
    </div>
    <div class="wrap-dash" v-else>Not logged in</div>
  </div>
</template>

<script>
import DashboardSidebar from "./../components/DashboardSidebar";
import DashboardHeader from "./../components/DashboardHeader";
export default {
  components: {
    DashboardSidebar,
    DashboardHeader,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    const auth = localStorage.getItem("isAuth") || false;
    if (auth) {
      this.isLoggedIn = localStorage.getItem("isAuth");
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.wrap-dash {
  display: flex;
  flex-wrap: wrap;
  background: #ffffff;
  min-height: 100vh;
}
.wrap-sidebar {
  width: 120px;
  height: 100vh;
  background: #1b2958;
  position: fixed;
}
.wrap-dash-content {
  width: calc(100% - 120px);
  margin-left: 120px;
}
@media screen and (max-width: 850px) {
  .wrap-sidebar {
    width: 60px;
  }
  .wrap-dash-content {
    width: calc(100% - 60px);
    margin-left: 60px;
  }
}
</style>