// Importação do pacote "axios" para realizar requisições HTTP.
import axios from "axios";

/* Importação do hook useRouter do pacote "next/router",
 para fornecer acesso às rotas das páginas.*/
import { useRouter } from "next/router";

/* Importação do hook `useState` e `useEffect` do pacote "next/router", 
 para definir e atualizar o estado dos dados dos unidades.*/
import { useState, useEffect } from "react";

// Importação dos componentes personalizados
import Layout from "@/components/Layout";           // Layout geral da página
import HeaderSection from "@/components/HeaderSection"; // Cabeçalho da página
import CustomButton from "@/components/CustomButton";   // Botão personalizado
import SearchFilters from "@/components/SearchFilter";  // Filtros de pesquisa
import Spinner from "@/components/Loadings/SpinnerBouceLoader";

// Importação das opções de filtros de pesquisas das unidades
import { filterOptionsCondoUnits } from "@/utils/inputFields";

// Importação de ícones de usuário, condomínio, visualização ("react-icons/hi2")
import { HiPlusCircle, HiBuildingOffice2, HiEye, HiOutlineExclamationCircle } from "react-icons/hi2";

// Importação dos módulos de estilos
import style from "@/styles/ResidentPage.module.css";
import styles from "@/styles/BasicTable.module.css";

/**
 * Página de listagem de unidades.
 * Esta página exibe uma lista de unidades e fornece opções para pesquisa 
 * e adição de novas unidades.
 *
 * @returns {JSX.Element} Componente da página de unidades.
 */
