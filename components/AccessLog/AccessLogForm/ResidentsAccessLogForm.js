import axios from "axios";
import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/Buttons/CustomButton";
import SpinnerSyncLoader from "@/components/Loadings/SpinnerSyncLoader";
import { applyRGMask } from "@/utils/inputFields/inputFieldsMask";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { removeNonNumericCharacters } from "@/utils/formatData/removeNonNumericCharacters";
import { residentPersonalDataInputFields } from "@/utils/inputFields/residentInputFields";

const ResidentsAccessLogForm = ({
      onSubmit,
      prevData,
      onBack
}) => {
      const initialFormData = { residentRgNumber: "", };

      const [residentData, setResidentsData] = useState([]);
      const [selectedResidents, setSelectedResidents] = useState([]);
      const [accessLogResponsible, setAccessLogResponsible] = useState(null);
      const [isShowAddResident, setIsShowAddResident] = useState(false);
      const [isShowResidentList, setIsShowResidentList] = useState(false);

      const [formData, setFormData] = useState({
            ...prevData,
            ...initialFormData
      });

      const [isUploading, setIsUploading] = useState(false);
      const [errorMessage, setErrorMessage] = useState({});

      useEffect(() => {
            prevData && setFormData(prevData);
      }, [prevData]);

      const handleChangesInputFields = async (e) => {
            const { name, value } = e.target;
            let maskedValue = applyRGMask(value);

            setFormData((prevData) => ({
                  ...prevData,
                  [name]: maskedValue
            }));

            setErrorMessage({});
            setIsShowAddResident(false);
      };

      const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                  e.preventDefault();
                  handleFetchCondoUnitResidentsByRg();
            };
      };

      const handleFormSubmit = async (e) => {
            e.preventDefault();

            try {
                  const residentsData = selectedResidents.map((resident) => ({
                        residentId: resident._id,
                        isResponsible: resident === accessLogResponsible,
                  }));

                  onSubmit({ residents: residentsData });

            } catch (error) {
                  console.log(
                        `${defaultErrorMessage.internalServerError}`,
                        error.message
                  );
            }
      };

      const handleAddResidentToList = (resident) => {
            setSelectedResidents([
                  ...selectedResidents,
                  resident
            ]);

            if (!accessLogResponsible) {
                  setAccessLogResponsible(resident);
            }

            setIsShowAddResident(false);
            setIsShowResidentList(true);
            setFormData({});
      };

      const handleRemoveResidentFromList = (index) => {
            const updatedResidents = [...selectedResidents];
            const removedResident = updatedResidents.splice(index, 1)[0];

            if (removedResident === accessLogResponsible) {
                  setAccessLogResponsible(null);
            }

            setSelectedResidents(updatedResidents);
      };

      const handleSetAccessLogResponsible = (resident) => {
            setAccessLogResponsible(resident);
      };

      const handleFetchCondoUnitResidentsByRg = async () => {
            setIsUploading(true);

            try {
                  const response = await axios.get(
                        `/api/fetch/residentData/${removeNonNumericCharacters(
                              formData.residentRgNumber
                        )}`
                  );

                  if (response.status === 200) {
                        setResidentsData([response.data.data]);
                        setIsShowAddResident(true);

                  } else {
                        setIsShowAddResident(false);
                  }

            } catch (error) {
                  if (error.response.status === 404) {
                        setErrorMessage({
                              residentRgNumber: `${defaultErrorMessage.dataNotFound}`
                        })
                  }
            }

            setIsUploading(false);
      };

      const inputField = residentPersonalDataInputFields[1];

      return (
            <section className="sectionContainer">
                  <form
                        className={"basicForm"}
                        onSubmit={handleFormSubmit}
                  >
                        <h2 className={"defaultTitle"}>
                              Adicione Residentes ao Acesso
                              <span> Etapa: 2/3 </span>
                        </h2>

                        <div>
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
                                          buttonFunction={handleFetchCondoUnitResidentsByRg}
                                    />
                              </InputForm>
                              {errorMessage && (
                                    <span>
                                          Insira o RG do Residentes para adiciona-lo ao Acesso
                                    </span>
                              )}
                        </div>

                        {isUploading && <SpinnerSyncLoader />}

                        {!errorMessage.residentRgNumber &&
                              isShowAddResident && (
                                    <section className={"basicTable"}>
                                          <table>
                                                <thead>
                                                      <tr>
                                                            <th className="photo">Foto</th>
                                                            <th>Nome do Morador</th>
                                                            <th>Tipo</th>
                                                            <th>Parentesco</th>
                                                            <th></th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {residentData.map((resident) => (
                                                            <tr key={resident?._id}>
                                                                  <td className="photo">
                                                                        <img
                                                                              alt="Foto do residente"
                                                                              src={
                                                                                    resident?.residentImage
                                                                                    || "/images/perfil-img.png"
                                                                              }
                                                                        />
                                                                  </td>
                                                                  <td>{resident?.residentFullName}</td>
                                                                  <td>{resident?.typeOfResident}</td>
                                                                  <td>{resident?.kinshipResident}</td>
                                                                  <td>
                                                                        <span>
                                                                              <CustomButton
                                                                                    buttonText={"Adicionar"}
                                                                                    buttonStyle={"blue-button"}
                                                                                    buttonType={"button"}
                                                                                    buttonFunction={() =>
                                                                                          handleAddResidentToList(resident)
                                                                                    }
                                                                              />
                                                                        </span>
                                                                  </td>
                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                          <span className="sm:hidden text-xs mt-2">
                                                Arraste para o lado para clicar no botão de adicionar
                                          </span>
                                    </section>
                              )}
                        {isShowResidentList &&
                              selectedResidents.length > 0 && (
                                    <>
                                          <section>
                                                <h2 className="defaultTitle">
                                                      Lista de Residentes
                                                      <span>({selectedResidents.length})</span>
                                                </h2>
                                                <section className={"basicTable"}>
                                                      <table>
                                                            <thead>
                                                                  <tr>
                                                                        <th className="w-20">Responsável</th>
                                                                        <th className="photo">Foto</th>
                                                                        <th>Nome do residente</th>
                                                                        <th>Tipo</th>
                                                                        <th>Parentesco</th>
                                                                        <th></th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {selectedResidents.map(
                                                                        (resident, index) => (
                                                                              <tr key={resident?._id}>
                                                                                    <td>
                                                                                          <input
                                                                                                type="checkbox"
                                                                                                checked={resident === accessLogResponsible}
                                                                                                onChange={() =>
                                                                                                      handleSetAccessLogResponsible(resident)
                                                                                                }
                                                                                          />
                                                                                    </td>
                                                                                    <td className="photo">
                                                                                          <img
                                                                                                alt="Foto do residente"
                                                                                                src={
                                                                                                      resident?.residentImage
                                                                                                      || "/images/perfil-img.png"
                                                                                                }
                                                                                          />
                                                                                    </td>
                                                                                    <td>{resident?.residentFullName}</td>
                                                                                    <td>{resident?.typeOfResident}</td>
                                                                                    <td>{resident?.kinshipResident}</td>
                                                                                    <td>
                                                                                          <span>
                                                                                                <CustomButton
                                                                                                      buttonText={"Remover"}
                                                                                                      buttonStyle={"red-button"}
                                                                                                      buttonType={"button"}
                                                                                                      buttonFunction={() =>
                                                                                                            handleRemoveResidentFromList(index)
                                                                                                      }
                                                                                                />
                                                                                          </span>
                                                                                    </td>
                                                                              </tr>
                                                                        ))}
                                                            </tbody>
                                                      </table>
                                                </section>
                                          </section>
                                          <div>
                                                <CustomButton
                                                      buttonType={"submit"}
                                                      buttonStyle={"black-button"}
                                                      buttonText={"Próxima Etapa"}
                                                />
                                          </div>
                                    </>
                              )}
                  </form>
            </section>
      );
};

export default ResidentsAccessLogForm;
