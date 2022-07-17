import EventBus from "./EventBus";
import { v4 as makeUUID } from 'uuid';


type Props = {
  [propsName: string]: Exclude<any, Block>,
}

type Meta = {
  tagName: string,
  props: Props
}

type Children = {
  [name: string]: Block
}

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
  events: any


  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", propsAndChildren = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildren(propsAndChildren);
    this.children = children;


    this._meta = {
      tagName,
      props
    };

    this._id = makeUUID();

    this._meta.props = this._makePropsProxy({ ...props, __id: this._id });
    this.props = this._meta.props;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);

  }

  compile(template: (props: Props) => string, props: Props): DocumentFragment {
    const propsAndStubs = { ...props };



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

  _getChildren(propsAndChildren: Props) {
    const children = {} as Children;
    const props = {} as Props;



    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });


    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount(this._meta.props);

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps: Props) {
    this.render();
  }

  _addEvents() {
    const { events = {} } = this._meta.props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this._meta.props;

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName]);
    })
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  //Может пеереоределятся пользователям
  componentDidUpdate(oldProps: Object, newProps: Object) {
    return true;
  }

  setProps = (nextProps: Object) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this._meta.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();



    this._removeEvents();


    this._element.innerHTML = '';


    const element = block.firstElementChild!;

    this._element.replaceWith(block);
    this._element = element as HTMLElement;

    this._addEvents();
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  abstract render(): DocumentFragment

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Object) {
    const self = this;

    const handler: ProxyHandler<any> = {
      set(target, p, value, receiver): boolean {
        target[p as keyof Object] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_RENDER, { ...target }, target);
        return Reflect.set(target, p, value, receiver);
      },

      deleteProperty(): boolean {
        throw new Error("Отказано в доступе");
      },
    };

    // Здесь вам предстоит реализовать метод
    return new Proxy(props, handler)
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}


export default Block;
