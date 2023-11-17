import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";
import InputImage from "@/components/InputImage";

import { HiCheckBadge, HiUserPlus } from "react-icons/hi2";

import { filterOptionsResidents, inputsAddressValues, inputsPersonalDataValues } from "@/utils/inputFields";

import style from "@/styles/BasicForm.module.css";
import axios from "axios";
import { applyCPFMask, applyPhoneMask, applyRGMask } from "@/utils/inputFieldsMask";
import { checkResidentContactPhoneExists, checkResidentCpfNumberExists, checkResidentEmailExists, checkResidentFullNameExists, checkResidentRgNumberExists } from "@/utils/checking/checkResidentData";
import CustomModal from "@/components/CustomModal";

const ResidentEditPage = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        // Função assíncrona para buscar dados do morador pelo ID
        const fetchData = async () => {
            try {
                // Verifica se id é definido antes de fazer a requisição
                if (id) {
                    const response = await axios.get(`/api/residents/${id}`);
                    const residentData = response.data.data;

                    // Preencha o formData com os dados do morador
                    setFormData(residentData);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do morador:', error);
            }
        };

        // Chame a função para buscar dados quando o componente montar
        fetchData();
    }, [id]);


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
                setErrorMessage((prevErrors) => ({
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


    const cleanErrorMessage = (fieldName) => {
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    function handleGoBackPage() {
        router.push(`/moradores/perfil/${id}`);
    }

    const handleUpdateResident = async (e) => {
        e.preventDefault();

        // Validação dos campos de entradas obrigatórios
        if (!validateRiqueredFields()) {
            return;
        }

        let isValidSubmit = true;
        const newErrorMessages = {};
        const residentId = formData._id;

        // Verifica se o email já existe
        await checkResidentEmailExists(formData.residentEmail, residentId, (errorMessage) => {
            if (errorMessage) {
                newErrorMessages.residentEmail = errorMessage;
                isValidSubmit = false;
            }
        });

        // Verifica se o nome completo já existe
        await checkResidentFullNameExists(formData.residentFullName, residentId, (errorMessage) => {
            if (errorMessage) {
                newErrorMessages.residentFullName = errorMessage;
                isValidSubmit = false;
            }
        });

        // Verifica se o RG já existe
        await checkResidentRgNumberExists(formData.residentRgNumber, residentId, (errorMessage) => {
            if (errorMessage) {
                newErrorMessages.residentRgNumber = errorMessage;
                isValidSubmit = false;
            }
        });

        // Verifica se o CPF já existe
        await checkResidentCpfNumberExists(formData.residentCpfNumber, residentId, (errorMessage) => {
            if (errorMessage) {
                newErrorMessages.residentCpfNumber = errorMessage;
                isValidSubmit = false;
            }
        });

        // Verifica se o Telefone de Contato já existe
        await checkResidentContactPhoneExists(formData.residentContactPhone, residentId, (errorMessage) => {
            if (errorMessage) {
                newErrorMessages.residentContactPhone = errorMessage;
                isValidSubmit = false;
            }
        });

        setErrorMessage(newErrorMessages);

        if (isValidSubmit) {
            setErrorMessage({});
            try {
                const response = await axios.put(`/api/update/resident/${id}`, formData);

                if (response.data.success) {
                    setIsModalOpen(true);

                } else {
                    console.error('Erro ao atualizar morador:', response.data.error);
                }
            } catch (error) {
                console.error('Erro ao enviar requisição de atualização:', error);
            }
        }
    };

    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiUserPlus size={36} />}
                headerTitle={"Formulário de Edição de Morador"}
            >
                <p>
                    Preencha os campos do formulário abaixo para
                    Editar as Informações do Morador.
                </p>
            </HeaderSection>
            <section className={style.formContainer}>
                <form className={style.formContent} >
                    <h2 className={style.titleForm}>
                        Dados Pessoais
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
                                inputMaxLength={field.maxLength}
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessage[field.name]}
                            />
                        ))}
                        <div className={style.formOption}>
                            <label> Tipo </label>
                            <select
                                value={formData.typeOfResident}
                                onChange={handleChangesInputFields}
                                className={errorMessage && "error-input" || ""}
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
                        </div>
                    </section>
                    <h2 className={`${style.titleForm} mt-2`}>
                        Endereço
                    </h2>
                    <section className={style.formSection}>
                        {inputsAddressValues.map((field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name]}
                                inputOnChange={handleChangesInputFields}
                            />
                        ))}
                    </section>
                    <section className={style.buttonsForm}>
                        <CustomButton
                            buttonType="submit"
                            buttonText={"Salvar Edição"}
                            buttonStyle="blue-button"
                            buttonFunction={handleUpdateResident}
                        />
                        <CustomButton
                            buttonType="button"
                            buttonText={"Cancelar"}
                            buttonStyle="black-button"
                            buttonFunction={handleGoBackPage}
                        />
                    </section>
                </form>
            </section>
            {/* modal de confirmação de edição */}
            {isModalOpen && (
                <CustomModal
                    modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                    modalTitle="Editado com Sucesso!"
                    modalDescription="As informações foram editadas com sucesso."
                    functionToCloseModal={handleGoBackPage}
                />
            )}
        </Layout>
    );
};

export default ResidentEditPage;
