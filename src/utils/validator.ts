type ValidateType = (value: string) => boolean;

const validateName: ValidateType = value => /^[A-ZА-Я][-a-zа-я]+$/.test(value);

const validateLogin: ValidateType = value => /^[A-Za-z][a-zA-Z\d-_]{3,20}$/.test(value);

const validatePassword: ValidateType = value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/.test(value);

const validatePhone: ValidateType = value => /^\+\d{10,15}$/.test(value);

const validateEmail: ValidateType = value => /^([\w-_]+)@([A-z]+)\.([\w-_])/.test(value);

type Error = {
    propsName: string,
    errorMessage: string
}



function validator(props: Record<string, string>, failedCallback: (err: Error) => void, successCallback: () => void): void {

    Object.keys(props).forEach((key: keyof Profile) => {
        const value = props[key];
        switch (key) {
            case 'first_name':
                if (!validateName(value)) {
                    failedCallback({propsName: key, errorMessage: 'Error in first_name'})
                }
                break;
            case 'second_name':
                if (!validateName(value)) {
                    failedCallback({propsName: key, errorMessage: 'Error in second_name'})
                }
                break;
            case 'email':
                if (!validateEmail(value)) {
                    failedCallback(({propsName: key, errorMessage: 'Error in email'}))
                }
                break;
            case 'phone':
                if (!validatePhone(value)) {
                    failedCallback(({propsName: key, errorMessage: 'Error in phone'}))
                }
                break;
            case 'password':
                if (!validatePassword(value)) {
                    return failedCallback(({propsName: key, errorMessage: 'Error in password'}))
                }
                break;
            case 'login':
                if (!validateLogin(value)) {
                    failedCallback({propsName: key, errorMessage: 'Error in login'})
                } else {
                    successCallback();
                }
                break;
            default:
                break;
        }
    })
}

export  default  validator;
