// Importação do componente de carregamento "PropagateLoader" do pacote "react-spinners".
import { PropagateLoader } from "react-spinners";

// Importação do módulo de estilos específico para o componente de carregamento.
import style from "@/styles/PageLoading.module.css";

/**
 * Componente funcional para exibir uma tela de carregamento.
 * Este componente exibe um logo e um spinner de carregamento.
 *
 * @returns {JSX.Element} Componente da tela de carregamento.
 */
const PageLoading = () => {
    return (
        // Seção principal do componente de carregamento.
        <section className={style.mainContentPageLoading}>
            {/* Imagem do logo do condoplanner. */}
            <img src="/logo.svg" alt="Logo do condoplanner" />

            {/* Componente de carregamento com a cor e tamanho personalizados. */}
            <PropagateLoader color="#6597FF" size={15} />
        </section>
    );
};

// Exporta o componente de carregamento para ser utilizado.
export default PageLoading;
