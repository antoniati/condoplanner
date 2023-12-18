import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiCheckBadge, HiMapPin } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";
import InputForm from "@/components/InputForm";
import CustomModal from "@/components/CustomModal";
import { residentAdressInputFields } from "@/utils/inputFields/residentInputFields";
import { fetchResidentDataById } from "@/utils/fetchData/fetchResidentById";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import changesInputFields from "@/utils/inputFields/changeInputFields";
import { fetchAndPopulateAddressData } from "@/utils/fetchData/fetchAndPopulateAddressData";

const ResidentAddressDataEditForm = () => {
      const [formData, setFormData] = useState({});
      const [currentImage, setCurrentImage] = useState(null);
      const [errorMessage, setErrorMessage] = useState({});
      const [isModalOpen, setIsModalOpen] = useState(false);

      const router = useRouter();
      const { id } = router.query;

      useEffect(() => {
            if (id) {
                  handleFetchResidentData();
            }
      }, [id]);

      const handleFetchResidentData = async () => {
            const residentData = await fetchResidentDataById(id);
            setFormData(residentData);
            setCurrentImage(residentData.residentImage);
      };

      const handleCEPBlur = async (e) => {
            const cep = e.target.value;
            const result = await fetchAndPopulateAddressData(
                  cep,
                  formData,
                  setFormData
            );

            if (result.success) {
                  setErrorMessage("");
            } else {
                  setErrorMessage(result.message);
            }
      };

      const handleGoBackPage = () => {
            router.push(`/moradores/perfil/${id}`);
      }

      const handleUpdateResident = async (e) => {
            e.preventDefault();
            try {
                  const response = await axios.put(`/api/update/updateResident/${id}`, formData);

                  if (response.data.success) {
                        setIsModalOpen(true);

                        if (!formData.residentImage) {
                              setFormData({ ...formData, residentImage: currentImage });
                        }
                  }

            } catch (error) {
                  if (error.response?.status === 404) {
                        console.log(
                              `${defaultErrorMessage.dataNotFound}`,
                              error.response.status
                        );
                  } else if (error.response?.status === 405) {
                        console.log(
                              `${defaultErrorMessage.methodNotAllowed}`,
                              error.response.status
                        );
                  } else {
                        console.log(
                              `${defaultErrorMessage.internalServerError}`,
                              error.response.status
                        );
                  }
            }
      };

      return (
            <section className={"sectionContainer"}>
                  <form className={"basicForm"} >
                        <h2 className={"defaultTitle"}>
                              <div className="flex items-center gap-2">
                                    <HiMapPin size={24} />
                                    Formulário de Endereço
                              </div>
                        </h2>
                        <section>
                              {residentAdressInputFields.map(
                                    (field, index) => (
                                          <InputForm
                                                key={index}
                                                inputLabelText={field.label}
                                                inputType={field.type}
                                                inputName={field.name}
                                                inputValue={formData[field.name]}
                                                inputOnBlur={handleCEPBlur}
                                                inputOnChange={(event) =>
                                                      changesInputFields(
                                                            event,
                                                            formData,
                                                            setFormData,
                                                            setErrorMessage,
                                                      )}
                                          />
                                    ))}
                        </section>

                        <section>
                              <CustomButton
                                    buttonType="submit"
                                    buttonText={"Salvar"}
                                    buttonStyle="blue-button"
                                    buttonFunction={handleUpdateResident}
                              />
                              <CustomButton
                                    buttonType="button"
                                    buttonText={"Cancelar"}
                                    buttonStyle="gray-button"
                                    buttonFunction={handleGoBackPage}
                              />
                        </section>
                  </form>
                  {isModalOpen && (
                        <CustomModal
                              modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                              modalTitle="Editado com Sucesso!"
                              modalDescription="As informações foram editadas com sucesso."
                              functionToCloseModal={handleGoBackPage}
                        />
                  )}
            </section>
      );
};

export default ResidentAddressDataEditForm;