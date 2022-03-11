import Vue from "vue";
import Mq from "vue-mq";

Vue.use(Mq, {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 960,
    lg: 1140,
    xl: Infinity
  }
})