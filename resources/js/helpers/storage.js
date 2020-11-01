class Storage {

    storeToken(token) {
        localStorage.setItem('token', token);
    }
    
    storeAdmin(admin) {
        localStorage.setItem('admin', admin);
    }

    storeUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    
    storeName(name) {
        localStorage.setItem('name', name);
    }

    store(token, admin) {
        this.storeToken(token);
        this.storeAdmin(admin);
    }
    
    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUser() {
        return localStorage.getItem('user');
    }

    getName() {
        return localStorage.getItem('name');
    }

}

export default Storage = new Storage();
