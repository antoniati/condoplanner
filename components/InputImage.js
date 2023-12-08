import { useState } from "react";
import style from "@/styles/BasicForm.module.css";
import { HiOutlineUpload } from "react-icons/hi";
import Spinner from "@/components/Loadings/SpinnerBouceLoader";
import axios from "axios";

const InputImage = ({ onImageSelect }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadProfileImage = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setIsUploading(true);
            const data = new FormData();
            data.append('file', file);

            try {
                const res = await axios.post("/api/uploadImages", data);

                if (res.data.links && res.data.links.length > 0) {
                    const imageUrl = res.data.links[0];
                    setSelectedImage(imageUrl);
                    onImageSelect(imageUrl);
                }
            } catch (error) {
                console.error("Erro ao fazer upload da imagem:", error);
            }

            setIsUploading(false);
        }
    };

    return (
        <div className={style.formOption}>
            <label htmlFor="profileImage" className="">
                Imagem de Perfil
            </label>
            <label className="mt-2 cursor-pointer flex overflow-hidden items-center justify-between gap-4 h-14 border-2 rounded-sm border-slate-300">
                <span className="flex flex-wrap gap-2 ml-4 text-sm">
                    <span className=" hidden sm:flex">
                        <HiOutlineUpload size={20} />
                    </span>
                    Selecione uma Foto
                </span>
                <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    hidden
                    onChange={handleUploadProfileImage}
                />
                {selectedImage ? (
                    isUploading ? (
                        <span className="pr-2"> <Spinner /> </span>
                    ) : (
                        <img
                            src={selectedImage || currentImage}
                            alt="Imagem de Perfil"
                            className="w-16 h-16 object-cover border-2 border-slate-200 rounded-r-sm"
                        />
                    )
                ) : setSelectedImage("/images/perfil-img.png")}
            </label>
        </div>
    );
};

export default InputImage;