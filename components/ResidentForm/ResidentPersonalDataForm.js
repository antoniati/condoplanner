// Hooks do React para gerenciamento de estado e efeitos
import { useEffect, useState } from "react";

// Importa os componentes
import CustomButton from "@/components/CustomButton"; //  botão personalizado
import HeaderSection from "@/components/HeaderSection"; //  seção de cabeçalho
import InputForm from "@/components/InputForm"; //  formulário de entrada de dados
import InputImage from "@/components/InputImage"; //  Imagem personalizada

// Importa os utilitarios
import {
    filterOptionsResidents,
    inputsPersonalDataValues,
} from "@/utils/inputFields"; // Dados para opções de filtro e valores de entrada
import {
    checkResidentContactPhoneExists,
    checkResidentCpfNumberExists,
    checkResidentEmailExists,
    checkResidentFullNameExists,
    checkResidentRgNumberExists,
} from "@/utils/checking/checkResidentData"; // Funções de verificação de dados de moradores
import {
    applyCPFMask,
    applyPhoneMask,
    applyRGMask,
} from "@/utils/inputFieldsMask"; // Funções para aplicar máscaras em campos específicos

import { HiUserPlus } from "react-icons/hi2"; // Ícone de usuário para o cabeçalho

import style from "@/styles/BasicForm.module.css"; // Estilos do formulário

/**
 * Componente funcional para o formulário de dados pessoais do morador.
 * Permite o preenchimento de dados pessoais e avança para a próxima etapa.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {Function} props.onSubmit - Função para lidar com o envio do formulário.
 * @param {Object} props.prevData - Dados previamente preenchidos.
 * @returns {JSX.Element} Componente do formulário de dados pessoais do morador.
 */
