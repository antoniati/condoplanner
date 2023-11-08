import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import ResidentPersonalDataForm from "@/components/ResidentForm/ResidentPersonalDataForm";
import ResidentFormAddressForm from "@/components/ResidentForm/ResidentAddressForm";

const ResidentFormManager = () => {
    const [residentData, setResidentData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);

    const router = useRouter();

    const handleFirstSubmit = (personalData) => {
        setResidentData({ ...residentData, ...personalData });
        setCurrentStep(2);
    };

    const handleLastSubmit = async (addressData) => {
        const finalData = { ...residentData, ...addressData };

        try {
            await axios.post('/api/residents', finalData);
            router.push("/moradores");
            console.log("dados salvos com sucesso!")
        } catch (error) {
            console.log("Erro ao enviar os dados:", error);
        };
    };

    const handleGoBackStep = () => {
        setCurrentStep(1);
        window.scrollTo({ top: 10, behavior: 'smooth' });
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
        </>
    );
};

export default ResidentFormManager;
