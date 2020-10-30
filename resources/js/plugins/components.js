import Vue from 'vue';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SignIn from '../components/modals/SignIn';
import Frontend from '../components/FrontendLayout';
// import Admin from '../components/AdminLayout';

Vue.component('app-component', require('../App.vue').default);
Vue.component('app-header', AppHeader);
Vue.component('app-footer', AppFooter);
Vue.component('sign-in', SignIn);