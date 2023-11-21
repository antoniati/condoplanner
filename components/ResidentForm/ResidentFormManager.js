// Importa pacot axios para requisições HTTP
import axios from "axios"; 

// Hook useState do React para gerenciamento de estado
import { useState } from "react"; 

// Hook useRouter do Next.js para gerenciamento de rotas
import { useRouter } from "next/router"; 

// Importa os Componentes
import ResidentPersonalDataForm from "@/components/ResidentForm/ResidentPersonalDataForm"; // Formulário de dados pessoais do morador
import ResidentFormAddressForm from "@/components/ResidentForm/ResidentAddressForm"; // Formulário de endereço do morador
import CustomModal from "@/components/CustomModal"; // modal personalizado

import { HiCheckBadge } from "react-icons/hi2"; // Ícone de verificação para o modal

/**
 * Componente funcional para gerenciar o formulário de cadastro de moradores.
 * Este componente gerencia a navegação entre os formulários de dados pessoais e de endereço,
 * e exibe um modal de confirmação após o cadastro bem-sucedido.
 *
 * @returns {JSX.Element} Componente para gerenciar o cadastro de moradores.
 */
const ResidentFormManager = () => {
    // Estados para armazenar dados do morador, controle de etapas e exibição do modal
    const [residentData, setResidentData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Objeto para navegar entre rotas
    const router = useRouter();

    /**
     * Função para lidar com o envio do formulário de dados pessoais.
     * Atualiza os dados do morador e avança para a próxima etapa.
     *
     * @param {object} personalData - Dados pessoais do morador.
     */
    const handleFirstSubmit = (personalData) => {
        setResidentData({ ...residentData, ...personalData });
        setCurrentStep(2);
    };

    /**
     * Função para lidar com o envio do formulário de endereço.
     * Combina dados pessoais e de endereço, realiza a requisição de cadastro e exibe o modal de confirmação.
     *
     * @param {object} addressData - Dados de endereço do morador.
     */
    const handleLastSubmit = async (addressData) => {
        const finalData = { ...residentData, ...addressData };

        try {
            // Requisição para cadastrar o morador
            await axios.post('/api/residents', finalData);
            setIsModalOpen(true);
        } catch (error) {
            console.log("Erro ao enviar os dados:", error);
        }
    };

    /**
     * Função para retroceder para a etapa anterior do formulário.
     * Retorna à etapa de dados pessoais e rola a página para o topo.
     */
    const handleGoBackStep = () => {
        setCurrentStep(1);
        window.scrollTo({ top: 10, behavior: 'smooth' });
    };

    /**
     * Função para fechar o modal e redirecionar para a página de moradores.
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        router.push("/moradores");
    };

    // Renderização condicional dos formulários e modal
    return (
        <>
            {/* Formulário de Dados Pessoais */}
            {currentStep === 1 && (
                <ResidentPersonalDataForm
                    onSubmit={handleFirstSubmit}
                    prevData={residentData}
                />
            )}

            {/* Formulário de Endereço */}
            {currentStep === 2 && (
                <ResidentFormAddressForm
                    onSubmit={handleLastSubmit}
                    onBack={handleGoBackStep}
                />
            )}

            {/* Modal de Confirmação de Cadastro */}
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

// Exporta o componente com o formulario
export default ResidentFormManager;
