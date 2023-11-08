import style from "@/styles/SearchFilter.module.css";

const SearchFilters = ({
    searchTitle,
    placeHolder,
    selectTextInfo,
    inputTextInfo,
    filterOptions
}) => {
    return (
        <section className={style.searchFilter}>
            <div>
                <label>
                    Ordernar {searchTitle} Por:
                </label>
                <select >
                    <option value="all">
                        Todos Moradores
                    </option>
                    {filterOptions.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <span> {selectTextInfo} </span>
            </div>

            <div>
                <label>
                    Pesquisar {searchTitle} por:
                </label>
                <input
                    type="text"
                    placeholder={placeHolder}
                />
                <span> {inputTextInfo} </span>
            </div>
        </section>
    );
}

export default SearchFilters;
