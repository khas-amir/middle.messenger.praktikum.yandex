import EventBus from "./EventBus";
import {v4 as makeUUID} from 'uuid';


type Props = {
    [propsName: string]: Exclude<unknown, Block>,
    events?: EventsType
}

type EventsType = {
    [event in keyof HTMLElementEventMap]?: (e?: Event) => void
}

type Meta = {
    tagName: string,
    props: Props
}

type Children = Record<string, Block>

abstract class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
    };

    _element: HTMLElement
    _meta: Meta;
    props: Props;
    eventBus: (() => EventBus);
    children: Children;
    _id: string;


    protected constructor(tagName = "div", propsAndChildren = {} as Props) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildren(propsAndChildren);
        this.children = children;


        this._meta = {
            tagName,
            props
        };

        this._id = makeUUID();

        this._meta.props = this._makePropsProxy({...props, __id: this._id});
        this.props = this._meta.props;

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);

    }

    public compile(template: (props: Props) => string, props: Props): DocumentFragment {
        const propsAndStubs = {...props};

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = template(propsAndStubs)


        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    private _getChildren(propsAndChildren: Props) {
        const children = {} as Children;
        const props = {} as Props;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {children, props};
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources() {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount(this._meta.props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }


    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public componentDidMount(_oldProps: Props) {
        this.render();
    }

    private _addEvents() {
        const {events, keys} = this._getEvents();
        keys.forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName] as EventListener);
        });
    }

    private _getEvents() {
        const {events = {}} = this._meta.props;
        const keys = Object.keys(events) as (keyof EventsType)[]
        return {events, keys};
    }

    private _removeEvents() {
        const {events, keys} = this._getEvents();
        keys.forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName] as EventListener);
        })
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate = (oldProps: Props, newProps: Props) => {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    //Может пеереоределятся пользователям
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
        return true;
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this._meta.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    };

    get element() {
        return this._element;
    }

    private _render() {
        const block = this.render() as unknown as DocumentFragment;
        this._removeEvents();
        this._element.innerHTML = '';
        const element = block.firstElementChild;
        this._element.replaceWith(block);
        this._element = element as HTMLElement;
        this._addEvents();
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    public render() {
        throw new Error('Method not implemented')
    }

    public getContent() {
        return this.element;
    }

    private _makePropsProxy = (props: Props) => {
        const handler: ProxyHandler<Record<string, unknown>> = {
            get: (target, p) => {
                const value = target[p as keyof Props];
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target, p, value, receiver) => {
                const oldProps = {...target};
                target[p as keyof Props] = value;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return Reflect.set(target, p, value, receiver)
            },

            deleteProperty(): boolean {
                throw new Error("Отказано в доступе");
            },
        };

        return new Proxy(props, handler)
    }

    private _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', this._id);
        return element;
    }

    public show() {
        this.getContent().style.display = "block";
    }

    public hide() {
        this.getContent().style.display = "none";
    }
}

export default Block;
