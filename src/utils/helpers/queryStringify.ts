import {isPlainObject} from "./isPlainObject";
import {isArray} from "./isArray";

type StringIndexed = {
    [key in string]: any
}

export function queryStringify(data: StringIndexed): string | never {
    function _queryStringify(
        data: StringIndexed,
        path: string[]
    ): string | never {

        function prefix(key: string) {
            if (path.length > 0) {
                const first = path[0];
                return `${first}${path.slice(1).map((el) => `[${el}]`)}[${key}]`;
            }
            return key;
        }

        if (!isPlainObject(data)) {
            throw new Error("input must be object");
        }
        const entries = Object.entries(data);
        const strArr = [];

        for (const [key, value] of entries) {
            if (isArray(value)) {
                const arr = value.map((el, i) => `${prefix(key)}[${i}]=${el}`);
                strArr.push(arr.join("&"));
                continue;
            }
            if (!isPlainObject(value)) {
                strArr.push(`${prefix(key)}=${value}`);
            } else {
                strArr.push(`${_queryStringify(value, [...path, key])}`);
            }
        }
        return strArr.join("&");
    }

    return _queryStringify(data, []);
}