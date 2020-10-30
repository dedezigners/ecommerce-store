import Vue from 'vue';
import Admin from './components/admin/Admin';
require('./bootstrap');
window.Vue = require('vue');

const app = new Vue({
    el: '#app',
    template: '<admin/>',
    components: {
        Admin
    }
});
