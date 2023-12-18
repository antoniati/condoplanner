import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import { fetchAccessLogDataById } from "@/utils/fetchData/fetchAccessLogDataById";
import { accessLogDateField } from "@/utils/inputFields/accessLogInputFields";
import InputForm from "@/components/InputForm";
import axios from "axios";
import CustomModal from "@/components/CustomModal";
import { FaCalendarCheck } from "react-icons/fa";
import { formatDate } from "@/utils/inputFields/inputFieldsMask";

const AccessLogEditForm = () => {
      const [formData, setFormData] = useState({});
      const [changes, setChanges] = useState({});
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [errorMessages, setErrorMessages] = useState({});

      const router = useRouter();
      const { id } = router.query;

      useEffect(() => {
            if (id) {
                  handleFetchAccessLogData();
            }
      }, [id]);

      const handleFetchAccessLogData = async () => {
            const accessLogData = await fetchAccessLogDataById(id);
            const formattedAccessLogData = {
                  ...accessLogData,
                  checkIn: formatDateToInput(accessLogData.accessLogData.checkIn),
                  checkOut: formatDateToInput(accessLogData.accessLogData.checkOut),
            };

            setFormData(formattedAccessLogData);
      };

      const formatDateToInput = (dateString) => {
            if (!dateString) {
                  return '';
            }

            const date = new Date(dateString);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
      };

      const handleFormSubmit = async (e) => {
            e.preventDefault();

            const changedFields = {};

            for (const key in formData) {
                  if (formData[key] !== changes[key]) {
                        changedFields[key] = formData[key];
                  }
            }

            try {
                  const response = await axios.put(`/api/update/updateAccessLogDate/${id}`, {
                        checkIn: new Date(formData.checkIn).toISOString(),
                        checkOut: formData.checkOut ? new Date(formData.checkOut).toISOString() : "",
                        statusAccessLog: "pendente",
                  });

                  if (response.data.success) {
                        setIsModalOpen(true);
                  }

            } catch (error) {
                  console.error('Erro ao atualizar dados de log de acesso:', error);
                  setErrorMessages({ updateError: 'Erro ao atualizar dados. Por favor, tente novamente.' });
            }
      };


      const handleGoBackPage = () => {
            router.push(`/acessos/detalhes/${id}`);
      };

      return (
            <section className={"sectionContainer"}>
                  <form
                        onSubmit={handleFormSubmit}
                        className={"basicForm"}
                  >
                        <h2 className={"defaultTitle"}>
                              Datas de Entrada e Saída
                        </h2>

                        <section>
                              {accessLogDateField.map((field, index) => (
                                    <InputForm
                                          key={index}
                                          inputLabelText={field.label}
                                          inputType={field.type}
                                          inputName={field.name}
                                          inputValue={formData[field.name]}
                                          inputMaxLength={field.maxLength}
                                          errorMessage={errorMessages[field.name]}
                                          inputOnChange={(event) => {
                                                const { name, value } = event.target;

                                                setChanges((prevChanges) => ({
                                                      ...prevChanges,
                                                      [name]: value,
                                                }));

                                                setFormData((prevData) => ({
                                                      ...prevData,
                                                      [name]: value,
                                                }));
                                          }}
                                    />
                              ))}
                        </section>

                        <div className={"buttonsForm"}>
                              <CustomButton
                                    type={"submit"}
                                    buttonStyle={"blue-button"}
                                    buttonText={"Salvar"}
                              />
                              <CustomButton
                                    buttonType="button"
                                    buttonText={"Cancelar"}
                                    buttonStyle="gray-button"
                                    buttonFunction={handleGoBackPage}
                              />
                        </div>
                  </form>
                  {isModalOpen && (
                        <CustomModal
                              modalIcon={<FaCalendarCheck color="#23C366" size={56} />}
                              modalTitle="Reagendado com Sucesso!"
                              modalDescription={
                                    <span>
                                          As datas foram alteradas para:<br />
                                          <b>Check-In:</b> {formatDate(formData.checkIn)}<br />
                                          <b>Check-Out:</b> {formatDate(formData.checkOut)}
                                    </span>
                              }
                              functionToCloseModal={handleGoBackPage}
                        />
                  )}
            </section>
      )
}

export default AccessLogEditForm;