import Block from './Block';
import Route from './Route';

class Router {
    static __instance: Router;
    routes: Route[];
    history: History;
    _currentRoute: Route | null;
    _rootQuery: string;

    constructor(rootQuery?: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        if (rootQuery) {
            this._rootQuery = rootQuery;
        }

        Router.__instance = this;
    }

    use(pathname: string, block: new (...args: unknown[]) => Block, props?: Record<string, unknown>) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery, blockProps: props});
        this.routes.push(route);
        return this;
    }

    start() {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = (event: PopStateEvent) => {
            event.preventDefault();
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }


    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;