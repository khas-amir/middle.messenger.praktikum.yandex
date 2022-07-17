import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Block from "../../utils/Block";
import template from './signin.pug';

type Props = Record<string, Block>

class Signin extends Block {
    constructor() {
        const props: Props = {};
        
        props.InputEmail = new FormGroup({ name: 'email', label: "Почта", type: 'email' });
        props.InputLogin = new FormGroup({ name: 'login', label: "Логин", type: 'text' });
        props.InputFirstName = new FormGroup({ name: 'first_name', label: 'Имя', type: 'text' })
        props.InputSecondName = new FormGroup({ name: 'second_name', label: 'Фамилия', type: 'text' })
        props.InputPhone = new FormGroup({ name: 'phone', label: 'Телефон', type: 'tel' })
        props.InputPassword = new FormGroup({ name: 'password', label: 'Пароль', type: 'password' })
        props.InputConfirmPassword = new FormGroup({ name: 'confirm_password', label: 'Потвердите пароль', type: 'password' });
        props.SigninButton = new Button({text: 'Зарегистрировать'});
        props.EnterButton = new Button({text: 'Войти', type: 'a'});

        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Signin;