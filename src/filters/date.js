import Vue from "vue";
import moment from 'moment'

Vue.filter('date', function(value, format) {
  if (value) {
    return moment(String(value)).format(format)
  }
});