import Block from "../../modules/Block";
import template from "./change_password.pug";
import avatarHref from '../../../static/img/avatar.svg';
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
type Props = {
    profile: Profile
}

class ChangePassword extends Block {
    constructor(props: Props) {
        super('div', {
            avatarHref,
            backButton: new BackButton(),
            saveButton: new Button({text: 'Сохранить'}),
            ...props,
        })
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChangePassword;