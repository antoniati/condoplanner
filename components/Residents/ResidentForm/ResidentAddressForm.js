import { useState } from "react";
import { HiUserPlus } from "react-icons/hi2";

import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";

import { applyCEPMask } from "@/utils/inputFields/inputFieldsMask";
import { fetchAndPopulateAddressData } from "@/utils/fetchData/fetchAndPopulateAddressData";
import { residentAddressFormInitialData, residentAdressInputFields, residentFieldsNames } from "@/utils/inputFields/residentInputFields";

import style from "@/styles/BasicForm.module.css";

const ResidentFormAddress = ({ onSubmit, onBack, prevData }) => {
    const [formData, setFormData] = useState({ ...prevData, ...residentAddressFormInitialData, });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        let maskedValue = value;

        if (name === residentFieldsNames[10]) {
            maskedValue = applyCEPMask(value);
        }
        setFormData({ ...formData, [name]: maskedValue });
        cleanErrorMessage(name);
    };

    const cleanErrorMessage = (fieldName) => {
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
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

    return (
        <>
            <HeaderSection
                headerIcon={<HiUserPlus size={36} />}
                headerTitle={"Formulário de Cadastro de Morador"}
            >
                <p>
                    Preencha os campos do formulário abaixo com o Endereço do Morador para Cadastrá-los
                </p>
            </HeaderSection>

            <section className={"mainWrapper"}>
                <form onSubmit={handleFormSubmit} className={style.formContent}>
                    <h2 className={style.titleForm}>
                        Endereço do Morador
                        <span> Etapa: 2/2 </span>
                    </h2>

                    <section className={style.formSection}>
                        {residentAdressInputFields.map((field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name]}
                                inputPlaceholder={field.placeholder}
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessage[field.name]}
                                inputOnBlur={handleCEPBlur}
                                inputMaxLength={field.maxLength}
                            />
                        ))}
                    </section>

                    <div className={style.buttonsForm}>
                        <CustomButton
                            type={"submit"}
                            buttonStyle={"blue-button"}
                            buttonText={"Salvar Cadastro"}
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
        </>
    );
};

export default ResidentFormAddress;
