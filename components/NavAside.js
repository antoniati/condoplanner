// Importa o hook useRouter do Next.js para gerenciar as rotas
import { useRouter } from "next/router"; 

// Importa o componente Link do Next.js para navegação client-side
import Link from "next/link"; 

// Importa a função de logout do next-auth/react
import { signOut } from "next-auth/react"; 

// Importa o componente de logotipo
import Logo from "@/components/Logo"; 

// Importa os dados de navegação
import { navItems } from "@/utils/navigationData"; 

// Importa o ícone HiOutlineArrowLeftOnRectangle do pacote react-icons/hi2
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2"; 

// Importa o módulo de estilos específico para o componente NavAside
import style from '@/styles/NavAside.module.css'; 

/**
 * Componente de navegação lateral.
 *
 * @param {boolean} show - Define se a navegação lateral está visível ou não.
 * @returns {JSX.Element} Componente de navegação lateral.
 */
export default function NavAside({ show }) {
    const router = useRouter(); // Inicializa o hook useRouter
    const { pathname } = router; // Obtém o caminho atual da rota

    /**
     * Função para verificar se o link ativo corresponde ao caminho atual.
     *
     * @param {string} navLink - O caminho do link de navegação.
     * @returns {string} Classe CSS para indicar se o link está ativo ou inativo.
     */
    const isPathActive = (navLink) => {
        return pathname === navLink ? style.navActiveLink : style.navInactiveLink;
    };

    return (
        <aside className={`${style.navAside} ${show ? style.visibleNav : ""}`}>
            <Link href={navItems[0].navLink}>
                <Logo logoInCol={"col"} /> {/* Link para a página inicial com o logotipo */}
            </Link>
            <nav className={style.navContent}>
                <ul>
                    {/* Mapeia os itens de navegação e cria os links correspondentes */}
                    {navItems && navItems.map(navItem => (
                        <li key={navItem.navLink}>
                            <Link
                                href={navItem.navLink}
                                className={`${isPathActive(navItem.navLink)} ${style.navLink}`}
                            >
                                {navItem.navIcon}
                                <span>
                                    {navItem.navText}
                                </span>
                            </Link>
                        </li>
                    ))}
                    {/* Botão de logout */}
                    <li>
                        <button
                            type="button"
                            className={`${isPathActive("/logout")} ${style.navLink}`}
                            onClick={() => signOut()}
                        >
                            <HiOutlineArrowLeftOnRectangle size={24} />
                            <span> Sair </span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
