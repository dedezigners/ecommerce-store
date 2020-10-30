import Home from '../components/frontend/HomePage';
import Admin from '../components/admin/Admin';

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
        name: 'Admin',
        component: Admin,
        beforeEnter: requireAuth,
        children: [
            { path: 'dashboard', name: 'dashboard', component: Admin },
        ]
    },
];