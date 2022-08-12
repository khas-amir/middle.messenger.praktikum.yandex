import Block from "../../modules/Block";
import template from './button.pug';

type Props = {
    text: string,
    type?: string,
    className?: string,
    href?: string,
    onClick?: (e: MouseEvent) => void
}

export default class Button extends Block {

    constructor(props: Props) {
        super('div', {...props, events: {click: props.onClick}});
    }

    render() {
        return this.compile(template, this.props)
    }
}