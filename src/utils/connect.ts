import Block from "../modules/Block";
import store, { StoreEvents } from "../modules/Store";

function connect(Component: new (...args: unknown[]) => Block) {
    return class extends Component {
        constructor(...args: unknown[]) {
            super(...args);
            store.on(StoreEvents.Updated, () => {
                this.setProps({ ...store.getState() });
            });
        }
    }
}

export default connect;