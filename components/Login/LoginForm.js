import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";

const LoginForm = () => {

    return (
        <form>
            <div className="flex flex-col gap-5">
                <InputForm
                    inputLabelText={"E-mail"}
                    inputType={"email"}
                />
                <InputForm
                    inputLabelText={"Senha"}
                    inputType={"password"}
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
