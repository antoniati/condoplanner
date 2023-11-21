/* Importação do hook `useState` do pacote "next/router", 
 para criar estado local (filteredResidents) que mantêm o estado 
 da listagem de moradores por filtros */
import { useState } from "react";

// Importação do hook useEffect do pacote "react"
import { useEffect } from "react";

// Importação do hook useRouter do pacote "next/router",
// para fornecer acesso às rotas das páginas.
import { useRouter } from "next/router";

// Botão personalizado
import CustomButton from "@/components/CustomButton";

// Importação do ícone HiEye do pacote "react-icons/hi2",
// usado para representar um ícone de olho.
import { HiEye } from "react-icons/hi2";

// Importação do módulo de estilos "BasicTable.module.css"
// para estilizar a tabela básica.
import style from "@/styles/BasicTable.module.css";

/**
 * Componente de tabela de moradores.
 * Este componente recebe dados de moradores e um filtro, e exibe uma tabela filtrada.
 *
 * @param {Object} residentsData - Dados dos moradores.
 * @param {Object} filter - Filtro para aplicar à tabela.
 * @returns {JSX.Element} Componente de tabela de moradores.
 */
const ResidentTable = ({ residentsData, filter }) => {
    // Estado local para armazenar os moradores filtrados
    const [filteredResidents, setFilteredResidents] = useState([]);

    // Objeto do roteador Next.js para navegação
    const router = useRouter();

    // Efeito colateral para filtrar moradores quando o filtro ou dados dos moradores mudam
    useEffect(() => {
        // Função para filtrar os moradores com base no filtro atual
        const filterResidents = () => {
            // Verifica se há dados de moradores
            const filteredData = residentsData
                ? residentsData.filter((resident) => {
                    // Obtém o tipo e a consulta do filtro
                    const { type, query } = filter;

                    // Verifica se o morador corresponde ao tipo especificado ou se é "all"
                    if (type === "all" || resident.typeOfResident === type) {
                        // Converte a consulta para minúsculas para tornar a comparação insensível a maiúsculas e minúsculas
                        const searchQuery = query.toLowerCase();
                        const fullName = resident.residentFullName.toLowerCase();
                        const rg = resident.residentRgNumber.toString();
                        const cpf = resident.residentCpfNumber?.toString();

                        // Verifica se algum dos campos contém a consulta
                        return (
                            fullName.includes(searchQuery) ||
                            rg.includes(searchQuery) ||
                            cpf.includes(searchQuery)
                        );
                    }

                    return false;
                })
                : [];

            // Atualiza o estado local com os moradores filtrados
            setFilteredResidents(filteredData);
        };

        // Chama a função de filtragem ao montar o componente ou quando o filtro/dados dos moradores mudam
        filterResidents();
    }, [filter, residentsData]);


    // Renderização da tabela de moradores
    return (
        // Container principal da tabela com espaçamento externo
        <div className="p-5">
            {/* Contêiner da tabela com estilos específicos */}
            <div className={style.tableContainer}>
                {/* Tabela de moradores */}
                <table className={style.tableContent}>
                    {/* Cabeçalho da tabela */}
                    <thead className={style.tableHeader}>
                        {/* Linha de cabeçalho da tabela */}
                        <tr className={style.tableHeaderRow}>
                            <th>Foto</th>
                            <th>Nome do Morador</th>
                            <th>Tipo</th>
                            <th>Apartamento</th>
                            <th>Bloco</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    {/* Corpo da tabela */}
                    <tbody className={style.tableBody}>
                        {/* Mapeia os moradores filtrados para criar linhas da tabela */}
                        {filteredResidents.map((resident) => (
                            // Linha da tabela para cada morador
                            <tr key={resident._id} className={style.tableBodyRow}>
                                <td>
                                    {/* Coluna com a foto de perfil do morador */}
                                    <img
                                        src={resident.residentImage || "/images/perfil-img.png"}
                                        alt="Imagem de Perfil do Morador"
                                        className="rounded-xl"
                                    />
                                </td>
                                <td>{resident.residentFullName}</td>
                                <td>{resident.typeOfResident}</td>
                                <td>111</td>
                                <td>A</td>
                                <td>Morando</td>
                                <td>
                                    {/* Coluna com o botão personalizado para ver o perfil do morador */}
                                    <span>
                                        <CustomButton
                                            buttonStyle={"black-button"}
                                            buttonText={"Ver Perfil"}
                                            buttonIcon={<HiEye size={24} color="#FFF" />}
                                            buttonType={"button"}
                                            // Função a ser executada ao clicar no botão
                                            buttonFunction={() =>
                                                // Navega para a página de perfil do morador
                                                router.push(`/moradores/perfil/${resident._id}`)
                                            }
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Exporta o componente principal da página
export default ResidentTable;
