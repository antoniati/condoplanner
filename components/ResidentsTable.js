import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { HiEye } from "react-icons/hi2";
import { apartmentsTestData, residentTestData } from "@/utils/testsData";
import style from "@/styles/BasicTable.module.css";

const ResidentTable = () => {
    const router = useRouter();

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
                        <tr className={style.tableBodyRow}>
                            <td>
                                <img
                                    src={residentTestData.residentPerfilImage}
                                    alt="Imagem de Perfil do Morador"
                                />
                            </td>
                            <td> {residentTestData.residentFullName} </td>
                            <td> {residentTestData.typeOfResident}</td>
                            <td> {apartmentsTestData.apartmentNumber}</td>
                            <td>{apartmentsTestData.apartmentBlock}</td>
                            <td>{apartmentsTestData.apartmentStatus}</td>
                            <td>
                                <span>
                                    <CustomButton
                                        buttonStyle={'black-button'}
                                        buttonText={"Ver Perfil"}
                                        buttonIcon={<HiEye size={24} color="#FFF" />}
                                        buttonType={"button"}
                                        buttonFunction={() => router.push("/moradores/perfil")}
                                    />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ResidentTable;