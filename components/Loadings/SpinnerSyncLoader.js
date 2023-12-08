// Importação do componente de spinner SpinnerSyncLoader.
import { SyncLoader } from "react-spinners";

/**
 * Componente funcional para exibir um spinner de carregamento animado.
 * Este componente utiliza o SpinnerSyncLoader do pacote "react-spinners".
 *
 * @returns {JSX.Element} Componente do spinner.
 */
const SpinnerSyncLoader = () => {
    return (
        // Elemento SpinnerSyncLoader para exibir a animação de carregamento.
        <SyncLoader color={"#3f3cbb"} size={10} />
    );
}

// Exporta o componente de SpinnerSyncLoader.
export default SpinnerSyncLoader;

