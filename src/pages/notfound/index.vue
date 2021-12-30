<template>
  <div>
    <component :is="layout">
      <div class="wrap-not-found">
        <div class="image">
          <img src="@/assets/images/404.png" alt="404">
        </div>
        <h2>Page not found!</h2>
        <div>
          Sorry, we couldn't find the page yuo are looking for
        </div>
        <div class="my-4">
          <router-link class="btn btn-gray-outline" :to="'/'">Go home</router-link>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: "not-found",
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>

<style scoped>
.wrap-not-found {
  text-align: center;
  width: 100%;
  max-width: 770px;
  padding: 50px 0;
  display: block;
  margin: 0 auto;
  position: relative;
}
.wrap-not-found .image {
  width: 220px;
  margin: 0 auto;
  display: block;
}
/* .wrap-not-found::before {
  position: absolute;
  content: "Content not found at this moment!";
  bottom: -50px;
  left: 0;
  width: 100%;
  text-align: center;
} */
</style>