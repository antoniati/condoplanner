// Importação do modulo com os estilos do cabeçalho de seção
import style from "@/styles/HeaderSection.module.css";

/**
 * Componente de seção de cabeçalho.
 *
 * Este componente exibe um cabeçalho com um ícone, um título e conteúdo opcional.
 *
 * @param {ReactElement} headerIcon - Ícone do cabeçalho.
 * @param {string} headerTitle - Título do cabeçalho.
 * @param {ReactNode} children - Conteúdo opcional a ser exibido à direita do cabeçalho.
 * @returns {JSX.Element} Componente de seção de cabeçalho.
 */
const HeaderSection = ({
    headerIcon,
    headerTitle,
    children,
}) => {
    return (
        <div className={style.headerSection}>
            <div>
                <i>{headerIcon}</i>
                <h1> {headerTitle} </h1>
            </div>
            <span>
                {children} 
            </span>
        </div>
    );
};

export default HeaderSection;
