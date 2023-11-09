import axios from "axios";

export const checkResidentEmailExists = async ( residentEmail, setErrorMessage ) => {
    try {
        // Solicitação do email à API.
        const response = await axios.get(`/api/checking/checkResidentEmail?residentEmail=${residentEmail}`);

        // Lógica para exibir mensagem de erro caso email exista.
        if (response.data.exists) {
            setErrorMessage("E-mail já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    // Tratamento de Erros caso a solicitação à API falhe.
    } catch (error) {
        console.error("Erro ao verificar o email:", error);
    };
};

export const checkResidentFullNameExists = async ( residentFullName, setErrorMessage ) => {
    try {
        // Solicitação do Nome Completo à API.
        const response = await axios.get(`/api/checking/checkResidentFullName?residentFullName=${residentFullName}`);

        // Lógica para exibir mensagem de erro caso Nome Completo exista.
        if (response.data.exists) {
            setErrorMessage("Este Nome já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    // Tratamento de Erros caso a solicitação à API falhe.
    } catch (error) {
        console.error("Erro ao verificar o nome:", error);
    };
};

export const checkResidentRgNumberExists = async ( residentRgNumber, setErrorMessage ) => {
    try {
        // Solicitação do RG do morador à API.
        const response = await axios.get(`/api/checking/checkResidentRgNumber?residentRgNumber=${residentRgNumber}`);

        // Lógica para exibir mensagem de erro caso RG do morador exista.
        if (response.data.exists) {
            setErrorMessage("Este RG já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    // Tratamento de Erros caso a solicitação à API falhe.
    } catch (error) {
        console.error("Erro ao verificar o RG:", error);
    };
};

export const checkResidentCpfNumberExists = async ( residentCpfNumber, setErrorMessage ) => {
    try {
        // Solicitação do CPF do morador à API.
        const response = await axios.get(`/api/checking/checkResidentCpfNumber?residentCpfNumber=${residentCpfNumber}`);

        // Lógica para exibir mensagem de erro caso CPF do morador exista.
        if (response.data.exists) {
            setErrorMessage("Este CPF já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    // Tratamento de Erros caso a solicitação à API falhe.
    } catch (error) {
        console.error("Erro ao verificar o cpf:", error);
    };
};

export const checkResidentContactPhoneExists = async ( residentContactPhone, setErrorMessage ) => {
    try {
        // Solicitação do Telefone de contato do morador à API.
        const response = await axios.get(`/api/checking/checkResidentContactPhone?residentContactPhone=${residentContactPhone}`);

        // Lógica para exibir mensagem de erro caso Telefone de contato do morador exista.
        if (response.data.exists) {
            setErrorMessage("Este Número já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    // Tratamento de Erros caso a solicitação à API falhe.
    } catch (error) {
        console.error("Erro ao verificar o telefone de contato:", error);
    };
};