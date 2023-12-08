import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiEye } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";
import LoadingDataMessage from "@/components/Loadings/LoadingDataMessage";

const ResidentTable = ({ filter, residentsData, }) => {
    const [filteredResidents, setFilteredResidents] = useState([]);
    const router = useRouter();

    useEffect(() => {
        filterResidents();
    }, [filter, residentsData]);

    const filterResidents = async () => {
        const filteredData = residentsData.data.allResidents ?
            residentsData.data.allResidents.filter((resident) => {
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

        setFilteredResidents(filteredData);
    };

    const handleGoPerfilPage = (id) => {
        return router.push(`/moradores/perfil/${id}`)
    }

    return (
        <section className="basicTable">
            {filteredResidents.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome do Morador</th>
                            <th>Tipo</th>
                            <th>Nº da Unidade</th>
                            <th>Bloco</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredResidents.map((resident) => {
                            const {
                                condoUnitNumber,
                                condoUnitBlock,
                                condoUnitStatus
                            } = resident.condoUnitIds.length > 0
                                && resident.condoUnitIds[0];

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
                                    <td>{resident.typeOfResident}</td>
                                    <td>{condoUnitNumber || 'N/A'}</td>
                                    <td>{condoUnitBlock || 'N/A'}</td>
                                    <td>{condoUnitStatus || 'N/A'}</td>
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
            ) : (<LoadingDataMessage />)}
        </section>
    );
};

export default ResidentTable;