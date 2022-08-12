import Button from "../../components/Button";
import LoginForm from "../../components/LoginForm";
import Block from "../../modules/Block";

import template from './login.pug';
import validator from "../../utils/validator";
import LoginController from "../../controllers/LoginController";
import {router} from "../../index";


class Login extends Block {

    button: Button;
    errors: Record<string, string>

    componentDidUpdate(): boolean {
        return false;
    }

    constructor() {
        const loginController = new LoginController();

        // loginController
        //     .getUserInfo()
        //     .then((data) => {
        //         console.log(data)
        //         // router.go('/settings')
        //     })
            // .catch(err => router.go('/'))

        const onSubmit = (e: SubmitEvent) => {
            e.preventDefault();


            const inputs = this.getContent().querySelectorAll('input');
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
                loginController
                    .login(user.login as string, user.password as string)
            }
        }


        super('div', {
            Form: new LoginForm({onSubmit}),
            button2: new Button({text: 'Нет аккаунта', type: 'a', href: '/sign-up'}),
            events: {
                submit: onSubmit
            }
        });

    }

    render(): DocumentFragment {
        return this.compile(template,
            this.props
        )
    }
}

export default Login;