import { useState } from "react";

import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";

import { inputsAddressValues } from "@/utils/inputFields";
import { fetchAndPopulateAddressData } from "@/utils/fetchAddresData";

import { HiUserPlus } from "react-icons/hi2";

import style from "@/styles/BasicForm.module.css";


const ResidentFormAddress = ({ onSubmit, onBack, prevData }) => {
    const initialDataAddressResident = {
        residentZipCode: "",
        residentStreet: "",
        streetComplement: "",
        residentNeighborhood: "",
        residentCity: "",
        residentState: "",
    }

    const [formData, setFormData] = useState({
        ...prevData,
        ...initialDataAddressResident,
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
    }

    const handleCEPBlur = async (e) => {
        const cep = e.target.value;
        const result = await fetchAndPopulateAddressData(cep, formData, setFormData);

        if (result.success) {
            setErrorMessage("");
            return;
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
                    Preencha os campos do formulário abaixo com o
                    Endereço do Morador para Cadastra-los
                </p>
            </HeaderSection>
            <section className={style.formContainer}>
                <form
                    className={style.formContent}
                    onSubmit={handleFormSubmit}
                >
                    <h2 className={style.titleForm}>
                        Endereço do Morador
                    </h2>
                    <section className={`${style.formSection} mt-2`}>
                        {inputsAddressValues.map((field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name] || ""}
                                inputPlaceholder={field.placeholder}
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessage[field.name]}
                                inputOnBlur={handleCEPBlur}
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
