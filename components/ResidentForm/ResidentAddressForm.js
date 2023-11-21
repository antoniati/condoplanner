// Hook useState do React para gerenciamento de estado
import { useState } from "react";

// Importa os componentes
import HeaderSection from "@/components/HeaderSection"; // seção de cabeçalho
import CustomButton from "@/components/CustomButton"; // botão personalizado
import InputForm from "@/components/InputForm"; // Input de formulário personalizado

// Importa os utilitários
import { inputsAddressValues } from "@/utils/inputFields"; // Valores dos campos de endereço
import { fetchAndPopulateAddressData } from "@/utils/fetchAddresData"; // Função para buscar e popular dados de endereço

// Ícone de usuário para o cabeçalho
import { HiUserPlus } from "react-icons/hi2";

// Estilos específicos para o formulário básico
import style from "@/styles/BasicForm.module.css";

/**
 * Componente funcional para o formulário de cadastro de endereço de morador.
 * Este componente exibe um formulário e permite a inserção do endereço do morador para cadastro.
 *
 * @param {object} props - Propriedades passadas ao componente.
 * @param {function} props.onSubmit - Função a ser chamada ao submeter o formulário.
 * @param {function} props.onBack - Função a ser chamada ao clicar no botão "Voltar".
 * @param {object} props.prevData - Dados prévios para preenchimento do formulário.
 * @returns {JSX.Element} Componente do formulário de cadastro de endereço de morador.
 */
const ResidentFormAddress = ({ onSubmit, onBack, prevData }) => {
    // Estado inicial para os dados do endereço do morador
    const initialDataAddressResident = {
        residentZipCode: "",
        residentStreet: "",
        streetComplement: "",
        residentNeighborhood: "",
        residentCity: "",
        residentState: "",
    };

    // Estados para armazenar dados do formulário e mensagens de erro
    const [formData, setFormData] = useState({
        ...prevData,
        ...initialDataAddressResident,
    });
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Função para lidar com a mudança nos campos de entrada.
     * Atualiza os dados do formulário e limpa mensagens de erro associadas ao campo modificado.
     *
     * @param {Event} e - Evento de mudança nos campos de entrada.
     */
    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        cleanErrorMessage(name);
    };

    /**
     * Função para limpar mensagens de erro associadas a um campo específico.
     *
     * @param {string} fieldName - Nome do campo para o qual limpar a mensagem de erro.
     */
    const cleanErrorMessage = (fieldName) => {
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    /**
     * Função para lidar com o envio do formulário.
     * Chama a função onSubmit com os dados do formulário ao ser submetido.
     *
     * @param {Event} e - Evento de envio do formulário.
     */
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    /**
     * Função para lidar com o desfoque do campo CEP.
     * Realiza uma chamada à API para buscar e popular dados de endereço a partir do CEP.
     *
     * @param {Event} e - Evento de desfoque do campo CEP.
     */
    const handleCEPBlur = async (e) => {
        const cep = e.target.value;
        const result = await fetchAndPopulateAddressData(cep, formData, setFormData);

        if (result.success) {
            setErrorMessage("");
        } else {
            setErrorMessage(result.message);
        }
    };

    // Renderização do componente
    return (
        <>
            {/* Componente HeaderSection para a seção de cabeçalho */}
            <HeaderSection
                headerIcon={<HiUserPlus size={36} />} // Ícone de usuário no cabeçalho
                headerTitle={"Formulário de Cadastro de Morador"} // Título da seção
            >
                <p>
                    {/* Descrição da seção */}
                    Preencha os campos do formulário abaixo com o Endereço do Morador para Cadastrá-los
                </p>
            </HeaderSection>
            {/* Seção do formulário */}
            <section className={style.formContainer}>
                {/* Formulário de cadastro de endereço do morador */}
                <form
                    className={style.formContent}
                    onSubmit={handleFormSubmit}
                >
                    {/* Título do formulário */}
                    <h2 className={style.titleForm}>
                        Endereço do Morador
                    </h2>
                    {/* Seção de campos de entrada */}
                    <section className={`${style.formSection} mt-2`}>
                        {inputsAddressValues.map((field, index) => (
                            // Componente InputForm para cada campo de endereço
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name] || ""}
                                inputPlaceholder={field.placeholder}
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessage[field.name]}
                                inputOnBlur={handleCEPBlur}
                            />
                        ))}
                    </section>
                    {/* Seção de botões do formulário */}
                    <div className={style.buttonsForm}>
                        {/* Botão para submeter o formulário */}
                        <CustomButton
                            type={"submit"}
                            buttonStyle={"blue-button"}
                            buttonText={"Salvar Cadastro"}
                        />
                        {/* Botão para voltar */}
                        <CustomButton
                            type={"button"}
                            buttonStyle={"black-button"}
                            buttonText={"Voltar"}
                            buttonFunction={onBack}
                        />
                    </div>
                </form>
            </section>
        </>
    );
};

// Exporta o componente
export default ResidentFormAddress;
