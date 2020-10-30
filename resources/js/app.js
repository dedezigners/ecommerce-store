import Vue from 'vue';
import App from './components/frontend/App';
import routes from './router/index';
import store from './store/index';

// require('./bootstrap');
// window.Vue = require('vue');

new Vue({
    el: '#app',
    routes,
    store,
    template: '<app/>',
    components: {
        App
    }
});
