import User from '../helpers/user';
import Home from '../components/frontend/HomePage';
import Account from '../components/auth/Account';
// Admin Dashboard
import TheContainer from '../components/admin/TheContainer';
import Dashboard from '../components/admin/Dashboard';
import Media from '../components/admin/pages/Media';
import Categories from '../components/admin/pages/Categories';
import Attributes from '../components/admin/pages/Attributes';
import Products from '../components/admin/pages/Products';
import CreateProduct from '../components/admin/pages/product/CreateProduct';

function requireAuth(to, from, next) {
    let auth = User.loggedIn();
    let path = to.path
    let pathInitial = path.substring(1, 6);
    
    if (!auth && pathInitial === 'admin') {
        window.location = '/account';
    } else {
        return (!auth && next({ name: "account" })) || next();
    }
}

export const routes = [
    { path: '/', name: 'index', component: Home },
    { path: '/account', name: 'account', component: Account },
    {
        path: '/admin',
        redirect: '/admin/dashboard',
        name: 'Admin',
        component: TheContainer,
        beforeEnter: requireAuth,
        children: [
            { path: 'dashboard', name: 'Dashboard', component: Dashboard },
            { path: 'media', name: 'Media', component: Media },
            { path: 'categories', name: 'Categories', component: Categories },
            { path: 'attributes', name: 'Attributes', component: Attributes },
            { path: 'products', name: 'Products', component: Products },
            { path: 'product/create', name: 'Create Product', component: CreateProduct },
        ]
    },
];