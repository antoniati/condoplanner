import axios from "axios";

export const fetchAndPopulateAddressData = async (
  cep,
  formData,
  setFormData
) => {
  const formattedCEP = cep.replace(/\D/g, '');

  if (formattedCEP.length === 8) {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${formattedCEP}/json/`
      );

      const data = response.data;

      if (data.erro) {
        return {
          success: false,
          message: "CEP não encontrado.",
        };
      } else {

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
    return {
      success: true,
      message: "",
    };
  }
};
