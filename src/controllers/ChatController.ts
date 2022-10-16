import ChatAPI from '../api/chat-api';
import store from '../modules/Store';

const chatAPIInstanse = new ChatAPI();

class ChatController {
    getChats() {
        return chatAPIInstanse
            .request()
            .then((res) => JSON.parse(res.response))
            .then((data) => store.set('chats', data));
    }
}

export default ChatController;
