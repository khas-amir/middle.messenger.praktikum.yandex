import Block from "../../modules/Block";
import template from './signin_form.pug';
import FormGroup from "../FormGroup";
import validator from "../../utils/validator";
import Button from "../Button";

type Props = {
    onSubmit: (e: SubmitEvent) => void
}

class SigninForm extends Block {

    constructor(props: Props) {
        const onBlur = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            const o = {[target.name]: target.value}

            validator(o, err => {
                this.getComponent(target.name).setProps({validateErrorMessage: err.errorMessage, value: target.value})
            }, () => {
                this.getComponent(target.name).setProps({validateErrorMessage: '', value: target.value})
            })
        }

        const onFocus = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            const input = this.getComponent(target.name).getContent();
            const error = input.querySelector('.validate-error');
            if (error) {
                error.textContent = ''
            }
        }


        super('div', {
            ...props,
            InputEmail: new FormGroup({ name: 'email', label: "Почта", type: 'email', onBlur, onFocus }),
            InputLogin: new FormGroup({ name: 'login', label: "Логин", type: 'text', onBlur, onFocus }),
            InputFirstName: new FormGroup({ name: 'first_name', label: 'Имя', type: 'text', onBlur, onFocus }),
            InputSecondName: new FormGroup({ name: 'second_name', label: 'Фамилия', type: 'text', onBlur, onFocus }),
            InputPhone: new FormGroup({ name: 'phone', label: 'Телефон', type: 'tel', onBlur, onFocus }),
            InputPassword: new FormGroup({ name: 'password', label: 'Пароль', type: 'password', onBlur, onFocus }),
            InputConfirmPassword: new FormGroup({ name: 'confirm_password', label: 'Потвердите пароль', type: 'password' }),
            SigninButton: new Button({text: 'Зарегистрировать'}),
            events: {submit: props.onSubmit}
        });

    }

    getComponent(name: string) {
        const children = this.children;
        const mapped : Record<string, Block> = {
            login: children.InputLogin,
            first_name: children.InputFirstName,
            email: children.InputEmail,
            second_name: children.InputSecondName,
            phone: children.InputPhone,
            password: children.InputPassword,
        }

        return mapped[name];
    }


    render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default SigninForm;