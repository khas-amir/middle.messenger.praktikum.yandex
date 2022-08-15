import Button from "../../components/Button";
import Block from "../../modules/Block";
import SigninForm from "../../components/SigninForm";
import template from './signin.pug';
import validator from "../../utils/validator";
import SignupController from "../../controllers/SignupController";


class Signin extends Block {
    constructor() {
        const onSubmit = (e: SubmitEvent) => {
            e.preventDefault();

            const inputs = this.getContent()
                .querySelectorAll('input:not([name="confirm_password"])') as NodeListOf<HTMLInputElement>
            const user: Record<string, string | boolean> = {};
            inputs.forEach(el => {
                validator({[el.name]: el.value},
                    () => {
                        user[el.name] = false
                    },
                    () => {
                        user[el.name] = el.value
                    })
            })
            if (Object.values(user).every(value => !!value)) {
                const signinController = new SignupController();
                signinController.signup(user)
            }
        }


        super('div', {
            Form: new SigninForm({onSubmit}),
            EnterButton: new Button({text: 'Войти', type: 'a', href: '/'}),
        });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Signin;
