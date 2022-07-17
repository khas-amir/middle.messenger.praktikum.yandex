declare module "./form_group.pug";

import Block from "../../utils/Block";
import Input from "../Input";
import template from './form_group.pug';



type Props = {
    name: string,
    label: string,
    type: string,
    onBlur?: void,
    onFocus?: void
}





class FormGroup extends Block {

    constructor(props: Props) {
        super('div', {
            input: new Input({ id: props.name, name: props.name, events: { blur: props.onBlur, focus: props.onFocus } }),
            ...props
        });
    }

    render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}

export default FormGroup;