import { useRouter } from "next/router";
import { useState } from "react";
import { HiPlusCircle, HiUserGroup } from "react-icons/hi2";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/Buttons/CustomButton";
import SearchFilters from "@/components/SearchFilter";
import ResidentsTable from "@/components/Residents/ResidentsTable";
import LoadingDataMessage from "@/components/Loadings/LoadingDataMessage";
import { filterOptionsResidents } from "@/utils/inputFields/filterOptions";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

export default function ResidentsPage({ residentsData, isLoadingData }) {
  const [filter, setFilter] = useState({ type: "all", query: "" });
  const router = useRouter();

  const handleFilterChange = (type, query) => {
    setFilter({ type, query });
  };

  return (
    <Layout>
      <HeaderSection
        headerIcon={<HiUserGroup size={36} />}
        headerTitle={"Moradores"}
      >
        <CustomButton
          buttonIcon={<HiPlusCircle size={24} color="#FFF" />}
          buttonText={"Cadastrar Morador"}
          buttonType={"button"}
          buttonStyle={"blue-button"}
          buttonFunction={() => router.push("/moradores/cadastrodemorades")}
        />
      </HeaderSection>

      <section className={"mainWrapper"}>
        <SearchFilters
          searchTitle={"Moradores"}
          placeHolder={"Nome, ou RG, ou CPF do Morador"}
          selectTextInfo={"Selecione um Tipo de Morador para Listar"}
          inputTextInfo={"Insira o Nome, RG ou CPF do Morador para Pesquisar"}
          filterOptions={filterOptionsResidents}
          onFilterChange={handleFilterChange}
        />
        {isLoadingData ? (
          <LoadingDataMessage />
        ) : (
          <ResidentsTable
            filter={filter}
            residentsData={residentsData}
          />
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost:3000/api/fetch/allResidents");
    const residentsData = await response.json();

    return {
      props: {
        residentsData: residentsData || [],
        isLoadingData: false,
      },
    };

  } catch (error) {
    console.error(
      `${defaultErrorMessage.internalServerError}`,
      error.status
    );

    return {
      props: {
        residentsData: [],
        isLoadingData: true,
      },
    };

  };
};
