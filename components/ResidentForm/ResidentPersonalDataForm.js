import { useEffect, useState } from "react";

import CustomButton from "@/components/CustomButton";
import HeaderSection from "@/components/HeaderSection";
import InputForm from "@/components/InputForm";
import InputImage from "../InputImage";

import { filterOptionsResidents, inputsPersonalDataValues } from "@/utils/inputFields";
import { checkResidentContactPhoneExists, checkResidentCpfNumberExists, checkResidentEmailExists, checkResidentFullNameExists, checkResidentRgNumberExists } from "@/utils/checking/checkResidentData";
import { applyCPFMask, applyPhoneMask, applyRGMask } from "@/utils/inputFieldsMask";

import { HiUserPlus } from "react-icons/hi2";

import style from "@/styles/BasicForm.module.css"

const ResidentPersonalDataForm = ({ onSubmit, prevData }) => {
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
    }

    const [formData, setFormData] = useState({
        ...prevData,
        ...initialDataResidentForm
    });

    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        prevData && setFormData(prevData);
    }, [prevData]);


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

        setFormData({ ...formData, [name]: maskedValue });

        cleanErrorMessage(name);
    }

    const cleanErrorMessage = (fieldName) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    // Função para válidar se os campos de entrada obrigatórios estão vazios.
    const validateRiqueredFields = () => {
        // Defini os campos de entrada que são obrigatórios
        const requiredFields = [
            'residentFullName',
            'residentRgNumber',
            'typeOfResident'
        ];

        // Inicia o valor dos campos de entrada como válido (verdadeiro)
        let isValidField = true;

        // Estrutura lógica para verificar os campos vazios
        for (const field of requiredFields) {
            // Se os campos de entrada estiverem vazios
            if (!formData[field]) {
                // Atribui o erro ao objeto de mensagens de erro,
                // repassando as mensagens de erro anteriores caso existam
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [field]: `Este campo é obrigatório.`,
                }));
                // Define o valor dos campos de entrada como inválido (falso)
                isValidField = false;
            }
        }

        // Retornar o valor dos campos de entrada caso sejam válidos (verdadeiro)
        return isValidField;
    };

    // Função para lidar com o envio dos dados do formuláiro
    const handleFormSubmit = async (e) => {
        // Previne o comportamento padrão de envio de fomulários
        e.preventDefault();

        // Validação dos campos de entradas obrigatórios
        if (!validateRiqueredFields()) {
            return;
        }

        let isValidSubmit = true; // Inicia o envio do formulário como válido (verdadeiro)
        const newErrorMessages = {}; // Objeto para armazenar mensagens de erro

        // Verifica se o email já existe
        await checkResidentEmailExists(formData.residentEmail, null, (errorMessage) => {
            // Se houver erro
            if (errorMessage) {
                newErrorMessages.residentEmail = errorMessage; // Atribui à mensagem de erro ao objeto de novas mensagens de erros
                isValidSubmit = false; // Define o envio do formulário como inválido (falso)
            }
        });

        // Verifica se o nome completo já existe
        await checkResidentFullNameExists(formData.residentFullName, null, (errorMessage) => {
            // Se houver erro
            if (errorMessage) {
                newErrorMessages.residentFullName = errorMessage; // Atribui à mensagem de erro ao objeto de novas mensagens de erros
                isValidSubmit = false; isValidSubmit = false; // Define o envio do formulário como inválido (falso)
            }
        });

        // Verifica se o RG já existe
        await checkResidentRgNumberExists(formData.residentRgNumber, null, (errorMessage) => {
            // Se houver erro
            if (errorMessage) {
                newErrorMessages.residentRgNumber = errorMessage; // Atribui à mensagem de erro ao objeto de novas mensagens de erros
                isValidSubmit = false; isValidSubmit = false; // Define o envio do formulário como inválido (falso)
            }
        });

        // Verifica se o CPF já existe
        await checkResidentCpfNumberExists(formData.residentCpfNumber, null, (errorMessage) => {
            // Se houver erro
            if (errorMessage) {
                newErrorMessages.residentCpfNumber = errorMessage; // Atribui à mensagem de erro ao objeto de novas mensagens de erros
                isValidSubmit = false; isValidSubmit = false; // Define o envio do formulário como inválido (falso)
            }
        });

        // Verifica se o Telefone de Contato já existe
        await checkResidentContactPhoneExists(formData.residentContactPhone, null, (errorMessage) => {
            // Se houver erro
            if (errorMessage) {
                newErrorMessages.residentContactPhone = errorMessage; // Atribui à mensagem de erro ao objeto de novas mensagens de erros
                isValidSubmit = false; isValidSubmit = false; // Define o envio do formulário como inválido (falso)
            }
        });

        // Atualiza o estado das mensagens de erro com as novas mensagens de erro se houver
        setErrorMessages(newErrorMessages);

        if (isValidSubmit) {
            // Se o envio for válido (verdadeiro), significa que todas as verificações passaram
            setErrorMessages({}); // Limpa todas as mensagens de erro
            onSubmit(formData); // Envia o formulário
        }
    };

    return (
        <>
            <HeaderSection
                headerIcon={<HiUserPlus size={36} />}
                headerTitle={"Formulário de Cadastro de Morador"}
            >
                <p>
                    Preencha os campos do formulário abaixo com os
                    Dados Pessoais do Morador para Cadastra-los
                </p>
            </HeaderSection>
            <section className={style.formContainer}>
                <form
                    className={style.formContent}
                    onSubmit={handleFormSubmit}
                >
                    <h2 className={style.titleForm}>
                        Dados Pessoais do Morador
                    </h2>
                    <InputImage />
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
                            <label> Tipo </label>
                            <select
                                name="typeOfResident"
                                value={formData.typeOfResident}
                                onChange={handleChangesInputFields}
                                className={errorMessages && "error-input" || ""}
                            >
                                <option value=""> Selecione um Tipo </option>
                                {filterOptionsResidents.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errorMessages.typeOfResident &&
                                <p className="error-message">
                                    {errorMessages.typeOfResident}
                                </p>
                            }

                        </div>
                    </section>
                    <div className={style.buttonsForm}>
                        <CustomButton
                            type={"Próxima Etapa submit"}
                            buttonStyle={"black-button"}
                            buttonText={"Próxima Etapa"}
                        />
                    </div>
                </form>
            </section>
        </>
    );
};

export default ResidentPersonalDataForm;