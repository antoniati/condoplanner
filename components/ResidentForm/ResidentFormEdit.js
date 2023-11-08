import { useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";
import InputImage from "@/components/InputImage";

import { HiUserPlus } from "react-icons/hi2";

import { filterOptionsResidents, inputsAddressValues, inputsPersonalDataValues } from "@/utils/inputFields";

import style from "@/styles/BasicForm.module.css";

const ResidentFormEdit = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    const router = useRouter();

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

    function handleGoBackPage() {
        router.push("/moradores/perfil");
    }

    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiUserPlus size={36} />}
                headerTitle={"Formulário de Edição de Morador"}
            >
                <p>
                    Preencha os campos do formulário abaixo para
                    Editar as Informações do Morador.
                </p>
            </HeaderSection>
            <section className={style.formContainer}>
                <form className={style.formContent} >
                    <h2 className={style.titleForm}>
                        Dados Pessoais
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
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessage[field.name]}
                            />
                        ))}
                        <div className={style.formOption}>
                            <label> Tipo </label>
                            <select >
                                <option value=""> Selecione um Tipo </option>
                                {filterOptionsResidents.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value || ""}
                                        onChange={handleChangesInputFields}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </section>
                    <h2 className={`${style.titleForm} mt-2`}>
                        Endereço
                    </h2>
                    <section className={style.formSection}>
                        {inputsAddressValues.map((field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name]}
                                inputOnChange={handleChangesInputFields}
                            />
                        ))}
                    </section>
                    <section className={style.buttonsForm}>
                        <CustomButton
                            buttonType="submit"
                            buttonText={"Salvar Edição"}
                            buttonStyle="blue-button"
                        />
                        <CustomButton
                            buttonType="button"
                            buttonText={"Cancelar"}
                            buttonStyle="black-button"
                            buttonFunction={handleGoBackPage}
                        />
                    </section>
                </form>
            </section>
        </Layout>
    );
};

export default ResidentFormEdit;
