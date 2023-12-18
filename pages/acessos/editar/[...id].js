import { HiClipboardDocumentList, HiExclamationCircle, HiOutlineCalendarDays, HiOutlineExclamationCircle, HiOutlineUserPlus } from "react-icons/hi2";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import AccessLogEditForm from "@/components/AccessLog/AccessLogForm/AccessLogEditForm";
import CustomButton from "@/components/Buttons/CustomButton";
import { useState } from "react";
import ResidentsAccessLogForm from "@/components/AccessLog/AccessLogForm/ResidentsAccessLogForm";
import ResidentsAccessLogEditForm from "@/components/AccessLog/AccessLogForm/ResidentsAccessLogEditForm";

export default function EditCondoUnitPage() {
      const [showForm, setShowForm] = useState(1);

      return (
            <Layout>
                  <HeaderSection
                        headerIcon={<HiClipboardDocumentList />}
                        headerTitle={"Edição de Acesso"}
                  >
                        <CustomButton
                              buttonIcon={<HiOutlineCalendarDays size={24} />}
                              buttonStyle={"blue-button"}
                              buttonText={"Reagendar Acesso"}
                              buttonFunction={() => setShowForm(2)}
                        />
                        <CustomButton
                              buttonIcon={<HiOutlineUserPlus size={24} />}
                              buttonStyle={"black-button"}
                              buttonText={"Adicionar Residentes"}
                              buttonFunction={() => setShowForm(3)}
                        />
                  </HeaderSection>
                  <section className="mainWrapper">
                        {showForm === 1 && (
                              <section className="sectionContainer">
                                    <div className="defaultTitle">
                                          <span></span>
                                          <div className="flex  text-dark-gray flex-col gap-5 sm:flex-row sm:gap-2 items-center">
                                                <HiOutlineExclamationCircle size={26} />
                                                <p>
                                                      Escolha uma das opções acima para Editar
                                                </p>
                                          </div>
                                    </div>
                              </section>
                        )}
                        {showForm === 2 && (
                              <AccessLogEditForm />
                        )}
                        {showForm === 3 && (
                              <ResidentsAccessLogEditForm />
                        )}
                  </section>
            </Layout >
      );
};
