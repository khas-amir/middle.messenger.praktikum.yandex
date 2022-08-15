import { API_URL, BaseAPI } from "./base-api";
import HTTPTransport, { OptionsWithoutMethod } from "../modules/http/HTTPTransport";
import { merge } from "../utils/helpers";

const authAPIInstance = new HTTPTransport(API_URL + '/auth');

const options: OptionsWithoutMethod = {
    credentials: 'include', // Нужно подставлять куки
    mode: 'cors', // Работаем с CORS
    headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
    },
};

class LoginApi extends BaseAPI {
    
    // Аутенфикация
    request() {
        return authAPIInstance
            .get('/user', options)
            
            // .catch(err => console.error(err))
    }

    // Авторизация
    create(login: string, password: string) {
        return authAPIInstance
            .post('/signin', merge(options, { data: { login, password } }))
    }

    delete() {
        return authAPIInstance.post('/logout', options)
    }
}

export default LoginApi;