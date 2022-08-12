import LoginApi from "../api/login-api";
import {router} from "../index";

const loginApi = new LoginApi();

class LoginController {
   async login(login: string, password: string) {
        try {
            await loginApi.create(login, password);
            await this.auth()
            router.go('/settings');
        } catch (err) {
            console.log(err);
            router.go('/');
        }
    }

    async auth() {
        try {
            const userID = await loginApi.request();
            return userID;
        } catch (errors) {
            console.error(errors)
        }
    }

    logout() {
        return loginApi.delete()
            .then(() => router.go('/'))
    }
}

export default LoginController