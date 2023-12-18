import { useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import InputForm from "@/components/InputForm";
import { fetchAndPopulateAddressData } from "@/utils/fetchData/fetchAndPopulateAddressData";
import { residentAddressFormInitialData, residentAdressInputFields } from "@/utils/inputFields/residentInputFields";
import changesInputFields from "@/utils/inputFields/changeInputFields";

const ResidentAddressForm = ({
    onSubmit,
    onBack,
    prevData
}) => {
    const [formData, setFormData] = useState({
        ...prevData,
        ...residentAddressFormInitialData,
    });

    const [errorMessage, setErrorMessage] = useState("");


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
        <section className={"sectionContainer"}>
            <form
                onSubmit={handleFormSubmit}
                className={"basicForm"}
            >
                <h2 className={"defaultTitle"}>
                    Endereço do Morador
                    <span> Etapa: 2/2 </span>
                </h2>

                <section>
                    {residentAdressInputFields.map((field, index) => (
                        <InputForm
                            key={index}
                            inputLabelText={field.label}
                            inputType={field.type}
                            inputName={field.name}
                            inputValue={formData[field.name]}
                            inputPlaceholder={field.placeholder}
                            inputMaxLength={field.maxLength}
                            errorMessage={errorMessage[field.name]}
                            inputOnBlur={handleCEPBlur}
                            inputOnChange={(event) =>
                                changesInputFields(
                                    event,
                                    formData,
                                    setFormData,
                                    setErrorMessage
                                )
                            }
                        />
                    ))}
                </section>

                <section>
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
                </section>
            </form>

        </section>
    );
};

export default ResidentAddressForm;
