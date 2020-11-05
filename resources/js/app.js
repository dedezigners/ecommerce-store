import Vue from 'vue';
import App from './components/frontend/App';
import router from './router/index';
import store from './store/index';

// require('./bootstrap');
require('./plugins/basic-components');

import User from './helpers/user';
window.User = User;
require('./bootstrap');

new Vue({
    el: '#app',
    router,
    store,
    template: '<app/>',
    components: {
        App
    }
});