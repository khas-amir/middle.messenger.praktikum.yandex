import Block from "../../modules/Block";
import BackButton from "../../components/BackButton";
import template from './UserProfile.pug';
import avatarHref from '../../../static/img/avatar.svg';
import ProfileItem from "../../components/ProfileItem";
import Button from "../../components/Button";
import connect from "../../utils/connect";
import LoginController from "../../controllers/LoginController";
import isEqual from "../../utils/helpers/isEqual";
import UserController from "../../controllers/UserController";

type Props = {
    profile: Profile;
    avatarHref?: string;
}

class UserProfile extends Block {


    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (!isEqual(oldProps, newProps)) {
            this.children.Email.setProps({value: newProps.profile.email});
            this.children.Login.setProps({value: newProps.profile.login});
            this.children.FirstName.setProps({value: newProps.profile.first_name});
            this.children.SecondName.setProps({value: newProps.profile.second_name});
            this.children.Username.setProps({value: newProps.profile.display_name});
            this.children.Phone.setProps({value: newProps.profile.phone});
        }
        return false;
    }

    constructor(props: Props) {

        
        
        super('div', {
            backButton: new BackButton(),
            avatarHref: avatarHref,
            ChangeProfileButton: new Button({
                text: 'Изменить данные',
                type: 'a',
                className: 'profile-item',
                href: '/change_profile'
            }),
            ChangePasswordButton: new Button({
                text: 'Изменить пароль',
                type: 'a',
                className: 'profile-item',
                href: '/change_password'
            }),
            ExitButton: new Button({
                text: 'Выйти',
                type: 'a',
                className: 'profile-item button_danger',
                onClick: () => new LoginController().logout()
            }),
            ...props
        });        
        const profile = this.props.profile as Profile;
        this.children = {
            ...this.children,
            Email: new ProfileItem({key: 'Почта', value: profile.email}),
            Login: new ProfileItem({key: 'Логин', value: profile.login}),
            FirstName: new ProfileItem({key: 'Имя', value: profile['first_name']}),
            SecondName: new ProfileItem({key: 'Фамилия', value: profile['second_name']}),
            Username: new ProfileItem({key: 'Логин в чате', value: profile.display_name}),
            Phone: new ProfileItem({key: 'Телефон', value: profile.phone}),
        }
        new UserController().getUserInfo();
    }


    render() {
        return this.compile(template, this.props)
    }
}

export default connect(UserProfile);
