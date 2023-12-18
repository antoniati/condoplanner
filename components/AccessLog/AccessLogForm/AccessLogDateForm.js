import { useEffect, useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import InputForm from "@/components/InputForm";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { accessLogDateField, filterOptionsAccessLog } from "@/utils/inputFields/accessLogInputFields";

const AccessLogDateForm = ({
      onSubmit,
      prevData,
      onBack
}) => {
      const initialFormData = {
            checkIn: "",
            checkOut: "",
      }

      const [formData, setFormData] = useState({
            ...prevData,
            ...initialFormData
      });

      const [errorMessage, setErrorMessages] = useState({});

      useEffect(() => {
            prevData && setFormData(prevData);
      }, [prevData]);

      const handleChangesInputFields = (e) => {
            const { name, value } = e.target;

            setFormData({
                  ...formData,
                  [name]: value,
            });

            setErrorMessages((prevErrors) => ({
                  ...prevErrors,
                  [name]: "",
            }));
      };

      const handleFormSubmit = async (e) => {
            e.preventDefault();

            try {
                  onSubmit({ ...formData });

            } catch (error) {
                  console.log(
                        `${defaultErrorMessage.internalServerError}`,
                        error.message
                  );
            };
      };

      return (
            <section className={"sectionContainer"}>
                  <form
                        onSubmit={handleFormSubmit}
                        className={"basicForm"}
                  >
                        <h2 className={"defaultTitle"}>
                              Dados de Check-In e Check-Out
                              <span> Etapa: 3/3 </span>
                        </h2>

                        <section>
                              {accessLogDateField.map((field, index) => (
                                    <InputForm
                                          key={index}
                                          inputLabelText={field.label}
                                          inputType={field.type}
                                          inputName={field.name}
                                          inputValue={formData[field.name]}
                                          inputOnChange={handleChangesInputFields}
                                          errorMessage={errorMessage[field.name]}
                                          inputMaxLength={field.maxLength}
                                    />
                              ))}
                        </section>

                        <div className={"buttonsForm"}>
                              <CustomButton
                                    type={"submit"}
                                    buttonStyle={"blue-button"}
                                    buttonText={"Agendar"}
                              />
                              <CustomButton
                                    type={"button"}
                                    buttonStyle={"black-button"}
                                    buttonText={"Voltar"}
                                    buttonFunction={onBack}
                              />
                        </div>
                  </form>
            </section>
      );
};

export default AccessLogDateForm;
