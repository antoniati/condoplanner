// Importação do módulo de estilos específico para o componente Logo
import style from "@/styles/Logo.module.css";

// Importação da biblioteca classNames para gerenciar classes condicionais
import classNames from "classnames";

/**
 * Componente de logotipo da aplicação.
 *
 * @param {string} logoInCol - Define a classe de layout do logotipo ("col" para coluna, padrão para linha).
 * @returns {JSX.Element} Componente de logotipo.
 */
const Logo = ({ logoInCol }) => {
    // Classe condicional para gerenciar as classes do componente com base na propriedade logoInCol
    const LogoClasses = classNames(
        style.logo, // Classe padrão para o logotipo em linha
        {
            [style.logoInCol]: logoInCol === "col", // Classe para o logotipo em coluna, aplicada quando logoInCol é "col"
        }
    );

    return (
        <div className={LogoClasses}>
            {/* Imagem do logotipo */}
            <img src="/logo.svg" alt="Logo Condoplanner" />
            {/* Texto do logotipo */}
            <h1>Condoplanner</h1>
        </div>
    );
}

// Exporta o Logo
export default Logo;
