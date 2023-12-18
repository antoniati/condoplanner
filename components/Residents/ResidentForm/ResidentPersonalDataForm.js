import { useEffect, useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import InputForm from "@/components/InputForm";
import InputImage from "@/components/InputImage";
import { filterOptionsResidents } from "@/utils/inputFields/filterOptions";
import { residentPersonalDataFormInitialData, residentPersonalDataInputFields } from "@/utils/inputFields/residentInputFields";
import changesInputFields from "@/utils/inputFields/changeInputFields";

const ResidentPersonalDataForm = ({
    onSubmit,
    prevData
}) => {
    const [formData, setFormData] = useState({
        ...prevData,
        ...residentPersonalDataFormInitialData,
        residentImage: null,
    });

    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        prevData && setFormData(prevData);
    }, [prevData]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <section className={"sectionContainer"}>
            <form
                onSubmit={handleFormSubmit}
                className={"basicForm"}
            >
                <h2 className={"defaultTitle"}>
                    Dados Pessoais do Morador
                    <span> Etapa: 1/2 </span>
                </h2>

                <InputImage onImageSelect={(image) =>
                    setFormData({
                        ...formData,
                        residentImage: image
                    })}
                />

                <section>
                    {residentPersonalDataInputFields.map(
                        (field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name]}
                                inputPlaceholder={field.placeholder}
                                inputMaxLength={field.maxLength}
                                errorMessage={errorMessages[field.name]}
                                inputOnChange={(event) =>
                                    changesInputFields(
                                        event,
                                        formData,
                                        setFormData,
                                        setErrorMessages
                                    )
                                }
                            />
                        ))}

                    <div className={"formOption"}>
                        <label>Tipo</label>
                        <select
                            name={"typeOfResident"}
                            value={formData.typeOfResident}
                            onChange={(event) =>
                                changesInputFields(
                                    event,
                                    formData,
                                    setFormData,
                                    setErrorMessages
                                )
                            }
                            className={errorMessages && "errorInput" || ""}
                        >
                            <option value="">
                                Selecione um Tipo
                            </option>
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
                            <p className="errorMessage">
                                {errorMessages.typeOfResident}
                            </p>
                        )}
                    </div>
                </section>
                <span>
                    <CustomButton
                        type={"submit"}
                        buttonStyle={"black-button"}
                        buttonText={"Próxima Etapa"}
                    />
                </span>
            </form>
        </section>
    );
};

export default ResidentPersonalDataForm;
