import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiCheckBadge, HiClipboardDocumentList, HiMiniCalendarDays } from "react-icons/hi2";
import HeaderSection from "@/components/HeaderSection";
import CustomModal from "@/components/CustomModal";
import CondoUnitAccessLog from "@/components/AccessLog/AccessLogForm/CondoUnitAccessLogForm";
import ResidentsAccessLog from "@/components/AccessLog/AccessLogForm/ResidentsAccessLogForm";
import AccessLogDateForm from "@/components/AccessLog/AccessLogForm/AccessLogDateForm";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

const AcccesLogFormManager = () => {
      const [condoUnitData, setCondoUnitData] = useState([]);
      const [residentsData, setResidentsData] = useState([]);
      const [currentStep, setCurrentStep] = useState(1);
      const [isModalOpen, setIsModalOpen] = useState(false);

      const router = useRouter();

      const handleFirstSubmit = async (condoUnitsIds) => {
            setCondoUnitData({
                  ...condoUnitData,
                  ...condoUnitsIds
            });

            setCurrentStep(2);

            window.scrollTo({
                  top: 10,
                  behavior: 'smooth'
            });
      };

      const handleSecondSubmit = async (residentsIds) => {
            setResidentsData({
                  ...residentsData,
                  ...residentsIds
            });

            setCurrentStep(3);

            window.scrollTo({
                  top: 10,
                  behavior: 'smooth'
            });
      };

      const handleLastSubmit = async (checkData) => {
            const finalData = {
                  ...condoUnitData,
                  ...residentsData,
                  ...checkData,
            };

            try {
                  await axios.post(
                        '/api/create/access-log',
                        finalData
                  );

                  setIsModalOpen(true);

            } catch (error) {
                  console.log(
                        `${defaultErrorMessage.internalServerError}`,
                        error.message
                  );
            };
      };

      const handleGoBackStepOne = () => {
            setCurrentStep(1);
            window.scrollTo({
                  top: 10,
                  behavior: 'smooth'
            });
      };

      const handleCloseModal = () => {
            setIsModalOpen(false);
            router.push("/acessos/listadeacessos");
      };

      return (
            <>
                  <HeaderSection
                        headerIcon={<HiMiniCalendarDays />}
                        headerTitle={"Agendamento de Acesso"}
                  />
                  <section className="mainWrapper">
                        {currentStep === 1 && (
                              <CondoUnitAccessLog
                                    onSubmit={handleFirstSubmit}
                                    prevData={condoUnitData}
                              />
                        )}

                        {currentStep === 2 && (
                              <ResidentsAccessLog
                                    onSubmit={handleSecondSubmit}
                                    onBack={handleGoBackStepOne}
                              />
                        )}
                        {currentStep === 3 && (
                              <AccessLogDateForm
                                    onSubmit={handleLastSubmit}
                                    prevData={residentsData}
                                    onBack={handleGoBackStepOne}
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

export default AcccesLogFormManager;
