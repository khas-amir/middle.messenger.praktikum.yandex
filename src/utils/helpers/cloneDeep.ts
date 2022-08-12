import {isPlainObject} from "./isPlainObject";
import {isArray} from "./isArray";

export function cloneDeep<T extends object = object>(obj: T): T {
    if (isPlainObject(obj)) {
        const newObj = {} as typeof obj;
        for (const key in obj) {
            newObj[key] = obj[key];
        }
        return newObj;
    }

    if (isArray(obj)) {
        const arr = [...obj];
        return arr.map((el) => cloneDeep(el)) as T;
    }

    return obj;
}