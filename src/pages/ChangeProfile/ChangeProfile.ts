import BackButton from '../../components/BackButton';
import Block from '../../modules/Block';
import template from './change_profile.pug';
import avatarHref from '../../../static/img/avatar.svg';
import ChangeProfileForm from '../../components/ChangeProfileForm';
import validator from '../../utils/validator';
import connect from '../../utils/connect';
import UserController from '../../controllers/UserController';

type Props = {
    profile: Profile;
    avatarHref?: string;
};

class ChangeProfile extends Block {
    public componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps.profile !== newProps.profile) {
            this.children.ChangeProfileForm.setProps({
                profile: newProps.profile,
            });
        }
        return false;
    }

    constructor(props: Props) {
        const onSubmit = (e: SubmitEvent) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const inputs = target.querySelectorAll('input');
            const user: Record<string, boolean | string> = {};
            inputs.forEach((input) => {
                validator(
                    { [input.name]: input.value },
                    () => {
                        user[input.name] = false;
                    },
                    () => {
                        user[input.name] = input.value;
                    }
                );
            });
            if (Object.values(user).every((key) => !!key)) {
                new UserController().updateUser(user);
            }
        };

        super('div', {
            backButton: new BackButton(),
            avatarHref,

            ...props,
        });

        this.children = {
            ...this.children,
            Form: new ChangeProfileForm({
                profile: this.props.profile,
                onSubmit,
            }),
        };
        new UserController().getUserInfo();
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default connect(ChangeProfile);
