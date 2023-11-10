import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { HiEye } from "react-icons/hi2";
import style from "@/styles/BasicTable.module.css";
import axios from "axios";
import formatDate from "@/utils/formatDate";
import { applyRGMask } from "@/utils/inputFieldsMask";

const ResidentTable = () => {
    const [residentsData, setResidentsData] = useState([]);
    const router = useRouter();

    // Função para buscar todos os moradores
    const fetchResidentsData = async () => {
        try {
            const response = await axios.get("/api/residents");

            if (response.status === 200) {
                setResidentsData(response.data.data);
            } else {
                console.error("Erro ao buscar moradores");
            }
        } catch (error) {
            console.error("Erro ao buscar moradores", error);
        }
    };

    useEffect(() => {
        fetchResidentsData();
    }, []);

    return (
        <div className="p-5">
            <div className={style.tableContainer}>
                <table className={style.tableContent}>
                    <thead className={style.tableHeader}>
                        <tr className={style.tableHeaderRow}>
                            <th>Foto</th>
                            <th>Nome do Morador</th>
                            <th>Tipo</th>
                            <th>Apartamento</th>
                            <th>Bloco</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={style.tableBody}>
                        {residentsData.map((resident) => (
                            <tr key={resident._id} className={style.tableBodyRow}>
                                <td>
                                    <img
                                        src={"/images/perfil-img.png"}
                                        alt="Imagem de Perfil do Morador"
                                    />
                                </td>
                                <td>{resident.residentFullName}</td>
                                <td>{resident.typeOfResident}</td>
                                <td>{resident.residentEmail}</td>
                                <td>{formatDate(resident.residentContactPhone)}</td>
                                <td>{resident.residentRgNumber}</td>
                                <td>
                                    <span>
                                        <CustomButton
                                            buttonStyle={"black-button"}
                                            buttonText={"Ver Perfil"}
                                            buttonIcon={<HiEye size={24} color="#FFF" />}
                                            buttonType={"button"}
                                            buttonFunction={() =>
                                                router.push(`/moradores/perfil/${resident._id}`)
                                            }
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResidentTable;
