import BackButton from "../../components/BackButton";
import Block from "../../utils/Block";
import template from "./change_profile.pug";
import avatarHref from '../../../static/img/avatar.svg';
import ChangeProfileForm from "../../components/ChangeProfileForm";
import validator from "../../utils/validator";

type Props = {
    profile: Profile,
    avatarHref?: string
}

class ChangeProfile extends Block {
    constructor(props: Props) {
        const onSubmit = (e: SubmitEvent) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const inputs = target.querySelectorAll('input');
            const user: Record<string, boolean | string> = {};
            inputs.forEach(input => {
                validator({[input.name]: input.value},
                    () => {
                        user[input.name] = false
                    },
                    () => {
                        user[input.name] = input.value
                    })
            })
            if (Object.values(user).every(key => !!key)) {
                console.log(user);
            }

        }
        super('div', {
            backButton: new BackButton(),
            avatarHref,
            Form: new ChangeProfileForm({profile: props.profile, onSubmit}),
            ...props
        })
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ChangeProfile;