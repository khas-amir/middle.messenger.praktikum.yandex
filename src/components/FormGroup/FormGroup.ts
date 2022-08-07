declare module "./form_group.pug";

import Block from "../../modules/Block";
import Input from "../Input";
import template from './form_group.pug';


type Props = {
    name?: string,
    label?: string,
    type?: string,
    value?: string,
    validateErrorMessage?: string,
    onBlur?: (e: FocusEvent) => void,
    onChange?: (e: InputEvent) => void,
    onFocus?: (e: FocusEvent) => void,
}


class FormGroup extends Block {

    componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps.value !== newProps.value) {
            this.children.input.setProps({value: newProps.value});
        }

        return true;

    }
 
    constructor(props: Props) {
        const {name, type, value, onBlur, onChange, onFocus} = props;
        super('div', {
            input: new Input({id: name, name, type, value, onBlur, onChange, onFocus}),
            ...props
        });
    }

    render(): DocumentFragment {
        return this.compile(template, {...this.props, value: this.props.value, error: this.props.validateErrorMessage})
    }
}

export default FormGroup;