import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";
import { HiCheckBadge } from "react-icons/hi2"
import CustomModal from "./CustomModal";

const UserRegisterForm = () => {
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
                <InputForm
                    inputLabelText={"Confirmar Senha"}
                    inputType={"password"}
                />
                <CustomButton
                    buttonType={"submit"}
                    buttonStyle={"blue-button"}
                    buttonText={"Cadastrar"}
                />
            </div>
            <CustomModal
                modalIcon={<HiCheckBadge color={"#23C366"} size={56} />}
                modalTitle={"Cadastrado com Sucesso!"}
                modalDescription={"Seu cadastro foi realizado com sucesso."}
            />
        </form>
    );
};

export default UserRegisterForm;
