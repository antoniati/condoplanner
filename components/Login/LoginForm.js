import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/CustomButton";

const LoginForm = () => {
    const initialLoginFormData = {
        userEmail: "",
        userPassword: "",
    }

    const [loginFormData, setLoginFormData] = useState(initialLoginFormData);
    const [errorMessages, setErrorMessages] = useState({});
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({
            ...loginFormData,
            [name]: value,
        });
        cleanErrorMessage(name);
    };

    const cleanErrorMessage = (fieldName) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    const validateRequiredFields = () => {
        const requiredFields = ["userEmail", "userPassword"];
        let isValid = true;

        for (const field of requiredFields) {
            if (!loginFormData[field]) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [field]: `O campo ${field === "email" ? "E-mail" : "Senha"} é obrigatório.`,
                }));
                isValid = false;
            }
        }

        return isValid;
    };

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateRequiredFields()) {
            return;
        }

        try {
            await axios.post("/api/auth/login", loginFormData);
            setLoginFormData(initialLoginFormData);
            setErrorMessages({});
            router.push("/painel");

        } catch (error) {
            handleRegistrationError(error);
        }
    };

    const handleRegistrationError = (error) => {
        if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            if (errorMessage.includes("E-mail ou Senha inválidos.")) {
                setErrorMessages({ userPassword: errorMessage });
            } else {
                console.error(errorMessage);
            }
        }
    };

    return (
        <form onSubmit={handleLoginFormSubmit}>
            <div className="flex flex-col gap-5">
                <InputForm
                    inputLabelText={"E-mail"}
                    inputType={"email"}
                    inputName="userEmail"
                    inputValue={loginFormData.userEmail}
                    inputOnChange={handleInputChange}
                    errorMessage={errorMessages.userEmail}
                />
                <InputForm
                    inputLabelText={"Senha"}
                    inputType={"password"}
                    inputName="userPassword"
                    inputValue={loginFormData.userPassword}
                    inputOnChange={handleInputChange}
                    errorMessage={errorMessages.userPassword}
                />
            </div>
            <div className="w-72 sm:w-40 transition-all duration-300 mt-5">
                <CustomButton
                    buttonType={"submit"}
                    buttonStyle={"black-button"}
                    buttonText={"Login"}
                />
            </div>
        </form>
    );
};

export default LoginForm;
