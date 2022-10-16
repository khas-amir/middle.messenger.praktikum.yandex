export type ValidateType = (value: string) => boolean;
export const validateName: ValidateType = (value) =>
    /^[A-ZА-Я][-a-zа-я]+$/.test(value);
export const validateLogin: ValidateType = (value) =>
    /^[A-Za-z][a-zA-Z\d-_.]{3,20}$/.test(value);
// export const validatePassword: ValidateType = value => /^(?=.*\d)(?=.*[a-z])(?=.*?[#?!@$%^&*-])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/.test(value);
export const validatePassword: ValidateType = (value) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*?[#?!@$%^&*-])(?=.*[a-zA-Z]).{8,30}$/.test(value);
export const validatePhone: ValidateType = (value) =>
    /^\+\d{10,15}$/.test(value);
export const validateEmail: ValidateType = (value) =>
    /^([\w-_]+)@([A-z]+)\.([\w-_])/.test(value);
export const validateChatLogin: ValidateType = (value) =>
    /^[A-Za-zА-Яа-я\d]{3,}$/.test(value);
