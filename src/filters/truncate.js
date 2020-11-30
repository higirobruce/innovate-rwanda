import Vue from "vue";

Vue.filter("truncate", function(value, char) {
  if (!value) return "";
  const ending = char && value.length > char ? "..." : "";
  if (value.length) {
    return value.substring(0, char || 20) + ending;
  } else {
    return value;
  }
});
