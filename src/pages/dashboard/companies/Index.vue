<template>
  <div>
    <component :is="layout">
      <div class="page-info">
        <h2 class="h2 font-weight-bold">Companies</h2>
        
      </div>
      <div class="coming-soon"></div>
    </component>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  components: {},
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
</style>