import { defaultErrorMessage } from "../constantsData/defaultErrorMessages";

export const validateRequiredInputFields = (formData) => {
    const errors = {};

    Object.keys(formData).forEach((fieldName) => {
        if (!formData[fieldName]) {
            errors[fieldName] = defaultErrorMessage.requiredField;
        }
    });

    return errors;
};

/**
 * Valida se um email tem um formato válido e exibe uma mensagem de erro se necessário.
 *
 * @param {string} userEmail - Email a ser validado.
 * @param {function} setErrorMessage - Função para definir a mensagem de erro.
 * @returns {boolean} - `true` se o email for válido, `false` caso contrário.
 */
export const validateEmail = (userEmail, setErrorMessage) => {
    // Padrão de email básico
    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(userEmail)) {
        setErrorMessage(defaultErrorMessage.invalidEmail);
        return false;
    } else {
        setErrorMessage("");
        return true;
    }
};

/**
 * Valida se a senha atende ao requisito de comprimento mínimo.
 *
 * @param {string} userPassword - Senha a ser validada.
 * @param {function} setErrorMessage - Função para definir a mensagem de erro.
 */
export const validatePasswordLength = (userPassword, setErrorMessage) => {
    if (userPassword.length < 6) {
        setErrorMessage(defaultErrorMessage.invalidPasswordLength);
    } else {
        setErrorMessage("");
    }
};

/**
 * Verifica se duas senhas são iguais e exibe uma mensagem de erro se necessário.
 *
 * @param {string} password - Primeira senha.
 * @param {string} confirmPassword - Segunda senha a ser comparada.
 * @param {function} setErrorMessage - Função para definir a mensagem de erro.
 */
export const checkPassword = (password, confirmPassword, setErrorMessage) => {
    if (password === confirmPassword) {
        setErrorMessage("");
    } else {
        setErrorMessage(defaultErrorMessage.differentPasswords);
    }
};
