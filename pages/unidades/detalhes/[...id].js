import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiPencilSquare, HiTrash, HiUser } from "react-icons/hi2";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CondoUnitInfoCard from "@/components/CondoUnits/CondoUnitInfoCard";
import LoadingDataMessage from "@/components/Loadings/LoadingDataMessage";
import { fetchCondoUnitDataById } from "@/utils/fetchData/fetchCondoUnitDataById";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

import CustomButton from "@/components/Buttons/CustomButton";
import CondoUnitResidentsList from "@/components/CondoUnits/CondoUnitResidentsList";

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
            console.error(defaultErrorMessage.internalServerError, error.message);
        } finally {
            setIsLoadingData(false);
        }
    };

    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiUser size={36} />}
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
                    <CondoUnitResidentsList residentsData={condoUnitData} />
                </span>
            )}
        </Layout>
    );
};