const CondoUnitsPage = () => {
    // Hook useRouter para fornecer acesso às rotas das páginas.
    const router = useRouter();

    // Estado para armazenar os dados dos unidades obtidos da API (condo-units).
    const [condoUnitData, setCondoUnitData] = useState([]);

    // Estado para armazenar carregamento dos dados
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [noResults, setNoResults] = useState(false);

    // Estado para armazenar o filtro atual aplicado à tabela de unidades.
    const [filter, setFilter] = useState({ type: "all", query: "" });

    // // Estado para armazenar os moradores filtrados.
    const [filteredResidents, setFilteredResidents] = useState([]);

    // Função chamada quando o filtro da tabela de undidades é alterado.
    const handleFilterChange = (type, query) => {
        setFilter({ type, query });
    };

    /* Efeito colateral com funcionalidades para buscar os dados dos unidades 
    ao carregar a página e filtrar esses dados*/
    useEffect(() => {
        // Função para realizar à solicitação dos dados das unidades
        const fetchCondoUnitData = async () => {
            try {
                // Realiza uma requisição GET para obter os dados dos unidades da API.
                const response = await axios.get("/api/condo-units");

                // Verifica se a requisição foi bem-sucedida (código de status 200).
                if (response.status === 200) {
                    // Atualiza o estado com os dados das unidades obtidos.
                    setCondoUnitData(response.data.data);
                } else {
                    // Exibe um erro no console caso à requisição falhe.
                    console.error("Erro ao buscar unidades");
                }
            } catch (error) {
                // Exibe um erro no console caso à requisição falhe.
                console.error("Erro ao buscar unidades", error);
            } finally {
                setIsLoadingData(false)
            }
        };

        // Função para filtrar os dados das unidades obtidos da API (condo-units)
        const filterCondoUnits = () => {
            // Verifica se há dados de unidades para realizar a filtragem dos dados
            const filteredData = condoUnitData ? condoUnitData.filter((condoUnit) => {
                // Obtém o tipo e a consulta do filtro
                const { type, query } = filter;

                // Verifica se a unidade corresponde ao tipo especificado ou se é "all" (todas)
                if (type === "all" || condoUnit.condoUnitStatus === type) {

                    /* Converte a consulta para minúsculas para tornar a 
                    comparação insensível a maiúsculas e minúsculas */
                    const searchQuery = query.toLowerCase();
                    const cpf = condoUnit.residentCpfNumber?.toString();
                    const number = condoUnit.condoUnitNumber?.toString();

                    // Verifica se algum dos campos contém a consulta e retorna o valor
                    return (number.includes(searchQuery) || cpf.includes(searchQuery));
                }

                // retorna falso caso não exista um tipo para filtrar
                return false;
            }) : []; // Retorna um array vazio caso não haja dados de unidades para filtrar

            // Atualiza o estado local com os moradores filtrados
            setFilteredResidents(filteredData);

            setNoResults(filteredData.length === 0);
        }

        /*Chamada da função para buscar os dados dos unidades e a função de filtragem 
        ao montar o componente ou quando o filtro/dados das unidades mudam  */
        fetchCondoUnitData();
        filterCondoUnits();
    }, [filter, condoUnitData]);

    // Renderiza a estrutura da página.
    return (
        <Layout>
            {/* Seção de cabeçalho com título e botão para adicionar novo unidade */}
            <HeaderSection
                headerIcon={<HiBuildingOffice2 size={36} />}
                headerTitle={"Unidades"}
            >
                {/* Botão personalizado para adicionar nova unidade */}
                <CustomButton
                    buttonStyle={'blue-button'}
                    buttonText={"Cadastrar unidade"}
                    buttonIcon={<HiPlusCircle size={24} color="#FFF" />}
                    buttonType={"button"}
                    // Navega para a página de cadastro de unidade ao clicar no botão.
                    buttonFunction={() => router.push("/unidades/cadastro")}
                />
            </HeaderSection>

            {/* Seção principal da página */}
            <section className={style.residentPage}>
                {/* Componente de filtros de pesquisa para unidades */}
                <SearchFilters
                    searchTitle={"Unidades"}
                    placeHolder={"Número da unidade, ou CPF do títular"}
                    selectTextInfo={"Selecione um status da unidade para Listar"}
                    inputTextInfo={"Insira Número da unidade ou CPF do titular para Pesquisar"}
                    filterOptions={filterOptionsCondoUnits}
                    // Função chamada ao alterar o filtro.
                    onFilterChange={handleFilterChange}
                />
                {/* Tabela de unidades */}
                <span className={styles.tableWrapper}>
                    {isLoadingData ? (
                        <p className="bg-slate-50 flex items-center font-bold p-10 rounded-md gap-2 text-xl tracking-widest text-dark-blue">
                            <Spinner />
                            Carregando as informações ...
                        </p>
                    ) : noResults ? (
                        <p className="bg-slate-50 flex p-10 rounded-md gap-2 text-xl tracking-widest text-bg-dark opacity-80">
                            <HiOutlineExclamationCircle size={30} />
                            Nenhuma informação foi encontrada
                        </p>
                    ) : (
                        <div className={styles.tableContainer}>
                            <table className={styles.tableContent}>
                                <thead className={styles.tableHeader}>
                                    <tr className={styles.tableHeaderRow}>
                                        <th>Número da unidade</th>
                                        <th>Bloco</th>
                                        <th>Status</th>
                                        <th>Moradores</th>
                                        <th>Titular da Unidade</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tableBody}>
                                    {filteredResidents && filteredResidents.map(data => (
                                        <tr className={styles.tableBodyRow} key={data._id}>
                                            <td>{data.condoUnitNumber}</td>
                                            <td>{data.condoUnitBlock}</td>
                                            <td>{data.condoUnitStatus}</td>
                                            <td>0</td>
                                            <td>{data.residentHolderId ? data.residentHolderId.residentFullName : 'N/A'}</td>
                                            <td>
                                                {/* Coluna com o botão personalizado para ver os detalhes da unidade */}
                                                <span>
                                                    <CustomButton
                                                        buttonType={"button"}
                                                        buttonStyle={"black-button"}
                                                        buttonIcon={<HiEye size={24} color="#FFF" />}
                                                        buttonText={"Ver Unidade"}
                                                        // Função a ser executada ao clicar no botão
                                                        buttonFunction={() =>
                                                            // Navega para a página de detalhes da unidade
                                                            router.push(`/unidades/detalhes/${data._id}`)
                                                        }
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </span>
            </section>
        </Layout >
    );
};

// Exporta o componente principal da página.
export default CondoUnitsPage;
