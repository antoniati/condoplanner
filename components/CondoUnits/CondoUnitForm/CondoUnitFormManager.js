import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiCheckBadge } from "react-icons/hi2";

import CondoUnitData from "@/components/CondoUnitForm/CondoUnitData";
import CondoUnitHolderData from "@/components/CondoUnitForm/CondoUnitHolderData";
import CustomModal from "@/components/CustomModal";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

const CondoUnitFormManager = () => {
    const [residentData, setResidentData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const handleFirstSubmit = async (residentHolderId) => {

        setResidentData({
            ...residentData,
            ...residentHolderId
        });

        setCurrentStep(2);
        window.scrollTo({ top: 10, behavior: 'smooth' });
    };

    const handleLastSubmit = async (condoUnitData) => {

        const finalData = {
            ...residentData,
            ...condoUnitData
        };

        try {

            await axios.post('/api/create/condo-units', finalData);
            setIsModalOpen(true);

        } catch (error) {
            console.log(`${defaultErrorMessage.internalServerError}, ${error.message}`);
        }
    };

    const handleGoBackStep = () => {
        setCurrentStep(1);
        window.scrollTo({ top: 10, behavior: 'smooth' });

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        router.push("/unidades");

    };


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

export default CondoUnitFormManager;
