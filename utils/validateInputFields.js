export const validateEmptyField = (
    valueForValidate,
    setErrorMessage
) => {
    let emptyValue = true;

    if (!valueForValidate) {
        emptyValue = false;
        setErrorMessage("Este campo é obrigatório");
    } else {
        setErrorMessage("");
    }

    return emptyValue;
};

export const validateEmail = (
    userEmail,
    setErrorMessage
) => {
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

export const validatePasswordLength = (
    userPassword,
    setErrorMessage
) => {
    if (userPassword.length < 6) {
        setErrorMessage("A senha deve conter pelo menos 6 caracteres.");
        return;
    } else if (userPassword.length > 6) {
        setErrorMessage("");
        return;
    }
};

export const checkPassword = (password, confirmPassword, setErrorMessage) => {
    if (password === confirmPassword) {
        setErrorMessage("");
    } else {
        setErrorMessage("As senhas devem ser iguais");
    }
};