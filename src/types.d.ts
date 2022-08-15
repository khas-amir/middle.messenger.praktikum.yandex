declare module "*.pug" {
    const _: () => string;
    export default _;
}

declare module "*.svg" {
    const _: string;
    export default _;
}

declare interface Profile {
    id?: number,
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    phone: string,
    password: string,
    display_name?: string,
}