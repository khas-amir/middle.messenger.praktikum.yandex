import Block from "../../modules/Block";
import template from './change_profile_form.pug';
import Button from "../Button";
import Input from "../Input";
import validator from "../../utils/validator";
import connect from "../../utils/connect";
import isEqual from "../../utils/helpers/isEqual";

type Props = {
    profile: Profile,
    onSubmit: (e: SubmitEvent) => void,
}

class ChangeProfileForm extends Block {

    public componentDidUpdate(oldProps: Props, newProps: Props) {
        if (!isEqual(oldProps, newProps)) {
            this.children.InputEmail.setProps({value: newProps.profile.email});
            this.children.InputLogin.setProps({value: newProps.profile.login});
            this.children.InputFirstName.setProps({value: newProps.profile.first_name});
            this.children.InputSecondName.setProps({value: newProps.profile.second_name});
            this.children.InputChatLogin.setProps({value: newProps.profile.display_name});
            this.children.InputPhone.setProps({value: newProps.profile.phone});
        }
        return true;
    }

    constructor(props: Props) {

        const onBlur = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            const o = {[target.name]: target.value}
            validator(o, err => {
                const errors = this.props.errors;
                errors[err.propsName] = err.errorMessage;
                this.setProps({errors});
                const inputComponent = this.getComponent(target.name);
                inputComponent.setProps({value: target.value});

            }, () => {
                const errors = this.props.errors;
                errors[target.name] = ''
                this.setProps({errors});
                this.getComponent(target.name).setProps({value: target.value})
            })
        }

        const onFocus = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            const errors = this.props.errors;
            errors[target.name] = '';
            const input = this.getContent().querySelector(`input[name="${target.name}"]`);
            if (input?.previousSibling) {
                input.previousSibling.textContent = ''
            }
        }


        const {email, phone, second_name, first_name, password, login, display_name} = props.profile
        super('div', {
            ...props,
            InputEmail: new Input({name: 'email', value: email, className: 'profile-item__desc', onBlur, onFocus}),
            InputLogin: new Input({name: 'login', value: login, className: 'profile-item__desc', onBlur, onFocus}),
            InputFirstName: new Input({
                name: 'first_name',
                value: first_name,
                type: 'text',
                className: 'profile-item__desc',
                onBlur, onFocus
            }),
            InputSecondName: new Input({
                name: 'second_name',
                value: second_name,
                type: 'text',
                className: 'profile-item__desc',
                onBlur, onFocus
            }),
            InputPhone: new Input({name: 'phone', value: phone, type: 'tel', className: 'profile-item__desc', onBlur, onFocus}),
            InputPassword: new Input({
                name: 'password',
                value: password,
                type: 'password',
                className: 'profile-item__desc',
                onBlur, onFocus
            }),
            InputChatLogin: new Input({name: 'display_name', value: display_name, className: 'profile-item__desc',}),
            saveButton: new Button({text: 'Сохранить', className: 'profile__button'}),
            errors: {
                login: '',
                password: '',
                'first_name': '',
                'second_name': '',
                phone: ''
            },
            events: {
                submit: props.onSubmit
            }
        })
    }


    render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    getComponent(name: string) {
        const children = this.children;
        const mapped: Record<string, Block> = {
            login: children.InputLogin,
            first_name: children.InputFirstName,
            email: children.InputEmail,
            second_name: children.InputSecondName,
            phone: children.InputPhone,
            password: children.InputPassword,
            display_name: children.InputChatLogin
        }

        return mapped[name];
    }

}

export default connect(ChangeProfileForm);