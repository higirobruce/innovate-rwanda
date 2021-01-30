<template>
  <div>
    <component :is="layout">
      <PageHeader
        image="auth-bg.jpg"
        rgba="rgba(4, 137, 187, 0.83)"
        title="Unsubscribe"
        subtitle=""
      />
      <div class="m-2 radius-2">
        <div class="m-3 py-4">
          <div class="row" v-if="loaded">
            <div class="col-sm-12 col-md-12 col-lg-12 h-100">
              <div class="text-center"></div>
              <div class="mx-auto text-center" style="max-width: 450px">
                <h2 class="font-weight-light">Unsubscribe</h2>
                <div v-if="!verified && loaded">
                  <!-- <Loading /> -->
                </div>
                <!-- <div v-if="verified">
                  <div class="alert alert-success">
                    Welcome to Innovate Rwanda. Your account has been verified.
                    Please, click
                    <router-link :to="'/login'">here</router-link> to login
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </component>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
// import AxiosHelper from "@/helpers/AxiosHelper";
export default {
  components: {
    Loading,
    PageHeader,
  },
  name: "Verify",
  data() {
    return {
      token: "",
      loaded: false,
      verified: false,
      response: {},
    };
  },
  created() {
    this.loaded = true;
    this.token = this.$route.params.token;
  },
  mounted() {
    // AxiosHelper.get(`activate-account/${this.token}`)
    //   .then((response) => {
    //     this.response = response.data.message;
    //     this.verified = true;
    //   })
    //   .catch(() => {
    //     this.verified = false;
    //   });
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>
<style scoped>
.vertical-center {
  min-height: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
}
</style>
