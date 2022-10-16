/* eslint-disable no-console */
import isObject from './isObject';

type Indexed<T = unknown> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const keysOfRhs = Object.keys(rhs);
    const merged = {} as Record<string, unknown>;
    for (const key in lhs) {
        if (keysOfRhs.includes(key)) {
            if (isObject(lhs[key]) && isObject(rhs[key])) {
                merged[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
            }
        } else {
            merged[key] = lhs[key];
            const filtered = keysOfRhs.filter(
                (keyRhs) => !Object.keys(lhs).includes(keyRhs)
            );
            filtered.forEach((keyRHs) => {
                merged[keyRHs] = rhs[keyRHs];
            });
        }
    }
    return merged;
}

export default merge;
