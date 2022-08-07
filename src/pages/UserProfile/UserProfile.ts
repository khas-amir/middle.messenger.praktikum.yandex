import Block from "../../modules/Block";
import BackButton from "../../components/BackButton";
import template from './UserProfile.pug';
import avatarHref from '../../../static/img/avatar.svg';
import ProfileItem from "../../components/ProfileItem";
import Button from "../../components/Button";


type Props = {
    profile: Profile;
    avatarHref?: string;
}

class UserProfile extends Block {
    constructor({profile, ...props}: Props) {
        
        super('div', {
            backButton: new BackButton(),
            avatarHref: avatarHref,
            profile: profile,
            Email: new ProfileItem({key: 'Почта', value: profile.email}),
            Login: new ProfileItem({key: 'Логин', value: profile.login}),
            FirstName: new ProfileItem({key: 'Имя', value: profile['first_name']}),
            SecondName: new ProfileItem({key: 'Фамилия', value: profile['second_name']}),
            Username: new ProfileItem({key: 'Логин в чате', value: profile.chat_login }),
            Phone: new ProfileItem({key: 'Телефон', value: profile.phone}),
            ChangeProfileButton: new Button({text:'Изменить данные', type: 'a', className: 'profile-item'}),
            ChangePasswordButton: new Button({text:'Изменить пароль', type: 'a', className: 'profile-item'}),
            ExitButton: new Button({text: 'Выйти', type: 'a', className: 'profile-item button_danger'}),
            ...props
        });
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default UserProfile;
