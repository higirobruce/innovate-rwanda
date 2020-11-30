import Vue from "vue";

Vue.mixin({
  computed: {
    profile() {
      return localStorage.getItem("isAuth")
        ? JSON.parse(localStorage.getItem("profile"))
        : {};
    },
  },
});
