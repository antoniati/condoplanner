// Importação do componente de layout
import Layout from "@/components/Layout";
import CondoUnitFormManager from "@/components/CondoUnits/CondoUnitForm/CondoUnitFormManager";


export default function CondoUnitRegisterPage() {
    return (
        // Layout que envolve o conteúdo da página
        <Layout>
            {/* Componente de gerenciamento de formulário de unidade */}
            <CondoUnitFormManager />
        </Layout>
    );
};
