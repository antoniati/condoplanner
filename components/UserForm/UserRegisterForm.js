// Importação do pacote "axios" para realizar requisições HTTP.
import axios from "axios";

// Importação do hook `useState` do pacote "react" para gerenciar estados no componente.
import { useState } from "react";

// Importação do hook `useRouter` do pacote "next/router" para manipulação de rotas no Next.js.
import { useRouter } from "next/router";

// Importação dos componentes
import CustomButton from "@/components/CustomButton"; // botão personalizado.
import InputForm from "@/components/InputForm"; // campo de entrada de formulário personalizado.
import CustomModal from "@/components/CustomModal"; // modal personalizado.

// Importação do objeto `usersInputFields` contendo os atributos dos campos de entrada do formulário.
import { usersInputFields } from "@/utils/inputFields";

// Importação do ícone de confirmação do pacote "react-icons/hi2".
import { HiCheckBadge } from "react-icons/hi2";

// Importação do módulo de estilos do componente.
import style from "@/styles/BasicForm.module.css";

/**
 * Componente funcional para o formulário de cadastro de usuário.
 * Este componente exibe um formulário que permite ao usuário realizar
 * o cadastro utilizando um endereço de e-mail e senha.
 *
 * @returns {JSX.Element} Componente do formulário de cadastro de usuário.
 */
const UserRegisterForm = () => {
    // Estado inicial do formulário
    const initialData = {
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
    };

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState(initialData);

    // Estado para armazenar mensagens de erro
    const [errorMessages, setErrorMessages] = useState({});

    // Estado para controlar a abertura e fechamento do modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hook `useRouter` para obter a instância do roteador do Next.js
    const router = useRouter();

    // Função para lidar com as mudanças nos campos de entrada
    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        cleanErrorMessage(name);
    };

    // Função para limpar mensagens de erro para um campo específico
    const cleanErrorMessage = (fieldName) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    // Função para verificar se as senhas são iguais
    const handleCheckPassword = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (formData.userPassword !== value) {
            setErrorMessages({ confirmPassword: "As senhas devem ser iguais." });
        } else {
            cleanErrorMessage("confirmPassword");
        }
    };

    // Função para validar os campos obrigatórios
    const validateRiqueredFields = () => {
        const requiredFields = ['userEmail', 'userPassword', 'confirmPassword'];
        let isValid = true;

        for (const field of requiredFields) {
            if (!formData[field]) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [field]: `O campo ${field === 'userEmail' ? 'E-mail' : 'Senha'} é obrigatório.`,
                }));
                isValid = false;
            }
        }

        return isValid;
    };

    // Função para lidar com o envio do formulário
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateRiqueredFields()) {
            return;
        }

        try {
            // Requisição POST para cadastrar o usuário na API
            await axios.post("/api/users", formData);

            // Limpa os dados do formulário e mensagens de erro
            setFormData(initialData);
            setErrorMessages({});

            // Abre o modal de sucesso
            setIsModalOpen(true);
        } catch (error) {
            // Trata erros relacionados ao cadastro do usuário
            handleRegistrationError(error);
        }
    };

    // Função para lidar com erros durante o cadastro do usuário
    const handleRegistrationError = (error) => {
        if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            if (errorMessage.includes("E-mail já está cadastrado.")) {
                setErrorMessages({ userEmail: errorMessage });
            } else if (errorMessage.includes("As senhas devem ser iguais.")) {
                setErrorMessages({ confirmPassword: errorMessage });
            } else {
                console.error(errorMessage);
            }
        }
    };

    // Função para fechar o modal e redirecionar para a página inicial
    const handleCloseModal = () => {
        setIsModalOpen(false);
        router.push("/");
    };

    // Renderização do componente
    return (
        <form onSubmit={handleFormSubmit} className={style.userForm}>
            {/* Conteúdo do formulário */}
            <div className={style.userFormContent}>
                {/* Mapeia e renderiza os campos do formulário */}
                {usersInputFields.map((field, index) => (
                    <InputForm
                        key={index}
                        inputLabelText={field.label}
                        inputType={field.type}
                        inputName={field.name}
                        inputValue={formData[field.name]}
                        inputOnChange={
                            field.name === "confirmPassword"
                                ? handleCheckPassword
                                : handleChangesInputFields
                        }
                        errorMessage={errorMessages[field.name]}
                    />
                ))}
                {/* Botão de submissão do formulário */}
                <CustomButton
                    buttonType="submit"
                    buttonStyle="blue-button"
                    buttonText="Cadastrar"
                />
            </div>

            {/* Modal de sucesso após o cadastro */}
            {isModalOpen && (
                <CustomModal
                    modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                    modalTitle="Cadastrado com Sucesso!"
                    modalDescription="Seu cadastro foi realizado com sucesso."
                    functionToCloseModal={handleCloseModal}
                />
            )}
        </form>
    );
};

// Exporta o componente de formulário de cadastro de usuário.
export default UserRegisterForm;
