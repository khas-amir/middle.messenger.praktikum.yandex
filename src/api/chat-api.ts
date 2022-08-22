import HTTP, {OptionsWithoutMethod} from '../modules/http/HTTPTransport';
import { BaseAPI, API_URL } from './base-api';

const chatAPIInstance = new HTTP(API_URL + '/chats');

const options: OptionsWithoutMethod = {
    credentials: 'include', // Нужно подставлять куки
    mode: 'cors', // Работаем с CORS
    headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
    },
};

class ChatAPI extends BaseAPI {
    create() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.post('/', { data: { title: 'string' } });
    }

    request() {
        return chatAPIInstance.get('',options);
    }
}



export  default ChatAPI;
