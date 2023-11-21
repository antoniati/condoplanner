// Importa o módulo axios para realizar requisições HTTP.
import axios from "axios";

/**
 * Verifica a existência de uma unidade de condomínio.
 *
 * @param {number} unitNumber - Número da unidade.
 * @param {string} unitBlock - Bloco da unidade.
 * @param {function} setErrorMessage - Função para definir mensagens de erro.
 * @returns {void}
 * @throws {Error} Lança um erro em caso de falha na requisição.
 */
export const checkCondoUnitExisting = async (unitNumber, unitBlock, setErrorMessage) => {
    try {
        // Faz uma requisição para verificar a existência da unidade.
        const response = await axios.get(`/api/checking/checkCondoUnit?unitNumber=${unitNumber}&unitBlock=${unitBlock}`);

        // Verifica se a unidade existe com base na resposta da API.
        if (response.data.exists) {
            setErrorMessage("Esta unidade já está cadastrada.");
        } else {
            setErrorMessage("");
        }
    } catch (error) {
        // Trata erros durante a requisição, exibindo uma mensagem no console.
        console.error("Erro ao verificar a unidade:", error);
        throw new Error("Erro durante a verificação da unidade.");
    }
};
