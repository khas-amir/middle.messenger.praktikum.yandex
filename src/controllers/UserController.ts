import { API_URL } from "../api/base-api";
import UserAPI from "../api/user-api";
import store from "../modules/Store";
import LoginController from "./LoginController";
import avatarHref from '../../static/img/avatar.svg';
import Router from "../modules/Router";

const userApi = new UserAPI();

class UserController {
    async getUserInfo() {
        try {
            const userID = await new LoginController().auth();
            const {status, response} = await userApi.request(userID);
            if (status === 200) {
                const user = JSON.parse(response) as Profile;
                if (user.avatar) {
                    user.avatar = `${API_URL}/resources/${user.avatar}`;
                } else {
                    user.avatar = avatarHref;
                }
                return user;
            } else {
                throw new Error();
            }
        } catch {
            new Router().go('/');
        }
    }

    async updateUser(user: Profile) {
        try {
            const {status, response} = await userApi.update(user);
            if (status === 200) {
                store.set('profile', JSON.parse(response))
            } else {
                throw new Error(`Status: ${status}. Reason: ${JSON.parse(response)}`);
            }
        } catch (error) {
            console.error(error);
            
        }
    }
}

export default UserController;