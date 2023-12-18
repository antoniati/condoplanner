import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  HiTrash } from "react-icons/hi2";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/Buttons/CustomButton";
import { condoUnitDataInputFields, filterOptionsCondoUnits } from "@/utils/inputFields/condoUnitInputFields";
import { fetchCondoUnitDataById } from "@/utils/fetchData/fetchCondoUnitDataById";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import SpinnerBouceLoader from "@/components/Loadings/SpinnerBouceLoader";
import { HiOutlineUpload } from "react-icons/hi";
import CustomModal from "@/components/CustomModal";
import style from "@/styles/BasicForm.module.css";
import { FaBuildingCircleCheck } from "react-icons/fa6";

const CondoUnitEditForm = () => {
      const [formData, setFormData] = useState({});
      const [condoUnitImages, setCondoUnitImages] = useState([]);
      const [errorMessage, setErrorMessage] = useState({});
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isUploadingImage, setIsUploadingImage] = useState(false);
      const [currentCondoUnitImages, setCurrentCondoUnitImages] = useState([]);

      const router = useRouter();
      const { id } = router.query;

      useEffect(() => {
            if (id) {
                  handleFetchCondoUnitData();
            }
      }, [id]);

      const handleChangesInputFields = (e) => {
            const { name, value } = e.target;

            setFormData({
                  ...formData,
                  [name]: value
            });

            cleanErrorMessage(name);
      };

      const handleUpdateCondoUnit = async (e) => {
            e.preventDefault();
            try {
                  const updatedFormData = { ...formData };

                  updatedFormData.condoUnitImages = [
                        ...currentCondoUnitImages,
                        ...condoUnitImages
                  ];

                  const response = await axios.put(
                        `/api/update/updateCondoUnit/${id}`,
                        updatedFormData
                  );

                  if (response.data.success) {
                        setIsModalOpen(true);
                  }

            } catch (error) {
                  if (error.response?.status === 404) {
                        console.log(
                              `${defaultErrorMessage.dataNotFound}`,
                              error.message
                        );
                  } else if (error.response?.status === 405) {
                        console.log(
                              `${defaultErrorMessage.methodNotAllowed}`,
                              error.response.status
                        );
                  } else {
                        console.log(
                              `${defaultErrorMessage.internalServerError}`,
                              error.message
                        );
                  };
            };
      };

      const handleUploadCondoUnitImages = async (e) => {
            const files = e.target?.files;

            if (files.length + currentCondoUnitImages.length > 3) {
                  setErrorMessage({
                        images: "Só é possível enviar até 3 imagens."
                  });

                  setTimeout(() =>
                        cleanErrorMessage("images"),
                        5000
                  );

                  return;
            };

            setErrorMessage({ images: "" });

            if (files.length > 0) {
                  setIsUploadingImage(true);

                  const data = new FormData();

                  for (const file of files) {
                        data.append('file', file);
                  }

                  try {
                        const res = await axios.post("/api/uploadImages", data);

                        setCondoUnitImages((prevImages) => [
                              ...prevImages,
                              ...res.data.links],
                        );

                        setIsUploadingImage(false);

                  } catch (error) {
                        console.error(
                              `${defaultErrorMessage.internalServerError}`,
                              error.message,
                        );
                        setIsUploadingImage(false);
                  };
            };
      };
      
      const handleRemoveImage = (index, isNewImage) => {
            if (isNewImage) {
                  setCondoUnitImages((prevImages) => {
                        const updatedImages = [...prevImages];
                        updatedImages.splice(index, 1);
                        return updatedImages;
                  });
            } else {
                  setCurrentCondoUnitImages((prevImages) => {
                        const updatedImages = [...prevImages];
                        updatedImages.splice(index, 1);
                        return updatedImages;
                  });
            }
      };

      const cleanErrorMessage = (fieldName) => {
            setErrorMessage((prevErrors) => ({
                  ...prevErrors,
                  [fieldName]: "",
            }));
      };

      const handleFetchCondoUnitData = async () => {
            const condoUnit = await fetchCondoUnitDataById(id);
            setFormData(condoUnit);
            setCurrentCondoUnitImages(condoUnit.condoUnitImages || []);
      };

      const handleGoBackPage = () => {
            router.push(`/unidades/detalhes/${id}`);
      };

      return (
            <section className={"sectionContainer"}>
                  <form
                        onSubmit={handleUpdateCondoUnit}
                        className={"basicForm"}
                  >
                        <h2 className={"defaultTitle"}>
                              Dados da Unidade
                        </h2>

                        <div className="flex gap-5 py-5 flex-wrap">
                              {condoUnitDataInputFields.map((field, index) => (
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
                              <div className={style.formOption}>
                                    <label> Status</label>
                                    <select
                                          name="typeOfCondoUnit"
                                          value={formData.typeOfCondoUnit}
                                          onChange={handleChangesInputFields}
                                          className={errorMessage && "error-input" || ""}
                                    >
                                          <option value="">
                                                Selecione um Status
                                          </option>
                                          {filterOptionsCondoUnits.map((option) => (
                                                <option
                                                      key={option.value}
                                                      value={option.value}
                                                >
                                                      {option.label}
                                                </option>
                                          ))}
                                    </select>

                                    {errorMessage.typeOfCondoUnit && (
                                          <p className="error-message">
                                                {errorMessage.typeOfCondoUnit}
                                          </p>
                                    )}
                              </div>
                        </div>

                        <section className={style.formUploadImages}>
                              <label> Imagens da Unidade </label>
                              <div>
                                    <label>
                                          <HiOutlineUpload size={26} />
                                          <h3> Upload </h3>
                                          <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleUploadCondoUnitImages}
                                          />
                                    </label>

                                    {currentCondoUnitImages.map((link, index) => (
                                          <div key={`existing-${index}`} className="relative">
                                                <img
                                                      src={link}
                                                      alt={`Imagem ${index + 1}`}
                                                      className="w-24 h-24 rounded-md object-cover"
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => handleRemoveImage(index)}
                                                      className="bg-red-400 hover:bg-red-500 p-2 rounded-full absolute -top-2 -right-3 shadow-sm transition-all duration-300"
                                                >
                                                      <HiTrash size={20} color="#FFF" />
                                                </button>
                                          </div>
                                    ))}

                                    {condoUnitImages.map((link, index) => (
                                          <div
                                                key={`new-${index}`}
                                                className="relative"
                                          >
                                                <img
                                                      src={link}
                                                      alt={`Nova Imagem ${index + 1}`}
                                                      className="w-24 h-24 rounded-md object-cover"
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => handleRemoveImage(index, true)}
                                                      className="bg-red-400 hover:bg-red-500 p-2 rounded-full absolute -top-2 -right-3 shadow-sm transition-all duration-300"
                                                >
                                                      <HiTrash size={20} color="#FFF" />
                                                </button>
                                          </div>
                                    ))}

                                    {isUploadingImage && <SpinnerBouceLoader />}
                              </div>

                              {errorMessage.typeOfCondoUnit && (
                                    <span>
                                          <p> {errorMessage.typeOfCondoUnit}</p>
                                    </span>
                              )}
                        </section>

                        <section className={`${style.buttonsForm} mt-5`}>
                              <CustomButton
                                    buttonType="submit"
                                    buttonText={"Salvar"}
                                    buttonStyle="blue-button"
                                    buttonFunction={handleUpdateCondoUnit}
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
                              modalIcon={<FaBuildingCircleCheck color="#6597FF" size={56} />}
                              modalTitle="Editado com Sucesso!"
                              modalDescription={
                                    <span>
                                          As informações da unidade:
                                          <b>{formData.condoUnitNumber}</b>, 
                                          bloco <b>{formData.condoUnitBlock.toUpperCase()}</b> <br/>
                                          foram 
                                          editadas com sucesso.
                                    </span>
                              }
                              functionToCloseModal={handleGoBackPage}
                        />
                  )}
            </section >
      );
};

export default CondoUnitEditForm;
