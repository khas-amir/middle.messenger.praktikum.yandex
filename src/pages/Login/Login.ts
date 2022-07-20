import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Block from "../../utils/Block";

import template from './login.pug';
import validator from "../../utils/validator";

type Props = Record<string, any>


class Login extends Block {


    constructor() {
        const onBlur = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            const validateProps = {[target.name]: target.value};
            validator(validateProps,
                (err) => {
                    console.log(err);
                    // this.setProps({value: target.value});
                }, () => {
                    console.log('succe');
                })
        }



        const props: Props = {}

        props.error = {}
        props.inputValue = '';
        props.inputPassword = '';

        props.button = new Button({text: 'Авторизоваться'});
        props.button2 = new Button({text: 'Нет аккаунта', type: 'a'});

        props.InputLogin = new FormGroup({
            name: 'login',
            value: props.inputValue,
            label: 'Логин',
            type: 'text',
            onBlur,
        });

        props.InputPassword = new FormGroup({
            name: 'password',
            value: props.inputPassword,
            label: 'Пароль',
            type: 'password',
            onBlur
        });

        super('div', props)
    }

    render(): DocumentFragment {
        return this.compile(template, {...this.props})
    }
}

export default Login;