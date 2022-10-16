import LoginApi from '../api/login-api';
import { router } from '../index';

const loginApi = new LoginApi();

class LoginController {
    async login(login: string, password: string) {
        let response;
        try {
            const data = await loginApi.create(login, password);
            response = data.response;
            if (response !== 'OK') {
                throw new Error(response);
            }
            router.go('/settings');
        } catch {
            console.error(response);
            router.go('/');
        }
    }

    async auth() {
        try {
            const { status, response } = await loginApi.request();
            if (status === 200) {
                return JSON.parse(response).id;
            }
            throw new Error(JSON.parse(response).reason);
        } catch (errors) {
            console.error(errors);
            router.go('/');
        }
    }

    logout() {
        return loginApi.delete().then(() => router.go('/'));
    }
}

export default LoginController;
