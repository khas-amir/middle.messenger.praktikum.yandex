type CallbackType = (...args: unknown[]) => void;
type Events = Record<string, CallbackType[]>;

class EventBus {
    private readonly listeners: Events;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: CallbackType) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: CallbackType) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
            throw new Event(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}

export default EventBus;
