export function trim(value: string, delValue?: string) {
    const regExp = new RegExp(`[${delValue ? delValue : '\\s'}]`, 'g');
    return value.replace(regExp, '');
}
