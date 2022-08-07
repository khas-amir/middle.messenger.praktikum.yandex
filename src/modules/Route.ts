import Block from './Block';
import { render } from '../utils/renderDom';


export default class Route {
    _pathname: string;
    _blockClass: new (...args: unknown[]) => Block;
    _block: Block | null;
    _props: {
        rootQuery: string,
        blockProps: Record<string, unknown>
    }

    constructor(pathname: string, view: new (...args: unknown[]) => Block, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props.blockProps);
            if (this._block) {
                render(this._props.rootQuery, this._block);
            }
            return;
        }

        this._block.show();
    }
}