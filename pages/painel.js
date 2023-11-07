// Importação de componentes personalizados
import Layout from "@/components/Layout"; // Layout geral da página
import HeaderSection from "@/components/HeaderSection"; // Cabeçalho da página
import Dashboard from "@/components/Dashboard"; // Painel de Controle da página

// Importação dos Ícones
import { HiSquares2X2 } from "react-icons/hi2";

/**
 * Página de Dashboard (Painel)
 *
 * Esta página exibe o painel de controle com um título e um ícone.
 *
 * @returns {JSX.Element} Componente da página de dashboard.
 */
export default function DashboardPage() {
    return (
        <Layout>
            {/* Componente de seção de cabeçalho com título e ícone */}
            <HeaderSection
                headerTitle={"Painel"}
                headerIcon={<HiSquares2X2 size={36} />}
            />
            {/* Componente de dashboard */}
            <Dashboard />
        </Layout>
    );
};
