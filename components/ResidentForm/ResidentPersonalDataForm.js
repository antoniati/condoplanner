import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import HeaderSection from "@/components/HeaderSection";
import InputForm from "@/components/InputForm";
import InputImage from "../InputImage";
import { filterOptionsResidents, inputsPersonalDataValues } from "@/utils/inputFields";
import { HiUserPlus } from "react-icons/hi2";
import style from "@/styles/BasicForm.module.css"

const ResidentPersonalDataForm = ({ onSubmit, prevData }) => {
    const initialDataResidentForm = {
        residentFullName: "",
        residentCpfNumber: "",
        residentRgNumber: "",
        dateOfBirthOfResident: "",
        residentEmail: "",
        residentContactPhone: "",
        residentOcupation: "",
        kinshipResident: "",
        typeOfResident: "",
    }

    const [formData, setFormData] = useState({
        ...prevData,
        initialDataResidentForm
    });

    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        prevData && setFormData(prevData);
    }, [prevData]);

    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        cleanErrorMessage(name);
    };

    const cleanErrorMessage = (fieldName) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    const validateRiqueredFields = () => {
        const requiredFields = [
            'residentFullName',
            'residentRgNumber',
            'typeOfResident'
        ];

        let isValid = true;

        for (const field of requiredFields) {
            if (!formData[field]) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [field]: `Este campo é obrigatório.`,
                }));
                isValid = false;
            }
        }

        return isValid;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // if (!validateRiqueredFields()) {
        //     return;
        // }

        onSubmit(formData);
    }

    return (
        <>
            <HeaderSection
                headerIcon={<HiUserPlus size={36} />}
                headerTitle={"Formulário de Cadastro de Morador"}
            >
                <p>
                    Preencha os campos do formulário abaixo com os
                    Dados Pessoais do Morador para Cadastra-los
                </p>
            </HeaderSection>
            <section className={style.formContainer}>
                <form
                    className={style.formContent}
                    onSubmit={handleFormSubmit}
                >
                    <h2 className={style.titleForm}>
                        Dados Pessoais do Morador
                    </h2>
                    <InputImage />
                    <section className={style.formSection}>
                        {inputsPersonalDataValues.map((field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name]}
                                inputPlaceholder={field.placeholder}
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessages[field.name]}
                            />
                        ))}

                        {/* Seletor do Tipo de Morador */}
                        <div className={style.formOption}>
                            <label> Tipo </label>
                            <select
                                name="typeOfResident"
                                value={formData.typeOfResident}
                                onChange={handleChangesInputFields}
                                className={errorMessages && "error-input" || ""}
                            >
                                <option value=""> Selecione um Tipo </option>
                                {filterOptionsResidents.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errorMessages.typeOfResident &&
                                <p className="error-message">
                                    {errorMessages.typeOfResident}
                                </p>
                            }

                        </div>
                    </section>
                    <div className={style.buttonsForm}>
                        <CustomButton
                            type={"Próxima Etapa submit"}
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