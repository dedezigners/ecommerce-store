import Storage from './storage'

class User {

    login(data) {
        return axios.post(`login`, data);
    }

    responseAfterLogin(res) {
        const access_token = res.data.access_token
        const user = res.data.user
        console.log(user)

        if (access_token && user && user.name) {
            Storage.store(access_token, user, user.name)
        }

        window.location = '/admin'
    }

    hasToken() {
        const storedToken = Storage.getToken()
        return storedToken ? true: false;
    }

    loggedIn() {
        return true;
        return this.hasToken()
    }

    logout(error = false) {
        Storage.clear();

        if (!error) {
            window.location = '/';
        }
    }

    name() {
        if (this.loggedIn()) {
            return Storage.getUser()
        }
    }

    token() {
        return Storage.getToken();
    }

}

export default User = new User();
