import isObject from "./isObject";

type Indexed<T = unknown> = {
    [key in string]: T
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (!isObject(object)) {
        return object;
    }

    const pathArray = path.split('.')
    const lastElement = pathArray.pop() as string;
    const obj = pathArray.reduceRight(
        (acc, el) => ({[el]: acc}),
        {[lastElement]: value} 
    )
    
    Object.keys(obj).forEach(key => {
        (object as Indexed)[key] = obj[key];
    })

    return object;
}

export default set