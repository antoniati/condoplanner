// Importa o componente Link do pacote 'next/link', 
// que é usado para criar links entre páginas no Next.js.
import Link from "next/link";
import style from "@/styles/NavCard.module.css";

/**
 * Componente que representa um cartão de navegação.
 * Renderiza um link para a página especificada, juntamente com um ícone, título e descrição.
 *
 * @param {string} navLink - URL de destino do link.
 * @param {ReactElement} navIcon - Ícone associado ao cartão.
 * @param {string} cardTitle - Título do cartão.
 * @param {string} cardDesription - Descrição do cartão.
 * @returns {JSX.Element} Componente de cartão de navegação.
 */
const NavCard = ({
    navLink,
    navIcon,
    cardTitle,
    cardDesription,
}) => {
    return (
        // componente de link Next.js para navegação
        <Link href={navLink} className={style.navCard}>
            <span>
                {/* título do card */}
                <h2> {cardTitle} </h2>
                {/* ícone do card */}
                <i>{navIcon}</i>
            </span>
            {/* descrição do card */}
            <p> {cardDesription} </p>
        </Link>
    )
}

// Exporta o componente
export default NavCard;
