const InputForm = ({
    inputId,
    inputLabelText,
    inputName,
    inputType,
    inputValue,
    inputOnChange,
    errorMessage
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={inputId}>
                {inputLabelText}
            </label>
            <input
                id={inputId}
                name={inputName}
                type={inputType}
                value={inputValue}
                onChange={inputOnChange}
                className={errorMessage && "border-red-500"}
            />
            {errorMessage && (
                <p className="w-full bg-slate-50 rounded p-2 flex items-center justify-center font-medium tracking-wider border-2 border-slate-200 text-red-500">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default InputForm;