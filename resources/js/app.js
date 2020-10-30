import Vue from 'vue';
import App from './components/frontend/App';
require('./bootstrap');
window.Vue = require('vue');

const app = new Vue({
    el: '#app',
    template: '<app/>',
    components: {
        App
    }
});
