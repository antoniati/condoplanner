import axios from "axios";

/**
 * Verifica a existência de um email de morador.
 *
 * @param {string} residentEmail - Email do morador a ser verificado.
 * @param {string} residentId - ID do morador atual (pode ser nulo se estiver criando um novo morador).
 * @param {function} setErrorMessage - Função para definir mensagens de erro.
 * @returns {void}
 */
export const checkResidentEmailExists = async (residentEmail, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentEmail?residentEmail=${residentEmail}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("E-mail já está cadastrado.");
        } else {
            setErrorMessage("");
        }

    } catch (error) {
        console.error("Erro ao verificar o email:", error);
    }
};

/**
 * Verifica a existência de um nome completo de morador.
 *
 * @param {string} residentFullName - Nome completo do morador a ser verificado.
 * @param {string} residentId - ID do morador atual (pode ser nulo se estiver criando um novo morador).
 * @param {function} setErrorMessage - Função para definir mensagens de erro.
 * @returns {void}
 */
export const checkResidentFullNameExists = async (residentFullName, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentFullName?residentFullName=${residentFullName}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("Este Nome já está cadastrado.");
        } else {
            setErrorMessage("");
        }

    } catch (error) {
        console.error("Erro ao verificar o nome:", error);
    }
};

/**
 * Verifica a existência de um número de RG de morador.
 *
 * @param {string} residentRgNumber - Número de RG do morador a ser verificado.
 * @param {string} residentId - ID do morador atual (pode ser nulo se estiver criando um novo morador).
 * @param {function} setErrorMessage - Função para definir mensagens de erro.
 * @returns {void}
 */
export const checkResidentRgNumberExists = async (residentRgNumber, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentRgNumber?residentRgNumber=${residentRgNumber}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("Este RG já está cadastrado.");
        } else {
            setErrorMessage("");
        }

    } catch (error) {
        console.error("Erro ao verificar o RG:", error);
    }
};

/**
 * Verifica a existência de um número de CPF de morador.
 *
 * @param {string} residentCpfNumber - Número de CPF do morador a ser verificado.
 * @param {string} residentId - ID do morador atual (pode ser nulo se estiver criando um novo morador).
 * @param {function} setErrorMessage - Função para definir mensagens de erro.
 * @returns {void}
 */
export const checkResidentCpfNumberExists = async (residentCpfNumber, residentId, setErrorMessage) => {
    try {
        if (residentCpfNumber !== undefined) {
            const response = await axios.get(`/api/checking/checkResidentCpfNumber?residentCpfNumber=${residentCpfNumber}`);

            if (response.data.exists && response.data.residentId !== residentId) {
                setErrorMessage("Este CPF já está cadastrado.");
            } else {
                setErrorMessage("");
            }
        }

    } catch (error) {
        console.error("Erro ao verificar o CPF:", error);
    }
};

/**
 * Verifica a existência de um número de telefone de contato de morador.
 *
 * @param {string} residentContactPhone - Número de telefone de contato do morador a ser verificado.
 * @param {string} residentId - ID do morador atual (pode ser nulo se estiver criando um novo morador).
 * @param {function} setErrorMessage - Função para definir mensagens de erro.
 * @returns {void}
 */
export const checkResidentContactPhoneExists = async (residentContactPhone, residentId, setErrorMessage) => {
    try {
        const response = await axios.get(`/api/checking/checkResidentContactPhone?residentContactPhone=${residentContactPhone}`);

        if (response.data.exists && response.data.residentId !== residentId) {
            setErrorMessage("Este Número já está cadastrado.");
        } else {
            setErrorMessage("");
        }

    } catch (error) {
        console.error("Erro ao verificar o telefone de contato:", error);
    }
};
