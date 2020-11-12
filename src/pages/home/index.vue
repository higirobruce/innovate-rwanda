<template>
  <div>
    <component :is="layout">
      <div>Welcome to Innovate Rwanda</div>
    </component>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
</style>