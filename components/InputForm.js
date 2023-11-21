// Importação dos módulos de estilos do componente.
import style from "@/styles/BasicForm.module.css";

/**
 * Componente funcional para um campo de entrada em um formulário.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.inputId - ID do campo de entrada.
 * @param {string} props.inputLabelText - Rótulo do campo de entrada.
 * @param {string} props.inputName - Nome do campo de entrada.
 * @param {string} props.inputType - Tipo do campo de entrada ("text", "password", etc.).
 * @param {string} props.inputValue - Valor atual do campo de entrada.
 * @param {function} props.inputOnChange - Função chamada ao alterar o valor do campo de entrada.
 * @param {function} props.inputOnBlur - Função chamada ao sair do foco do campo de entrada.
 * @param {string} props.inputPlaceholder - Texto de placeholder do campo de entrada.
 * @param {string} props.errorMessage - Mensagem de erro a ser exibida.
 * @param {number} props.inputMaxLength - Comprimento máximo do campo de entrada.
 * @param {function} props.inputKeyDown - Função chamada ao pressionar uma tecla no campo de entrada.
 * @returns {JSX.Element} Componente do campo de entrada.
 */
const InputForm = ({
    inputId,
    inputLabelText,
    inputName,
    inputType,
    inputValue,
    inputOnChange,
    inputOnBlur,
    inputPlaceholder,
    errorMessage,
    inputMaxLength,
    inputKeyDown,
}) => {
    // Renderização do componente
    return (
        <div className={style.formOption}>
            {/* Rótulo do campo de entrada */}
            <label htmlFor={inputId}>
                {inputLabelText}
            </label>
            {/* Campo de entrada */}
            <input
                id={inputId}
                name={inputName}
                type={inputType}
                value={inputValue || ""}
                onChange={inputOnChange}
                placeholder={inputPlaceholder}
                maxLength={inputMaxLength}
                onBlur={inputOnBlur}
                // Adiciona classe de erro se houver uma mensagem de erro
                className={errorMessage && "border-red-500"}
                onKeyDown={inputKeyDown}
            />
            {/* Exibição da mensagem de erro */}
            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

// Exporta o componente do campo de entrada.
export default InputForm;
