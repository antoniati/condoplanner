import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";
import CustomModal from "@/components/CustomModal";
import { usersInputFields } from "@/utils/inputFields";
import { HiCheckBadge } from "react-icons/hi2";
import style from "@/styles/UserRegisterForm.module.css";

const UserRegisterForm = () => {
    const userRegisterInitialFormData = {
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
    };

    const [userRegisterFormData, setuserRegisterFormData] = useState(userRegisterInitialFormData);
    const [errorMessages, setErrorMessages] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        setuserRegisterFormData({ ...userRegisterFormData, [name]: value });
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
        setuserRegisterFormData({ ...userRegisterFormData, [name]: value });

        if (userRegisterFormData.userPassword !== value) {
            setErrorMessages({ confirmPassword: "As senhas devem ser iguais." });
        } else {
            cleanErrorMessage("confirmPassword");
        }
    };

    const validateRiqueredFields = () => {
        const requiredFields = ['userEmail', 'userPassword', 'confirmPassword'];
        let isValid = true;

        for (const field of requiredFields) {
            if (!userRegisterFormData[field]) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [field]: `O campo ${field === 'userEmail' ? 'E-mail' : 'Senha'} é obrigatório.`,
                }));
                isValid = false;
            }
        }

        return isValid;
    };

    const handleUserRegiterFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateRiqueredFields()) {
            return;
        }

        try {
            await axios.post("/api/users", userRegisterFormData);

            setuserRegisterFormData(userRegisterInitialFormData);
            setErrorMessages({});

            setIsModalOpen(true);

        } catch (error) {
            handleRegistrationError(error);
        }
    };

    const handleRegistrationError = (error) => {
        if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            if (errorMessage.includes("E-mail já está cadastrado.")) {
                setErrorMessages({ userEmail: errorMessage });
            } else if (errorMessage.includes("As senhas devem ser iguais.")) {
                setErrorMessages({ confirmPassword: errorMessage });
            } else {
                console.error(errorMessage);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        router.push("/");
    };

    return (
        <form onSubmit={handleUserRegiterFormSubmit} className={style.userForm}>
            <div className={style.userFormContent}>
                {usersInputFields.map((field, index) => (
                    <InputForm
                        key={index}
                        inputLabelText={field.label}
                        inputType={field.type}
                        inputName={field.name}
                        inputValue={userRegisterFormData[field.name]}
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
