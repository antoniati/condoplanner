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
        <div className={`${style.formOption} mt-4`}>
            <label htmlFor="profileImage">Imagem de Perfil</label>
            <label className="cursor-pointer flex overflow-hidden items-center justify-between gap-4 h-16 border-2 rounded-md border-slate-200">
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
                    <img
                        src={selectedImage}
                        alt="Imagem de Perfil"
                        className="w-16 h-16 object-cover border-2 border-slate-200"
                    />
                ) : (
                    <span className="w-16 h-16 flex items-center justify-center text-gray-500 bg-slate-50">
                        {isUploading ? <Spinner /> : setSelectedImage("/images/perfil-img.png")}
                    </span>
                )}
            </label>
        </div>
    );
};

export default InputImage;