import Vue from "vue";

Vue.mixin({
  computed: {
    profile() {
      return localStorage.getItem("isAuth")
        ? JSON.parse(localStorage.getItem("profile"))
        : {};
    },
    IMAGE_URL() {
      return "https://res.cloudinary.com/dbvxqoznr/image/upload/";
    },
  },
});
