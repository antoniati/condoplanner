/* Importação do hook `useState` do pacote "next/router", 
 para criar estados locais (selectedFilter e searchQuery) 
 que mantêm o estado atual dos filtros. */
import { useState } from "react";

// Importação do modulo de estilos CSS para o componente `SearchFilters`
import style from "@/styles/SearchFilter.module.css";

/**
 * O componente `SearchFilters` é uma parte da interface do usuário 
 *   responsável pelos filtros de pesquisa.
 *
 * @component
 * @param {string} searchTitle - Título usado para a ordenação dos resultados.
 * @param {string} placeHolder - Texto de placeholder para a caixa de pesquisa.
 * @param {string} selectTextInfo - Informação relacionada à seleção de opções.
 * @param {string} inputTextInfo - Informação relacionada à entrada de texto.
 * @param {array} filterOptions - Opções disponíveis para o filtro de pesquisa.
 * @param {function} onFilterChange - Função chamada quando os filtros são alterados.
 */
const SearchFilters = ({
    // Propriedades (props) do componente pai
    searchTitle,
    placeHolder,
    selectTextInfo,
    inputTextInfo,
    filterOptions,
    onFilterChange
}) => {

    // Estado para armazenar o tipo de filtro selecionado (inicializado como "all")
    const [selectedFilter, setSelectedFilter] = useState("all");

    // Estado para armazenar a consulta de pesquisa inserida pelo usuário
    const [searchQuery, setSearchQuery] = useState("");


    // Função chamada quando o tipo de filtro é alterado pelo usuário
    const handleFilterChange = (event) => {
        // Atualiza o estado do tipo de filtro selecionado com base no valor do evento
        setSelectedFilter(event.target.value);

        // Chama a função de filtro externa para aplicar a lógica de filtragem
        // Passa o novo tipo de filtro e a consulta de pesquisa atual como parâmetros
        onFilterChange(event.target.value, searchQuery);
    };

    // Função chamada quando a consulta de pesquisa é alterada pelo usuário
    const handleSearchChange = (event) => {
        // Atualiza o estado da consulta de pesquisa com base no valor do evento
        setSearchQuery(event.target.value);

        // Chama a função de filtro externa para aplicar a lógica de filtragem
        // Passa o tipo de filtro atual e a nova consulta de pesquisa como parâmetros
        onFilterChange(selectedFilter, event.target.value);
    };

    // Renderiza a estrutura da página.
    return (
        // Container principal do componente de filtro de pesquisa
        <section className={style.searchFilter}>
            {/* Seção de ordenação */}
            <div>
                <label>
                    {/* Título para a ordenação */}
                    Ordernar {searchTitle} Por:
                </label>
                {/* Dropdown para selecionar o tipo de ordenação */}
                <select value={selectedFilter} onChange={handleFilterChange}>
                    {/* Opção padrão para mostrar todos os moradores */}
                    <option value="all">
                        {searchTitle}
                    </option>
                    {/* Mapeamento das opções de filtro para a ordenação */}
                    {filterOptions.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* Texto Informativo sobre a seleção de ordenação */}
                <span> {selectTextInfo} </span>
            </div>

            {/* Seção de pesquisa */}
            <div>
                <label>
                    {/* Título para a pesquisa */}
                    Pesquisar {searchTitle} por:
                </label>
                {/* Campo de input para inserir o termo de pesquisa */}
                <input
                    type="text"
                    placeholder={placeHolder}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {/* Texto informativo sobre a inserção de texto para pesquisa */}
                <span> {inputTextInfo} </span>
            </div>
        </section>
    );
}

// Exporta o componente principal da página
export default SearchFilters;
