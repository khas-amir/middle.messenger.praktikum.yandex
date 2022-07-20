declare module "./form_group.pug";

import Block from "../../utils/Block";
import Input from "../Input";
import template from './form_group.pug';



type Props = {
    name: string,
    label: string,
    type: string,
    value: string,
    validateErrorMessage?: string,
    onBlur?: (e: FocusEvent) => void,
    onChange?: (e: InputEvent) => void,
}



class FormGroup extends Block {

    constructor(props: Props) {
        const {name, type, value, onBlur, onChange} = props;
        super('div', {
            input: new Input({ id: name, name, type, value, onBlur, onChange}),
            ...props
        });
    }

    render(): DocumentFragment{
        return this.compile(template, {...this.props})
    }
}

export default FormGroup;