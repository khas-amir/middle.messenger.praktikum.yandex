import {
    validateEmail,
    validateLogin,
    validateName,
    validatePassword,
    validatePhone,
    validateChatLogin,
    ValidateType,
} from './validatorsFuncs';

import {
    CHAT_LOGIN_ERROR,
    EMAIL_ERROR,
    FIRST_NAME_ERROR,
    LOGIN_ERROR,
    PASSWORD_ERROR,
    PHONE_ERROR,
    SECOND_NAME_ERROR,
} from './validateErrorMessages';

type Error = {
    propsName: string;
    errorMessage: string;
};

type ValidatorObject = Record<
    keyof Profile,
    {
        validateFunc: ValidateType;
        validateErrorMessage: string;
    }
>;

const validatorObject: ValidatorObject = {
    login: { validateErrorMessage: LOGIN_ERROR, validateFunc: validateLogin },
    second_name: {
        validateErrorMessage: SECOND_NAME_ERROR,
        validateFunc: validateName,
    },
    first_name: {
        validateErrorMessage: FIRST_NAME_ERROR,
        validateFunc: validateName,
    },
    email: { validateErrorMessage: EMAIL_ERROR, validateFunc: validateEmail },
    password: {
        validateErrorMessage: PASSWORD_ERROR,
        validateFunc: validatePassword,
    },
    phone: { validateErrorMessage: PHONE_ERROR, validateFunc: validatePhone },
    display_name: {
        validateErrorMessage: CHAT_LOGIN_ERROR,
        validateFunc: validateChatLogin,
    },
};

function validator(
    props: Record<string, string>,
    failedCallback: (err: Error) => void,
    successCallback: () => void
): void {
    Object.keys(props).forEach((key: keyof Profile) => {
        if (!validatorObject[key].validateFunc(props[key])) {
            failedCallback({
                propsName: key,
                errorMessage: validatorObject[key].validateErrorMessage,
            });
        } else successCallback();
    });
}

export default validator;
