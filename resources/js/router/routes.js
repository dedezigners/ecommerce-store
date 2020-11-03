import User from '../helpers/user';
import Home from '../components/frontend/HomePage';
import Account from '../components/auth/Account';
// Admin Dashboard
import TheContainer from '../components/admin/TheContainer';
import Dashboard from '../components/admin/Dashboard';
import Categories from '../components/admin/pages/Categories';

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
            { path: 'categories', name: 'Categories', component: Categories },
        ]
    },
];