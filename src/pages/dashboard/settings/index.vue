<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Settings</h2>
        <MenuSettings active="blog" />
      </div>
    </component>
  </div>
</template>

<script>
import MenuSettings from "@/components/MenuSettings";
export default {
  name: "dashboard",
  components: { MenuSettings },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
</style>