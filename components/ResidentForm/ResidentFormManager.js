import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import ResidentPersonalDataForm from "@/components/ResidentForm/ResidentPersonalDataForm";
import ResidentFormAddressForm from "@/components/ResidentForm/ResidentAddressForm";
import CustomModal from "../CustomModal";
import { HiCheckBadge } from "react-icons/hi2";

const ResidentFormManager = () => {
    const [residentData, setResidentData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const handleFirstSubmit = (personalData) => {
        setResidentData({ ...residentData, ...personalData });
        setCurrentStep(2);
    };

    const handleLastSubmit = async (addressData) => {
        const finalData = { ...residentData, ...addressData };

        try {
            await axios.post('/api/residents', finalData);
            setIsModalOpen(true);
        } catch (error) {
            console.log("Erro ao enviar os dados:", error);
        };
    };

    const handleGoBackStep = () => {
        setCurrentStep(1);
        window.scrollTo({ top: 10, behavior: 'smooth' });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        router.push("/moradores");
    };

    return (
        <>
            {/* Formulário de Dados Pessoais */}
            {currentStep === 1 && (
                <ResidentPersonalDataForm
                    onSubmit={handleFirstSubmit}
                    prevData={residentData}
                />
            )}

            {/*  Formulário de Endereço */}
            {currentStep === 2 && (
                <ResidentFormAddressForm
                    onSubmit={handleLastSubmit}
                    onBack={handleGoBackStep}
                />
            )}

            {/* modal de confirmação de cadastro */}
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

export default ResidentFormManager;
