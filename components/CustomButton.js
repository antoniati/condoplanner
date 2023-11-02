import classNames from "classnames";

const CustomButton = ({
    buttonStyle,
    buttonType,
    linkURL,
    buttonFunction,
    buttonIcon,
    buttonText,
}) => {

    const buttonClasses = classNames(
        "custom-button",
        {
            "border-dark-blue bg-dark-blue hover:border-luminous-blue": buttonStyle === "blue-button",
            "border-red-500 bg-red-500 hover:bg-red-400": buttonStyle === "red-button",
            "border-black bg-black hover:border-luminous-blue": buttonStyle === "black-button",
        }
    );

    return (
        <button
            className={buttonClasses}
            type={buttonType}
            href={linkURL}
            onClick={buttonFunction}
        >
            <span className="text-xl">
                {buttonIcon}
            </span>
            <span className="text-lg font-medium">
                {buttonText}
            </span>
        </button>
    );
};

export default CustomButton;