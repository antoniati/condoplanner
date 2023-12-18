import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiCheckBadge } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";
import InputForm from "@/components/InputForm";
import InputImage from "@/components/InputImage";
import CustomModal from "@/components/CustomModal";
import { applyCPFMask, applyPhoneMask, applyRGMask } from "@/utils/inputFields/inputFieldsMask";
import { residentFieldsNames, residentPersonalDataInputFields } from "@/utils/inputFields/residentInputFields";
import { filterOptionsResidents } from "@/utils/inputFields/filterOptions";
import { fetchResidentDataById } from "@/utils/fetchData/fetchResidentById";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { cleanErrorMessage } from "@/utils/inputFields/cleanErrorMessage";
import { FaRegAddressCard } from "react-icons/fa6";

const ResidentPersonalDataEditForm = () => {
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

      const handleChangesInputFields = (e) => {
            const { name, value } = e.target;
            let maskedValue = value;

            if (name === "residentCpfNumber") {
                  maskedValue = applyCPFMask(value);
            } else if (name === "residentRgNumber") {
                  maskedValue = applyRGMask(value);
            } else if (name === "residentContactPhone") {
                  maskedValue = applyPhoneMask(value);
            }

            setFormData({ ...formData, [name]: maskedValue });

            cleanErrorMessage(name, setErrorMessage);
      }

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
                                    <FaRegAddressCard size={24} />
                                    Formulário de Dados Pessoais
                              </div>
                        </h2>
                        <InputImage
                              onImageSelect={(image) =>
                                    setFormData({
                                          ...formData,
                                          residentImage: image
                                    })
                              }
                        />
                        <section>
                              {residentPersonalDataInputFields.map((field, index) => (
                                    <InputForm
                                          key={index}
                                          inputLabelText={field.label}
                                          inputType={field.type}
                                          inputName={field.name}
                                          inputValue={formData[field.name]}
                                          inputMaxLength={field.maxLength}
                                          inputOnChange={handleChangesInputFields}
                                          errorMessage={errorMessage[field.name]}
                                    />
                              ))}
                              <div className={"formOption"}>
                                    <label>Tipo</label>
                                    <select
                                          name={residentFieldsNames[9]}
                                          value={formData.typeOfResident}
                                          onChange={handleChangesInputFields}
                                    >
                                          <option value="">Selecione um Tipo</option>
                                          {filterOptionsResidents.map((option) => (
                                                <option
                                                      key={option.value}
                                                      value={option.value}
                                                >
                                                      {option.label}
                                                </option>
                                          ))}
                                    </select>
                              </div>
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

export default ResidentPersonalDataEditForm;