const ResidentPersonalDataForm = ({ onSubmit, prevData }) => {
    // Estado para armazenar os dados do formulário
    const initialDataResidentForm = {
        residentFullName: "",
        residentCpfNumber: "",
        residentRgNumber: "",
        dateOfBirthOfResident: "",
        residentEmail: "",
        residentContactPhone: "",
        residentOcupation: "",
        kinshipResident: "",
        typeOfResident: "",
    };

    // Estados para armazenar dados do formulário e mensagens de erro
    const [formData, setFormData] = useState({
        ...prevData,
        ...initialDataResidentForm,
        residentImage: null,
    });
    const [errorMessages, setErrorMessages] = useState({});

    // Efeito para atualizar dados previamente preenchidos
    useEffect(() => {
        prevData && setFormData(prevData);
    }, [prevData]);

    /**
     * Função para lidar com as mudanças nos campos de entrada.
     * Aplica máscaras específicas e atualiza o estado dos dados do formulário.
     *
     * @param {Event} e - Objeto de evento.
     */
    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        let maskedValue = value;

        // Aplicar máscara dependendo do campo
        if (name === "residentCpfNumber") {
            maskedValue = applyCPFMask(value);
        } else if (name === "residentRgNumber") {
            maskedValue = applyRGMask(value);
        } else if (name === "residentContactPhone") {
            maskedValue = applyPhoneMask(value);
        }

        // Atualizar estado dos dados do formulário e limpar mensagens de erro
        setFormData({ ...formData, [name]: maskedValue });
        cleanErrorMessage(name);
    };

    /**
     * Função para limpar mensagens de erro de um campo específico.
     *
     * @param {string} fieldName - Nome do campo.
     */
    const cleanErrorMessage = (fieldName) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    /**
     * Função para validar campos de entrada obrigatórios.
     *
     * @returns {boolean} - Indica se todos os campos obrigatórios foram preenchidos.
     */
    const validateRequiredFields = () => {
        // Definir campos de entrada obrigatórios
        const requiredFields = [
            "residentFullName",
            "residentRgNumber",
            "typeOfResident",
        ];

        // Iniciar como válido
        let isValidField = true;

        // Verificar campos obrigatórios vazios
        for (const field of requiredFields) {
            if (!formData[field]) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [field]: `Este campo é obrigatório.`,
                }));
                isValidField = false;
            }
        }

        return isValidField;
    };

    /**
     * Função para lidar com o envio do formulário.
     *
     * @param {Event} e - Objeto de evento.
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obrigatórios
        if (!validateRequiredFields()) {
            return;
        }

        let isValidSubmit = true; // Iniciar como válido
        const newErrorMessages = {}; // Objeto para armazenar novas mensagens de erro

        // Verificar se o email já existe
        await checkResidentEmailExists(
            formData.residentEmail,
            null,
            (errorMessage) => {
                if (errorMessage) {
                    newErrorMessages.residentEmail = errorMessage;
                    isValidSubmit = false;
                }
            }
        );

        // Verificar se o nome completo já existe
        await checkResidentFullNameExists(
            formData.residentFullName,
            null,
            (errorMessage) => {
                if (errorMessage) {
                    newErrorMessages.residentFullName = errorMessage;
                    isValidSubmit = false;
                }
            }
        );

        // Verificar se o RG já existe
        await checkResidentRgNumberExists(
            formData.residentRgNumber,
            null,
            (errorMessage) => {
                if (errorMessage) {
                    newErrorMessages.residentRgNumber = errorMessage;
                    isValidSubmit = false;
                }
            }
        );

        // Verificar se o CPF já existe
        await checkResidentCpfNumberExists(
            formData.residentCpfNumber,
            null,
            (errorMessage) => {
                if (errorMessage) {
                    newErrorMessages.residentCpfNumber = errorMessage;
                    isValidSubmit = false;
                }
            }
        );

        // Verificar se o Telefone de Contato já existe
        await checkResidentContactPhoneExists(
            formData.residentContactPhone,
            null,
            (errorMessage) => {
                if (errorMessage) {
                    newErrorMessages.residentContactPhone = errorMessage;
                    isValidSubmit = false;
                }
            }
        );

        // Atualizar estado das mensagens de erro com novas mensagens, se houver
        setErrorMessages(newErrorMessages);

        // Se o envio for válido, limpar mensagens de erro e enviar formulário
        if (isValidSubmit) {
            setErrorMessages({});
            onSubmit(formData);
        }
    };

    // Renderização do componente
    return (
        <>
            {/* Seção de cabeçalho */}
            <HeaderSection
                headerIcon={<HiUserPlus size={36} />}
                headerTitle={"Formulário de Cadastro de Morador"}
            >
                <p>
                    Preencha os campos do formulário abaixo com os Dados Pessoais
                    do Morador para Cadastrá-los.
                </p>
            </HeaderSection>

            {/* Seção do formulário */}
            <section className={style.formContainer}>
                <form
                    className={style.formContent}
                    onSubmit={handleFormSubmit}
                >
                    <h2 className={style.titleForm}>
                        Dados Pessoais do Morador
                    </h2>

                    {/* Componente de entrada de imagem */}
                    <InputImage
                        onImageSelect={(image) =>
                            setFormData({ ...formData, residentImage: image })
                        }
                    />

                    {/* Seção de campos de entrada */}
                    <section className={style.formSection}>
                        {inputsPersonalDataValues.map((field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name]}
                                inputPlaceholder={field.placeholder}
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessages[field.name]}
                                inputMaxLength={field.maxLength}
                            />
                        ))}

                        {/* Seletor do Tipo de Morador */}
                        <div className={style.formOption}>
                            <label>Tipo</label>
                            <select
                                name="typeOfResident"
                                value={formData.typeOfResident}
                                onChange={handleChangesInputFields}
                                className={errorMessages && "error-input" || ""}
                            >
                                <option value="">Selecione um Tipo</option>
                                {filterOptionsResidents.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errorMessages.typeOfResident && (
                                <p className="error-message">
                                    {errorMessages.typeOfResident}
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Botão para próxima etapa */}
                    <div className={style.buttonsForm}>
                        <CustomButton
                            type={"submit"}
                            buttonStyle={"black-button"}
                            buttonText={"Próxima Etapa"}
                        />
                    </div>
                </form>
            </section>
        </>
    );
};

// Exporta o componente
export default ResidentPersonalDataForm;
