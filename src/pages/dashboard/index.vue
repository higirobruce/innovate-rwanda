<template>
  <div>
    Dashboard
  </div>
</template>

<script>
export default {
  name: "dashboard",
  components: {
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    }
  }
};
</script>

<style scoped>

</style>