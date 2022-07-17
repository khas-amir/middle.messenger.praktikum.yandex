import BackButton from "../../components/BackButton";
import Block from "../../utils/Block";
import template from "./change_profile.pug";
import avatarHref from '../../../static/img/avatar.svg';
import Button from "../../components/Button";

type Props = {
    profile: Profile,
    avatarHref?: string
}

class ChangeProfile extends Block {
    constructor(props: Props) {
        super('div', {
            backButton: new BackButton(),
            avatarHref,
            saveButton: new Button({text: 'Сохранить',  className: 'profile__button'}),
            ...props
        })
    }
    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChangeProfile;