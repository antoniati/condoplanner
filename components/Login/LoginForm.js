// Importação o pacote Axios para requisições HTTP
import axios from "axios";

// Hook useState do React para gerenciamento de estado
import { useState } from "react";

// Hook useRouter do Next.js para navegação
import { useRouter } from "next/router";

// Import os componentes
import InputForm from "@/components/InputForm"; // Input de formulário personalizado
import CustomButton from "@/components/CustomButton"; // botão personalizado

import style from "@/styles/LoginForm.module.css"; // Estilos específicos para o formulário de login

/**
 * Componente funcional responsável por renderizar o formulário de login.
 *
 * @returns {JSX.Element} Componente do formulário de login.
 */
const LoginForm = () => {
    // Estado inicial do formulário de login
    const initialData = {
        userEmail: "",
        userPassword: "",
    };

    // Estados para armazenar dados do formulário e mensagens de erro
    const [formData, setFormData] = useState(initialData);
    const [errorMessages, setErrorMessages] = useState({});

    // Objeto para navegar entre as rotas
    const router = useRouter();

    /**
     * Função para lidar com a mudança nos campos de entrada.
     * Atualiza os dados do formulário e limpa mensagens de erro associadas ao campo modificado.
     *
     * @param {Event} e - Evento de mudança nos campos de entrada.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        cleanErrorMessage(name);
    };

    /**
     * Função para limpar mensagens de erro associadas a um campo específico.
     *
     * @param {string} fieldName - Nome do campo para o qual limpar a mensagem de erro.
     */
    const cleanErrorMessage = (fieldName) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    /**
     * Função para validar campos de entrada obrigatórios.
     * Atribui mensagens de erro aos campos ausentes e retorna a validade do formulário.
     *
     * @returns {boolean} - Indicação de validade do formulário.
     */
    const validateRequiredFields = () => {
        const requiredFields = ["userEmail", "userPassword"];
        let isValid = true;

        for (const field of requiredFields) {
            if (!formData[field]) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [field]: `O campo ${field === "userEmail" ? "E-mail" : "Senha"} é obrigatório.`,
                }));
                isValid = false;
            }
        }

        return isValid;
    };

    /**
     * Função para lidar com o envio do formulário de login.
     * Realiza uma requisição de autenticação e redireciona para a página do painel em caso de sucesso.
     *
     * @param {Event} e - Evento de envio do formulário.
     */
    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateRequiredFields()) {
            return;
        }
        try {
            // Tentativa de fazer uma solicitação de login para a API.
            await axios.post("/api/auth/login", formData);

            // Se a solicitação for bem-sucedida:
            // - Reseta os dados de login para vazios, preparando o formulário para um novo login.
            setFormData(initialData);

            // - Limpa quaisquer mensagens de erro anteriores.
            setErrorMessages({});

            // - Redireciona o usuário para a página do painel após o login bem-sucedido.
            router.push("/painel");

        } catch (error) {
            // Se ocorrer algum erro durante a solicitação de login:
            // - Chama a função handleRegistrationError para lidar com o erro.
            handleRegistrationError(error);
        }

    };

    /**
     * Função para lidar com erros durante o processo de login.
     * Exibe mensagens de erro específicas ou registra erros desconhecidos no console.
     *
     * @param {Error} error - Objeto de erro capturado durante a requisição de autenticação.
     */
    const handleRegistrationError = (error) => {
        if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            if (errorMessage.includes("E-mail ou Senha inválidos.")) {
                setErrorMessages({ userPassword: errorMessage });
            } else {
                console.error(errorMessage);
            }
        }
    };

    // Renderização do formulário de login
    return (
        <form onSubmit={handleLoginFormSubmit}>
            <div className={style.optionsLoginForm}>
                {/* Componente InputForm para o campo de E-mail */}
                <InputForm
                    inputLabelText={"E-mail"}
                    inputType={"email"}
                    inputName="userEmail"
                    inputValue={formData.userEmail}
                    inputOnChange={handleInputChange}
                    errorMessage={errorMessages.userEmail}
                />
                {/* Componente InputForm para o campo de Senha */}
                <InputForm
                    inputLabelText={"Senha"}
                    inputType={"password"}
                    inputName="userPassword"
                    inputValue={formData.userPassword}
                    inputOnChange={handleInputChange}
                    errorMessage={errorMessages.userPassword}
                />
            </div>
            <div className={style.buttonLoginForm}>
                {/* Componente CustomButton para o botão de Login */}
                <CustomButton
                    buttonType={"submit"}
                    buttonStyle={"black-button"}
                    buttonText={"Login"}
                />
            </div>
        </form>
    );
};

// Exporta o componente de formulário de login
export default LoginForm;
