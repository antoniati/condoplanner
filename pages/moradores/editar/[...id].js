// Importação de bibliotecas externas
import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e gerenciamento de estado
import { useRouter } from "next/router"; // Hook do Next.js para obtenção do objeto de roteamento
import axios from "axios"; // Biblioteca para fazer requisições HTTP

// Importação de componentes personalizados
import Layout from "@/components/Layout"; // Layout principal da aplicação
import HeaderSection from "@/components/HeaderSection"; // Componente de cabeçalho personalizado
import CustomButton from "@/components/CustomButton"; // Botão personalizado
import InputForm from "@/components/InputForm"; // Componente de entrada de formulário
import InputImage from "@/components/InputImage"; // Componente de entrada de imagem
import CustomModal from "@/components/CustomModal"; // Modal personalizado

// Importação de ícones da biblioteca "react-icons/hi2"
import { HiCheckBadge, HiUserPlus } from "react-icons/hi2";

// Importação de utilitários
import { applyCPFMask, applyPhoneMask, applyRGMask } from "@/utils/inputFieldsMask"; // Funções para aplicar máscaras em campos de entrada
import {
    checkResidentContactPhoneExists,
    checkResidentCpfNumberExists,
    checkResidentEmailExists,
    checkResidentFullNameExists,
    checkResidentRgNumberExists
} from "@/utils/checking/checkResidentData"; // Funções para verificar a existência de dados do morador

// Importação de estilos
import style from "@/styles/BasicForm.module.css";

/**
 * Página de edição de morador.
 *
 * @returns {JSX.Element} Componente da página de edição de morador.
 */
const ResidentEditPage = () => {
    const [formData, setFormData] = useState({}); // Estado para armazenar os dados do morador
    const [errorMessage, setErrorMessage] = useState({}); // Estado para armazenar mensagens de erro
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal

    const router = useRouter(); // Objeto de roteamento do Next.js
    const { id } = router.query; // Obtém o parâmetro de rota "id"

    // Efeito colateral para buscar dados do morador quando o "id" muda
    useEffect(() => {
        // Função assíncrona para buscar dados do morador pelo ID
        const fetchData = async () => {
            try {
                // Verifica se id é definido antes de fazer a requisição
                if (id) {
                    const response = await axios.get(`/api/residentPerfil/${id}`);
                    const residentData = response.data.data;

                    // Preenche o formData com os dados do morador
                    setFormData(residentData);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do morador:', error);
            }
        };

        // Chama a função para buscar dados quando o componente monta
        fetchData();
    }, [id]);

    // Função para lidar com mudanças nos campos de entrada
    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        let maskedValue = value;

        // Aplica máscara dependendo do campo
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

    // Função para validar se os campos de entrada obrigatórios estão vazios
    const validateRequiredFields = () => {
        // Define os campos de entrada que são obrigatórios
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

        // Retorna o valor dos campos de entrada caso sejam válidos (verdadeiro)
        return isValidField;
    };

    // Função para limpar mensagens de erro
    const cleanErrorMessage = (fieldName) => {
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    // Função para navegar de volta à página de perfil do morador
    const handleGoBackPage = () => {
        router.push(`/moradores/perfil/${id}`);
    }

    // Função para lidar com a atualização do morador
    const handleUpdateResident = async (e) => {
        e.preventDefault();

        // Validação dos campos de entradas obrigatórios
        if (!validateRequiredFields()) {
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
                    editar as informações do morador.
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
            {/* Modal de confirmação de edição */}
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
