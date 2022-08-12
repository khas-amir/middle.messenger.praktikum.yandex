export const API_URL = 'https://ya-praktikum.tech/api/v2';

export class BaseAPI {
    request(...args: unknown[]){ throw new Error('Not implemented'); }

    request(args: unknown) { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}