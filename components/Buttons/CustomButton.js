// Importação da biblioteca "classNames" para gerenciar classes condicionais.
import classNames from "classnames";

// Importação dos módulos de estilos do componente.
import styles from "@/styles/CustomButton.module.css";

/**
 * Componente funcional para um botão personalizado.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.buttonStyle - Estilo do botão ("blue-button", "black-button", "red-button").
 * @param {string} props.buttonType - Tipo do botão ("button", "submit", etc.).
 * @param {string} props.linkURL - URL para navegação ao clicar no botão.
 * @param {function} props.buttonFunction - Função a ser executada ao clicar no botão.
 * @param {JSX.Element} props.buttonIcon - Ícone a ser exibido no botão.
 * @param {string} props.buttonText - Texto a ser exibido no botão.
 * @returns {JSX.Element} Componente do botão personalizado.
 */
const CustomButton = ({
    buttonStyle,
    buttonType,
    linkURL,
    buttonFunction,
    buttonIcon,
    buttonText,
}) => {
    // Classe condicional com base no botãoStyle
    const buttonClasses = classNames(
        styles.customButton, // Classe padrão do botão
        {
            [styles.customButtonBlue]: buttonStyle === "blue-button", // botão azul
            [styles.customButtonBlack]: buttonStyle === "black-button", // botão preto
            [styles.customButtonGray]: buttonStyle === "gray-button", // botão cinza
            [styles.customButtonRed]: buttonStyle === "red-button", // botão vermelho
        }
    );

    // Renderização do componente
    return (
        <button
            className={buttonClasses}
            type={buttonType}
            href={linkURL}
            onClick={buttonFunction}
        >
            {buttonIcon}
            {buttonText}
        </button>
    );
};

// Exporta o componente do botão personalizado.
export default CustomButton;
