import Home from '../components/frontend/HomePage';
import Admin from '../components/admin/Admin';
import TheContainer from '../components/admin/TheContainer';
import Dashboard from '../components/admin/Dashboard';

function requireAuth(to, from, next) {
    return next();
    let auth = User.loggedIn();
    
    return (!auth && next({ name: "login" })) || next();
}

export const routes = [
    { path: '/', name: 'index', component: Home },
    { path: '/login', name: 'login', component: Home },
    {
        path: '/admin',
        redirect: '/admin/dashboard',
        name: 'admin',
        component: TheContainer,
        // beforeEnter: requireAuth,
        children: [
            { path: 'dashboard', name: 'dashboard', component: Dashboard },
        ]
    },
];