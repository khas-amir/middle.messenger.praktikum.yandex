import Block from '../../modules/Block';
import template from './chats.pug';
import ChatController from '../../controllers/ChatController';
import connect from '../../utils/connect';

const chats = [
    { id: 0, title: 'Alexey', last: 'lorem' },
    { id: 1, title: 'Max', last: 'lorem' },
    { id: 2, title: 'Sergey', last: 'lorem' },
];

class Chats extends Block {
    componentDidMount(_oldProps: Props) {
        new ChatController().getChats().then((res) => console.log(res));
    }

    constructor(props) {
        super('div', props);
    }

    render() {
        return this.compile(template, { ...this.props, chats });
    }
}

export default connect(Chats);
