import { useRouter } from "next/router";
import { useState } from "react";
import { HiPlusCircle, HiBuildingOffice2 } from "react-icons/hi2";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/Buttons/CustomButton";
import SearchFilters from "@/components/SearchFilter";
import CondoUnitTable from "@/components/CondoUnits/CondoUnitTable";
import LoadingDataMessage from "@/components/Loadings/LoadingDataMessage";
import { filterOptionsCondoUnits } from "@/utils/inputFields/condoUnitInputFields";

export default function CondoUnitsPage({ condoUnitsData, isLoadingData }) {
    const [filter, setFilter] = useState({ type: "all", query: "" });
    const router = useRouter();

    const handleFilterChange = (type, query) => {
        setFilter({ type, query });
    };

    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiBuildingOffice2 size={36} />}
                headerTitle={"Unidades"}
            >
                <CustomButton
                    buttonIcon={<HiPlusCircle size={24} color="#FFF" />}
                    buttonText={"Cadastrar unidade"}
                    buttonStyle={'blue-button'}
                    buttonType={"button"}
                    buttonFunction={() =>
                        router.push("/unidades/cadastro")
                    }
                />
            </HeaderSection>

            <section className={"mainWrapper"}>
                <SearchFilters
                    searchTitle={"Unidades"}
                    placeHolder={"Número da unidade, ou CPF do títular"}
                    selectTextInfo={"Selecione um status da unidade para Listar"}
                    inputTextInfo={"Insira Número da unidade ou CPF do titular para Pesquisar"}
                    filterOptions={filterOptionsCondoUnits}
                    onFilterChange={handleFilterChange}
                />
                {isLoadingData ? (
                    <LoadingDataMessage />
                ) : (
                    <CondoUnitTable
                        filter={filter}
                        condoUnitsData={condoUnitsData}
                    />
                )}
            </section>
        </Layout >
    );
};

export async function getStaticProps() {
    try {
        const response = await fetch("http://localhost:3000/api/fetch/allCondoUnits");
        const condoUnitsData = await response.json();

        return {
            props: {
                condoUnitsData: condoUnitsData || [],
                isLoadingData: false,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                condoUnitsData: [],
                isLoadingData: false,
            },
        };
    }
}