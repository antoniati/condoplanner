import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiBuildingOffice2, HiCheckBadge, HiTrash } from "react-icons/hi2";

import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/Buttons/CustomButton";
import CustomModal from "@/components/CustomModal";

import {
    condoUnitDataInputFields,
    filterOptionsCondoUnits
} from "@/utils/inputFields/condoUnitInputFields";

import style from "@/styles/BasicForm.module.css";
import { fetchCondoUnitDataById } from "@/utils/fetchData/fetchCondoUnitDataById";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import SpinnerBouceLoader from "@/components/Loadings/SpinnerBouceLoader";
import { HiOutlineUpload } from "react-icons/hi";

export default function EditCondoUnitPage() {
    const [formData, setFormData] = useState({});
    const [condoUnitImages, setCondoUnitImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [currentCondoUnitImages, setCurrentCondoUnitImages] = useState([]);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const handleFetchCondoUnitData = async () => {
            const condoUnit = await fetchCondoUnitDataById(id);
            setFormData(condoUnit);
            setCurrentCondoUnitImages(condoUnit.condoUnitImages || []);
        };

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

    const cleanErrorMessage = (fieldName) => {
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    const handleUpdateCondoUnit = async (e) => {
        e.preventDefault();
        try {
            // Clona o estado atual de formData para evitar modificações diretas no estado.
            const updatedFormData = { ...formData };

            // Inclui tanto as imagens existentes quanto as novas no corpo da requisição.
            updatedFormData.condoUnitImages = [...currentCondoUnitImages, ...condoUnitImages];

            // Envia a requisição de atualização com o novo formData.
            const response = await axios.put(`/api/update/updateCondoUnit/${id}`, updatedFormData);

            if (response.data.success) {
                setIsModalOpen(true);
            }

        } catch (error) {
            if (error.response?.status === 404) {
                throw new Error(`${defaultErrorMessage.dataNotFound} : ${error.message}`);
            } else if (error.response?.status === 405) {
                throw new Error(`${defaultErrorMessage.methodNotAllowed} / ${error.response.status}`);
            }
            throw new Error(`${defaultErrorMessage.internalServerError} / ${error.message}`);
        }
    };

    const handleUploadCondoUnitImages = async (e) => {
        const files = e.target?.files;

        if (files.length + currentCondoUnitImages.length > 3) {
            setErrorMessage({ images: "Só é possível enviar até 3 imagens." });
            setTimeout(() => cleanErrorMessage("images"), 5000);
            return;
        }

        setErrorMessage({ images: "" });

        if (files.length > 0) {
            setIsUploadingImage(true);

            const data = new FormData();

            for (const file of files) {
                data.append('file', file);
            }

            try {
                const res = await axios.post("/api/uploadImages", data);

                // Adiciona as novas imagens ao estado, sem substituir as existentes
                setCondoUnitImages((prevImages) => [...prevImages, ...res.data.links]);

                setIsUploadingImage(false);
            } catch (error) {
                console.error("Erro na solicitação de upload:", error);
                setIsUploadingImage(false);
            }
        }
    };

    const handleRemoveImage = (index, isNewImage) => {
        if (isNewImage) {
            // Remove a imagem do estado de condoUnitImages
            setCondoUnitImages((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages.splice(index, 1);
                return updatedImages;
            });
        } else {
            // Remove a imagem do estado de currentCondoUnitImages
            setCurrentCondoUnitImages((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages.splice(index, 1);
                return updatedImages;
            });
        }
    };

    const handleGoBackPage = () => {
        router.push(`/unidades/detalhes/${id}`);
    };

    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiBuildingOffice2 size={36} />}
                headerTitle={"Formulário de Edição de Unidade"}
            >
                <p>
                    Preencha os campos do formulário abaixo para
                    editar as informações da unidade.
                </p>
            </HeaderSection>
            <section className={"mainWrapper"}>
                <form className={"sectionContainer"} onSubmit={handleUpdateCondoUnit}>
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
                                name="condoUnitStatus"
                                value={formData.condoUnitStatus}
                                onChange={handleChangesInputFields}
                                className={errorMessage && "error-input" || ""}
                            >
                                <option value="">
                                    Selecione um Status
                                </option>
                                {/* Mapeamento das opções de filtro para o status da unidade */}
                                {filterOptionsCondoUnits.map((option) => (
                                    <option key={option.value} value={option.value} >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {/* Exibição de mensagem de erro para o status da unidade */}
                            {errorMessage.condoUnitStatus && (
                                <p className="error-message">
                                    {errorMessage.condoUnitStatus}
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

                            {/* Mapeia sobre as novas imagens enviadas */}
                            {condoUnitImages.map((link, index) => (
                                <div key={`new-${index}`} className="relative">
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

                        {errorMessage.condoUnitStatus && (
                            <span> <p> {errorMessage.condoUnitStatus}</p> </span>
                        )}
                    </section>

                    <section className={`${style.buttonsForm} mt-5`}>
                        <CustomButton
                            buttonType="submit"
                            buttonText={"Salvar Edição"}
                            buttonStyle="blue-button"
                            buttonFunction={handleUpdateCondoUnit}
                        />
                        <CustomButton
                            buttonType="button"
                            buttonText={"Cancelar"}
                            buttonStyle="black-button"
                            buttonFunction={handleGoBackPage}
                        />
                    </section>
                </form>
            </section >

            {isModalOpen && (
                <CustomModal
                    modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                    modalTitle="Editado com Sucesso!"
                    modalDescription="As informações foram editadas com sucesso."
                    functionToCloseModal={handleGoBackPage}
                />
            )
            }
        </Layout >
    );
};
