import EventBus from './EventBus';
import set from '../utils/helpers/set';

export enum StoreEvents {
    Updated = 'updated',
}

type Indexed<T = unknown> = {
    [key in string]: T;
};

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        try {
            this.emit(StoreEvents.Updated);
        } catch (errors) {
            console.error(errors);
        }
    }
}

export default new Store();
