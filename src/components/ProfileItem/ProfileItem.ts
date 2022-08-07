import Block from "../../modules/Block";
import template from "./profile_item.pug";

type Props = {
    key: string;
    value?: string;
}

class ProfileItem extends Block {
    constructor(props: Props) {
        super('div', props)
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default ProfileItem;