declare module '*.pug' {
    const _: () => string;
    export default _;
}

declare module '*.svg' {
    const _: string;
    export default _;
}

declare interface Profile {
    id?: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
    display_name?: string;
    avatar: string | null;
}

declare interface Chat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: LastMessage;
}

declare interface LastMessage {
    user: Profile;
    time: string;
    content: string;
}
