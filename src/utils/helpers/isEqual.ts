import { isPlainObject } from './isPlainObject';

function isEqual(a: object, b: object): boolean {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (const key in a) {
        const valueA = a[key as keyof typeof a];
        const valueB = b[key as keyof typeof b];

        const areObjects = isPlainObject(valueA) && isPlainObject(valueB);

        if (
            (areObjects && !isEqual(valueA, valueB)) ||
            (!areObjects && valueA !== valueB)
        ) {
            return false;
        }
    }
    return true;
}

export default isEqual;
