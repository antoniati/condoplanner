// Importa a biblioteca axios para realizar requisições HTTP
import axios from "axios";

// Importa o hook useState do React para gerenciar estado
import { useState } from "react";

// Importa o hook useRouter do Next.js para manipular a navegação entre páginas
import { useRouter } from "next/router";

// Importa os componentes
import CondoUnitData from "@/components/CondoUnitForm/CondoUnitData"; // formulário de dados das unidades
import CondoUnitHolderData from "@/components/CondoUnitForm/CondoUnitHolderData"; // formulário de dados do títular da unidade
import CustomModal from "@/components/CustomModal"; // modal personalizado 

// Importa o ícone HiCheckBadge do pacote react-icons
import { HiCheckBadge } from "react-icons/hi2";

/**
 * Componente funcional para gerenciar o formulário de cadastro de unidades.
 *
 * @returns {JSX.Element} Componente do gerenciador de formulário de cadastro de unidades.
 */
const CondoUnitFormManager = () => {
    // Estado para armazenar os dados do morador titular e da unidade
    const [residentData, setResidentData] = useState({});
    // Estado para controlar a etapa atual do formulário
    const [currentStep, setCurrentStep] = useState(1);
    // Estado para controlar a abertura/fechamento do modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Objeto para navegar entre as rotas
    const router = useRouter();

    /**
     * Manipulador para a submissão dos dados do morador titular.
     *
     * @param {Object} residentCpfNumber - Dados do CPF do morador titular.
     */
    const handleFirstSubmit = async (residentCpfNumber) => {
        // Atualiza os dados do morador titular
        setResidentData({ ...residentData, ...residentCpfNumber });
        // Avança para a próxima etapa do formulário
        setCurrentStep(2);
    };

    /**
     * Manipulador para a submissão final dos dados da unidade.
     *
     * @param {Object} condoUnitData - Dados da unidade.
     */
    const handleLastSubmit = async (condoUnitData) => {
        // Combina os dados do morador titular e da unidade
        const finalData = { ...residentData, ...condoUnitData };
        try {
            // Envia os dados para a API
            await axios.post('/api/condo-units', finalData);
            // Abre o modal de confirmação
            setIsModalOpen(true);
        } catch (error) {
            console.log("Erro ao enviar os dados:", error);
        }
    };

    /**
     * Manipulador para retroceder para a etapa anterior do formulário.
     */
    const handleGoBackStep = () => {
        // Retorna para a etapa anterior do formulário
        setCurrentStep(1);
        // Move a janela para o início do formulário
        window.scrollTo({ top: 10, behavior: 'smooth' });
    };

    /**
     * Manipulador para fechar o modal e redirecionar para a página de unidades.
     */
    const handleCloseModal = () => {
        // Fecha o modal
        setIsModalOpen(false);
        // Redireciona para a página de unidades
        router.push("/unidades");
    };

    // Renderização condicional com base na etapa atual do formulário
    return (
        <>
            {/* Formulário de Dados Pessoais do Titular */}
            {currentStep === 1 && (
                <CondoUnitHolderData
                    onSubmit={handleFirstSubmit}
                    prevData={residentData}
                />
            )}

            {/* Formulário de Dados da Unidade */}
            {currentStep === 2 && (
                <CondoUnitData
                    onSubmit={handleLastSubmit}
                    onBack={handleGoBackStep}
                />
            )}

            {/* Modal de confirmação de cadastro */}
            {isModalOpen && (
                <CustomModal
                    modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                    modalTitle="Cadastrado com Sucesso!"
                    modalDescription="Seu cadastro foi realizado com sucesso."
                    functionToCloseModal={handleCloseModal}
                />
            )}
        </>
    );
};

// Exporta o componente do gerenciador de formulário de cadastro de unidades.
export default CondoUnitFormManager;
