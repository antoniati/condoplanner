import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiEye, HiPencilSquare, HiTrash  } from "react-icons/hi2";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CondoUnitInfoCard from "@/components/CondoUnits/CondoUnitInfoCard";
import LoadingDataMessage from "@/components/Loadings/LoadingDataMessage";
import { fetchCondoUnitDataById } from "@/utils/fetchData/fetchCondoUnitDataById";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

import CustomButton from "@/components/Buttons/CustomButton";
import CondoUnitResidentsList from "@/components/CondoUnits/CondoUnitResidentsList";
import CondoUnitImagesList from "@/components/CondoUnits/CondoUnitImagesList";
import { formatDate } from "@/utils/inputFields/inputFieldsMask";
import { FaBuilding } from "react-icons/fa6";

export default function CondoUnitDetailsPage() {
    const [condoUnitData, setcondoUnitData] = useState({});
    const [isLoadingData, setIsLoadingData] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        setIsLoadingData(true);

        if (id) {
            handleFetchCondoUnitData();
        }

    }, [id]);

    const handleFetchCondoUnitData = async () => {
        try {
            const condoUnit = await fetchCondoUnitDataById(id);
            setcondoUnitData(condoUnit);

        } catch (error) {
            console.error(
                `${defaultErrorMessage.internalServerError}`,
                error.message
            );
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleGoDetailsPage = (id) => {
        return router.push(
            `/acessos/detalhes/${id}`
        );
    };

    return (
        <Layout>
            <HeaderSection
                headerIcon={<FaBuilding size={36} />}
                headerTitle={"Detalhes da Unidade"}
            >
                <CustomButton
                    buttonIcon={<HiPencilSquare size={24} />}
                    buttonText={"Editar Unidade"}
                    buttonStyle={"blue-button"}
                    buttonType={"button"}
                    buttonFunction={() =>
                        router.push(`/unidades/editar/${id}`)
                    }
                />
                <CustomButton
                    buttonIcon={<HiTrash size={24} />}
                    buttonText={"Excluir"}
                    buttonStyle={"red-button"}
                    buttonType={"button"}
                    buttonFunction={() =>
                        router.push(`/unidades/deletar/${id}`)
                    }
                />
            </HeaderSection>

            {isLoadingData ? (
                <span className="mainWrapper">
                    <LoadingDataMessage />
                </span>
            ) : (
                <span className={"mainWrapper"}>
                    <CondoUnitInfoCard condoUnitData={condoUnitData} />

                    {condoUnitData.accessLogs?.map(accessLog => (
                        <section className="sectionContainer">
                            <h2 className="defaultTitle">
                                Acessos
                                <span>
                                    Total de acessos:
                                    ({condoUnitData.accessLogs?.length})
                                </span>
                            </h2>   
                            <section className="basicTable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>Check-In</th>
                                            <th>Check-Out</th>
                                            <th>Moradores</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{accessLog?.statusAccessLog}</td>
                                            <td>{formatDate(accessLog?.checkIn)})</td>
                                            <td>{formatDate(accessLog?.checkOut)}</td>
                                            <td>{accessLog.residents?.length}</td>
                                            <td className="w-40">
                                                <span>
                                                    <CustomButton
                                                        buttonIcon={<HiEye size={24} />}
                                                        buttonText={"Ver Acesso"}
                                                        buttonStyle={"gray-button"}
                                                        buttonType={"button"}
                                                        buttonFunction={() =>
                                                            handleGoDetailsPage(accessLog._id)
                                                        }
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        </section>
                    ))}

                    <CondoUnitResidentsList residentsData={condoUnitData} />
                    <CondoUnitImagesList imagesData={condoUnitData} />
                </span>
            )}
        </Layout>
    );
};
