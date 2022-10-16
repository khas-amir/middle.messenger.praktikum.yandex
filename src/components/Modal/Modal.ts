import Block from '../../modules/Block';
import template from './modal.pug';

type Props = {
    Content: Block;
    isOpen?: boolean;
};

class Modal extends Block {
    componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
        return true;
    }

    constructor(props: Props) {
        super('div', {
            Content: props.Content,
        });
        this.setProps({ isOpen: false });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Modal;
