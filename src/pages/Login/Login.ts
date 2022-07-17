import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Block from "../../utils/Block";

import template from './login.pug';

type Props = Record<string, Block>

function onBlur(e: MouseEvent) {
    console.log(e.currentTarget);
}

class Login extends Block {



    constructor() {
        const props: Props = {}

        props.button = new Button({ text: 'Авторизоваться' });
        props.button2 = new Button({ text: 'Нет аккаунта', type: 'a' });
        props.InputLogin = new FormGroup({ name: 'login', label: 'Логин', type: 'text', onBlur: onBlur });
        props.InputPassword = new FormGroup({ name: 'password', label: 'Пароль', type: 'password' });

        super('div', props)
    }

    render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default Login;