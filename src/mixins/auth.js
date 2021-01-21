import Vue from "vue";

const { VUE_APP_FILE_URL } = process.env;

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
    FILE_URL() {
      return VUE_APP_FILE_URL;
    },
  },
});
