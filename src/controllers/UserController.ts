import UserAPI from "../api/user-api";
import store from "../modules/Store";
import LoginController from "./LoginController";

const userApi = new UserAPI();

class UserController {
    async getUserInfo() {
        try {
            const userID = await new LoginController().auth();
            const user = await userApi.request(userID);
            store.set('profile', user);
        } catch (errors) {
            console.error(errors)
        }
    }
}

export default UserController;