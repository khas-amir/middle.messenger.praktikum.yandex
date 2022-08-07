import Block from "../../modules/Block";
import template from "./index.pug";


class IndexPage extends Block {
    constructor() {
        super('div')
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default IndexPage;