// Importação de hooks
import { useState } from "react";            // Hook para gerenciar estado local
import { useSession } from 'next-auth/react'; // Hook para obter informações da sessão de autenticação

// Importação de componentes personalizados
import Logo from "@/components/Logo";        // Componente de logotipo
import NavAside from "@/components/NavAside"; // Componente de navegação lateral

// Importação do ícone do menu ("react-icons/hi")
import { HiMenu } from "react-icons/hi";

// Importação do modulo de estilos do layout principal
import style from "@/styles/Layout.module.css";

/**
 * Componente de layout principal.
 *
 * Este componente representa o layout geral da aplicação, incluindo cabeçalho, navegação lateral e área de conteúdo.
 *
 * @param {ReactNode} children - Conteúdo a ser exibido na área de conteúdo.
 * @returns {JSX.Element} Componente de layout.
 */
const Layout = ({ children }) => {
    const [showNav, setShowNav] = useState(false); // Estado para controlar a visibilidade da navegação lateral
    const { data: session } = useSession();      // Obtém informações da sessão de autenticação

    // Verifica se não há uma sessão de usuário autenticada, se não houver, retorna nulo
    if (!session) {
        return null;
    }

    // Função para alternar a visibilidade da navegação lateral ao clicar no botão do menu
    const handleShowNav = () => {
        if (showNav === false) {
            setShowNav(true);
        } else {
            setShowNav(false);
        };
    };

    return (
        <main className={style.layout}>
            <header className={`${showNav ? "fixed" : ""} ${style.navbar}`}>
                {/* Logotipo da aplicação */}
                <Logo />
                <button onClick={handleShowNav}>
                    {/* Ícone do menu que define o comportamento de exibição da navegação lateral */}
                    <HiMenu size={36} />
                </button>
            </header>

            {/* Navegação lateral com base no estado "showNav" */}
            <NavAside show={showNav} />

            {/* Renderiza o conteúdo da página passado como "children" */}
            <section className={`${showNav ? "mt-20 lg:mt-0" : ""} ${style.contentPage}`}>
                {children}
            </section>
        </main>
    );
};

export default Layout;
