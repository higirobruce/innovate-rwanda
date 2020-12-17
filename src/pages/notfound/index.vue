<template>
  <div>
    <component :is="layout">
      <div class="not-found"></div>
    </component>
  </div>
</template>

<script>
export default {
  name: "notfound",
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
</style>