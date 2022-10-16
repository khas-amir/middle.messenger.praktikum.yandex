import SignupApi from '../api/signup-api';
import { router } from '../index';
import LoginController from './LoginController';

const signupAPI = new SignupApi();
const loginController = new LoginController();
class SignupController {
    signup(newUser: Profile) {
        return signupAPI
            .request(newUser)
            .then(() => {
                const { login, password } = newUser;
                return loginController.login(login, password);
            })
            .catch(() => router.go('/500'));
    }
}

export default SignupController;
