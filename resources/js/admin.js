import 'core-js/stable'
import Vue from 'vue';
import Admin from './components/admin/Admin';
import router from './router/index';
import store from './store/index';
import CoreuiVue from '@coreui/vue';
import { iconsSet as icons } from './assets/icons/icons.js';

Vue.config.performance = true;
Vue.use(CoreuiVue);

import User from './helpers/user';
window.User = User;
require('./bootstrap');

new Vue({
    el: '#app',
    router,
    store,
    icons,
    template: '<admin/>',
    components: {
        Admin
    }
});
