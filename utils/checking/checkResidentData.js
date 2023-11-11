import axios from "axios";
// /utils/checkingResidentData.js

export const checkResidentEmailExists = async (residentEmail, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentEmail?residentEmail=${residentEmail}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("E-mail já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    } catch (error) {
        console.error("Erro ao verificar o email:", error);
    };
};

export const checkResidentFullNameExists = async (residentFullName, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentFullName?residentFullName=${residentFullName}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("Este Nome já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    } catch (error) {
        console.error("Erro ao verificar o nome:", error);
    };
};

export const checkResidentRgNumberExists = async (residentRgNumber, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentRgNumber?residentRgNumber=${residentRgNumber}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("Este RG já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    } catch (error) {
        console.error("Erro ao verificar o RG:", error);
    };
};

export const checkResidentCpfNumberExists = async (residentCpfNumber, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentCpfNumber?residentCpfNumber=${residentCpfNumber}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("Este CPF já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    } catch (error) {
        console.error("Erro ao verificar o cpf:", error);
    };
};

export const checkResidentContactPhoneExists = async (residentContactPhone, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentContactPhone?residentContactPhone=${residentContactPhone}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("Este Número já está cadastrado.");
        } else {
            setErrorMessage("");
        };

    } catch (error) {
        console.error("Erro ao verificar o telefone de contato:", error);
    };
};
