import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiBuildingOffice2, HiCheckBadge } from "react-icons/hi2";
import HeaderSection from "@/components/HeaderSection";
import CondoUnitForm from "@/components/CondoUnits/CondoUnitForm/CondoUnitForm";
import CondoUnitResidentsForm from "@/components/CondoUnits/CondoUnitForm/CondoUnitResidentsForm";
import CustomModal from "@/components/CustomModal";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

const CondoUnitFormManager = () => {
    const [condoUnitData, setCondoUnitData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const handleFirstSubmit = async (dataFromCondoUnitForm) => {
        setCondoUnitData({
            ...condoUnitData,
            ...dataFromCondoUnitForm
        });

        setCurrentStep(2);

        window.scrollTo({
            top: 10,
            behavior: 'smooth'
        });
    };

    const handleLastSubmit = async (dataFromCondoResidentsForm) => {

        const finalDataToCreateCondoUnit = {
            ...condoUnitData,
            ...dataFromCondoResidentsForm
        };

        try {
            await axios.post(
                '/api/create/condo-units',
                finalDataToCreateCondoUnit
            );

            setIsModalOpen(true);

        } catch (error) {
            console.log(
                `${defaultErrorMessage.internalServerError}`,
                error.message
            );
        };
    };

    const handleGoBackPage = () => {
        setCurrentStep(1);

        window.scrollTo({
            top: 10,
            behavior: 'smooth'
        });
    };

    const handleCloseModal = () => {
        router.push("/unidades/listadeunidades");
        setIsModalOpen(false);
    };

    return (
        <>
            <HeaderSection
                headerIcon={<HiBuildingOffice2 />}
                headerTitle={"Formulário de Cadastro de Unidade"}
            />

            <section className="mainWrapper">
                {currentStep === 1 && (
                    <CondoUnitForm
                        onSubmit={handleFirstSubmit}
                        prevData={condoUnitData}
                    />
                )}

                {currentStep === 2 && (
                    <CondoUnitResidentsForm
                        onSubmit={handleLastSubmit}
                        onBack={handleGoBackPage}
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

export default CondoUnitFormManager;
