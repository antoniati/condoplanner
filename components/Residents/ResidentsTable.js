import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiEye } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";
import DataNotFoundMessage from "../Loadings/DataNotFoundMessage";
import LoadingDataMessage from "../Loadings/LoadingDataMessage";

const ResidentTable = ({ filter, residentsData, }) => {
    const [filteredResidents, setFilteredResidents] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const handleFilterResidents = async () => {
            if (residentsData && residentsData.data.allResidents) {
                setIsLoadingData(true);

                const filteredData = residentsData.data?.allResidents ?
                    residentsData.data?.allResidents.filter((resident) => {
                        const { type, query } = filter;

                        if (type === "all" || resident.typeOfResident === type) {
                            const searchQuery = query.toLowerCase();
                            const fullName = resident.residentFullName?.toLowerCase();
                            const rg = resident.residentRgNumber?.toString();
                            const cpf = resident.residentCpfNumber?.toString();

                            return (
                                fullName.includes(searchQuery) ||
                                rg.includes(searchQuery) ||
                                cpf.includes(searchQuery)
                            );
                        }

                        return false;

                    }) : [];

                setFilteredResidents(filteredData.reverse());
                setIsLoadingData(false);
            };
        };

        handleFilterResidents();
    }, [filter, residentsData]);

    const handleGoPerfilPage = (id) => {
        return router.push(`/moradores/perfil/${id}`)
    }

    return (
        <section className="basicTable">
            {isLoadingData ? (
                <LoadingDataMessage />
            ) : (
                filteredResidents.length === 0 ? (
                    <DataNotFoundMessage />
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th className="photo">Foto</th>
                                <th>Nome Completo</th>
                                <th>Tipo</th>
                                <th>Unidades</th>
                                <th>Blocos</th>
                                <th>Status de Acesso</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredResidents.map((resident) => {
                                const {
                                    condoUnitNumber,
                                    condoUnitBlock,
                                } = resident.condoUnitIds.length > 0
                                    && resident.condoUnitIds[0];

                                const statusAccessLog = resident.accessLogs.forEach(accessLog => (
                                    accessLog.statusAccessLog
                                ))


                                const rowClass = statusAccessLog === 'ativo'
                                    ? 'bg-light-blue text-white'
                                    : statusAccessLog === 'finalizado'
                                        ? 'bg-slate-200 text-dark-gray'
                                        : statusAccessLog === 'pendente'
                                            ? 'bg-red-300 text-dark-gray'
                                            : 'bg-slate-50 text-dark-gray';

                                return (
                                    <tr key={resident._id} >
                                        <td className="photo">
                                            <img
                                                src={
                                                    resident.residentImage ||
                                                    "/images/perfil-img.png"
                                                }
                                            />
                                        </td>
                                        <td>{resident.residentFullName}</td>
                                        <td>{resident.typeOfResident || 'N/A'}</td>
                                        <td>{condoUnitNumber || 'N/A'}</td>
                                        <td>{condoUnitBlock || 'N/A'}</td>
                                        <td className={`${rowClass}`}>
                                            {resident.accessLogs.length === 0
                                                ? "N/A"
                                                : (() => {
                                                    const currentDate = new Date();
                                                    let activeAccess = null;
                                                    let pendingAccess = null;
                                                    let finalizedAccess = null;

                                                    resident.accessLogs.forEach(accessLog => {
                                                        const startDate = new Date(accessLog.checkIn);
                                                        const endDate = new Date(accessLog.checkOut);

                                                        if (accessLog.statusAccessLog === "ativo") {
                                                            activeAccess = accessLog;
                                                        } else if (accessLog.statusAccessLog === "pendente" && startDate > currentDate && (!pendingAccess || startDate < new Date(pendingAccess.checkIn))) {
                                                            pendingAccess = accessLog;
                                                        } else if (accessLog.statusAccessLog === "finalizado" && (!finalizedAccess || endDate > new Date(finalizedAccess.checkOut))) {
                                                            finalizedAccess = accessLog;
                                                        }
                                                    });

                                                    if (activeAccess) {
                                                        return "Ativo";
                                                    } else if (pendingAccess) {
                                                        return "Pendente";
                                                    } else if (finalizedAccess) {
                                                        return "Finalizado";
                                                    }

                                                    return "N/A";
                                                })()
                                            }
                                        </td>
                                        <td>
                                            <span>
                                                <CustomButton
                                                    buttonIcon={<HiEye size={24} />}
                                                    buttonText={"Ver Perfil"}
                                                    buttonStyle={"gray-button"}
                                                    buttonType={"button"}
                                                    buttonFunction={() =>
                                                        handleGoPerfilPage(resident._id)
                                                    }
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ))}
        </section>
    );
};

export default ResidentTable;