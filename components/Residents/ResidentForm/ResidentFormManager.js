import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiCheckBadge, HiUserPlus } from "react-icons/hi2";
import CustomModal from "@/components/CustomModal";

import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import ResidentPersonalDataForm from "./ResidentPersonalDataForm";
import ResidentAddressForm from "./ResidentAddressForm";
import HeaderSection from "@/components/HeaderSection";

const ResidentFormManager = () => {
    const [residentData, setResidentData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const handleFirstSubmit = (personalData) => {
        setResidentData({
            ...residentData,
            ...personalData
        });
        
        setCurrentStep(2);
        handleScrollToTop();
    };

    const handleLastSubmit = async (addressData) => {
        const finalData = {
            ...residentData,
            ...addressData
        };

        try {
            await axios.post(
                '/api/create/residents',
                finalData
            );

            setIsModalOpen(true);

        } catch (error) {
            console.log(
                `${defaultErrorMessage.internalServerError}`,
                error.message
            );
        }
    };

    const handleGoBackStep = () => {
        setCurrentStep(1);
        handleScrollToTop();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        router.push("/moradores/listademoradores");
    };

    const handleScrollToTop = () => window.scrollTo({
        top: 10,
        behavior: 'smooth'
    });

    return (
        <>
            <HeaderSection
                headerIcon={<HiUserPlus />}
                headerTitle={"Formulário de Cadastro de Morador"}
            />
            <section className="mainWrapper">
                {currentStep === 1 && (
                    <ResidentPersonalDataForm
                        onSubmit={handleFirstSubmit}
                        prevData={residentData}
                    />
                )}

                {currentStep === 2 && (
                    <ResidentAddressForm
                        onSubmit={handleLastSubmit}
                        onBack={handleGoBackStep}
                    />
                )}
                {isModalOpen && (
                    <CustomModal
                        modalTitle="Cadastrado com Sucesso!"
                        modalDescription="Seu cadastro foi realizado com sucesso."
                        functionToCloseModal={handleCloseModal}
                        modalIcon={
                            <HiCheckBadge
                                color="#23C366"
                                size={56}
                            />
                        }
                    />
                )}
            </section>
        </>
    );
};

export default ResidentFormManager;
