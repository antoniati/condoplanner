import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiCheckBadge } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";
import InputForm from "@/components/InputForm";
import CustomModal from "@/components/CustomModal";
import { userLoginDataInputFields } from "@/utils/inputFields/userFields";
import style from "@/styles/BasicForm.module.css";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

const UserRegisterForm = () => {
    const initialData = {
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState(initialData);
    const [errorMessages, setErrorMessages] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

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


    const handleCheckPassword = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (formData.userPassword !== value) {
            setErrorMessages({ confirmPassword: "As senhas devem ser iguais." });
        } else {
            cleanErrorMessage("confirmPassword");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/users", formData);

            setFormData(initialData);
            setErrorMessages({});
            setIsModalOpen(true);

        } catch (error) {
            console.log(
                `${defaultErrorMessage.internalServerError}`,
                error.status
            );
        };
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        router.push("/");
    };

    return (
        <form onSubmit={handleFormSubmit} className={style.userForm}>            
            <div className={style.userFormContent}>                
                {userLoginDataInputFields.map((field, index) => (
                    <InputForm
                        key={index}
                        inputLabelText={field.label}
                        inputType={field.type}
                        inputName={field.name}
                        inputValue={formData[field.name]}
                        inputOnChange={
                            field.name === "confirmPassword"
                                ? handleCheckPassword
                                : handleChangesInputFields
                        }
                        errorMessage={errorMessages[field.name]}
                    />
                ))}                
                <CustomButton
                    buttonType="submit"
                    buttonStyle="blue-button"
                    buttonText="Cadastrar"
                />
            </div>
            
            {isModalOpen && (
                <CustomModal
                    modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                    modalTitle="Cadastrado com Sucesso!"
                    modalDescription="Seu cadastro foi realizado com sucesso."
                    functionToCloseModal={handleCloseModal}
                />
            )}
        </form>
    );
};


export default UserRegisterForm;
