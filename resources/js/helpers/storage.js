class Storage {

    storeToken(token) {
        localStorage.setItem('token', token);
    }

    storeUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    
    storeName(name) {
        localStorage.setItem('name', name);
    }

    store(token, user, name) {
        this.storeToken(token);
        this.storeUser(user);
        this.storeName(name);
    }
    
    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('user');
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
