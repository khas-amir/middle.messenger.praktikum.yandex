import Block from "../../utils/Block";
import template from './back_button.pug';
import arrow from '../../../static/img/arrow.svg';

class BackButton extends Block {
    constructor() {
        super('div', {});
    }

    render(): DocumentFragment {
        return this.compile(template, {href: arrow});
    }
}

export default BackButton;