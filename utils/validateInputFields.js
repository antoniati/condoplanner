/**
 * Valida se um campo não está vazio e exibe uma mensagem de erro se necessário.
 *
 * @param {string} valueForValidate - Valor do campo a ser validado.
 * @param {function} setErrorMessage - Função para definir a mensagem de erro.
 * @returns {boolean} - `true` se o campo não estiver vazio, `false` caso contrário.
 */
export const validateEmptyField = (valueForValidate, setErrorMessage) => {
    let emptyValue = true;

    if (!valueForValidate) {
        emptyValue = false;
        setErrorMessage("Este campo é obrigatório");
    } else {
        setErrorMessage("");
    }

    return emptyValue;
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
        setErrorMessage("Insira um email válido.");
        return false;
    } else {
        // Limpa a mensagem de erro
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
        setErrorMessage("A senha deve conter pelo menos 6 caracteres.");
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
        setErrorMessage("As senhas devem ser iguais");
    }
};
