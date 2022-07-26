import Block from "../../utils/Block";
import template from './input.pug';


type Props = {
    id?: string,
    name?: string,
    type?: string,
    value?: string,
    className?: string,
    onBlur?: (e: FocusEvent) => void,
    onChange?: (e: InputEvent) => void,
    onFocus?: (e:FocusEvent) => void
}

class Input extends Block {
    componentDidUpdate(): boolean {
        return  true;
    }

    constructor(props: Props) {
        super('div', {
            events: {
                blur: props.onBlur,
                keyup: props.onChange,
            focus: props.onFocus,
            }, ...props
        });
    }

    render(): DocumentFragment {
        return this.compile(template, {...this.props, value: this.props.value})
    }
}

export default Input;