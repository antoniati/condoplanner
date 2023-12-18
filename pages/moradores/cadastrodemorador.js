import Layout from "@/components/Layout";
import ResidentFormManager from "@/components/Residents/ResidentForm/ResidentFormManager";

export default function ResidentRegisterPage() {
    return (
        // Layout que envolve o conteúdo da página
        <Layout>
            {/* Componente de gerenciamento de formulário de residente */}
            <ResidentFormManager />
        </Layout>
    );
};
