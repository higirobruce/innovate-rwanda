<template>
  <div class="wrap-home-dash">
    <component :is="layout">
      <div class="dash-welcome">
        <div class="welcome-content">
          <h1 class="h2 font-weight-bold text-blue-dark">Welcome</h1>
          <div>
            Innovate Rwanda was created to showcase Rwanda’s growing ecosystem
            of technology and technology-enabled corporations, SMEs and startups
            and enablers. Innovation and Technology are at the core of Rwanda’s
            strategy for economic and social transformation and this platform
            represents the shared interests of the community to connect,
            collaborate and innovate for growth.
          </div>
        </div>
        <div class="welcome-img">
          <img src="@/assets/images/welcome-image.png" />
        </div>
      </div>
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
.wrap-home-dash {
  height: 100vh;
  background: #f0f2f8;
}
.dash-welcome {
  margin: 0 25px;
  background: #ffffff;
  padding: 50px;
  box-shadow: 0px 17px 36px #1b295814;
  border-radius: 3px;
  display: flex;
  align-items: center;
}
.dash-welcome img {
  width: 300px;
  float: right;
}
.welcome-content div{
  max-width: 580px;
}
.welcome-content {
  flex: 0 0 calc(100% - 400px);
}
.welcome-img {
  width: 400px;
}
</style>