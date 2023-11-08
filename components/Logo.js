import style from "@/styles/Logo.module.css";
import classNames from "classnames";

const Logo = ({ logoInCol }) => {
    // Classe condicional
    const LogoClasses = classNames(
        style.logo, // classe padrão (logo em linha)
        {
            [style.logoInCol]: logoInCol === "col", // classe do logo em coluna
        }
    );
    return (
        <div className={LogoClasses}>
            <img src="/logo.svg" alt="Logo Condoplanner" />
            <h1> Condoplanner </h1>
        </div>
    );
}

export default Logo;
