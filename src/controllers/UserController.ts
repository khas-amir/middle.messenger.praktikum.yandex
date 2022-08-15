import UserAPI from "../api/user-api";
import store from "../modules/Store";
import LoginController from "./LoginController";

const userApi = new UserAPI();

class UserController {
    async getUserInfo() {
        try {
            const userID = await new LoginController().auth();
            const {status, response} = await userApi.request(userID);
            if (status === 200) {
                store.set('profile', JSON.parse(response));
            }
        } catch {
            return;
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