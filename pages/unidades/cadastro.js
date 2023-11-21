// Importação do componente de layout
import Layout from "@/components/Layout";

// Importação do componente de gerenciamento de formulário de unidades
import CondoUnitFormManager from "@/components/CondoUnitForm/CondoUnitFormManager";

export default function CondoUnitRegisterPage() {
    return (
        // Layout que envolve o conteúdo da página
        <Layout>
            {/* Componente de gerenciamento de formulário de unidade */}
            <CondoUnitFormManager />
        </Layout>
    );
};
