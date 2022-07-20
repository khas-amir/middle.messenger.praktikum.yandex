import Block from "../../utils/Block";
import template from './input.pug';


type Props = {
    id: string,
    name: string,
    type?: string,
    value: string,
    onBlur: (e: FocusEvent) => void,
    onChange: (e: InputEvent ) => void,
}

class Input extends Block {
    constructor(props: Props) {
        super('div', {events: {blur: props.onBlur, change: props.onChange}, ...props});
    }

    render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default Input;