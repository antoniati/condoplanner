import axios from "axios";

/**
 * Busca e preenche automaticamente os dados do endereço com base no CEP fornecido.
 *
 * @param {string} cep - CEP a ser consultado.
 * @param {Object} formData - Dados do formulário a serem atualizados.
 * @param {function} setFormData - Função para atualizar os dados do formulário.
 * @returns {Object} - Objeto com informações sobre o resultado da operação.
 * @property {boolean} success - Indica se a operação foi bem-sucedida.
 * @property {string} message - Mensagem relacionada ao resultado da operação.
 */
export const fetchAndPopulateAddressData = async (
  cep,
  formData,
  setFormData
) => {
  // Remove caracteres não numéricos do CEP
  const formattedCEP = cep.replace(/\D/g, '');

  // Verifica se o CEP possui o formato correto (8 dígitos)
  if (formattedCEP.length === 8) {
    try {
      // Consulta a API ViaCEP para obter dados do endereço
      const response = await axios.get(
        `https://viacep.com.br/ws/${formattedCEP}/json/`
      );

      const data = response.data;

      // Verifica se o CEP foi encontrado
      if (data.erro) {
        return {
          success: false,
          message: "CEP não encontrado.",
        };
      } else {
        // Atualiza os dados do formulário com as informações do endereço
        const updatedFormData = {
          ...formData,
          residentZipCode: data.cep,
          residentStreet: data.logradouro,
          residentNeighborhood: data.bairro,
          residentCity: data.localidade,
          residentState: data.uf,
        };

        setFormData(updatedFormData);

        return {
          success: true,
          message: "CEP encontrado com sucesso.",
        };
      }
    } catch (error) {
      console.error("Erro ao buscar dados do CEP:", error);
      return {
        success: false,
        message: "Erro ao buscar dados do CEP.",
      };
    }
  } else {
    // Se o CEP não estiver no formato correto, retorna sucesso sem mensagem
    return {
      success: true,
      message: "",
    };
  }
};
