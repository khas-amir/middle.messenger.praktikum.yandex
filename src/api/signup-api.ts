import {API_URL, BaseAPI} from "./base-api";
import HTTPTransport from "../modules/http/HTTPTransport";

const signupAPIInstance = new HTTPTransport(API_URL + '/auth');

class SignupApi extends BaseAPI {
    request(newUser: Profile) {
        return signupAPIInstance.post('/signup', {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            data: newUser
        })
    }
}

export default SignupApi;