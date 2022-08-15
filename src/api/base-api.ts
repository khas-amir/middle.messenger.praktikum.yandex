/* eslint-disable @typescript-eslint/no-unused-vars */
export const API_URL = 'https://ya-praktikum.tech/api/v2';

export class BaseAPI {
    create(..._args: unknown[]){ throw new Error('Not implemented'); }

    request(_args: unknown) { throw new Error('Not implemented'); }

    update(..._args: unknown[]) { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}