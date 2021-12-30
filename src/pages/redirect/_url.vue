<template>
  <div class="wrap-redirect">
    <span> Redirecting... </span>
  </div>
</template>
<script>
export default {
  name: "redirect-url",
  data() {
    return {
      url: "",
    };
  },
  created() {
    this.url = this.$route.params.url;
    location.href = `http://${this.url}`;
  },
};
</script>
<style scoped>
.wrap-redirect {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>