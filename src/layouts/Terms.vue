<template>
  <div>
    <Header />
    <div class="wrap-page-term">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/Header";
import Footer from "./../components/Footer";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.wrap-page-term {
  max-width: 860px;
  padding: 30px 0;
  display: block;
  margin: 0 auto;
}
</style>