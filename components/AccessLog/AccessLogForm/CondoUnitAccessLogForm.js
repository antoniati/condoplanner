import axios from "axios";
import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";
import InputForm from "@/components/InputForm";
import SpinnerSyncLoader from "@/components/Loadings/SpinnerSyncLoader";
import { accessLogCondoUnitField } from "@/utils/inputFields/accessLogInputFields";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

const CondoUnitAccesLogForm = ({ onSubmit, prevData }) => {

      const [formData, setFormData] = useState({ condoUnitNumber: "" })
      const [condoUnitData, setCondoUnitData] = useState([]);
      const [errorMessage, setErrorMessage] = useState({});
      const [showTable, setShowTable] = useState(false);
      const [isUploading, setIsUploading] = useState(false);

      useEffect(() => {
            prevData && setFormData(prevData);
      }, [prevData]);

      const handleChangesInputFields = async (e) => {
            const { name, value } = e.target;

            setFormData((prevData) => ({
                  ...prevData,
                  [name]: value
            }));

            setErrorMessage({});
            setShowTable(false);
      };

      const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                  e.preventDefault();
                  handleFetchCondoUnitData();
            };
      };

      const handleFormSubmit = async (e) => {
            e.preventDefault();

            try {
                  onSubmit({
                        condoUnitId: condoUnitData[0]._id
                  });

            } catch (error) {
                  console.log(
                        `${defaultErrorMessage.internalServerError}`,
                        error.message
                  );
            }
      };

      const handleFetchCondoUnitData = async () => {
            setIsUploading(true);
            try {
                  const response = await axios.get(
                        `/api/fetch/condoUnit/${formData.condoUnitNumber}`
                  );

                  if (response.status === 200) {
                        setCondoUnitData([response.data.data]);
                        setShowTable(true);

                  } else {
                        setShowTable(false);
                  }

                  setIsUploading(false);

            } catch (error) {
                  if (error.response.status === 404) {
                        setIsUploading(false);
                        setErrorMessage({
                              condoUnitNumber: `${defaultErrorMessage.dataNotFound}`
                        })
                  };
            };
      };

      const inputField = accessLogCondoUnitField[0];
      const condoUnit = condoUnitData[0];

      return (
            <section className="sectionContainer">
                  <form
                        onSubmit={handleFormSubmit}
                        className={"basicForm"}
                  >
                        <InputForm
                              inputLabelText={inputField.label}
                              inputType={inputField.type}
                              inputName={inputField.name}
                              inputValue={formData[inputField.name]}
                              inputPlaceholder={inputField.placeholder}
                              inputMaxLength={inputField.maxLength}
                              errorMessage={errorMessage[inputField.name]}
                              inputOnChange={handleChangesInputFields}
                              inputKeyDown={handleKeyDown}
                        >
                              <CustomButton
                                    buttonType={"button"}
                                    buttonStyle={"blue-button"}
                                    buttonIcon={<HiMagnifyingGlass size={27} />}
                                    buttonFunction={handleFetchCondoUnitData}
                              />
                        </InputForm>

                        {isUploading && <SpinnerSyncLoader />}

                        {showTable && (
                              <>
                                    <section className="basicTable">
                                          <table>
                                                <thead>
                                                      <tr>
                                                            <th>Status</th>
                                                            <th>Moradores</th>
                                                            <th>Número da Unidade</th>
                                                            <th>Bloco</th>
                                                            <th>Tipo</th>
                                                            <th>Nome do Títular</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      <tr>
                                                            <td>{condoUnit.accessLogs.length === 0 ? "N/A" : (
                                                                  () => {
                                                                        const currentDate = new Date();
                                                                        let activeAccess = null;
                                                                        let pendingAccess = null;
                                                                        let finalizedAccess = null;

                                                                        condoUnit.accessLogs.forEach(accessLog => {
                                                                              const startDate = new Date(accessLog.checkIn);
                                                                              const endDate = new Date(accessLog.checkOut);

                                                                              if (accessLog.statusAccessLog === "ativo") {
                                                                                    activeAccess = accessLog;
                                                                              } else if (accessLog.statusAccessLog === "pendente" && startDate > currentDate && (!pendingAccess || startDate < new Date(pendingAccess.checkIn))) {
                                                                                    pendingAccess = accessLog;
                                                                              } else if (accessLog.statusAccessLog === "finalizado" && (!finalizedAccess || endDate > new Date(finalizedAccess.checkOut))) {
                                                                                    finalizedAccess = accessLog;
                                                                              }
                                                                        });

                                                                        if (activeAccess) {
                                                                              return "Ativo";
                                                                        } else if (pendingAccess) {
                                                                              return "Pendente";
                                                                        } else if (finalizedAccess) {
                                                                              return "Finalizado";
                                                                        }

                                                                        return "N/A";
                                                                  })()
                                                            }
                                                            </td>
                                                            <td>{condoUnit.accessLogs.filter(accessLog => accessLog.statusAccessLog !== "finalizado").reduce((total, accessLog) => total + (accessLog.residents?.length || 0), 0)}</td>
                                                            <td>{condoUnit.condoUnitNumber}</td>
                                                            <td>{condoUnit.condoUnitBlock}</td>
                                                            <td>{condoUnit.typeOfCondoUnit}</td>
                                                            <td>{condoUnit?.residents?.find(resident => resident.isHolder)?.residentId.residentFullName}</td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </section>

                                    <span>
                                          <CustomButton
                                                buttonType={"submit"}
                                                buttonStyle={"black-button"}
                                                buttonText={"Próxima Etapa"}
                                          />
                                    </span>
                              </>
                        )}
                  </form>
            </section >
      );
}

export default CondoUnitAccesLogForm;