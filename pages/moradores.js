// Importação do hook useRouter do pacote "next/router",
// para fornecer acesso às rotas das páginas.
import { useRouter } from "next/router";

/* Importação do hook `useState` e `useEffect` do pacote "next/router", 
 para definir e atualizar o estado dos dados dos moradores.*/
import { useState, useEffect } from "react";

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

// Importação do pacote "axios" para realizar requisições HTTP.
import axios from "axios";

/**
 * Página de listagem de moradores.
 * Esta página exibe uma lista de moradores e fornece opções para pesquisa e adição de novos moradores.
 *
 * @returns {JSX.Element} Componente da página de moradores.
 */
const ResidentsPage = () => {
    // Hook useRouter para fornecer acesso às rotas das páginas.
    const router = useRouter();

    // Estado para armazenar o filtro atual aplicado à tabela de moradores.
    const [filter, setFilter] = useState({ type: "all", query: "" });

    // Estado para armazenar os dados dos moradores obtidos da API.
    const [residentsData, setResidentsData] = useState([]);

    // Função chamada quando o filtro é alterado.
    const handleFilterChange = (type, query) => {
        setFilter({ type, query });
    };

    // Efeito colateral para buscar os dados dos moradores ao carregar a página.
    useEffect(() => {
        const fetchResidentsData = async () => {
            try {
                // Realiza uma requisição GET para obter os dados dos moradores da API.
                const response = await axios.get("/api/residents");

                // Verifica se a requisição foi bem-sucedida (código de status 200).
                if (response.status === 200) {
                    // Atualiza o estado com os dados dos moradores obtidos.
                    setResidentsData(response.data.data);
                } else {
                    // Exibe um erro no console em caso de falha na requisição.
                    console.error("Erro ao buscar moradores");
                }
            } catch (error) {
                // Exibe um erro no console em caso de falha na requisição.
                console.error("Erro ao buscar moradores", error);
            }
        };

        // Chama a função para buscar os dados dos moradores ao carregar a página.
        fetchResidentsData();
    }, []); // O segundo parâmetro vazio indica que o efeito só deve ser executado uma vez, ao montar o componente.

    // Renderiza a estrutura da página.
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
                    // Navega para a página de cadastro de morador ao clicar no botão.
                    buttonFunction={() => router.push("/moradores/cadastro")}
                />
            </HeaderSection>

            {/* Seção principal da página */}
            <section className={style.residentPage}>
                {/* Componente de filtros de pesquisa para moradores */}
                <SearchFilters
                    searchTitle={"Morador"}
                    placeHolder={"Nome, ou RG, ou CPF do Morador"}
                    selectTextInfo={"Selecione um Tipo de Morador para Listar"}
                    inputTextInfo={"Insira o Nome, RG ou CPF do Morador para Pesquisar"}
                    filterOptions={filterOptionsResidents}
                    // Função chamada ao alterar o filtro.
                    onFilterChange={handleFilterChange}
                />
                {/* Tabela de moradores */}
                <ResidentsTable filter={filter} residentsData={residentsData} />
            </section>
        </Layout>
    );
};

// Exporta o componente principal da página.
export default ResidentsPage;
