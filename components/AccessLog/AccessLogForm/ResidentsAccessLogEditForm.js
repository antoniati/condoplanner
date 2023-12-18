import axios from "axios";
import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/Buttons/CustomButton";
import SpinnerSyncLoader from "@/components/Loadings/SpinnerSyncLoader";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { removeNonNumericCharacters } from "@/utils/formatData/removeNonNumericCharacters";
import { residentPersonalDataInputFields } from "@/utils/inputFields/residentInputFields";
import { useRouter } from "next/router";
import changesInputFields from "@/utils/inputFields/changeInputFields";
import { fetchAccessLogDataById } from "@/utils/fetchData/fetchAccessLogDataById";
import CustomModal from "@/components/CustomModal";
import { FaUserCheck } from "react-icons/fa6";

const ResidentsAccessLogEditForm = () => {
      const [residentData, setResidentsData] = useState([]);
      const [selectedResidents, setSelectedResidents] = useState([]);
      const [accessLogResponsible, setAccessLogResponsible] = useState(null);
      const [isShowAddResident, setIsShowAddResident] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);

      const [formData, setFormData] = useState({
            residentRgNumber: ""
      });

      const [isUploading, setIsUploading] = useState(false);
      const [errorMessage, setErrorMessage] = useState({});

      const router = useRouter();
      const { id } = router.query;

      useEffect(() => {
            if (id) {
                  handleFetchAccessLogData();
            }
      }, [id]);

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
                        residentId: resident.residentId || resident._id,
                        isResponsible: resident.isResponsible || resident === accessLogResponsible,
                  }));

                  const response = await axios.put(
                        `/api/update/updateResidentsAccessLog/${id}`,
                        {
                              residents: residentsData
                        }
                  );

                  if (response.data.success) {
                        setIsModalOpen(true);
                  }

            } catch (error) {
                  console.log(
                        `${defaultErrorMessage.internalServerError}`,
                        error.message
                  );
            }
      };

      const handleAddResidentToList = (resident) => {
            const newResidents = [
                  ...selectedResidents,
                  resident
            ];

            setSelectedResidents(newResidents);

            if (!accessLogResponsible) {
                  setAccessLogResponsible(resident);
            }

            setIsShowAddResident(false);
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
            const updatedResidents = selectedResidents.map((selectedResident) => ({
                  ...selectedResident,
                  isResponsible: selectedResident === resident,
            }));

            setSelectedResidents(updatedResidents);
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
                        });
                  }
            }

            setIsUploading(false);
      };

      const handleFetchAccessLogData = async () => {
            const accessLogData = await fetchAccessLogDataById(id);
            setSelectedResidents(accessLogData.residents || []);
      };


      const handleGoBackPage = () => {
            router.push(`/acessos/detalhes/${id}`);
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
                                    inputOnChange={(event) => changesInputFields(
                                          event,
                                          formData,
                                          setFormData,
                                          setErrorMessage
                                    )}

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

                        {isShowAddResident && (
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
                                                {residentData.map((resident, index) => (
                                                      <tr key={index}>
                                                            <td className="photo">
                                                                  <img
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
                                                            <tr key={index}>
                                                                  <td>
                                                                        <input
                                                                              type="checkbox"
                                                                              checked={resident.isResponsible}
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
                        <section>
                              <CustomButton
                                    buttonType={"submit"}
                                    buttonStyle={"blue-button"}
                                    buttonText={"Salvar"}
                              />
                              <CustomButton
                                    buttonType={"button"}
                                    buttonStyle={"gray-button"}
                                    buttonText={"Cancelar"}
                              />
                        </section>
                  </form>
                  {isModalOpen && (
                        <CustomModal
                              modalIcon={<FaUserCheck color="#6597FF" size={56} />}
                              modalTitle="Editado com Sucesso!"
                              modalDescription="Os residentes relacionados ao acesso foram editados."
                              functionToCloseModal={handleGoBackPage}
                        />
                  )}
            </section>
      );
};

export default ResidentsAccessLogEditForm;
