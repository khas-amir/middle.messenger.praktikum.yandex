import Block from '../../modules/Block';
import FormGroup from '../FormGroup';
import validator from '../../utils/validator';

import template from './login_form.pug';
import Button from '../Button';

type Props = {
    onSubmit: (e: SubmitEvent) => void;
};

class LoginForm extends Block {
    constructor(props: Props) {
        const onBlur = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            const validateProps = { [target.name]: target.value };
            validator(
                validateProps,
                (err) => {
                    if (target.name === 'login') {
                        this.children.InputLogin.setProps({
                            validateErrorMessage: err.errorMessage,
                            value: target.value,
                        });
                    } else if (err.propsName === 'password') {
                        this.children.InputPassword.setProps({
                            validateErrorMessage: err.errorMessage,
                            value: target.value,
                        });
                    }
                },
                () => {
                    if (target.name === 'login') {
                        this.children.InputLogin.setProps({
                            validateErrorMessage: '',
                            value: target.value,
                        });
                    } else if (target.name === 'password') {
                        this.children.InputPassword.setProps({
                            validateErrorMessage: '',
                            value: target.value,
                        });
                    }
                }
            );
        };

        const onFocus = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            if (target.name === 'login') {
                const error =
                    this.children.InputLogin.getContent().querySelector(
                        '.validate-error'
                    );
                if (error) {
                    error.textContent = '';
                }
            } else if (target.name === 'password') {
                const error =
                    this.children.InputPassword.getContent().querySelector(
                        '.validate-error'
                    );
                if (error) {
                    error.textContent = '';
                }
            }
        };

        super('div', {
            SubmitButton: new Button({ text: 'Авторизоваться' }),
            InputLogin: new FormGroup({
                name: 'login',
                label: 'Логин',
                type: 'text',
                onBlur,
                onFocus,
            }),
            InputPassword: new FormGroup({
                name: 'password',
                label: 'Пароль',
                type: 'password',
                onBlur,
                onFocus,
            }),
            events: {
                submit: props.onSubmit,
            },
        });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default LoginForm;
