// Importação de componentes personalizados
import NavCard from "@/components/NavCard"; // Cartão de Navegação da página

// Importação de opções de navegação para as páginas do utilitário "navigationData"
import { navItems } from "@/utils/navigationData";

//Importação com os modulos de estilos do dashboard
import style from "@/styles/Dashboard.module.css";

/**
 * Componente que representa a sessão do painel de controle (dashboard).
 * Renderiza uma lista de navegação com base nos itens de navegação fornecidos.
 *
 * @returns {JSX.Element} Componente de sessão do painel de controle.
 */
const Dashboard = () => {
    // Remove o primeiro item da lista de itens de navegação (navItems), 
    // se houver mais de um item presente.
    const mappedNavItems = navItems && navItems.length > 1 ? navItems.slice(1) : [];

    // Renderiza uma lista de navegação usando os itens mapeados
    return (
        <section className={style.dashboard}>
            <ul>
                {/* Mapeia e renderiza os itens de navegação */}
                {mappedNavItems.map(navItem => (
                    <li key={navItem.navLink}>
                        {/* Componente de cartão de navegação */}
                        <NavCard
                            navLink={navItem.navLink} // Link de navegação
                            cardTitle={navItem.navText} // Título do cartão
                            navIcon={navItem.navIcon}   // Ícone de navegação
                            cardDesription={0}           // Descrição do cartão (neste caso, valor padrão 0)
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Dashboard;
