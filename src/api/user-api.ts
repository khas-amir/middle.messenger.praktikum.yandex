import {BaseAPI, API_URL} from "./base-api";
import HTTP, { OptionsWithoutMethod } from "../modules/http/HTTPTransport";

const userAPIinstance = new HTTP(API_URL + '/user');

const options: OptionsWithoutMethod = {
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
}

class UserAPI extends BaseAPI {
    request(id: string) {
        return userAPIinstance.get(`/${id}`, options)
    }

    update(newUser: Profile) {
        return userAPIinstance.put('/profile', {...options, data: newUser})
    }
}

export default UserAPI;