import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiCheckBadge } from "react-icons/hi2";

import ResidentPersonalDataForm from "@/components/ResidentForm/ResidentPersonalDataForm";
import ResidentFormAddressForm from "@/components/ResidentForm/ResidentAddressForm";
import CustomModal from "@/components/CustomModal";

import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

const ResidentFormManager = () => {
    const [residentData, setResidentData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const router = useRouter();
    
    const handleFirstSubmit = (personalData) => {
        setResidentData({ ...residentData, ...personalData });
        setCurrentStep(2);
        handleScrollToTop();
    };
    
    const handleLastSubmit = async (addressData) => {
        const finalData = { ...residentData, ...addressData };
        
        try {
            await axios.post('/api/create/residents', finalData);
            setIsModalOpen(true);
            
        } catch (error) {
            console.log(defaultErrorMessage.internalServerError, error);
        }
    };
    
    const handleGoBackStep = () => {
        setCurrentStep(1);
        handleScrollToTop();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        router.push("/moradores");
    };

    const handleScrollToTop = () => window.scrollTo({ top: 10, behavior: 'smooth' });

    return (
        <>
            {currentStep === 1 && (
                <ResidentPersonalDataForm
                    onSubmit={handleFirstSubmit}
                    prevData={residentData}
                />
            )}

            {currentStep === 2 && (
                <ResidentFormAddressForm
                    onSubmit={handleLastSubmit}
                    onBack={handleGoBackStep}
                />
            )}
            
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
