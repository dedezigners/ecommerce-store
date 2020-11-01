import Storage from './storage'

class User {

    responseAfterLogin(res) {
        const accessToken = res.data.access_token;
        const admin = res.data.admin;

        if (accessToken) {
            Storage.store(accessToken, admin);

            if (admin) {
                window.location = '/admin'
            }
        }

        return true;
    }

    hasToken() {
        const storedToken = Storage.getToken()
        return storedToken ? true: false;
    }

    loggedIn() {
        return this.hasToken();
    }

    logout(redirect = false) {
        Storage.clear();

        if (redirect) {
            window.location = '/';
        }
    }

    token() {
        return Storage.getToken();
    }

}

export default User = new User();
