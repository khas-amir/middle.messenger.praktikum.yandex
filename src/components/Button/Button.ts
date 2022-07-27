import Block from "../../utils/Block";
import template from './button.pug';

type Props = {
    text: string,
    type?: string,
    className?: string,
    href?: string
}

export default class Button extends Block {

    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props)
    }
}