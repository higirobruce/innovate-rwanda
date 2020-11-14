<template>
  <div class="wrap-dash">
    <div class="wrap-sidebar">
      <DashboardSidebar />
    </div>
    <div class="wrap-dash-content">
      <DashboardHeader />
      <slot />
    </div>
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
};
</script>

<style scoped>
.wrap-dash {
  display: flex;
  flex-wrap: wrap;
}
.wrap-sidebar {
  width: 120px;
  height: 100vh;
  background: #1B2958;
}
.wrap-dash-content {
  width: calc(100% - 120px);
}
</style>