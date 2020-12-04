<template>
  <div>
    <component :is="layout">
      <div class="wrap-choose-section">
        <h1>Choose a preferred section</h1>
        <div class="row">
          <div class="col-sm-12 col-lg-6 one-box">
            <h3>Ecosystem Enablers</h3>
            <div>
              Companies, organizations and service providers working together to
              foster growth in the Ecosystem
            </div>
            <router-link :to="'/directory/enablers'" class="btn">
              Discover <icon class="icon" icon="arrow-right"
            /></router-link>
          </div>
          <div class="col-sm-12 col-lg-6 one-box">
            <h3>Tech Companies</h3>
            <div>
              Our community listing of tech and innovation companies in the
              ecosystem.
            </div>
            <router-link :to="'/directory/companies'" class="btn">
              Discover <icon class="icon" icon="arrow-right"
            /></router-link>
          </div>
        </div>
      </div>
    </component>
  </div>
</template> 


<script>
export default {
  name: "enablers",
  data() {
    return {};
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>
<style scoped>
.wrap-choose-section {
  margin: 25px auto;
  max-width: 800px;
  padding: 50px 0;
}
.wrap-choose-section h1 {
  color: #00aeef;
  font-size: 48px;
  margin: 40px 0;
  padding: 45px 0;
}
.one-box h3 {
  color: #1b2958;
  font-size: 32px;
  font-weight: 600;
}
.one-box div {
  height: 80px;
  font-size: 16px;
  font-weight: 200;
}
.one-box .btn {
  border: 2px solid #c0c6d8;
  padding: 13px 56px 13px 36px;
  position: relative;
}
.one-box .btn .icon {
  top: 18px;
  right: 25px;
  position: absolute;
}
</style>