import Vue from 'vue'
import App from './App.vue'
import store from './config/store';
import router from './config/router';
import './config/bootstrap';
import './config/msg';
import './config/axios';
import './config/mq';

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
        ,faTrash
        ,faSearch } from '@fortawesome/free-solid-svg-icons'

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
            faTrash,
            faSearch)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
