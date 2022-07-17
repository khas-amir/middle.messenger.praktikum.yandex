import Block from "../../utils/Block";
import template from './input.pug';


type Props = {
    id: string,
    name: string,
    type?: string,
    events: any
}

class Input extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default Input;