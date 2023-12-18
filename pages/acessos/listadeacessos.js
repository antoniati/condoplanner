// Libs
import { useRouter } from "next/router"; // Hook de roteamento do Next.js
import { useEffect, useState } from "react"; // Hook gerenciador de estado de componente da biblioteca React
import { HiClipboardDocumentList, HiOutlineCalendarDays } from "react-icons/hi2"; //  Ícones da biblioteca "hero-icons"

// Components
import Layout from "@/components/Layout"; // Componente padrão de layout das páginas
import HeaderSection from "@/components/HeaderSection"; // Componente padrão de cabeçalho das páginas 
import CustomButton from "@/components/Buttons/CustomButton"; // Componente padrão de botão personalizado
import SearchFilters from "@/components/SearchFilter"; // Componente padrão de filtros de pesquisas 
import AccessLogTable from "@/components/AccessLog/AccessLogTable"; // Componente padrão da tabela de registros de acesso

// Utils
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages"; // mensagens padrão de erro
import { filterOptionsAccessLog } from "@/utils/inputFields/accessLogInputFields"; // opções de filtros para registro de acesso
import { fetchAllAccessLogsData } from "@/utils/fetchData/fetchAllAccessLogData";


/**
 * O componente AccessLogsPage representa a página principal para gerenciar e listar registros de acesso.
 *
 * @component
 * @param {Object} props - As propriedades do componente.
 * @param {Array} props.accessLogsData - Dados contendo os registros de acesso a serem exibidos.
 * @returns {JSX.Element} Componente AccessLogsPage.
 */
export default function AccessLogsPage() {
      // Estado para gerenciar os filtros de pesquisa
      const [filter, setFilter] = useState({ type: "all", query: "" });
      const [accessLogsData, setAccessLogsData] = useState([]);

      useEffect(() => {
            handleFetchAccessLogData();
      }, [filter, accessLogsData])

      const handleFetchAccessLogData = async () => {
            const responseData = await fetchAllAccessLogsData();
            setAccessLogsData(responseData);
      }

      /**
       * Manipula as mudanças nos filtros de pesquisa.
       *
       * @param {string} type - O tipo de filtro a ser aplicado.
       * @param {string} query - A consulta de pesquisa.
       * @returns {void}
       */
      const handleFilterChange = (type, query) => {
            setFilter({ type, query });
      };

      // Instância do roteador do Next.js
      const router = useRouter();

      /**
       * Navega até a página de registro de acesso.
       *
       * @returns {void}
       */
      const handleGoRegisterPage = () => {
            return router.push("/acessos/cadastrodeacesso");
      };

      return (
            <Layout>
                  {/* Seção de cabeçalho */}
                  <HeaderSection
                        headerIcon={<HiClipboardDocumentList />}
                        headerTitle={"Acessos"}
                  >
                        {/* Botão para navegar até a página de registro de acesso */}
                        <CustomButton
                              buttonType={"button"}
                              buttonStyle={"blue-button"}
                              buttonText={"Agendar Acesso"}
                              buttonIcon={<HiOutlineCalendarDays size={26} />}
                              buttonFunction={handleGoRegisterPage}
                        />
                  </HeaderSection>

                  {/* Seção de conteúdo principal */}
                  <section className={"mainWrapper"}>
                        <section className="sectionContainer">
                              {/* Componente de filtros de pesquisa */}
                              <SearchFilters
                                    searchTitle={"Acessos"}
                                    placeHolder={"Número da Unidade"}
                                    selectTextInfo={"Selecione um status de acesso para Listar"}
                                    inputTextInfo={"Insira o número da unidade para pesquisar"}
                                    filterOptions={filterOptionsAccessLog}
                                    onFilterChange={handleFilterChange}
                              />

                              {/* Componente da tabela de registros de acessos */}
                              <AccessLogTable
                                    filter={filter}
                                    accessLogsData={accessLogsData}
                              />
                        </section>
                  </section>
            </Layout>
      );
};