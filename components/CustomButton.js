import classNames from "classnames";
import styles from "@/styles/CustomButton.module.css";

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
        styles.customButton, // classe padrão do botão
        {
            [styles.customButtonBlue]: buttonStyle === "blue-button",
            [styles.customButtonBlack]: buttonStyle === "black-button",
            [styles.customButtonRed]: buttonStyle === "red-button",
        }
    );

    return (
        <button
            className={buttonClasses}
            type={buttonType}
            href={linkURL}
            onClick={buttonFunction}
        >
            <span>
                {buttonIcon}
                {buttonText}
            </span>
        </button>
    );
};

export default CustomButton;