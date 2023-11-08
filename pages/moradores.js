// Importação do hook useRouter do pacote "next/router", 
// para fornecer acesso às rotas das páginas.
import { useRouter } from "next/router";

// Importação de componentes personalizados
import Layout from "@/components/Layout";           // Layout geral da página
import HeaderSection from "@/components/HeaderSection"; // Cabeçalho da página
import CustomButton from "@/components/CustomButton";   // Botão personalizado
import SearchFilters from "@/components/SearchFilter";  // Filtros de pesquisa
import ResidentsTable from "@/components/ResidentsTable"; // Tabela de moradores

// Importação de opções de filtro para moradores do utilitário "inputFields"
import { filterOptionsResidents } from "@/utils/inputFields";

// Importação de ícones de usuário ("react-icons/hi2")
import { HiPlusCircle, HiUserGroup } from "react-icons/hi2";

// Importação do módulo de estilos da página de moradores
import style from "@/styles/ResidentPage.module.css";

/**
 * Página de listagem de moradores.
 * Esta página exibe uma lista de moradores e fornece opções para pesquisa e adição de novos moradores.
 *
 * @returns {JSX.Element} Componente da página de moradores.
 */
const ResidentsPage = () => {
    const router = useRouter();

    return (
        <Layout>
            {/* Seção de cabeçalho com título e botão para adicionar novo morador */}
            <HeaderSection
                headerIcon={<HiUserGroup size={36} />}
                headerTitle={"Moradores"}
            >
                {/* Botão personalizado para adicionar novo morador */}
                <CustomButton
                    buttonStyle={'blue-button'}
                    buttonText={"Cadastrar Morador"}
                    buttonIcon={<HiPlusCircle size={24} color="#FFF" />}
                    buttonType={"button"}
                    buttonFunction={() => router.push("/moradores/cadastro")}
                />
            </HeaderSection>
            <section className={style.residentPage}>
                {/* Componente de filtros de pesquisa para moradores */}
                <SearchFilters
                    searchTitle={"Morador"}
                    placeHolder={"Nome, ou RG, ou CPF do Morador"}
                    selectTextInfo={"Selecione um Tipo de Morador para Listar"}
                    inputTextInfo={"Insira o Nome, RG ou CPF do Morador para Pesquisar"}
                    filterOptions={filterOptionsResidents}
                />
                {/* Tabela de moradores */}
                <ResidentsTable />
            </section>
        </Layout>
    );
};

export default ResidentsPage;
