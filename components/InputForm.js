const InputForm = ({ 
    inputLabelText, 
    inputName, 
    inputType
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="inputField">
                {inputLabelText}
            </label>
            <input
                id="inputField"
                name={inputName}
                type={inputType}
                // autoComplete="off"
            />
        </div>
    );
};

export default InputForm;