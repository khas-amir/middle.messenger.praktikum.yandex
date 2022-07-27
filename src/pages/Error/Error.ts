import Button from "../../components/Button";
import Block from "../../utils/Block";

import template from './error.pug';

type Props = {
    errorCode: number;
    errorMessage: string;
}

class Error extends Block {
    constructor(props: Props) {
        super('div', {
            back: new Button({ text: 'Назад к чатам', type: "a" }),
            ...props
        });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default Error;