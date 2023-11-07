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
        <Link href={navLink} className={style.navCard}>
            <span>
                <h2> {cardTitle} </h2>
                <i>{navIcon}</i>
            </span>
            <p> {cardDesription} </p>
        </Link>
    )
}

export default NavCard;
