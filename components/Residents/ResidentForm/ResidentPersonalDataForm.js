import { useEffect, useState } from "react";
import { HiUserPlus } from "react-icons/hi2";

import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";
import InputImage from "@/components/InputImage";

import { filterOptionsResidents } from "@/utils/inputFields/filterOptions";
import { applyCPFMask, applyPhoneMask, applyRGMask } from "@/utils/inputFields/inputFieldsMask";
import { residentFieldsNames, residentPersonalDataFormInitialData, residentPersonalDataInputFields } from "@/utils/inputFields/residentInputFields";

import style from "@/styles/BasicForm.module.css";

const ResidentPersonalDataForm = ({ onSubmit, prevData }) => {
    const [formData, setFormData] = useState({
        ...prevData,
        ...residentPersonalDataFormInitialData,
        residentImage: null,
    });

    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        prevData && setFormData(prevData);
    }, [prevData]);

    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        let maskedValue = value;
        
        if (name === residentFieldsNames[3]) {
            maskedValue = applyCPFMask(value);
        } else if (name === residentFieldsNames[2]) {
            maskedValue = applyRGMask(value);
        } else if (name === residentFieldsNames[6]) {
            maskedValue = applyPhoneMask(value);
        }

        setFormData({ ...formData, [name]: maskedValue });

        cleanErrorMessage(name);
    };

    const cleanErrorMessage = (fieldName) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <>
            <HeaderSection
                headerIcon={<HiUserPlus size={36} />}
                headerTitle={"Formulário de Cadastro de Morador"}
            >
                <p>
                    Preencha os campos do formulário abaixo com os Dados Pessoais
                    do Morador para Cadastrá-los.
                </p>
            </HeaderSection>

            <section className={"mainWrapper"}>
                <form onSubmit={handleFormSubmit} className={style.formContent}>
                    <h2 className={style.titleForm}>
                        Dados Pessoais do Morador
                        <span> Etapa: 1/2 </span>
                    </h2>

                    <InputImage onImageSelect={(image) => setFormData({
                        ...formData,
                        residentImage: image
                    })}
                    />

                    <section className={style.formSection}>
                        {residentPersonalDataInputFields.map((field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name]}
                                inputPlaceholder={field.placeholder}
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessages[field.name]}
                                inputMaxLength={field.maxLength}
                            />
                        ))}

                        <div className={style.formOption}>
                            <label>Tipo</label>
                            <select
                                name={residentFieldsNames[9]}
                                value={formData.typeOfResident}
                                onChange={handleChangesInputFields}
                                className={errorMessages && "error-input" || ""}
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
                            {errorMessages.typeOfResident && (
                                <p className="error-message">
                                    {errorMessages.typeOfResident}
                                </p>
                            )}
                        </div>
                    </section>

                    <div className={style.buttonsForm}>
                        <CustomButton
                            type={"submit"}
                            buttonStyle={"black-button"}
                            buttonText={"Próxima Etapa"}
                        />
                    </div>
                </form>

            </section>
        </>
    );
};

export default ResidentPersonalDataForm;
