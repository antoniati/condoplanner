import style from "@/styles/BasicForm.module.css";

const InputForm = ({
    inputId,
    inputLabelText,
    inputName,
    inputType,
    inputValue,
    inputOnChange,
    inputPlaceholder,
    errorMessage,
}) => {
    return (
        <div className={style.formOption}>
            <label htmlFor={inputId}>
                {inputLabelText}
            </label>
            <input
                id={inputId}
                name={inputName}
                type={inputType}
                value={inputValue || ""}
                onChange={inputOnChange}
                placeholder={inputPlaceholder}
                className={errorMessage && "border-red-500"}
            />
            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default InputForm;