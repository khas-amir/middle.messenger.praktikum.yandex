export type PlainObject<T = unknown> = {
    [k in string]: T;
};

export function isPlainObject(value: unknown): boolean {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}