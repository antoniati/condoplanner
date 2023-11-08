import { HiOutlineUpload } from "react-icons/hi";
import style from "@/styles/BasicForm.module.css";

const InputImage = () => {
    return (
        <div className={`${style.formOption} m-`}>
            <label htmlFor="profileImage">
                Imagem de Perfil
            </label>
            <label className="cursor-pointer flex overflow-hidden items-center justify-between gap-4 h-16 border-2 rounded-md border-slate-200">
                <span className="flex flex-wrap gap-2 ml-4 text-sm">
                    <span className=" hidden sm:flex">
                        <HiOutlineUpload size={20} />
                    </span>
                    Selecione uma Foto
                </span>
                <input type="file" id="profileImage" accept="image/*" hidden />
                <img
                    src={"/images/perfil-img.png"}
                    alt="Imagem de Perfil"
                    className="w-16 h-16 object-cover border-2 border-slate-200"
                />
            </label>
        </div>
    );
};

export default InputImage;