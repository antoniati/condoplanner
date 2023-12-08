import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/Buttons/CustomButton";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import style from "@/styles/LoginForm.module.css";

const LoginForm = () => {
    const initialData = { userEmail: "", userPassword: "", };

    const [formData, setFormData] = useState(initialData);
    const [errorMessages, setErrorMessages] = useState({});

    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/auth/login", formData);

            setFormData(initialData);
            setErrorMessages({});
            router.push("/painel");

        } catch (error) {
            console.log(
                `${defaultErrorMessage.internalServerError}`,
                error.message
            );
        };
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className={style.optionsLoginForm}>
                <InputForm
                    inputLabelText={"E-mail"}
                    inputType={"email"}
                    inputName="userEmail"
                    inputValue={formData.userEmail}
                    inputOnChange={handleInputChange}
                    errorMessage={errorMessages.userEmail}
                />
                <InputForm
                    inputLabelText={"Senha"}
                    inputType={"password"}
                    inputName="userPassword"
                    inputValue={formData.userPassword}
                    inputOnChange={handleInputChange}
                    errorMessage={errorMessages.userPassword}
                />
            </div>
            <div className={style.buttonLoginForm}>
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
