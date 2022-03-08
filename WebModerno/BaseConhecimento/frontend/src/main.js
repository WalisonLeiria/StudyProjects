import Vue from 'vue'
import App from './App.vue'
import store from './config/store';
import router from './config/router';
import './config/bootstrap';
import './config/msg';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faAngleLeft
        ,faAngleRight
        ,faHome
        ,faFolder
        ,faFile
        ,faUser
        ,faAngleDown
        ,faGears
        ,faRightFromBracket
        ,faCheck
        ,faXmark
        ,faPencil
        ,faTrash } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faAngleLeft,
            faAngleRight,
            faHome,
            faFile,
            faFolder,
            faUser,
            faAngleDown,
            faGears,
            faRightFromBracket,
            faCheck,
            faXmark,
            faPencil,
            faTrash)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IldhbGlzb24gTGVpcmlhIiwiZW1haWwiOiJ3bGVpcmlhQGhvdG1haWwuY29tIiwiYWRtaW4iOjEsImlhdCI6MTY0NjcxMTI1NSwiZXhwIjoxNjQ2Nzk3NjU1fQ.r75mbA00M6hrsRERtVS0uBJ9JRotRQaWznQVuDdkjR4";
require("axios").defaults.headers.common["Authorization"] = `bearer ${token}`;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
