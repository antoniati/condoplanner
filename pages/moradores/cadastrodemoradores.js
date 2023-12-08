// Importação do componente de layout
import Layout from "@/components/Layout";
// Importação do componente de gerenciamento de formulário de residente
import ResidentFormManager from "@/components/ResidentForm/ResidentFormManager";

// Página para registrar novos residentes
export default function ResidentRegisterPage() {
    return (
        // Layout que envolve o conteúdo da página
        <Layout>
            {/* Componente de gerenciamento de formulário de residente */}
            <ResidentFormManager />
        </Layout>
    );
};
